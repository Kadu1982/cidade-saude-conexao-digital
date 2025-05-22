
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Eye, Edit2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Dados de exemplo
const MOCK_AGENDAMENTOS = [
  {
    id: "1",
    tipo: "Consulta",
    paciente: "Ana Carolina Silva",
    horario: "08:30",
    especialidade: "Clínico Geral",
    profissional: "Dr. João Silva",
    status: "confirmado",
  },
  {
    id: "2",
    tipo: "Consulta",
    paciente: "Carlos Eduardo Santos",
    horario: "09:00",
    especialidade: "Cardiologia",
    profissional: "Dra. Ana Lima",
    status: "confirmado",
  },
  {
    id: "3",
    tipo: "Exame",
    paciente: "Maria das Dores Pereira",
    horario: "10:30",
    especialidade: "Raio-X",
    profissional: "Dr. Paulo Santos",
    status: "aguardando",
  },
  {
    id: "4",
    tipo: "Consulta",
    paciente: "José Francisco Oliveira",
    horario: "13:30",
    especialidade: "Ortopedia",
    profissional: "Dr. Pedro Costa",
    status: "confirmado",
  },
];

export const AgendamentoCalendario = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedAgendamento, setSelectedAgendamento] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDayClick = (day: Date | undefined) => {
    if (day) {
      setSelectedDate(day);
    }
  };

  const handleVerDetalhes = (agendamento: any) => {
    setSelectedAgendamento(agendamento);
    setDialogOpen(true);
  };

  const formattedDate = format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDayClick}
          className="border rounded-md"
        />
      </div>
      <div className="md:col-span-2">
        <div className="rounded-md border">
          <div className="p-4 border-b bg-muted/50">
            <h3 className="text-lg font-medium capitalize">
              {formattedDate}
            </h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Horário</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Profissional/Especialidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_AGENDAMENTOS.map((agendamento) => (
                <TableRow key={agendamento.id}>
                  <TableCell>{agendamento.horario}</TableCell>
                  <TableCell>{agendamento.paciente}</TableCell>
                  <TableCell>{agendamento.tipo}</TableCell>
                  <TableCell>
                    {agendamento.profissional}
                    <br />
                    <span className="text-xs text-muted-foreground">{agendamento.especialidade}</span>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                      agendamento.status === "confirmado" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    )}>
                      {agendamento.status === "confirmado" ? "Confirmado" : "Aguardando"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleVerDetalhes(agendamento)}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <X size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Agendamento</DialogTitle>
          </DialogHeader>
          {selectedAgendamento && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Paciente:</p>
                  <p>{selectedAgendamento.paciente}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Horário:</p>
                  <p>{selectedAgendamento.horario}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tipo:</p>
                  <p>{selectedAgendamento.tipo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Especialidade:</p>
                  <p>{selectedAgendamento.especialidade}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profissional:</p>
                  <p>{selectedAgendamento.profissional}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status:</p>
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                    selectedAgendamento.status === "confirmado" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  )}>
                    {selectedAgendamento.status === "confirmado" ? "Confirmado" : "Aguardando"}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
