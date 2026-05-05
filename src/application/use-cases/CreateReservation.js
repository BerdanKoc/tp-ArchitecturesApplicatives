const crypto = require('crypto');
const ReservationFactory = require('../../domain/factories/ReservationFactory');
const User = require('../../domain/entities/User');
const Workspace = require('../../domain/entities/Workspace');
const TimeSlot = require('../../domain/value-objects/TimeSlot');
const Credits = require('../../domain/value-objects/Credits');

class CreateReservation {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    async execute(requestData) {
        // 1. GÉNÉRATION DE L'ID : C'est notre domaine qui décide de l'identité !
        const reservationId = crypto.randomUUID();

        const user = new User(requestData.userId, "Alice", new Credits(100));
        const workspace = new Workspace(requestData.workspaceId, "Salle A", "MeetingRoom", new Credits(10));
        const timeSlot = new TimeSlot(requestData.startTime, requestData.endTime);

        // 2. On passe l'ID généré à notre Factory
        const reservation = ReservationFactory.create(
            reservationId, 
            user, 
            workspace, 
            timeSlot, 
            requestData.wantsProjector
        );

        // 3. Sauvegarder via le repository
        await this.reservationRepository.save(reservation);

        return reservation;
    }
}

module.exports = CreateReservation;