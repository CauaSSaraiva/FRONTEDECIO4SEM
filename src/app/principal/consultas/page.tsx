"use client";
import { useEffect, useState } from "react";
import { ConsultaI } from "@/app/types/consultas";
import ItemConsulta from "@/app/components/ItemConsulta";

function Cadmedicos() {
  const [consultas, setConsultas] = useState<ConsultaI[]>([]);

  useEffect(() => {
    async function getMedicos() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/consultas`
      );
      const dados = await response.json();
      setConsultas(dados);
    }
    getMedicos();
  }, []);

  const listaconsultas = consultas.map((consulta) => (
    <ItemConsulta
      key={consulta.id}
      consulta={consulta}
      consultas={consultas}
      setConsultas={setConsultas}
    />
  ));

  return (
    <div className="m-4 mt-24">
      <div className="flex justify-between px-4">
        <h1 className="mt-2 mb-10 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Requisições de Consultas
        </h1>

      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-50 uppercase bg-gray-500 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto Médico
              </th>
              <th scope="col" className="px-6 py-3">
                Médico Requisitado
              </th>
              <th scope="col" className="px-6 py-3">
                Descricao
              </th>
              <th scope="col" className="px-6 py-3">
                Data Solicitada
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>{listaconsultas}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Cadmedicos;
