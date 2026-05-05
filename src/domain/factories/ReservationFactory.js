const Reservation = require('../entities/Reservation');

class ReservationFactory {
    static create(id, user, workspace, timeSlot, wantsProjector) {
        if (wantsProjector && workspace.type !== 'MeetingRoom') {
            throw new Error("Un vidéoprojecteur ne peut être réservé qu'avec une salle de réunion.");
        }

        const cost = workspace.calculatePrice(timeSlot);
        
        return new Reservation(id, user.id, workspace, timeSlot, wantsProjector, cost);
    }
}

module.exports = ReservationFactory;