"use client";
import { Dispatch, SetStateAction } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDone } from "react-icons/md";
import { MdQuestionAnswer } from "react-icons/md";
import Cookies from "js-cookie";
import { ConsultaI } from "../types/consultas";

interface listaconsultaProps {
  consulta: ConsultaI;
  consultas: ConsultaI[];
  setConsultas: Dispatch<SetStateAction<ConsultaI[]>>;
}

function ItemConsulta({
  consulta,
  consultas,
  setConsultas,
}: listaconsultaProps) {
  async function excluirConsulta() {
    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/consultas/${consulta.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: ("Bearer " +
              Cookies.get("admin_logado_token")) as string,
          },
        }
      );

      if (response.status == 200) {
        const medicos2 = consultas.filter((x) => x.id != consulta.id);
        setConsultas(medicos2);
        alert("medico excluído com sucesso");
      } else {
        alert("Erro... medico não foi excluído");
      }
    }
  }

  async function responderConsulta() {
    const respostaConsulta = prompt(`Resposta referente a consulta: "${consulta.descricao}"`)

    if (respostaConsulta == null || respostaConsulta.trim() == "") {
      return
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/consultas/${consulta.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify({resposta: respostaConsulta})
      },
    )

    if (response.status == 200) {
      const propostas2 = consultas.map(x => {
        if (x.id == consulta.id) {
          return { ...x, resposta: respostaConsulta}
        }
        return x
      })
      setConsultas(propostas2)
    }
  }

  return (
    <tr
      key={consulta.id}
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          src={consulta.medico.foto}
          alt="Capa do medico"
          style={{ width: 200, height: 150 }}
        />
      </th>
      <td className={`px-6 py-4 font-bold`}>{consulta.medico.nome}</td>
      <td className={`px-6 py-4  font-bold`}>{consulta.descricao}</td>
      <td className={`px-6 py-4 font-bold`}>{consulta.dataSolicitada}</td>
      <td className="px-6 py-4 font-bold"></td>



      <td className="px-6 py-4">
        <TiDeleteOutline
          className="text-3xl text-red-600 inline-block cursor-pointer mr-1"
          title="Excluir"
          onClick={excluirConsulta}
        />
        &nbsp;
        {consulta.resposta ? (
          <MdDone
          className="text-3xl text-green-500 inline-block cursor-pointer"
          title="RESPONDIDO!"/>
        ) : (
          <MdQuestionAnswer
            className="text-3xl text-green-500 inline-block cursor-pointer"
            title="Responder"
            onClick={responderConsulta}
          />
        )}
      </td>
    </tr>
  );
}

export default ItemConsulta;
