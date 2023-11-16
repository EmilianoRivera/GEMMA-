import { Router } from "express"; //me ayuda a definir distintas rutas
const router = Router();

router.get("/", (req, res) => res.render("index", {title: 'BACHECITO 26'
}));

router.get("/loginMeta", (req, res) => res.render("loginMeta", {title : 'login'}));

router.get("/peticiones", (req, res) => res.render("peticiones", {title: 'peticiones'}));

export default router;
