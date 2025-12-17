import jwt from "jsonwebtoken";

// definir la forma de los datos dentro del token //
export interface UserPayload extends jwt.JwtPayload {
  userid: number;
  username: string;
  email: string;
}