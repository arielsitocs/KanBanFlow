import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../../../components/forms/RegisterForm";

import KanBanFlowLogo from "../../../../public/kanbanflow-logo.png"

export default function Register() {
 
    return (
        <main className="flex flex-col min-h-screen md:flex-row  bg-gray-solid-background">
            <div className="flex flex-col justify-center items-center bg-main w-[100%] md:w-[50%]">
                <div className="flex flex-col justify-center items-center text-white font-poppins">
                    <Image src={KanBanFlowLogo} className="mt-8" alt="Kanban Flow" width={350} height={350} />
                    <h1 className="md:text-lg-4 lg:text-6xl text-4xl mb-3">KANBANFLOW</h1>
                    <h2 className="md:text-lg lg:text-xl text-lg font-bold">Gestionar tus tareas nunca fue tan fácil ;)</h2>
                </div>
                <div className="flex flex-col justify-center items-center w-fit text-mustard mt-8 bg-transparent-gray lg:px-12 lg:py-8 px-4 py-4 mb-6 rounded-[8px]">
                    <h1 className="font-luckiest-guy text-xl mb-2">¿Ya tienes una cuenta?</h1>
                    <p className="font-m-plus-1p font-bold text-s mb-4">Ingresa con tus credenciales aqui abajo!</p>
                    <Link href={"/auth/login"} className="font-m-plus-1p font-bold text-sm md:text-base border-[2px] lg:px-12 lg:py-2 md:px-8 md:py-2 px-6 py-2 rounded-[8px] hover:opacity-80">Iniciar Sesión</Link>
                </div>
                <p className="font-m-plus-1p text-sm lg:text-base text-copyright-text mt-auto mb-6">©2025 KanBanFlow. Todos los derechos reservados.</p>
            </div>
            <div className="flex justify-center items-center p-4 min-h-screen w-[100%] md:w-[50%]">
                <div className="w-[100%] lg:w-[70%] px-8 py-20 rounded-[5px] bg-white">
                    <div>
                        <h2 className="font-m-plus-1p font-bold text-text-gray mb-4">Registra tu Cuenta</h2>
                        <h1 className="font-m-plus-1p font-bold mb-10 text-3xl">Nos alegra que te unas!</h1>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        </main>
    )
}