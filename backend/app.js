const express = require('express');
const bodyParser = require('body-parser');
const telegramRoutes = require('./routes/telegram');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/telegram', telegramRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
