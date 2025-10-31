import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import router from './routes/routes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (usa __dirname)
app.use(express.static(join(__dirname, 'public')));

// EJS
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Rutas
app.use('/', router);

// 404 (después de TODAS las rutas)
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

