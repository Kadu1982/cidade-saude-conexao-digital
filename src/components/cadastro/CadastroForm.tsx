import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DuplicateValidation } from "./DuplicateValidation";
import { ValidationSettings } from "./ValidationSettings";
import { ValidationResult, ValidationConfig } from "@/services/duplicateValidationService";

const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido").optional().or(z.literal("")),
  cartaoSus: z.string().min(15, "Cartão SUS inválido"),
  sexo: z.enum(["masculino", "feminino", "outro"]),
  endereco: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  telefone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  nomeMae: z.string().min(3, "Nome da mãe deve ter pelo menos 3 caracteres"),
  cpfMae: z.string().min(11, "CPF da mãe inválido").max(14, "CPF da mãe inválido"),
});

export const CadastroForm = () => {
  const { toast } = useToast();
  const [showValidation, setShowValidation] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [validationConfig, setValidationConfig] = useState<ValidationConfig>({
    enableValidation: true,
    validateNewborns: true,
    validateWithoutCPF: true,
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      dataNascimento: "",
      cpf: "",
      cartaoSus: "",
      sexo: undefined,
      endereco: "",
      telefone: "",
      email: "",
      nomeMae: "",
      cpfMae: "",
    },
  });

  const shouldValidate = (values: z.infer<typeof formSchema>) => {
    if (!validationConfig.enableValidation) {
      return false;
    }

    const birthDate = new Date(values.dataNascimento);
    const now = new Date();
    const ageInMonths = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    const isNewborn = ageInMonths < 12;
    const hasNoCPF = !values.cpf;

    return (isNewborn && validationConfig.validateNewborns) || 
           (hasNoCPF && validationConfig.validateWithoutCPF);
  };

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Dados do formulário:', values);
    
    if (shouldValidate(values)) {
      setShowValidation(true);
      return;
    }
    
    finalizeCadastro(values);
  };

  const handleValidationComplete = (result: ValidationResult) => {
    setValidationResult(result);
    
    if (result.isDuplicate) {
      toast({
        title: "Possível Duplicata Detectada",
        description: "Verifique os cadastros similares antes de prosseguir.",
        variant: "destructive",
      });
      return;
    }
    
    const formValues = form.getValues();
    finalizeCadastro(formValues);
  };

  const finalizeCadastro = (values: z.infer<typeof formSchema>) => {
    console.log('Finalizando cadastro:', values);
    toast({
      title: "Cadastro realizado com sucesso",
      description: `O munícipe ${values.nome} foi cadastrado.`,
    });
    form.reset();
    setShowValidation(false);
    setValidationResult(null);
  };

  const handleCancelValidation = () => {
    setShowValidation(false);
    setValidationResult(null);
  };

  if (showValidation) {
    const formValues = form.getValues();
    return (
      <DuplicateValidation
        patientData={{
          nome: formValues.nome,
          nomeMae: formValues.nomeMae,
          cpfMae: formValues.cpfMae,
        }}
        validationConfig={validationConfig}
        onValidationComplete={handleValidationComplete}
        onCancel={handleCancelValidation}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ValidationSettings 
        config={validationConfig}
        onConfigChange={setValidationConfig}
      />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo do munícipe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataNascimento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="000.000.000-00" {...field} />
                  </FormControl>
                  <FormDescription>
                    Opcional para recém-nascidos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cartaoSus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cartão SUS</FormLabel>
                  <FormControl>
                    <Input placeholder="000 0000 0000 0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sexo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o sexo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@exemplo.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Opcional
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Novos campos para validação de duplicatas */}
            <FormField
              control={form.control}
              name="nomeMae"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Mãe</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo da mãe" {...field} />
                  </FormControl>
                  <FormDescription>
                    Obrigatório para validação de duplicatas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpfMae"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF da Mãe</FormLabel>
                  <FormControl>
                    <Input placeholder="000.000.000-00" {...field} />
                  </FormControl>
                  <FormDescription>
                    Obrigatório para validação de duplicatas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">
              {validationConfig.enableValidation ? "Validar e Salvar Cadastro" : "Salvar Cadastro"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
