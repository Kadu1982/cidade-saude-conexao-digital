
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { format } from "date-fns";

// Schemas and mock data
import { consultaFormSchema } from "./utils/schemas";
import { HORARIOS } from "./utils/mockData";

// Shared components
import AgendamentoFormHeader from "./shared/AgendamentoFormHeader";
import CartaoSusField from "./shared/CartaoSusField";
import DataHorarioFields from "./shared/DataHorarioFields";
import PrioridadeField from "./shared/PrioridadeField";
import FormActions from "./shared/FormActions";

// Consulta specific components
import EspecialidadeField from "./consulta/EspecialidadeField";
import ProfissionalField from "./consulta/ProfissionalField";
import UnidadeField from "./consulta/UnidadeField";

export const AgendarConsulta = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof consultaFormSchema>>({
    resolver: zodResolver(consultaFormSchema),
    defaultValues: {
      paciente: "",
      cartaoSus: "",
      especialidade: "",
      profissional: "",
      unidade: "",
      horario: "",
      prioridade: "normal",
    },
  });

  const handlePatientSelect = (patient: { name: string, cartaoSus: string }) => {
    form.setValue("paciente", patient.name);
    form.setValue("cartaoSus", patient.cartaoSus);
  };

  function onSubmit(values: z.infer<typeof consultaFormSchema>) {
    console.log(values);
    toast({
      title: "Consulta agendada com sucesso",
      description: `Data: ${format(values.data, "dd/MM/yyyy")} às ${values.horario}`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AgendamentoFormHeader 
            form={form}
            handlePatientSelect={handlePatientSelect}
          />
          
          <CartaoSusField form={form} />
          <EspecialidadeField form={form} />
          <ProfissionalField form={form} />
          <UnidadeField form={form} />
          <DataHorarioFields form={form} horarios={HORARIOS} />
          <PrioridadeField form={form} />
        </div>

        <FormActions onReset={() => form.reset()} />
      </form>
    </Form>
  );
};
