
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package, Search, Syringe, Bandage, TestTube } from "lucide-react";

const insumosEstoque = [
  { id: 1, nome: "Seringas 5ml", categoria: "Material Hospitalar", estoque: 200, minimo: 100, status: "ok", icon: <Syringe className="h-4 w-4" /> },
  { id: 2, nome: "Luvas Descartáveis (Caixa)", categoria: "EPI", estoque: 25, minimo: 30, status: "baixo", icon: <Package className="h-4 w-4" /> },
  { id: 3, nome: "Gaze Estéril", categoria: "Curativo", estoque: 0, minimo: 20, status: "critico", icon: <Bandage className="h-4 w-4" /> },
  { id: 4, nome: "Álcool 70%", categoria: "Antisséptico", estoque: 45, minimo: 15, status: "ok", icon: <TestTube className="h-4 w-4" /> },
  { id: 5, nome: "Agulhas 25x7", categoria: "Material Hospitalar", estoque: 300, minimo: 150, status: "ok", icon: <Syringe className="h-4 w-4" /> }
];

export const EstoqueInsumos = () => {
  const [busca, setBusca] = useState("");
  const [insumos] = useState(insumosEstoque);

  const insumosFiltrados = insumos.filter(insumo =>
    insumo.nome.toLowerCase().includes(busca.toLowerCase()) ||
    insumo.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  const getStatusBadge = (status: string, estoque: number) => {
    if (status === "critico") {
      return <Badge variant="destructive">Crítico</Badge>;
    }
    if (status === "baixo") {
      return <Badge className="bg-yellow-500">Baixo</Badge>;
    }
    return <Badge className="bg-green-500">Normal</Badge>;
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Material Hospitalar":
        return "text-blue-600";
      case "EPI":
        return "text-green-600";
      case "Curativo":
        return "text-purple-600";
      case "Antisséptico":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Controle de Insumos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar insumo ou categoria..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Alertas de estoque baixo/crítico */}
          <div className="mb-4">
            {insumos.filter(i => i.status !== "ok").length > 0 && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">
                      Alertas de Estoque - Insumos
                    </span>
                  </div>
                  <div className="space-y-1">
                    {insumos
                      .filter(i => i.status !== "ok")
                      .map(insumo => (
                        <p key={insumo.id} className="text-sm text-yellow-700">
                          {insumo.nome}: {insumo.estoque} unidades
                          {insumo.status === "critico" ? " (CRÍTICO)" : " (BAIXO)"}
                        </p>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-3">
            {insumosFiltrados.map((insumo) => (
              <Card key={insumo.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        {insumo.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{insumo.nome}</h4>
                        <p className={`text-sm ${getCategoriaColor(insumo.categoria)}`}>
                          {insumo.categoria}
                        </p>
                        <p className="text-sm text-gray-600">
                          Estoque atual: {insumo.estoque} unidades
                        </p>
                        <p className="text-sm text-gray-600">
                          Estoque mínimo: {insumo.minimo} unidades
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(insumo.status, insumo.estoque)}
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
