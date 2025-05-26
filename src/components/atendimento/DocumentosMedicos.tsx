
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Pill, 
  ArrowRight, 
  Printer, 
  Save,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DadosAtendimento {
  pacienteNome: string;
  cartaoSus: string;
  diagnostico: string;
  medicoProfissional: string;
  crm: string;
}

interface DocumentoMedico {
  tipo: 'atestado' | 'receita' | 'encaminhamento';
  conteudo: string;
  validade?: string;
  especialidade?: string;
  diasAfastamento?: number;
}

export const DocumentosMedicos: React.FC<{ dadosAtendimento: DadosAtendimento }> = ({ 
  dadosAtendimento 
}) => {
  const { toast } = useToast();
  const [documentoAtual, setDocumentoAtual] = useState<DocumentoMedico>({
    tipo: 'atestado',
    conteudo: '',
    validade: '',
    especialidade: '',
    diasAfastamento: 1
  });

  const handleSalvarDocumento = () => {
    toast({
      title: "Documento Salvo",
      description: `${documentoAtual.tipo} foi salvo com sucesso no prontuário do paciente.`,
    });

    // Reset form
    setDocumentoAtual({
      tipo: 'atestado',
      conteudo: '',
      validade: '',
      especialidade: '',
      diasAfastamento: 1
    });
  };

  const handleImprimirDocumento = () => {
    toast({
      title: "Documento Enviado para Impressão",
      description: `${documentoAtual.tipo} foi enviado para a impressora.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dados do Atendimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="font-semibold">Paciente</Label>
              <p>{dadosAtendimento.pacienteNome}</p>
            </div>
            <div>
              <Label className="font-semibold">Cartão SUS</Label>
              <p>{dadosAtendimento.cartaoSus}</p>
            </div>
            <div>
              <Label className="font-semibold">Diagnóstico</Label>
              <p>{dadosAtendimento.diagnostico}</p>
            </div>
            <div>
              <Label className="font-semibold">Médico</Label>
              <p>{dadosAtendimento.medicoProfissional} - CRM: {dadosAtendimento.crm}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gerar Documentos Médicos</CardTitle>
          <CardDescription>
            Atestados, receitas e encaminhamentos baseados no atendimento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="atestado" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="atestado">Atestado</TabsTrigger>
              <TabsTrigger value="receita">Receita</TabsTrigger>
              <TabsTrigger value="encaminhamento">Encaminhamento</TabsTrigger>
            </TabsList>

            <TabsContent value="atestado">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dias">Dias de Afastamento</Label>
                    <Input
                      id="dias"
                      type="number"
                      min="1"
                      max="30"
                      value={documentoAtual.diasAfastamento}
                      onChange={(e) => setDocumentoAtual({
                        ...documentoAtual,
                        diasAfastamento: parseInt(e.target.value) || 1
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="validade">Data de Validade</Label>
                    <Input
                      id="validade"
                      type="date"
                      value={documentoAtual.validade}
                      onChange={(e) => setDocumentoAtual({
                        ...documentoAtual,
                        validade: e.target.value
                      })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="conteudo-atestado">Justificativa do Atestado</Label>
                  <Textarea
                    id="conteudo-atestado"
                    placeholder="Descreva a justificativa médica para o afastamento..."
                    value={documentoAtual.conteudo}
                    onChange={(e) => setDocumentoAtual({
                      ...documentoAtual,
                      conteudo: e.target.value,
                      tipo: 'atestado'
                    })}
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Pré-visualização do Atestado</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>ATESTADO MÉDICO</strong></p>
                    <p>Atesto que o(a) paciente {dadosAtendimento.pacienteNome}, portador(a) do Cartão SUS {dadosAtendimento.cartaoSus}, esteve sob meus cuidados médicos e necessita afastar-se de suas atividades por {documentoAtual.diasAfastamento} dia(s), a partir de {new Date().toLocaleDateString()}.</p>
                    {documentoAtual.conteudo && <p><strong>CID/Justificativa:</strong> {documentoAtual.conteudo}</p>}
                    <p><strong>Médico:</strong> {dadosAtendimento.medicoProfissional} - CRM: {dadosAtendimento.crm}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="receita">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="validade-receita">Validade da Receita</Label>
                  <Input
                    id="validade-receita"
                    type="date"
                    value={documentoAtual.validade}
                    onChange={(e) => setDocumentoAtual({
                      ...documentoAtual,
                      validade: e.target.value
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="medicamentos">Medicamentos e Posologia</Label>
                  <Textarea
                    id="medicamentos"
                    placeholder="1. Paracetamol 500mg - Tomar 1 comprimido de 8/8h por 5 dias&#10;2. Dipirona 500mg - Tomar 1 comprimido se dor, máximo 4x ao dia..."
                    rows={6}
                    value={documentoAtual.conteudo}
                    onChange={(e) => setDocumentoAtual({
                      ...documentoAtual,
                      conteudo: e.target.value,
                      tipo: 'receita'
                    })}
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Pré-visualização da Receita</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>RECEITA MÉDICA</strong></p>
                    <p><strong>Paciente:</strong> {dadosAtendimento.pacienteNome}</p>
                    <p><strong>Cartão SUS:</strong> {dadosAtendimento.cartaoSus}</p>
                    <div className="mt-2">
                      <p><strong>Prescrição:</strong></p>
                      <pre className="whitespace-pre-wrap">{documentoAtual.conteudo}</pre>
                    </div>
                    <p><strong>Médico:</strong> {dadosAtendimento.medicoProfissional} - CRM: {dadosAtendimento.crm}</p>
                    <p><strong>Validade:</strong> {documentoAtual.validade ? new Date(documentoAtual.validade).toLocaleDateString() : 'Não definida'}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="encaminhamento">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="especialidade">Especialidade de Destino</Label>
                  <Select 
                    value={documentoAtual.especialidade} 
                    onValueChange={(value) => setDocumentoAtual({
                      ...documentoAtual,
                      especialidade: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a especialidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiologia">Cardiologia</SelectItem>
                      <SelectItem value="neurologia">Neurologia</SelectItem>
                      <SelectItem value="ortopedia">Ortopedia</SelectItem>
                      <SelectItem value="oftalmologia">Oftalmologia</SelectItem>
                      <SelectItem value="dermatologia">Dermatologia</SelectItem>
                      <SelectItem value="ginecologia">Ginecologia</SelectItem>
                      <SelectItem value="urologia">Urologia</SelectItem>
                      <SelectItem value="psiquiatria">Psiquiatria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="motivo-encaminhamento">Motivo do Encaminhamento</Label>
                  <Textarea
                    id="motivo-encaminhamento"
                    placeholder="Descreva o motivo do encaminhamento e exames/procedimentos solicitados..."
                    value={documentoAtual.conteudo}
                    onChange={(e) => setDocumentoAtual({
                      ...documentoAtual,
                      conteudo: e.target.value,
                      tipo: 'encaminhamento'
                    })}
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Pré-visualização do Encaminhamento</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>ENCAMINHAMENTO MÉDICO</strong></p>
                    <p><strong>Paciente:</strong> {dadosAtendimento.pacienteNome}</p>
                    <p><strong>Cartão SUS:</strong> {dadosAtendimento.cartaoSus}</p>
                    <p><strong>Diagnóstico:</strong> {dadosAtendimento.diagnostico}</p>
                    <p><strong>Especialidade de Destino:</strong> {documentoAtual.especialidade}</p>
                    <div className="mt-2">
                      <p><strong>Motivo do Encaminhamento:</strong></p>
                      <p>{documentoAtual.conteudo}</p>
                    </div>
                    <p><strong>Médico Solicitante:</strong> {dadosAtendimento.medicoProfissional} - CRM: {dadosAtendimento.crm}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 mt-6">
            <Button onClick={handleSalvarDocumento}>
              <Save className="h-4 w-4 mr-2" />
              Salvar no Prontuário
            </Button>
            
            <Button variant="outline" onClick={handleImprimirDocumento}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
