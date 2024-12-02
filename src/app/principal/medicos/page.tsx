'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'
import ItemMedico from "@/app/components/ItemMedico"
import { MedicoI } from "@/app/types/medicos"

function Cadmedicos() {
  const [medicos, setMedicos] = useState<MedicoI[]>([])

  useEffect(() => {
    async function getMedicos() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/medicos`
      );
      const dados = await response.json()
      setMedicos(dados)
    }
    getMedicos()
  }, [])

  const listamedicos = medicos.map(medico => (
    <ItemMedico key={medico.id} medico={medico} medicos={medicos} setMedicos={setMedicos} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between px-4'>
        <h1 className="mb-4 mt-2 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
          Cadastro de medicos
        </h1>
        <Link href="medicos/novo" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Novo medico
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-50 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Modelo do medico
              </th>
              <th scope="col" className="px-6 py-3">
                Marca
              </th>
              <th scope="col" className="px-6 py-3">
                Ano
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listamedicos}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Cadmedicos