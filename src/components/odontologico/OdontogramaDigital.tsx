
import React, { useState } from "react";
import { cn } from "@/lib/utils";

// Definição das regiões dentárias para um odontograma simplificado
const DENTES_ADULTO = {
  superior: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
  inferior: [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]
};

// Status possíveis para cada dente
type StatusDente = "normal" | "tratado" | "cariado" | "ausente" | "implante" | "extrair" | "protese";

// Cores para cada status
const STATUS_COLORS: Record<StatusDente, string> = {
  normal: "bg-white border-gray-300",
  tratado: "bg-blue-100 border-blue-400",
  cariado: "bg-red-100 border-red-400",
  ausente: "bg-gray-100 border-gray-400",
  implante: "bg-green-100 border-green-400",
  extrair: "bg-orange-100 border-orange-400",
  protese: "bg-purple-100 border-purple-400"
};

export const OdontogramaDigital = () => {
  // Estado para armazenar o status de cada dente
  const [denteStatus, setDenteStatus] = useState<Record<number, StatusDente>>({});
  // Estado para armazenar o dente selecionado
  const [denteAtual, setDenteAtual] = useState<number | null>(null);
  
  // Função para atualizar o status de um dente
  const atualizarStatusDente = (dente: number, status: StatusDente) => {
    setDenteStatus(prev => ({
      ...prev,
      [dente]: status
    }));
    setDenteAtual(null);
  };

  return (
    <div className="p-2">
      <div className="flex justify-center gap-2 mb-4">
        {Object.entries(STATUS_COLORS).map(([status, colorClass]) => (
          <div 
            key={status} 
            className="flex items-center gap-1 text-xs"
            onClick={() => denteAtual && atualizarStatusDente(denteAtual, status as StatusDente)}
          >
            <div className={cn("w-4 h-4 border", colorClass)}></div>
            <span className="capitalize">{status}</span>
          </div>
        ))}
      </div>
      
      {/* Arcada Superior */}
      <div className="mb-8">
        <h4 className="text-center text-sm font-medium mb-2">Arcada Superior</h4>
        <div className="flex justify-center">
          {DENTES_ADULTO.superior.map(dente => (
            <div 
              key={dente} 
              className="flex flex-col items-center"
              onClick={() => setDenteAtual(dente)}
            >
              <span className="text-xs mb-1">{dente}</span>
              <div 
                className={cn(
                  "w-10 h-12 border-2 flex items-center justify-center cursor-pointer m-1",
                  denteStatus[dente] ? STATUS_COLORS[denteStatus[dente]] : "bg-white border-gray-300",
                  denteAtual === dente && "ring-2 ring-blue-500"
                )}
              >
                {denteStatus[dente] === "ausente" && "X"}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Arcada Inferior */}
      <div>
        <h4 className="text-center text-sm font-medium mb-2">Arcada Inferior</h4>
        <div className="flex justify-center">
          {DENTES_ADULTO.inferior.map(dente => (
            <div 
              key={dente} 
              className="flex flex-col items-center"
              onClick={() => setDenteAtual(dente)}
            >
              <div 
                className={cn(
                  "w-10 h-12 border-2 flex items-center justify-center cursor-pointer m-1",
                  denteStatus[dente] ? STATUS_COLORS[denteStatus[dente]] : "bg-white border-gray-300",
                  denteAtual === dente && "ring-2 ring-blue-500"
                )}
              >
                {denteStatus[dente] === "ausente" && "X"}
              </div>
              <span className="text-xs mt-1">{dente}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Painel de informações do dente selecionado */}
      <div className="mt-8 p-4 border rounded-md">
        {denteAtual ? (
          <div>
            <h3 className="text-lg font-medium mb-2">Dente {denteAtual}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Status atual: <span className="font-medium capitalize">{denteStatus[denteAtual] || "normal"}</span>
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(STATUS_COLORS) as StatusDente[]).map(status => (
                <button 
                  key={status}
                  className={cn(
                    "px-2 py-1 border rounded-md text-sm capitalize",
                    denteStatus[denteAtual] === status ? "bg-primary text-primary-foreground" : "bg-background hover:bg-accent"
                  )}
                  onClick={() => atualizarStatusDente(denteAtual, status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Selecione um dente para visualizar detalhes</p>
        )}
      </div>
    </div>
  );
};
