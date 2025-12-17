
import prisma from "./config/db.js";

async function main() {
  console.log("Iniciando prueba de DB...");
  try {
    const boards = await prisma.boards.findMany({
      include: { tasks: true }
    });
    console.log("Consulta exitosa. Tableros encontrados:", boards.length);
    console.log("Primer tablero:", boards[0]);
  } catch (error) {
    console.error("ERROR GRAVE EN DB:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
