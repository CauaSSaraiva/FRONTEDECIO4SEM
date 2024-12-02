'use client'
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface medicosEspecialidadeI {
  especialidade: string
  num: number
}

interface geralDadosI {
  clientes: number
  medicos: number
  consultas: number
}

type DataRow = [string, number, string]

export default function Principal() {
  const [medicosEspecialidade, setmedicosEspecialidade] = useState<medicosEspecialidadeI[]>([])
  const [dados, setDados] = useState<geralDadosI>({} as geralDadosI)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/dashboard/gerais`
      );
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    async function getDadosGrafico() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/medicosEspecialidade`)
      const dados = await response.json()
      setmedicosEspecialidade(dados)
    }
    getDadosGrafico()
  }, [])

  const data: (["Especialidade", "NºMédicos", { role: string }] | DataRow)[] = [
    ["Especialidade", "NºMédicos", { role: "style" }],
  ];
  
  const cores = [
    "#00A9E0",
    "#004C6D",
    "#4CAF50",
    "#E0E0E0",
    "#757575",
    "#FFFFFF",
    // "#e377c2",
    // "#7f7f7f",
    // "#bcbd22",
    // "#17becf",
  ];


  medicosEspecialidade.forEach((medico, index) => {
    data.push([medico.especialidade, medico.num, cores[index%10]])
  })

  const options = {
    backgroundColor: "#E0E0E0", // Cor de fundo do gráfico
    title: "Visão Geral do Sistema", // Título do gráfico
    titleTextStyle: {
      color: "#004C6D", // Cor do título (azul escuro)
      fontSize: 18, // Tamanho da fonte
      fontName: "Arial", // Fonte do título
    },
    hAxis: {
      title: "Especialidade", // Título do eixo X
      titleTextStyle: {
        color: "#4CAF50", // Cor do título do eixo X (verde claro)
        fontSize: 14,
      },
      textStyle: {
        color: "#004C6D", // Cor do texto do eixo X (azul escuro)
      },
    },
    vAxis: {
      title: "Quantidade", // Título do eixo Y
      titleTextStyle: {
        color: "#004C6D", // Cor do título do eixo Y
        fontSize: 14,
      },
      textStyle: {
        color: "#757575", // Cor do texto do eixo Y (cinza escuro)
      },
    },
    legend: {
      textStyle: {
        color: "#004C6D", // Cor do texto na legenda
      },
    },
    tooltip: {
      textStyle: {
        color: "#4CAF50", // Cor do texto das tooltips (verde claro)
      },
    },
    chartArea: { width: "80%", height: "70%" },
    series: {
      0: { color: "#00A9E0" }, // Cor da primeira barra (azul claro)
      1: { color: "#4CAF50" }, // Cor da segunda barra (verde claro)
      2: { color: "#004C6D" }, // Cor da terceira barra (azul escuro)
      3: { color: "#757575" }, // Cor da quarta barra (cinza escuro)
    },
  };

  return (
    <div className="mt-32 flex flex-col items-center ">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-[#00A9E0] border rounded p-6 w-1/3 me-3">
          <span className="bg-[#00A9E0] text-white text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded">
            {dados.clientes}
          </span>
          <p className="font-bold mt-2 text-center text-[#004C6D]">
            Nº Clientes
          </p>{" "}
          {/* Azul escuro para o título */}
        </div>
        <div className="border-[#004C6D] border rounded p-6 w-1/3 me-3">
          <span className="bg-[#004C6D] text-white text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded">
            {dados.medicos}
          </span>
          <p className="font-bold mt-2 text-center text-[#4CAF50]">
            Nº Médicos
          </p>{" "}
          {/* Verde claro para o título */}
        </div>
        <div className="border-[#4CAF50] border rounded p-6 w-1/3">
          <span className="bg-[#4CAF50] text-white text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded">
            {dados.consultas}
          </span>
          <p className="font-bold mt-2 text-center text-[#004C6D]">
            Nº Consultas
          </p>{" "}
          {/* Azul escuro para o título */}
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-4 mb-2">
        Gráfico: Nº de Médicos por Especialidade
      </h2>
      <Chart
        chartType="ColumnChart"
        width="95%"
        height="380px"
        data={data}
        options={options}
      />
    </div>
  );
}