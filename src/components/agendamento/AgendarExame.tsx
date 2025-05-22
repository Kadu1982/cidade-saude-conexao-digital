
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { format } from "date-fns";

// Schemas and mock data
import { exameFormSchema } from "./utils/schemas";
import { HORARIOS } from "./utils/mockData";

// Shared components
import AgendamentoFormHeader from "./shared/AgendamentoFormHeader";
import CartaoSusField from "./shared/CartaoSusField";
import DataHorarioFields from "./shared/DataHorarioFields";
import PrioridadeField from "./shared/PrioridadeField";
import FormActions from "./shared/FormActions";

// Exame specific components
import TipoExameField from "./exame/TipoExameField";
import LocalExameField from "./exame/LocalExameField";
import MedicoField from "./exame/MedicoField";
import ObservacoesField from "./exame/ObservacoesField";

export const AgendarExame = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof exameFormSchema>>({
    resolver: zodResolver(exameFormSchema),
    defaultValues: {
      paciente: "",
      cartaoSus: "",
      tipoExame: "",
      local: "",
      medico: "",
      horario: "",
      prioridade: "normal",
      observacoes: "",
    },
    mode: "onSubmit",
  });

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  const handlePatientSelect = (patient: { name: string, cartaoSus: string }) => {
    form.setValue("paciente", patient.name);
    form.setValue("cartaoSus", patient.cartaoSus);
  };

  function onSubmit(values: z.infer<typeof exameFormSchema>) {
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "Exame agendado com sucesso",
        description: `${values.tipoExame} - Data: ${format(values.data, "dd/MM/yyyy")} às ${values.horario}`,
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
          />
          
          <CartaoSusField form={form} />
          <TipoExameField form={form} />
          <LocalExameField form={form} />
          <MedicoField form={form} />
          <DataHorarioFields form={form} horarios={HORARIOS} />
          <PrioridadeField form={form} />
          <ObservacoesField form={form} />
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
