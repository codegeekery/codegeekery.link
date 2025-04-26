import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import router from './routes/routes.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public'))); // Solo archivos estáticos (CSS, JS, imágenes)

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'app', 'views')); // Ajusta esta ruta según tu estructura

// Rutas
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});