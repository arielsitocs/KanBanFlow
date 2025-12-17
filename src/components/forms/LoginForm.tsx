"use client"

import FormInput from "../../components/ui/FormInput";
import Loader from "../../components/ui/Loader";

import Link from "next/link";

import Cookies from "js-cookie";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function LoginForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingState, setLoadingState] = useState(false)

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoadingState(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('¡Bienvenido de vuelta!');

        // guardar el token en Cookies para que el servidor pueda leerlo //
        Cookies.set('token', data.token, { expires: 1 }); // expira en 1 día //

        // guardar datos básicos del usuario en localStorage para el cliente //
        localStorage.setItem('user', JSON.stringify(data.user));

        router.push('/dashboard'); // redirigir al usuario al dashboard //
      } else {
        toast.error(data.message || 'Error al iniciar sesión');
      }

    } catch (error) {
      console.error("Error de conexión:", error);
      toast.error('Error de conexión con el servidor');
    } finally {
      setLoadingState(false)
    }
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
      <Loader state={loadingState} setState={setLoadingState} />
    </div>
  )
}