import express from 'express'
import ejs from 'ejs'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
import session from 'express-session'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'


import indexRoutes from  './routes/index.js'

const app = express()
//ESTO ES LA RUTA ABSOLUTA
const __dirname = dirname(fileURLToPath(import.meta.url))


app.use(bodyParser.urlencoded({ extended: true }));

// Configure express-session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));
//CONFIGURACION PARA UNIR LA RUTA ABSOLUTA CON LA CARPETA DE VIEWS
app.set('views', join(__dirname, 'views') )
//MOTOR DE RENDERIZADO DE PLANTILLAS
app.set('view engine', 'ejs')
app.use(indexRoutes)
app.use(express.static(join(__dirname, 'public')))
//INICIADO DEL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});


