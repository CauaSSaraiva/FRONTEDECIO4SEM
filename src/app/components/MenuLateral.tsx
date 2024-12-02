"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { IoExitOutline } from "react-icons/io5"
import { BiSolidDashboard } from "react-icons/bi"
import {  FaUsers } from "react-icons/fa6"
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospitalAlt } from "react-icons/fa";
import Link from "next/link"

export function MenuLateral() {
  const router = useRouter()

  function adminSair() {
    if (confirm("Confirma Saída?")) {
      Cookies.remove("admin_logado_id")
      Cookies.remove("admin_logado_nome")
      Cookies.remove("admin_logado_token")
      router.replace("/")
    }
  }

  return (
    <aside id="default-sidebar" className="fixed mt-24 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
        <ul className="space-y-2 font-medium">
        <li>
            <Link href="/principal" className="flex items-center p-2">
              <span className="h-5 text-gray-400 text-2xl">
                <BiSolidDashboard />
              </span>
              <span className="ms-2 mt-1 text-white">Visão Geral</span>
            </Link>
          </li>
          <li>
            <Link href="/principal/medicos" className="flex items-center p-2">
              <span className="h-5 text-gray-400 text-2xl">
                <FaUserDoctor />
              </span>
              <span className="ms-2 mt-1 text-white">Cadastro de Médicos</span>
            </Link>
          </li>
          <li>
          <Link href="/principal/clientes" className="flex items-center p-2">
              <span className="h-5 text-gray-400 text-2xl">
                <FaUsers />
              </span>
              <span className="ms-2 mt-1 text-white">Controle de Clientes</span>
            </Link>
          </li>
          <li>
          <Link href="/principal/consultas" className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-gray-400 text-2xl">
                <FaHospitalAlt />
              </span>
              <span className="ms-2 mt-1 text-white">Controle de Consultas</span>
            </Link>
          </li>

          <li>
            <span className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-gray-400 text-2xl">
                <IoExitOutline />
              </span>
              <span className="ms-2 mt-1 text-white" onClick={adminSair}>Sair do Sistema</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  )
}