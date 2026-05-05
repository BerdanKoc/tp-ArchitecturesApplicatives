const express = require('express');
const SqliteReservationRepository = require('./infrastructure/database/SqliteReservationRepository');
const CreateReservation = require('./application/use-cases/CreateReservation');
const reservationRoutes = require('./presentation/routes/reservationRoutes');

const app = express();
app.use(express.json()); // Pour lire le JSON dans le body des requêtes HTTP

// 1. Initialisation de l'Infrastructure (La BDD)
const dbRepository = new SqliteReservationRepository('./coworking.sqlite');

// 2. Initialisation de l'Application (On injecte la BDD dans le cas d'usage)
const createReservation = new CreateReservation(dbRepository);

// 3. Initialisation de la Présentation (On injecte le cas d'usage dans les routes Express)
const routes = reservationRoutes(createReservation);
app.use('/api', routes);

// 4. Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log(`Testez avec POST http://localhost:3000/api/reservations`);
});