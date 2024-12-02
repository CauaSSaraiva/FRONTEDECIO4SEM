"use client";
import { Dispatch, SetStateAction } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa";
import Cookies from "js-cookie";
import { MedicoI } from "../types/medicos";

interface listamedicoProps {
  medico: MedicoI;
  medicos: MedicoI[];
  setMedicos: Dispatch<SetStateAction<MedicoI[]>>;
}

function ItemMedico({ medico, medicos, setMedicos }: listamedicoProps) {
  async function excluirmedico() {
    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/medicos/${medico.id}`,
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
        const medicos2 = medicos.filter((x) => x.id != medico.id);
        setMedicos(medicos2);
        alert("medico excluído com sucesso");
      } else {
        alert("Erro... medico não foi excluído");
      }
    }
  }

  async function alterarDestaque() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/medicos/disponibilizar/${medico.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: ("Bearer " +
            Cookies.get("admin_logado_token")) as string,
        },
      }
    );

    if (response.status == 200) {
      const medicos2 = medicos.map((x) => {
        if (x.id == medico.id) {
          return { ...x, destaque: !x.disponivel };
        }
        return x;
      });
      setMedicos(medicos2);
      
    }
    window.location.reload()
  }

  return (
    <tr
      key={medico.id}
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          src={medico.foto}
          alt="Capa do medico"
          style={{ width: 200, height: 150 }}
        />
      </th>
      <td className={`px-6 py-4 ${medico.disponivel ? "font-extrabold" : ""}`}>
        {medico.nome}
      </td>
      <td className={`px-6 py-4 ${medico.disponivel ? "font-extrabold" : ""}`}>
        {medico.especialidade.descricao}
      </td>
      <td className={`px-6 py-4 ${medico.disponivel ? "font-extrabold" : ""}`}>
        {medico.idade}
      </td>
      <td className={`px-6 py-4 ${medico.disponivel ? "font-extrabold" : ""}`}>
        {Number(medico.preco).toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline
          className="text-3xl text-red-600 inline-block cursor-pointer"
          title="Excluir"
          onClick={excluirmedico}
        />
        &nbsp;
        {
          medico.disponivel ? (

            <FaToggleOn
              className="text-3xl text-blue-600 inline-block cursor-pointer"
              title="Tirar disponibilidade"
              onClick={alterarDestaque}
            />
          ) : 
          (
            <FaToggleOff
            className="text-3xl text-blue-600 inline-block cursor-pointer"
            title="Disponibilizar"
            onClick={alterarDestaque}
          />
          )
        }
      </td>
    </tr>
  );
}

export default ItemMedico;
