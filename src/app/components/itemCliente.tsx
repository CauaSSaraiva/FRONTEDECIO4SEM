"use client";
import { Dispatch, SetStateAction } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import Cookies from "js-cookie";
import { ClienteI } from "../types/clientes";

interface listaclienteProps {
  cliente: ClienteI;
  clientes: ClienteI[];
  setClientes: Dispatch<SetStateAction<ClienteI[]>>;
}

function ItemCliente({ cliente, clientes, setClientes }: listaclienteProps) {
  async function excluirCliente() {
    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clientes/${cliente.id}`,
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
        const clientes2 = clientes.filter((x) => x.id != cliente.id);
        setClientes(clientes2);
        alert("Cliente excluído com sucesso");
      } else {
        alert("Erro... Cliente não foi excluído");
      }
    }
  }


  return (
    <tr
      key={cliente.id}
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    >
      {/* <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          src={medico.foto}
          alt="Capa do medico"
          style={{ width: 200, height: 150 }}
        />
      </th> */}
      <td className={`px-6 py-4 font-extrabold`}>
        {cliente.nome}
      </td>
      <td className={`px-6 py-4 font-extrabold`}>
        {cliente.email}
      </td>
      <td className={`px-6 py-4 font-extrabold`}>
        {cliente.createdAt}
      </td>
      {/* <td className={`px-6 py-4 font-extrabold`}>
      {cliente.consultas.map((itemRel) => itemRel.descricao).join(", ")}
      </td> */}
      <td className="px-6 py-4">
        <TiDeleteOutline
          className="text-3xl text-red-600 inline-block cursor-pointer"
          title="Excluir"
          onClick={excluirCliente}
        />
        &nbsp;
        {/* <FaRegStar
          className="text-3xl text-yellow-600 inline-block cursor-pointer"
          title="Destacar"
          onClick={alterarDestaque}
        /> */}
      </td>
    </tr>
  );
}

export default ItemCliente;
