import Image from "next/image";
import Link from "next/link";
import LoginForm from "../../../components/forms/LoginForm";

import KanBanFlowLogo from "../../../../public/kanbanflow-logo.png"

export default function Login() {
    return (
        <main className="flex flex-col md:flex-row h-screen bg-gray-solid-background">
            <div className="flex justify-center items-center p-8 md:w-[50%]">
                <div className="w-[95%] lg:w-[70%] bg-white px-8 py-20 rounded-[5px]">
                    <div>
                        <h2 className="font-m-plus-1p font-bold text-text-gray mb-4">Ingresa tus Credenciales</h2>
                        <h1 className="font-m-plus-1p font-bold mb-10 text-3xl">Bienvenido de Vuelta!</h1>
                    </div>
                    <LoginForm />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center bg-main w-[100%] md:w-[50%]">
                <div className="flex flex-col justify-center items-center text-white font-poppins">
                    <Image src={KanBanFlowLogo} className="mt-8" alt="Kanban Flow" width={350} height={350} />
                    <h1 className="md:text-lg-4 lg:text-6xl text-4xl mb-3">KANBANFLOW</h1>
                    <h2 className="md:text-lg lg:text-xl text-lg font-bold">Gestionar tus tareas nunca fue tan fácil ;)</h2>
                </div>
                <div className="flex flex-col justify-center items-center w-fit text-mustard mt-8 bg-transparent-gray lg:px-12 lg:py-8 px-4 py-4 mb-6 rounded-[8px]">
                    <h1 className="font-luckiest-guy text-xl mb-2">¿Primera vez con nosotros?</h1>
                    <p className="font-m-plus-1p font-bold text-s mb-4">No te preocupes! Puedes crear tu cuenta aquí abajo</p>
                    <Link href={"/auth/register"} className="font-m-plus-1p font-bold text-sm md:text-base border-[2px] lg:px-12 lg:py-2 md:px-8 md:py-2 px-6 py-2 rounded-[8px] hover:opacity-80">Ir al Registro</Link>
                </div>
                <p className="font-m-plus-1p text-sm lg:text-base text-copyright-text mt-auto mb-6">©2025 KanBanFlow. Todos los derechos reservados.</p>
            </div>

        </main>
    )
}