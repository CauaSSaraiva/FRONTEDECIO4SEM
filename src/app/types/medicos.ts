import { EspecialidadeI } from "./especialidades"

export interface MedicoI {
  id: number
  nome: string
  idade: number
  preco: number
  foto: string
  email: string
  disponivel: boolean
  acessorios: string
  especialidade: EspecialidadeI
  especialidadeId: number
  createdAt: string
  updatedAt: string | null
  // adminId: number
}