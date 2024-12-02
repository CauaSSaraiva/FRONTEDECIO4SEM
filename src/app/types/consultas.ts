import { MedicoI } from "./medicos"

export interface ConsultaI {
  id: number
  clienteId: string
  carroId: number
  medico: MedicoI
  descricao: string
  resposta: string | null
  createdAt: string
  updatedAt: string | null
  dataSolicitada: string
}