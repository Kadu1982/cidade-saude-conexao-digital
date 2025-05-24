
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Package, CheckCircle } from "lucide-react";

export const DispensacaoMedicamentos = () => {
  const [codigoReceita, setCodigoReceita] = useState("");
  const [medicamentos, setMedicamentos] = useState<any[]>([]);
  const { toast } = useToast();

  const buscarReceita = () => {
    // Mock data
    setMedicamentos([
      {
        id: 1,
        nome: "Paracetamol 500mg",
        quantidade: 20,
        posologia: "1 comprimido de 6/6h",
        disponivel: true,
        estoque: 150
      },
      {
        id: 2,
        nome: "Omeprazol 20mg",
        quantidade: 14,
        posologia: "1 cápsula em jejum",
        disponivel: true,
        estoque: 80
      },
      {
        id: 3,
        nome: "Metformina 850mg",
        quantidade: 60,
        posologia: "1 comprimido 2x ao dia",
        disponivel: false,
        estoque: 0
      }
    ]);
  };

  const dispensarMedicamento = (id: number) => {
    setMedicamentos(prev => 
      prev.map(med => 
        med.id === id ? { ...med, dispensado: true } : med
      )
    );
    toast({
      title: "Medicamento dispensado",
      description: "Medicamento registrado como dispensado"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Buscar Receita
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="codigo-receita">Código da Receita</Label>
              <Input
                id="codigo-receita"
                placeholder="Digite o código da receita"
                value={codigoReceita}
                onChange={(e) => setCodigoReceita(e.target.value)}
              />
            </div>
            <Button onClick={buscarReceita} className="mt-6">
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {medicamentos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Medicamentos Prescritos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medicamentos.map((medicamento) => (
                <Card key={medicamento.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold">{medicamento.nome}</h4>
                      <p className="text-sm text-gray-600">
                        Quantidade: {medicamento.quantidade} unidades
                      </p>
                      <p className="text-sm text-gray-600">
                        Posologia: {medicamento.posologia}
                      </p>
                      <p className="text-sm text-gray-600">
                        Estoque: {medicamento.estoque} unidades
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {medicamento.disponivel ? (
                        <Badge className="bg-green-500">Disponível</Badge>
                      ) : (
                        <Badge variant="destructive">Indisponível</Badge>
                      )}
                      
                      {medicamento.disponivel && !medicamento.dispensado && (
                        <Button 
                          size="sm"
                          onClick={() => dispensarMedicamento(medicamento.id)}
                        >
                          Dispensar
                        </Button>
                      )}
                      
                      {medicamento.dispensado && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Dispensado</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
