
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Building2, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { EstoqueMedicamentos } from "../farmacia/EstoqueMedicamentos";
import { EstoqueInsumos } from "./EstoqueInsumos";
import { MovimentacaoEstoque } from "./MovimentacaoEstoque";
import { EstoqueUnidade } from "./EstoqueUnidade";
import { EstoqueMunicipio } from "./EstoqueMunicipio";

export const EstoqueController: React.FC = () => {
  const { user } = useAuth();
  const [nivelAcesso, setNivelAcesso] = useState<'unidade' | 'municipio'>('unidade');

  // Verificar se o usuário tem perfil de estoque
  const hasEstoqueProfile = user?.perfis?.includes('estoque') || user?.role === 'admin';

  if (!hasEstoqueProfile) {
    return (
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Acesso Negado:</strong> Você não possui permissão para acessar o módulo de estoque.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Controle de Estoque</h2>
          <p className="text-gray-600">
            Gestão de medicamentos e insumos - {user?.unidadeSaude || 'Sistema Municipal'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Badge variant={nivelAcesso === 'unidade' ? 'default' : 'outline'}>
            <Building2 className="h-3 w-3 mr-1" />
            Unidade
          </Badge>
          {(user?.role === 'admin' || user?.perfis?.includes('admin')) && (
            <Badge 
              variant={nivelAcesso === 'municipio' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setNivelAcesso(nivelAcesso === 'unidade' ? 'municipio' : 'unidade')}
            >
              <Package className="h-3 w-3 mr-1" />
              Município
            </Badge>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Sistema de Gestão de Estoque
            <Badge className="bg-blue-500">
              {nivelAcesso === 'unidade' ? 'Nível Unidade' : 'Nível Municipal'}
            </Badge>
          </CardTitle>
          <CardDescription>
            {nivelAcesso === 'unidade' 
              ? `Controle de estoque da ${user?.unidadeSaude}`
              : 'Controle consolidado de estoque municipal'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {nivelAcesso === 'unidade' ? (
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
          ) : (
            <Tabs defaultValue="consolidado" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="consolidado">Consolidado</TabsTrigger>
                <TabsTrigger value="unidades">Por Unidade</TabsTrigger>
                <TabsTrigger value="medicamentos">Medicamentos</TabsTrigger>
                <TabsTrigger value="movimentacao">Movimentação</TabsTrigger>
              </TabsList>
              <TabsContent value="consolidado">
                <EstoqueMunicipio />
              </TabsContent>
              <TabsContent value="unidades">
                <EstoqueUnidade />
              </TabsContent>
              <TabsContent value="medicamentos">
                <EstoqueMedicamentos />
              </TabsContent>
              <TabsContent value="movimentacao">
                <MovimentacaoEstoque />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
