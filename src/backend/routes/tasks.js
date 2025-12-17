import { Router } from "express";
import prisma from "../config/db.js";

import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("API de tareas");
});

router.get("/getall", async (req, res) => {
  try {
    const response = await prisma.tasks.findMany();
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "No se han encontrado tareas" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas: ", error: error.message })
  }
});

router.get("/getone/:id", async (req, res) => {
  try {
    const response = await prisma.tasks.findUnique({
      where: {
        taskid: parseInt(req.params.id)
      }
    })
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "No se han encontrado tareas" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tarea: ", error: error.message })
  }
})

router.post("/create", authMiddleware, async (req, res) => {
  const { taskname, limitdate, priority, status, boardid, userid } = req.body;

  if (!taskname || !limitdate || !priority || !status || !boardid || !userid) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const newTask = await prisma.tasks.create({
      data: {
        taskname: taskname,
        limitdate: new Date(limitdate),
        priority: priority,
        status: status,
        boardid: boardid,
        userid: userid
      }
    })
    if (newTask) {
      res.status(201).json({ message: "Tarea creada exitosamente: " + newTask.taskname })
    } else {
      res.status(404).json({ message: "No se ha creado la tarea" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea: ", error: error.message })
  }
})

router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { taskname, limitdate, priority, status, boardid, userid } = req.body;

    const response = await prisma.tasks.update({
      where: {
        taskid: parseInt(req.params.id)
      },
      data: {
        taskname: taskname,
        limitdate: new Date(limitdate),
        priority: priority,
        status: status,
        boardid: boardid,
        userid: userid
      }
    })
    if (response) {
      res.status(200).json({ message: "Tarea actualizada con exito" })
    } else {
      res.status(404).json({ message: "Tarea no actualizada" })
    }
  } catch (error) {
    console.error('Error en el servidor al actualizar la tarea: ', error.message)
  }
})

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const response = await prisma.tasks.delete({
      where: {
        taskid: parseInt(req.params.id)
      }
    })

    if (response) {
      res.status(200).json({ message: "Tarea eliminada con exito" })
    } else {
      res.status(404).json({ message: "Tarea no eliminada" })
    }
  } catch (error) {
    console.error('Error en el servidor al eliminar la tarea: ', error.message)
  }
})

export default router;