
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package, Search } from "lucide-react";

const medicamentosEstoque = [
  { id: 1, nome: "Paracetamol 500mg", estoque: 150, minimo: 50, status: "ok" },
  { id: 2, nome: "Omeprazol 20mg", estoque: 80, minimo: 30, status: "ok" },
  { id: 3, nome: "Metformina 850mg", estoque: 0, minimo: 40, status: "critico" },
  { id: 4, nome: "Losartana 50mg", estoque: 25, minimo: 30, status: "baixo" },
  { id: 5, nome: "Sinvastatina 20mg", estoque: 120, minimo: 50, status: "ok" }
];

export const EstoqueMedicamentos = () => {
  const [busca, setBusca] = useState("");
  const [medicamentos] = useState(medicamentosEstoque);

  const medicamentosFiltrados = medicamentos.filter(med =>
    med.nome.toLowerCase().includes(busca.toLowerCase())
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Controle de Estoque
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar medicamento..."
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
            {medicamentos.filter(m => m.status !== "ok").length > 0 && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">
                      Alertas de Estoque
                    </span>
                  </div>
                  <div className="space-y-1">
                    {medicamentos
                      .filter(m => m.status !== "ok")
                      .map(med => (
                        <p key={med.id} className="text-sm text-yellow-700">
                          {med.nome}: {med.estoque} unidades
                          {med.status === "critico" ? " (CRÍTICO)" : " (BAIXO)"}
                        </p>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-3">
            {medicamentosFiltrados.map((medicamento) => (
              <Card key={medicamento.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{medicamento.nome}</h4>
                      <p className="text-sm text-gray-600">
                        Estoque atual: {medicamento.estoque} unidades
                      </p>
                      <p className="text-sm text-gray-600">
                        Estoque mínimo: {medicamento.minimo} unidades
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(medicamento.status, medicamento.estoque)}
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
