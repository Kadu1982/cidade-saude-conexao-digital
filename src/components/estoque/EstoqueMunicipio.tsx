
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Package, AlertTriangle, TrendingUp, Building2 } from "lucide-react";

const dadosConsolidados = {
  totalMedicamentos: 165,
  totalInsumos: 89,
  totalAlertas: 11,
  unidadesAtivas: 4,
  medicamentosCriticos: 8,
  insumosCriticos: 3
};

const dadosGrafico = [
  { unidade: 'UBS Centro', medicamentos: 45, insumos: 23 },
  { unidade: 'UBS Jardim', medicamentos: 38, insumos: 19 },
  { unidade: 'UBS Vila Nova', medicamentos: 42, insumos: 25 },
  { unidade: 'UBS São José', medicamentos: 40, insumos: 22 }
];

const dadosDistribuicao = [
  { name: 'Estoque Normal', value: 70, color: '#10B981' },
  { name: 'Estoque Baixo', value: 20, color: '#F59E0B' },
  { name: 'Estoque Crítico', value: 10, color: '#EF4444' }
];

export const EstoqueMunicipio = () => {
  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Medicamentos</p>
                <p className="text-2xl font-bold">{dadosConsolidados.totalMedicamentos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Insumos</p>
                <p className="text-2xl font-bold">{dadosConsolidados.totalInsumos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Alertas Críticos</p>
                <p className="text-2xl font-bold text-red-600">{dadosConsolidados.totalAlertas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unidades Ativas</p>
                <p className="text-2xl font-bold">{dadosConsolidados.unidadesAtivas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Críticos */}
      {dadosConsolidados.totalAlertas > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Alertas Críticos do Município
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Medicamentos em falta:</span>
                <Badge variant="destructive">{dadosConsolidados.medicamentosCriticos}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Insumos em falta:</span>
                <Badge variant="destructive">{dadosConsolidados.insumosCriticos}</Badge>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="destructive" size="sm">
                Ver Detalhes dos Alertas
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Estoque por Unidade</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="unidade" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="medicamentos" fill="#3B82F6" name="Medicamentos" />
                <Bar dataKey="insumos" fill="#10B981" name="Insumos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosDistribuicao}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {dadosDistribuicao.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Indicadores de Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Indicadores de Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Nível de Estoque Adequado</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Cobertura de Medicamentos Essenciais</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Eficiência de Distribuição</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
