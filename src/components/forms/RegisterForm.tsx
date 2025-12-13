"use client"

import FormInput from "../../components/ui/FormInput";
import { useState } from "react";

export default function RegisterForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden...');
      } else {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password
          })
        })

        if (!response.ok) {
          throw new Error('Error al crear el usuario');
        } else {
          alert('Usuario creado exitosamente!')
          window.location.href = '/auth/login';
        }
      }
    } catch (error) {
      console.error('Error inesperado al registrarse: ', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <FormInput type="text" title="Nombre de Usuario" setText={setUsername} placeholder="Ingresa tu Nombre de Usuario" />
        <FormInput type="email" title="Correo Electrónico" setEmail={setEmail} placeholder="Ingresa un Correo Electrónico Válido" />
        <FormInput type="password" title="Contraseña" setPassword={setPassword} placeholder="Ingresa tu Contraseña de usuario" />
        <FormInput type="password" title="Confirmar Contraseña" setPassword={setConfirmPassword} placeholder="Repita la contraseña ingresada arriba" />
        <div className="flex justify-center w-full mt-6">
          <button type="submit" className="font-m-plus-1p font-bold text-sm bg-main w-[50%] h-[50px] text-white rounded-[8px] hover:opacity-80 hover:cursor-pointer hover:translate-y-[-4px] transition-all duration-200">Registrarse</button>
        </div>
      </form>
    </div>
  )
}