const sqlite3 = require('sqlite3').verbose();
const ReservationRepository = require('../../domain/ports/ReservationRepository');

class SqliteReservationRepository extends ReservationRepository {
    constructor(dbFilePath) {
        super();
        this.db = new sqlite3.Database(dbFilePath);
        this.init();
    }

    init() {
        // Création de la table si elle n'existe pas
        const query = `
            CREATE TABLE IF NOT EXISTS reservations (
                id TEXT PRIMARY KEY,
                userId TEXT,
                workspaceId TEXT,
                status TEXT,
                totalCost INTEGER
            )
        `;
        this.db.run(query);
    }

    async save(reservation) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO reservations (id, userId, workspaceId, status, totalCost) VALUES (?, ?, ?, ?, ?)`;
            const values = [reservation.id, reservation.userId, reservation.workspace.id, reservation.status, reservation.totalCost.amount];
            
            this.db.run(query, values, function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}

module.exports = SqliteReservationRepository;