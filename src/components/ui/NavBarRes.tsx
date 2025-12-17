import Link from "next/link";

import DashboardIcon from "../../../public/dashboard-icon.svg"
import TrashIcon from "../../../public/delete-icon-common.svg"

import Image from "next/image"

export default function NavBarRes({ status, setNavBarResStatus }: { status: boolean, setNavBarResStatus: React.Dispatch<React.SetStateAction<boolean>> }) {

  const handleMenuClick = () => {
    setNavBarResStatus(false);
  }

  return (
    status ? (
      <div className="absolute top-18 left-2 w-fit bg-main z-50 flex flex-col items-center gap-4 p-4 border-t rounded-[5px] border-white/10">
        <Link href={"/dashboard"} className="flex items-center text-sm text-white font-poppins p-2 border-b-4 border-transparent rounded-[5px] hover:bg-dark-gray-background transition-borders duration-140" onClick={handleMenuClick}><Image className="mr-1 w-[24px] h-[24px]" src={DashboardIcon} width={28} height={28} alt="Dashboard" />Dashboard</Link>
        <Link href={"/trash"} className="flex items-center text-sm text-white font-poppins p-2 border-b-4 border-transparent rounded-[5px] hover:bg-dark-gray-background transition-borders duration-140" onClick={handleMenuClick}><Image className="mr-1 w-[24px] h-[24px]" src={TrashIcon} width={28} height={28} alt="Trash" />Papelera</Link>
      </div>
    ) : null
  )
}