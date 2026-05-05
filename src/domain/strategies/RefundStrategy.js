const Credits = require('../value-objects/Credits');

class RefundStrategy {
    calculateRefund(totalCost) {
        throw new Error("Doit être implémenté par les sous-classes");
    }
}

class FullRefundStrategy extends RefundStrategy {
    calculateRefund(totalCost) {
        return totalCost; // 100% remboursé
    }
}

class HalfRefundStrategy extends RefundStrategy {
    calculateRefund(totalCost) {
        return totalCost.multiply(0.5); // 50% remboursé
    }
}

class NoRefundStrategy extends RefundStrategy {
    calculateRefund(totalCost) {
        return new Credits(0); // 0% remboursé
    }
}

function getRefundStrategy(reservationStartTime, requestDate) {
    const hoursDifference = (reservationStartTime - requestDate) / (1000 * 60 * 60);
    
    if (hoursDifference >= 48) return new FullRefundStrategy();
    if (hoursDifference >= 24) return new HalfRefundStrategy();
    return new NoRefundStrategy();
}

module.exports = { getRefundStrategy };