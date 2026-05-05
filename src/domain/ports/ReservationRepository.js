class ReservationRepository {
    async save(reservation) {
        throw new Error("La méthode save() doit être implémentée");
    }

    async findById(id) {
        throw new Error("La méthode findById() doit être implémentée");
    }
}

module.exports = ReservationRepository;