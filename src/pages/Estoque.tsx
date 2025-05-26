
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EstoqueMedicamentos } from "@/components/farmacia/EstoqueMedicamentos";
import { EstoqueInsumos } from "@/components/estoque/EstoqueInsumos";
import { MovimentacaoEstoque } from "@/components/estoque/MovimentacaoEstoque";

const Estoque = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Controle de Estoque</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Sistema de Gestão de Estoque</CardTitle>
          <CardDescription>
            Controle de medicamentos, insumos e movimentações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="medicamentos" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="medicamentos">Medicamentos</TabsTrigger>
              <TabsTrigger value="insumos">Insumos</TabsTrigger>
              <TabsTrigger value="movimentacao">Movimentação</TabsTrigger>
            </TabsList>
            <TabsContent value="medicamentos">
              <EstoqueMedicamentos />
            </TabsContent>
            <TabsContent value="insumos">
              <EstoqueInsumos />
            </TabsContent>
            <TabsContent value="movimentacao">
              <MovimentacaoEstoque />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Estoque;
