// routes/index.js
import { Router } from "express";
import "dotenv/config";
import { config } from "dotenv";

config();

const router = Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    // If the user is authenticated, proceed to the next middleware
    next();
  } else {
    // If not authenticated, redirect to the login page
    res.redirect("/error");
  }
};

router.get("/", (req, res) =>
  res.render("index", { title: "BACHECITO 26", user: req.session.user })
);


router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.USUARIO && password === process.env.CONTRASENA) {
    req.session.user = username;
    res.redirect("/");
  } else {
    res.redirect("/inicioSesion");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Use the isAuthenticated middleware for routes that require authentication
router.get("/peticiones", isAuthenticated, (req, res) =>
  res.render("peticiones", { title: "Peticiones", user: req.session.user })
);

router.get("/sobreNosotros", (req, res) =>
  res.render("sobreNosotros", {
    title: "Sobre Nosotros",
    user: req.session.user,
  })
);

router.get("/inicioSesion", (req, res) =>
  res.render("inicioSesion", {
    title: "Inicio de Sesión",
    user: req.session.user,
  })
);

router.get("/bachecito", (req, res) =>
  res.render("bachecito", { title: "Bachecito 26", user: req.session.user })
);

router.get("/error", (req, res) =>
  res.render("error", { title: "ERROR", user: req.session.user })
);

export default router;
