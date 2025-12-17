import { Router } from "express";
import prisma from "../config/db.js";

import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("API de tableros");
});

router.get("/getall", async (req, res) => {
  try {
    const response = await prisma.boards.findMany({
      include: {
        tasks: true
      }
    });

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "No se han encontrado tableros" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tableros: ", error: error.message })
  }
});

router.get("/getone/:id", async (req, res) => {
  try {
    const response = await prisma.boards.findUnique({
      where: {
        boardid: parseInt(req.params.id)
      }
    })

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "No se encontró el tablero" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el tablero: ", error: error.message })
  }
})

router.post("/create", authMiddleware, async (req, res) => {
  const { title } = req.body;

  try {
    const response = await prisma.boards.create({
      data: {
        // extraemos el id del usuario del token verificado para poder usarlo //
        userid: req.user.userid,
        title: title
      }
    })

    if (response) {
      res.status(200).json({ message: `Tablero "${title}" creado exitosamente` });
    } else {
      res.status(404).json({ message: "Tablero no creado" })
    }
  } catch (error) {
    console.error("Error al crear el tablero: ", error);
    res.status(500).json({ message: "Error al crear el tablero en el servidor: ", error: error.message })
  }
})

router.put("/update/:id", authMiddleware, async (req, res) => {
  const { title } = req.body;
  
  try {
    const response = await prisma.boards.update({
      where: {
        boardid: parseInt(req.params.id)
      },
      data: {
        title: title
      }
    })

    if (response) {
      res.status(200).json({ message: `Tablero "${title}" actualizado exitosamente` });
    } else {
      res.status(404).json({ message: "Tablero no actualizado" })
    }
  } catch (error) {
    console.error("Error en el servidor al actualizar el tablero: ", error);
    res.status(500).json({ message: "Error en el servidor al actualizar el tablero en el servidor: ", error: error.message })
  }
})

router.delete("/deleteone/:id", authMiddleware, async (req, res) => {
  try {
    const response = await prisma.boards.delete({
      where: {
        boardid: parseInt(req.params.id)
      }
    })

    if (response) {
      res.status(200).json({ message: `Tablero eliminado exitosamente` });
    } else {
      res.status(404).json({ message: "No se encontró el tablero" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el tablero: ", error: error.message })
  }
})

export default router;