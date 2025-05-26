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
import { NewbornAlert } from "./NewbornAlert";
import { BiometricCapture } from "../biometria/BiometricCapture";
import { ValidationResult, ValidationConfig } from "@/services/duplicateValidationService";

const createFormSchema = (validateNewborns: boolean) => {
  const baseSchema = {
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
    cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido").optional().or(z.literal("")),
    cartaoSus: z.string().min(15, "Cartão SUS inválido"),
    sexo: z.enum(["masculino", "feminino", "outro"]),
    racaCor: z.enum(["branca", "preta", "amarela", "parda", "indigena"]),
    endereco: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
    telefone: z.string().min(10, "Telefone inválido"),
    email: z.string().email("Email inválido").optional().or(z.literal("")),
    documentoFoto: z.enum(["rg", "cnh", "passaporte", "carteira_trabalho", "outro"]),
    numeroDocumento: z.string().min(1, "Número do documento é obrigatório"),
    biometria: z.string().optional(),
  };

  if (validateNewborns) {
    return z.object({
      ...baseSchema,
      nomeMae: z.string().min(3, "Nome da mãe deve ter pelo menos 3 caracteres"),
      cpfMae: z.string().min(11, "CPF da mãe inválido").max(14, "CPF da mãe inválido"),
    });
  }

  return z.object({
    ...baseSchema,
    nomeMae: z.string().optional().or(z.literal("")),
    cpfMae: z.string().optional().or(z.literal("")),
  });
};

export const CadastroForm = () => {
  const { toast } = useToast();
  const [showValidation, setShowValidation] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [validationConfig, setValidationConfig] = useState<ValidationConfig>({
    enableValidation: true,
    validateNewborns: false,
    validateWithoutCPF: true,
  });
  const [showBiometric, setShowBiometric] = useState(false);

  const formSchema = createFormSchema(validationConfig.validateNewborns);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      dataNascimento: "",
      cpf: "",
      cartaoSus: "",
      sexo: undefined,
      racaCor: undefined,
      endereco: "",
      telefone: "",
      email: "",
      documentoFoto: undefined,
      numeroDocumento: "",
      nomeMae: "",
      cpfMae: "",
      biometria: "",
    },
  });

  const watchedDataNascimento = form.watch("dataNascimento");
  const watchedNome = form.watch("nome");

  const shouldValidate = (values: any) => {
    const birthDate = new Date(values.dataNascimento);
    const now = new Date();
    const ageInMonths = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    const isNewborn = ageInMonths < 12;

    if (isNewborn && !validationConfig.validateNewborns) {
      return false;
    }
    
    return true;
  };

  const handleFormSubmit = (values: any) => {
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

  const finalizeCadastro = (values: any) => {
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

  const handleConfigChange = (newConfig: ValidationConfig) => {
    setValidationConfig(newConfig);
    
    // Recrear o form com o novo schema quando o toggle mudar
    const newSchema = createFormSchema(newConfig.validateNewborns);
    form.clearErrors();
    
    // Se desabilitou o toggle, limpar os campos da mãe
    if (!newConfig.validateNewborns) {
      form.setValue('nomeMae', '');
      form.setValue('cpfMae', '');
    }
  };

  const handleBiometricCaptured = (biometricData: string) => {
    form.setValue('biometria', biometricData);
    setShowBiometric(false);
    toast({
      title: "Biometria Registrada",
      description: "Dados biométricos foram capturados e associados ao cadastro.",
    });
  };

  if (showValidation) {
    const formValues = form.getValues();
    return (
      <DuplicateValidation
        patientData={{
          nome: formValues.nome,
          nomeMae: formValues.nomeMae || '',
          cpfMae: formValues.cpfMae || '',
        }}
        validationConfig={validationConfig}
        onValidationComplete={handleValidationComplete}
        onCancel={handleCancelValidation}
      />
    );
  }

  return (
    <div className="space-y-6">
      {watchedDataNascimento && watchedNome && (
        <NewbornAlert 
          dataNascimento={watchedDataNascimento} 
          nome={watchedNome} 
        />
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
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
              <div className="mt-3">
                <ValidationSettings 
                  config={validationConfig}
                  onConfigChange={handleConfigChange}
                />
              </div>
            </div>
            
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
              name="racaCor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raça/Cor</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a raça/cor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="branca">Branca</SelectItem>
                      <SelectItem value="preta">Preta</SelectItem>
                      <SelectItem value="amarela">Amarela</SelectItem>
                      <SelectItem value="parda">Parda</SelectItem>
                      <SelectItem value="indigena">Indígena</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Conforme Portaria do Ministério da Saúde
                  </FormDescription>
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
              name="documentoFoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documento com Foto</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de documento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="rg">RG - Registro Geral</SelectItem>
                      <SelectItem value="cnh">CNH - Carteira de Motorista</SelectItem>
                      <SelectItem value="passaporte">Passaporte</SelectItem>
                      <SelectItem value="carteira_trabalho">Carteira de Trabalho</SelectItem>
                      <SelectItem value="outro">Outro documento oficial</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Documento oficial com foto válido pelo Governo Federal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="numeroDocumento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do Documento</FormLabel>
                  <FormControl>
                    <Input placeholder="Número do documento selecionado" {...field} />
                  </FormControl>
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
            
            {/* Campos da mãe - só aparecem quando o toggle está acionado */}
            {validationConfig.validateNewborns && (
              <>
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
              </>
            )}
            
            {/* Seção de Biometria */}
            <div className="md:col-span-2">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Dados Biométricos</h3>
                <div className="flex items-center space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowBiometric(true)}
                  >
                    Capturar Biometria
                  </Button>
                  {form.watch('biometria') && (
                    <span className="text-green-600 text-sm">✓ Biometria capturada</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">
              Validar e Salvar Cadastro
            </Button>
          </div>
        </form>
      </Form>
      
      {showBiometric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <BiometricCapture
              mode="capture"
              onBiometricCaptured={handleBiometricCaptured}
            />
            <Button 
              variant="outline" 
              onClick={() => setShowBiometric(false)}
              className="w-full mt-4"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
