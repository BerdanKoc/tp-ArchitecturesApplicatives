class User {
    constructor(id, name, creditsBalance) {
        this.id = id;
        this.name = name;
        this.creditsBalance = creditsBalance;
    }

    deductCredits(amount) {
        this.creditsBalance = this.creditsBalance.subtract(amount);
    }

    refundCredits(amount) {
        this.creditsBalance = this.creditsBalance.add(amount);
    }
}

module.exports = User;