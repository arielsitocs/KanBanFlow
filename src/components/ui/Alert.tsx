"use client"

import Image from "next/image"

import AlertIcon from "../../../public/error-icon.svg";

export default function Alert({ message, type, prop, status, setStatus, action }: AlertTypes) {
  const handleAction = () => {
    action();
    setStatus(false);
  }

  return (
    <>
      {
        status ? (
          <div className="fixed flex-col top-0 left-0 w-full h-full z-9999 flex items-center justify-center bg-black/40">
            {
              type == 'confirm' ? (
                <div className="alert-confirm">
                  <Image src={AlertIcon} width={76} height={76} alt="Alert Icon" className="mb-3" />
                  <div className="max-w-[80%]">
                    <h1 className="text-xl mb-3">{message}</h1>
                    <h2 className="text-sm mb-6">{prop}</h2>
                  </div>
                  <div className="gap-6 flex items-center">
                    <button onClick={handleAction} className="px-6 py-2 bg-red text-white rounded-[5px] hover:translate-y-[-5px] hover:opacity-50 cursor-pointer transition-all">Confirmar</button>
                    <button onClick={() => setStatus(false)} className="px-6 py-2 border-[1px] border-main text-main rounded-[5px] hover:translate-y-[-5px] cursor-pointer transition-all">Cancelar</button>
                  </div>
                </div>
              ) : type == 'alert' ? (
                <div className="alert-confirm">
                  <h1>{message}</h1>
                  <h2>{prop}</h2>
                  <button onClick={() => setStatus(false)}>Ok</button>
                </div>
              ) : null
            }
          </div>
        ) : null
      }
    </>
  )
}