"use client"

import Image from "next/image"
import Link from "next/link"

import DashboardIcon from "../../public/dashboard-icon.svg";
import TrashIcon from "../../public/delete-icon-common.svg";
import UserIcon from "../../public/user-icon.svg";
import LogoutIcon from "../../public/logout-icon.svg";
import MenuIcon from "../../public/menu-icon.svg";

import NavBarRes from "./ui/NavBarRes";

import { useState } from "react";

export default function NavBar() {
    const [navBarResStatus, setNavBarResStatus] = useState(false);

    return (
        <div className="flex justify-between w-full p-3 bg-main relative">
            <div className="flex items-center">
                <h1 className="text-white font-poppins">KANBANFLOW</h1>
                <div className="flex items-center ml-1 md:hidden hover:bg-dark-gray-background p-1 rounded-[5px] transition-transform cursor-pointer">
                    <Image src={MenuIcon} width={28} height={28} alt="Menu" onClick={() => setNavBarResStatus(!navBarResStatus)} />
                </div>
            </div>
            <div className="flex items-center gap-8 hidden md:flex">
                <Link href={"/dashboard"} className="flex items-center text-white font-poppins border-b-4 border-transparent hover:border-white transition-borders duration-140 pb-1 pt-2"><Image className="mr-1" src={DashboardIcon} width={28} height={28} alt="Dashboard" />Dashboard</Link>
                <Link href={"/trash"} className="flex Ditems-center text-white font-poppins border-b-4 border-transparent hover:border-white transition-borders duration-140 pb-1 pt-2"><Image className="mr-1" src={TrashIcon} width={28} height={28} alt="Trash" />Trash</Link>
            </div>
            <div className="flex items-center text-sm md:text-lg">
                <Image src={UserIcon} width={36} height={36} alt="User" className="w-[30px] h-[30px] md:w-[36px] md:h-[36px]" />
                <h1 className="ml-2 text-white font-poppins">Bienvenido, Ariel!</h1>
                <div className="ml-0 md:ml-6 p-2 rounded-[5px] bg-dark-gray cursor-pointer hover:scale-115 transition-transform">
                    <Link href={"/auth/login"}><Image src={LogoutIcon} width={26} height={26} alt="Logout" /></Link>
                </div>
            </div>
            <NavBarRes status={navBarResStatus} setNavBarResStatus={setNavBarResStatus} />
        </div>
    )
}