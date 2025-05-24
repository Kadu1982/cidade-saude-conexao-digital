
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtendimentoFarmacia } from "@/components/farmacia/AtendimentoFarmacia";
import { DispensacaoMedicamentos } from "@/components/farmacia/DispensacaoMedicamentos";
import { EstoqueMedicamentos } from "@/components/farmacia/EstoqueMedicamentos";
import { Pill } from "lucide-react";

const Farmacia = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Pill className="mr-2 h-6 w-6" />
        Farmácia
      </h1>
      
      <Tabs defaultValue="atendimento" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="atendimento">Atendimento</TabsTrigger>
          <TabsTrigger value="dispensacao">Dispensação</TabsTrigger>
          <TabsTrigger value="estoque">Estoque</TabsTrigger>
        </TabsList>
        
        <TabsContent value="atendimento">
          <Card>
            <CardHeader>
              <CardTitle>Atendimento Farmacêutico</CardTitle>
              <CardDescription>
                Realizar atendimento farmacêutico aos pacientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AtendimentoFarmacia />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dispensacao">
          <Card>
            <CardHeader>
              <CardTitle>Dispensação de Medicamentos</CardTitle>
              <CardDescription>
                Controle de dispensação e entrega de medicamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DispensacaoMedicamentos />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="estoque">
          <Card>
            <CardHeader>
              <CardTitle>Controle de Estoque</CardTitle>
              <CardDescription>
                Gerenciamento do estoque de medicamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EstoqueMedicamentos />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Farmacia;
