import { Router } from "express";
import prisma from "../config/db.js";

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
    const newUser = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: password
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

export default router;