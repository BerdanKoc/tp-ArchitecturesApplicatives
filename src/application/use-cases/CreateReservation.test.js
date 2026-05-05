const CreateReservation = require('./CreateReservation');

describe('Cas d\'usage : CreateReservation', () => {
    let mockRepository;
    let createReservationUseCase;

    // Cette fonction s'exécute avant chaque test pour repartir sur un environnement propre
    beforeEach(() => {
        // --- LE MOCK ---
        // Définition : Un faux objet "espion" qui vérifie comment on a interagi avec lui.
        // Ici, on simule notre base de données. Elle ne fait rien de réel, mais elle retient si on l'appelle.
        mockRepository = {
            save: jest.fn().mockResolvedValue(true) 
        };

        // On injecte notre fausse base de données dans le cas d'usage
        createReservationUseCase = new CreateReservation(mockRepository);
    });

    test('Doit créer une réservation avec succès et appeler la BDD', async () => {
        // --- LE STUB ---
        // Définition : Un faux objet qui renvoie des données codées en dur.
        // Ici, on simule des données entrantes figées pour tester notre "Happy Path" (le scénario idéal).
        const requestDataStub = {
            userId: "user-123",
            workspaceId: "ws-abc",
            startTime: "2026-06-01T10:00:00",
            endTime: "2026-06-01T12:00:00",
            wantsProjector: true 
        };

        // On exécute le cas d'usage avec nos données Stub
        const reservation = await createReservationUseCase.execute(requestDataStub);

        // Vérifications classiques
        expect(reservation.id).toBeDefined();
        expect(reservation.status).toBe("Pending");
        expect(reservation.userId).toBe("user-123");

        // --- VÉRIFICATION DU MOCK ---
        // On s'assure que la base de données a bien reçu l'ordre de sauvegarder, exactement 1 fois
        expect(mockRepository.save).toHaveBeenCalledTimes(1);
        expect(mockRepository.save).toHaveBeenCalledWith(reservation);
    });

    test('Doit rejeter la création et bloquer la sauvegarde si une règle métier échoue', async () => {
        // Un autre Stub, mais conçu pour déclencher une erreur métier (fin avant le début)
        const badRequestDataStub = {
            userId: "user-123",
            workspaceId: "ws-abc",
            startTime: "2026-06-01T12:00:00", // Commence à 12h
            endTime: "2026-06-01T10:00:00",   // Finit à 10h (Impossible)
            wantsProjector: true
        };

        // On vérifie que l'exécution jette bien l'erreur prévue par notre Value Object TimeSlot
        await expect(createReservationUseCase.execute(badRequestDataStub))
            .rejects.toThrow("La date de fin doit être postérieure à la date de début.");

        // --- VÉRIFICATION DU MOCK ---
        // Puisque la règle métier a échoué, le système ne doit JAMAIS avoir essayé de sauvegarder en base
        expect(mockRepository.save).not.toHaveBeenCalled();
    });
});