// ESTE MIDDLEWARE HACE EXACTAMENTE LO MISMO QUE EL auth.js, PERO PARA EL FRONTEND //

import { cookies } from 'next/headers';

import jwt from 'jsonwebtoken';

import { UserPayload } from '../types/UserPayLoad';

import { redirect } from "next/navigation";

async function verifyToken() {
  // leer cookie del servidor //
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  let user = null;

  if (token) {
    try {
      // verificar y decodificar el token recibido desde la cookie para guardar los datos en una variable //
      user = jwt.verify(token, process.env.JWT_SECRET || "MadonaxD1234-") as UserPayload;
    } catch (error) {
      console.error("Token inválido: ", error);
    }
  }

  // si el token es invalido redirigir al usuario al login //
  if (!user) {
    redirect('/auth/login');
  } else {
    return user;
  }
}

export default verifyToken;
