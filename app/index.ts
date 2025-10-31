import express from 'express';
import { join } from 'path';
import router from './routes/routes.ts';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔧 Usa la raíz del proyecto para static y views
app.use(express.static(join(process.cwd(), 'app', 'public')));

// EJS
app.set('view engine', 'ejs');
app.set('views', join(process.cwd(), 'app', 'views')); // <-- clave

// Rutas
app.use('/', router);

// 404 (después de TODAS las rutas)
app.use((req, res) => {
  res.status(404).render('404'); // renderiza app/views/404.ejs
});




app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
