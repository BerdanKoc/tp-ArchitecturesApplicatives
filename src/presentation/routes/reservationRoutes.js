const express = require('express');

module.exports = function(createReservationUseCase) {
    const router = express.Router();

    router.post('/reservations', async (req, res) => {
        try {
            // On passe les données brutes au cas d'usage
            const reservation = await createReservationUseCase.execute(req.body);
            res.status(201).json({ 
                message: "Réservation créée avec succès", 
                reservationId: reservation.id,
                cost: reservation.totalCost.amount 
            });
        } catch (error) {
            // Si une règle métier a échoué (ex: projecteur sans salle), l'erreur arrive ici
            res.status(400).json({ error: error.message });
        }
    });

    return router;
};