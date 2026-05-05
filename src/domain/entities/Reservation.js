const { getRefundStrategy } = require('../strategies/RefundStrategy');

class Reservation {
    constructor(id, userId, workspace, timeSlot, hasProjector, totalCost) {
        this.id = id;
        this.userId = userId;
        this.workspace = workspace;
        this.timeSlot = timeSlot;
        this.hasProjector = hasProjector;
        this.totalCost = totalCost;
        this.status = 'Pending';
    }

    confirm() {
        this.status = 'Confirmed';
    }

    cancel(requestDate, user) {
        if (this.status === 'Cancelled') {
            throw new Error("Réservation déjà annulée.");
        }

        // On utilise notre pattern Strategy !
        const strategy = getRefundStrategy(this.timeSlot.startTime, requestDate);
        const refundAmount = strategy.calculateRefund(this.totalCost);
        
        user.refundCredits(refundAmount);
        this.status = 'Cancelled';
    }
}

module.exports = Reservation;