"use client"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { useRouter } from "next/navigation"

import Cookies from 'js-cookie'

type Inputs = {
  email: string
  senha: string
}

export default function Home() {
  const { register, handleSubmit, setFocus } = useForm<Inputs>()
  const router = useRouter()

  useEffect(() => {
    setFocus("email")
  }, [])

  async function verificaLogin(data: Inputs) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/admins/login`,
      {
        method: "POST",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify({ email: data.email, senha: data.senha }),
      }
    );

    console.log(response)
    if (response.status == 200) {
      const admin = await response.json()

      Cookies.set("admin_logado_id", admin.id)
      Cookies.set("admin_logado_nome", admin.nome)
      Cookies.set("admin_logado_token", admin.token)

      router.push("/principal")      
    } else if (response.status == 400) {
      toast.error("Erro... Login ou senha incorretos")
    } 
  }

  return (
    <main className="h-screen flex flex-col items-center mx-auto p-6 bg-gray-200">
      <img src="./logo2.png" alt="Revenda" style={{ width: 240 }}
        className="d-block mt-16" />
      <div className="max-w-sm">
        <h1 className="text-3xl font-bold my-10">Admin: Revenda Avenida</h1>
        <form className="max-w-sm mx-auto"
          onSubmit={handleSubmit(verificaLogin)} >
          <div className="mb-10">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">E-mail:</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("email")}
              required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Senha:</label>
            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("senha")}
              required />
          </div>
          <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center ">Entrar</button>
        </form>
      </div>
    </main>
  );
}
