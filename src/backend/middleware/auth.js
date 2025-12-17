// ESTE MIDDLEWARE HACE EXACTAMENTE LO MISMO QUE EL VERIFYTOKEN, PERO PARA EL BACKEND //

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // obtener el token de las cookies //
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No autorizado, no se encontró token existente" });
  }

  try {
    // verificar el token //
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "MadonaxD1234-");

    // guardar los datos del usuario en la request //
    req.user = decoded;

    console.log("Usuario autenticado:", req.user);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default authMiddleware;
