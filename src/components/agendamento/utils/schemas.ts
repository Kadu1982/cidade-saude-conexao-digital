
import { z } from "zod";

export const consultaFormSchema = z.object({
  paciente: z.string().min(1, "Nome do paciente é obrigatório"),
  cartaoSus: z.string().min(15, "Cartão SUS inválido"),
  especialidade: z.string().min(1, "Especialidade é obrigatória"),
  profissional: z.string().min(1, "Profissional é obrigatório"),
  unidade: z.string().min(1, "Unidade é obrigatória"),
  data: z.date({
    required_error: "Data da consulta é obrigatória",
  }),
  horario: z.string().min(1, "Horário é obrigatório"),
  prioridade: z.enum(["normal", "urgente", "emergencia"]),
});

export const exameFormSchema = z.object({
  paciente: z.string().min(1, "Nome do paciente é obrigatório"),
  cartaoSus: z.string().min(15, "Cartão SUS inválido"),
  tipoExame: z.string().min(1, "Tipo de exame é obrigatório"),
  local: z.string().min(1, "Local do exame é obrigatório"),
  medico: z.string().min(1, "Médico solicitante é obrigatório"),
  data: z.date({
    required_error: "Data do exame é obrigatória",
  }),
  horario: z.string().min(1, "Horário é obrigatório"),
  prioridade: z.enum(["normal", "urgente", "emergencia"]),
  observacoes: z.string().optional(),
});
