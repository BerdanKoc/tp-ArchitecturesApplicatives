class Workspace {
    constructor(id, name, type, basePricePerHour) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.basePricePerHour = basePricePerHour;
    }

    calculatePrice(timeSlot) {
        const hours = timeSlot.durationInHours();
        let multiplier = hours;
        
        if (timeSlot.isPeakHour()) {
            multiplier *= 1.5; // +50% en heure de pointe
        }
        
        return this.basePricePerHour.multiply(multiplier);
    }
}

module.exports = Workspace;