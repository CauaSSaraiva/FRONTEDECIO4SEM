'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { EspecialidadeI } from "@/app/types/especialidades"

type Inputs = {
  nome: string
  especialidadeId: number
  idade: number
  email: string
  preco: number
  foto: string
}

function NovoCarro() {
  const [especialidades, setEspecialidades] = useState<EspecialidadeI[]>([])
  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    async function getEspecialidades() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/especialidades`)
      const dados = await response.json()
      setEspecialidades(dados)
    }
    getEspecialidades()
    setFocus("nome")
  }, [])

  const optionsEspecialidade = especialidades.map(espec => (
    <option key={espec.id} value={espec.id}>{espec.descricao}</option>
  ))

  console.log(especialidades)

  async function incluirMedico(data: Inputs) {

    const novoMedico: Inputs = {
      nome: data.nome,
      especialidadeId: Number(data.especialidadeId),
      idade: Number(data.idade),
      email: data.email,
      foto: data.foto,
      preco: Number(data.preco),
    }

    console.log(novoMedico)

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/medicos`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify(novoMedico)
      },
    )
    console.log(response)

    if (response.status == 201) {
      toast.success("Ok! Carro cadastrado com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro do Carro...")
    }
  }

  return (
    <>
    {/* se ficar ruim, tira o h-screen e coloca no h1 mt-32 */}
    <div className="flex flex-col justify-center items-center h-screen ">

      <h1 className="mb-10  flex justify-center text-4xl font-bold leading-none tracking-tight text-gray-900">
        Inclusão de Carros
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirMedico)}>
        <div className="mb-10">
          <label htmlFor="modelo" className="block mb-2 text-sm font-medium text-gray-900 ">
            Nome do Médico</label>
          <input type="text" id="modelo"
            className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("nome")}
          />
        </div>
        <div className="grid gap-8 mb-10 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="marcaId" className="block mb-2 text-sm font-medium text-gray-900 ">
              Especialidade</label>
            <select id="marcaId"
              className="bg-gray-50 border border-gray-300 text-white  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("especialidadeId")}
            >
              {optionsEspecialidade}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="ano" className="block mb-2 text-sm font-medium text-gray-900 ">
              Idade</label>
            <input type="number" id="ano"
              className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("idade")}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 ">
              Preço R$</label>
            <input type="number" id="preco"
              className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("preco")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
              Email</label>
            <input type="text" id="email"
              className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("email")}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 ">
              URL da Foto</label>
            <input type="text" id="foto"
              className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("foto")}
            />
          </div>
          
        </div>


        <button type="submit" className=" mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-base w-full sm:w-auto px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Incluir</button>
      </form>
    </div>
    </>
  )
}

export default NovoCarro