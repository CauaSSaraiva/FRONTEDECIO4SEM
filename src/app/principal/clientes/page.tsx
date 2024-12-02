'use client'
import { useEffect, useState } from "react"
import { ClienteI } from "@/app/types/clientes"
import ItemCliente from "@/app/components/itemCliente"

function Cadclientes() {
  const [clientes, setclientes] = useState<ClienteI[]>([])

  useEffect(() => {
    async function getclientes() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`)
      const dados = await response.json()
      setclientes(dados)
    }
    getclientes()
  }, [])

  const listaclientes = clientes.map(cliente => (
    <ItemCliente key={cliente.id} cliente={cliente} clientes={clientes} setClientes={setclientes} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-center'>
        <h1 className="mt-2 mb-10 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Cadastro de Clientes
        </h1>

      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-50 uppercase bg-gray-500 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Data de Registro
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaclientes}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Cadclientes