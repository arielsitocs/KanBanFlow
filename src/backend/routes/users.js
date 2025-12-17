import { Router } from "express";
import prisma from "../config/db.js";

// bcrypt para hashear la contraseña del usuario registrado //
import bcrypt from "bcrypt";
// jwt para crear el token del usuario logueado //
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", (req, res) => {
  res.send("API de usuarios");
});

router.get("/getall", async (req, res) => {
  try {
    const response = await prisma.users.findMany();
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "No se han encontrado usuarios" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios: ", error: error.message })
  }
});

router.get("/getone/:id", async (req, res) => {
  try {
    const response = await prisma.users.findUnique({
      where: {
        userid: parseInt(req.params.id)
      }
    })
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "No se han encontrado usuarios" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario: ", error: error.message })
  }
})

router.post("/create", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    // cantidad de veces que se va a hashear la contraseña del usuario registrado //
    const salt = await bcrypt.genSalt(10);
    // hasheo de la contraseña del usuario registrado //
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.users.create({
      data: {
        username: username,
        email: email,
        // se pasa la contraseña hasheada al usuario registrado //
        password: hashedPassword
      }
    })
    if (newUser) {
      res.status(201).json({ message: "Usuario creado exitosamente: " + newUser.username })
    } else {
      res.status(404).json({ message: "No se ha creado el usuario" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario: ", error: error.message })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    // encontrar el usuario que coincida con el correo electrónico ingresado //
    const user = await prisma.users.findFirst({
      where: {
        email: email
      }
    });

    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // comparar contraseña ingresada con la hasheada del usuario encontrado //
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // crear el token JWT para el usuario logueado con sus credenciales //
    const token = jwt.sign(
      { userid: user.userid, username: user.username },
      process.env.JWT_SECRET || "MadonaxD1234-",
      { expiresIn: "1h" }
    );

    // se envia codigo 200 junto con el token y el usuario logueado //
    res.status(200).json({
      message: "Login exitoso",
      token: token,
      user: {
        userid: user.userid,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: ", error: error.message });
  }
});

export default router;