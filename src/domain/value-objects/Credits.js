class Credits {
    constructor(amount) {
        if (amount < 0) {
            throw new Error("Le montant des crédits ne peut pas être négatif.");
        }
        this.amount = amount;
    }

    // On retourne toujours une NOUVELLE instance (Immuabilité)
    add(credits) {
        return new Credits(this.amount + credits.amount);
    }

    subtract(credits) {
        if (this.amount < credits.amount) {
            throw new Error("Solde insuffisant.");
        }
        return new Credits(this.amount - credits.amount);
    }

    multiply(multiplier) {
        return new Credits(this.amount * multiplier);
    }
}

module.exports = Credits;