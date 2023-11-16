import express from 'express'
import ejs from 'ejs'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'

import indexRoutes from  './routes/index.js'

const app = express()
//ESTO ES LA RUTA ABSOLUTA
const __dirname = dirname(fileURLToPath(import.meta.url))


//CONFIGURACION PARA UNIR LA RUTA ABSOLUTA CON LA CARPETA DE VIEWS
app.set('views', join(__dirname, 'views') )
//MOTOR DE RENDERIZADO DE PLANTILLAS
app.set('view engine', 'ejs')
app.use(indexRoutes)
app.use(express.static(join(__dirname, 'public')))
app.listen(3000)


console.log("Server is listening",3000)


