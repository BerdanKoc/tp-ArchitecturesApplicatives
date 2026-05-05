class TimeSlot {
    constructor(startTime, endTime) {
        this.startTime = new Date(startTime);
        this.endTime = new Date(endTime);

        if (this.endTime <= this.startTime) {
            throw new Error("La date de fin doit être postérieure à la date de début.");
        }
    }

    durationInHours() {
        return (this.endTime - this.startTime) / (1000 * 60 * 60);
    }

    isPeakHour() {
        const startHour = this.startTime.getHours();
        return (startHour >= 9 && startHour < 12) || (startHour >= 14 && startHour < 17);
    }
}

module.exports = TimeSlot;