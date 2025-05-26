
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  FileText, 
  Upload, 
  Shield, 
  Clock, 
  CheckCircle,
  User,
  MapPin 
} from "lucide-react";
import PatientSearch from "@/components/shared/PatientSearch";
import { baseCadastro } from "@/services/baseCadastro";

export const CidadaoManifestacao = () => {
  const { toast } = useToast();
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [dadosManifestacao, setDadosManifestacao] = useState({
    tipo: '',
    categoria: '',
    descricao: '',
    unidadeRelacionada: '',
    pacienteSelecionado: null as any,
    aceitaTermos: false,
    anexos: [] as File[]
  });

  const tiposManifestacao = [
    { id: 'reclamacao', nome: 'Reclamação', cor: 'bg-red-100 text-red-800', icon: '⚠️' },
    { id: 'sugestao', nome: 'Sugestão', cor: 'bg-blue-100 text-blue-800', icon: '💡' },
    { id: 'elogio', nome: 'Elogio', cor: 'bg-green-100 text-green-800', icon: '👏' },
    { id: 'denuncia', nome: 'Denúncia', cor: 'bg-orange-100 text-orange-800', icon: '🔍' },
    { id: 'informacao', nome: 'Solicitação de Informação', cor: 'bg-purple-100 text-purple-800', icon: '❓' }
  ];

  const categorias = [
    'Atendimento Médico',
    'Atendimento de Enfermagem',
    'Atendimento Farmacêutico',
    'Infraestrutura da Unidade',
    'Agendamento/Marcação de Consultas',
    'Exames e Procedimentos',
    'Medicamentos',
    'Acessibilidade',
    'Tempo de Espera',
    'Outros'
  ];

  const handleSelectPatient = (patient: { name: string, cartaoSus: string }) => {
    setDadosManifestacao(prev => ({
      ...prev,
      pacienteSelecionado: patient
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    setDadosManifestacao(prev => ({
      ...prev,
      anexos: [...prev.anexos, ...validFiles]
    }));

    if (validFiles.length !== files.length) {
      toast({
        title: "Alguns arquivos foram rejeitados",
        description: "Apenas imagens (JPG, PNG), PDF e texto são aceitos. Tamanho máximo: 5MB",
        variant: "destructive"
      });
    }
  };

  const proximaEtapa = () => {
    if (etapaAtual === 1 && !dadosManifestacao.tipo) {
      toast({
        title: "Selecione o tipo da manifestação",
        variant: "destructive"
      });
      return;
    }
    
    if (etapaAtual === 2 && (!dadosManifestacao.categoria || !dadosManifestacao.descricao.trim())) {
      toast({
        title: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (etapaAtual < 4) {
      setEtapaAtual(etapaAtual + 1);
    }
  };

  const submeterManifestacao = () => {
    if (!dadosManifestacao.aceitaTermos) {
      toast({
        title: "Aceite os termos para continuar",
        variant: "destructive"
      });
      return;
    }

    // Gerar protocolo único
    const protocolo = `OUV${Date.now().toString().slice(-8)}`;
    
    // Simular envio
    toast({
      title: "Manifestação registrada com sucesso!",
      description: `Protocolo: ${protocolo}. Você receberá atualizações por e-mail.`,
    });

    console.log('Dados da manifestação:', {
      protocolo,
      ...dadosManifestacao,
      dataRegistro: new Date(),
      status: 'RECEBIDA'
    });

    // Reset do formulário
    setEtapaAtual(1);
    setDadosManifestacao({
      tipo: '',
      categoria: '',
      descricao: '',
      unidadeRelacionada: '',
      pacienteSelecionado: null,
      aceitaTermos: false,
      anexos: []
    });
  };

  return (
    <div className="space-y-6">
      {/* Indicador de Progresso */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Nova Manifestação
            </CardTitle>
            <Badge variant="outline">Etapa {etapaAtual} de 4</Badge>
          </div>
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4].map((etapa) => (
              <div key={etapa} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  etapa <= etapaAtual ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {etapa < etapaAtual ? <CheckCircle className="h-4 w-4" /> : etapa}
                </div>
                {etapa < 4 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    etapa < etapaAtual ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Etapa 1: Tipo da Manifestação */}
      {etapaAtual === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Qual é o tipo da sua manifestação?</CardTitle>
            <CardDescription>
              Selecione o tipo que melhor descreve sua manifestação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tiposManifestacao.map((tipo) => (
                <button
                  key={tipo.id}
                  onClick={() => setDadosManifestacao(prev => ({ ...prev, tipo: tipo.id }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    dadosManifestacao.tipo === tipo.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-2">{tipo.icon}</div>
                  <div className="font-medium">{tipo.nome}</div>
                  <Badge className={`mt-2 ${tipo.cor}`} variant="secondary">
                    {tipo.nome}
                  </Badge>
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={proximaEtapa} disabled={!dadosManifestacao.tipo}>
                Próximo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Etapa 2: Detalhes da Manifestação */}
      {etapaAtual === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Manifestação</CardTitle>
            <CardDescription>
              Forneça informações detalhadas sobre sua manifestação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Categoria da Manifestação *
              </label>
              <select
                value={dadosManifestacao.categoria}
                onChange={(e) => setDadosManifestacao(prev => ({ ...prev, categoria: e.target.value }))}
                className="w-full p-3 border rounded-md"
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Descrição da Manifestação *
              </label>
              <textarea
                value={dadosManifestacao.descricao}
                onChange={(e) => setDadosManifestacao(prev => ({ ...prev, descricao: e.target.value }))}
                placeholder="Descreva detalhadamente sua manifestação..."
                className="w-full p-3 border rounded-md min-h-[120px]"
                required
              />
              <div className="text-xs text-muted-foreground mt-1">
                Mínimo 10 caracteres, máximo 2000 caracteres
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Unidade de Saúde Relacionada
              </label>
              <select
                value={dadosManifestacao.unidadeRelacionada}
                onChange={(e) => setDadosManifestacao(prev => ({ ...prev, unidadeRelacionada: e.target.value }))}
                className="w-full p-3 border rounded-md"
              >
                <option value="">Selecione uma unidade (opcional)</option>
                {baseCadastro.buscarTodasUnidades().map((unidade) => (
                  <option key={unidade.id} value={unidade.id}>
                    {unidade.nome} - {unidade.endereco.logradouro}, {unidade.endereco.bairro}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setEtapaAtual(1)}>
                Voltar
              </Button>
              <Button onClick={proximaEtapa} disabled={!dadosManifestacao.categoria || !dadosManifestacao.descricao.trim()}>
                Próximo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Etapa 3: Identificação (Opcional) */}
      {etapaAtual === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Identificação (Opcional)
            </CardTitle>
            <CardDescription>
              A identificação é opcional, mas facilita o acompanhamento e a resposta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Proteção de Dados</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Seus dados pessoais são protegidos conforme a LGPD. Você pode manifestar-se anonimamente 
                    ou fornecer seus dados para facilitar o contato e acompanhamento.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Buscar Paciente Cadastrado
              </label>
              <PatientSearch
                onSelectPatient={handleSelectPatient}
                placeholder="Digite o nome do paciente para buscar..."
                className="w-full"
              />
              {dadosManifestacao.pacienteSelecionado && (
                <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-900">
                      Paciente: {dadosManifestacao.pacienteSelecionado.name}
                    </span>
                  </div>
                  <div className="text-sm text-green-700 mt-1">
                    Cartão SUS: {dadosManifestacao.pacienteSelecionado.cartaoSus}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setEtapaAtual(2)}>
                Voltar
              </Button>
              <Button onClick={proximaEtapa}>
                Próximo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Etapa 4: Anexos e Confirmação */}
      {etapaAtual === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Anexos e Confirmação
            </CardTitle>
            <CardDescription>
              Adicione documentos se necessário e confirme sua manifestação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Anexar Documentos (Opcional)
              </label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Clique para selecionar arquivos ou arraste aqui
                </p>
                <p className="text-xs text-muted-foreground">
                  Formatos aceitos: JPG, PNG, PDF, TXT (máx. 5MB cada)
                </p>
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" className="mt-2" asChild>
                    <span>Selecionar Arquivos</span>
                  </Button>
                </label>
              </div>
              
              {dadosManifestacao.anexos.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Arquivos Anexados:</h4>
                  <div className="space-y-2">
                    {dadosManifestacao.anexos.map((arquivo, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm">{arquivo.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDadosManifestacao(prev => ({
                              ...prev,
                              anexos: prev.anexos.filter((_, i) => i !== index)
                            }));
                          }}
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Resumo da Manifestação:</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Tipo:</strong> {tiposManifestacao.find(t => t.id === dadosManifestacao.tipo)?.nome}</div>
                <div><strong>Categoria:</strong> {dadosManifestacao.categoria}</div>
                <div><strong>Descrição:</strong> {dadosManifestacao.descricao.substring(0, 100)}...</div>
                {dadosManifestacao.pacienteSelecionado && (
                  <div><strong>Paciente:</strong> {dadosManifestacao.pacienteSelecionado.name}</div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={dadosManifestacao.aceitaTermos}
                  onChange={(e) => setDadosManifestacao(prev => ({ ...prev, aceitaTermos: e.target.checked }))}
                  className="mt-1"
                />
                <span className="text-sm">
                  Declaro que as informações prestadas são verdadeiras e autorizo o tratamento dos meus dados 
                  pessoais conforme a Lei Geral de Proteção de Dados (LGPD) para fins de processamento desta manifestação.
                </span>
              </label>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setEtapaAtual(3)}>
                Voltar
              </Button>
              <Button 
                onClick={submeterManifestacao} 
                disabled={!dadosManifestacao.aceitaTermos}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Enviar Manifestação
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
