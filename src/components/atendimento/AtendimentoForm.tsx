
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

interface AtendimentoFormProps {
  tipo: "medico" | "odontologico";
}

// Dados de exemplo
const CID_EXEMPLOS = [
  { codigo: "J00", descricao: "Nasofaringite aguda (resfriado comum)" },
  { codigo: "J01", descricao: "Sinusite aguda" },
  { codigo: "J02", descricao: "Faringite aguda" },
  { codigo: "J03", descricao: "Amigdalite aguda" },
  { codigo: "J04", descricao: "Laringite e traqueíte agudas" },
  { codigo: "J45", descricao: "Asma" },
  { codigo: "E11", descricao: "Diabetes mellitus tipo 2" },
  { codigo: "I10", descricao: "Hipertensão essencial (primária)" },
];

const MEDICAMENTOS = [
  "Paracetamol 500mg",
  "Dipirona 500mg",
  "Amoxicilina 500mg",
  "Ibuprofeno 600mg",
  "Prednisona 20mg",
  "Losartana 50mg",
  "Metformina 850mg",
  "Omeprazol 20mg",
];

export const AtendimentoForm: React.FC<AtendimentoFormProps> = ({ tipo }) => {
  const [diagnosticos, setDiagnosticos] = useState<string[]>([]);
  const [cidDialogOpen, setCidDialogOpen] = useState(false);
  const [filteredCID, setFilteredCID] = useState(CID_EXEMPLOS);
  const [searchCID, setSearchCID] = useState("");

  const handleSearchCID = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchCID(search);
    
    if (search.trim() === "") {
      setFilteredCID(CID_EXEMPLOS);
    } else {
      const filtered = CID_EXEMPLOS.filter(
        cid => 
          cid.codigo.toLowerCase().includes(search.toLowerCase()) || 
          cid.descricao.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCID(filtered);
    }
  };

  const addDiagnostico = (cid: string) => {
    setDiagnosticos([...diagnosticos, cid]);
    setCidDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="anamnese" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="anamnese">Anamnese</TabsTrigger>
          <TabsTrigger value="diagnostico">Diagnóstico</TabsTrigger>
          <TabsTrigger value="prescricao">Prescrição</TabsTrigger>
        </TabsList>

        <TabsContent value="anamnese" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="queixa">Queixa Principal</Label>
            <Textarea 
              id="queixa" 
              placeholder="Descreva a queixa principal do paciente" 
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="anamnese">História da Doença Atual</Label>
            <Textarea 
              id="anamnese" 
              placeholder="Detalhes sobre o início, duração e evolução dos sintomas" 
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exame-fisico">Exame Físico</Label>
            <Textarea 
              id="exame-fisico" 
              placeholder="Registre os achados do exame físico" 
              className="min-h-[120px]"
            />
          </div>
        </TabsContent>

        <TabsContent value="diagnostico" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <Label>Diagnósticos (CID)</Label>
            <Dialog open={cidDialogOpen} onOpenChange={setCidDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" /> Adicionar CID
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Selecionar CID</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="search-cid">Pesquisar CID</Label>
                    <Input 
                      id="search-cid" 
                      placeholder="Digite o código ou descrição" 
                      value={searchCID}
                      onChange={handleSearchCID}
                    />
                  </div>
                  <div className="max-h-[300px] overflow-y-auto border rounded-md">
                    <table className="w-full">
                      <thead className="bg-muted sticky top-0">
                        <tr>
                          <th className="text-left p-2">Código</th>
                          <th className="text-left p-2">Descrição</th>
                          <th className="w-16"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCID.map(cid => (
                          <tr key={cid.codigo} className="border-t">
                            <td className="p-2">{cid.codigo}</td>
                            <td className="p-2">{cid.descricao}</td>
                            <td className="p-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => addDiagnostico(`${cid.codigo} - ${cid.descricao}`)}
                              >
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-2">
            {diagnosticos.length > 0 ? (
              <ul className="space-y-2">
                {diagnosticos.map((diagnostico, index) => (
                  <li 
                    key={index} 
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <span>{diagnostico}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setDiagnosticos(diagnosticos.filter((_, i) => i !== index));
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                Nenhum diagnóstico adicionado
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="observacoes-diagnostico">Observações</Label>
            <Textarea 
              id="observacoes-diagnostico" 
              placeholder="Observações adicionais sobre o diagnóstico" 
              className="min-h-[80px]"
            />
          </div>
        </TabsContent>

        <TabsContent value="prescricao" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="medicamento">Medicamento</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um medicamento" />
              </SelectTrigger>
              <SelectContent>
                {MEDICAMENTOS.map((med) => (
                  <SelectItem key={med} value={med}>{med}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="posologia">Posologia</Label>
              <Input id="posologia" placeholder="Ex: 1 comprimido" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="frequencia">Frequência</Label>
              <Input id="frequencia" placeholder="Ex: A cada 8 horas" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duracao">Duração</Label>
            <Input id="duracao" placeholder="Ex: Por 7 dias" />
          </div>
          
          <Button variant="outline" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Medicamento
          </Button>
          
          <div className="border rounded-md p-4 mt-4">
            <p className="text-center text-muted-foreground">Nenhum medicamento adicionado</p>
          </div>

          <div className="space-y-2 pt-4">
            <Label htmlFor="recomendacoes">Recomendações Gerais</Label>
            <Textarea 
              id="recomendacoes" 
              placeholder="Orientações e recomendações ao paciente" 
              className="min-h-[80px]"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Lucide React X icon component
const X = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
