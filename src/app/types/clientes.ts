import { ConsultaI } from "./consultas"

export interface ClienteI {
  id: string
  nome: string
  email: string
  createdAt: string
  consultas: ConsultaI[]
}