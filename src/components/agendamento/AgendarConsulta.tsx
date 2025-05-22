
import React, { useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    mode: "onSubmit",
  });

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  const handlePatientSelect = (patient: { name: string, cartaoSus: string }) => {
    form.setValue("paciente", patient.name);
    form.setValue("cartaoSus", patient.cartaoSus);
  };

  function onSubmit(values: z.infer<typeof consultaFormSchema>) {
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "Consulta agendada com sucesso",
        description: `Data: ${format(values.data, "dd/MM/yyyy")} às ${values.horario}`,
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  }

  const handleFormSubmitError = () => {
    toast({
      title: "Erro no formulário",
      description: "Por favor, corrija os campos destacados",
      variant: "destructive",
    });

    // Focus on the first field with an error
    const firstError = Object.keys(form.formState.errors)[0];
    if (firstError) {
      form.setFocus(firstError as never);
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit, handleFormSubmitError)} 
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AgendamentoFormHeader 
            form={form}
            handlePatientSelect={handlePatientSelect}
            isSubmitting={isSubmitting}
          />
          
          <CartaoSusField form={form} isSubmitting={isSubmitting} />
          <EspecialidadeField form={form} isSubmitting={isSubmitting} />
          <ProfissionalField form={form} isSubmitting={isSubmitting} />
          <UnidadeField form={form} isSubmitting={isSubmitting} />
          <DataHorarioFields form={form} horarios={HORARIOS} isSubmitting={isSubmitting} />
          <PrioridadeField form={form} isSubmitting={isSubmitting} />
        </div>

        <FormActions 
          onReset={() => form.reset()} 
          isSubmitting={isSubmitting}
          hasErrors={hasErrors && form.formState.isSubmitted}
        />
      </form>
    </Form>
  );
};
