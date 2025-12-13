"use client"

import FormInput from "../../components/ui/FormInput";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password)
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <FormInput type="email" title="Usuario o Correo" setEmail={setEmail} placeholder="Ingresa tu Usuario o Correo registrado" />
        <FormInput type="password" title="Contraseña" setPassword={setPassword} placeholder="Ingresa tu Contraseña de usuario" />
        <Link href={"/auth/ForgotPassword"} className="block text-blue-link font-bold text-sm mt-[-15px] hover:opacity-80">Olvidaste tu contraseña?</Link>
        <div className="flex justify-center w-full mt-10">
          <button type="submit" className="font-m-plus-1p font-bold text-sm bg-main w-[50%] h-[50px] text-white rounded-[8px] hover:opacity-80 hover:cursor-pointer hover:translate-y-[-4px] transition-all duration-200">Iniciar Sesión</button>
        </div>
      </form>
    </div>
  )
}