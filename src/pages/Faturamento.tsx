
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProducaoMensal } from "@/components/faturamento/ProducaoMensal";
import { EnvioSISUS } from "@/components/faturamento/EnvioSISUS";
import { RelatoriosFaturamento } from "@/components/faturamento/RelatoriosFaturamento";

const Faturamento = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Faturamento</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Sistema de Faturamento SUS</CardTitle>
          <CardDescription>
            Gere relatórios e envie informações para o Ministério da Saúde
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="producao" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="producao">Produção Mensal</TabsTrigger>
              <TabsTrigger value="envio">Envio SISUS</TabsTrigger>
              <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
            </TabsList>
            <TabsContent value="producao">
              <ProducaoMensal />
            </TabsContent>
            <TabsContent value="envio">
              <EnvioSISUS />
            </TabsContent>
            <TabsContent value="relatorios">
              <RelatoriosFaturamento />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Faturamento;
