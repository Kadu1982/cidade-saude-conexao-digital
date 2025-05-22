
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  tipoSanguineo: z.string().min(1, "Tipo sanguíneo é obrigatório"),
  alergias: z.string(),
  medicamentosUso: z.string(),
  doencasCronicas: z.string(),
  historicoFamiliar: z.string(),
  emergenciaContato: z.string(),
  emergenciaTelefone: z.string(),
  diabetico: z.boolean().default(false),
  hipertenso: z.boolean().default(false),
  gestante: z.boolean().default(false),
});

export const DadosClinicos = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoSanguineo: "",
      alergias: "",
      medicamentosUso: "",
      doencasCronicas: "",
      historicoFamiliar: "",
      emergenciaContato: "",
      emergenciaTelefone: "",
      diabetico: false,
      hipertenso: false,
      gestante: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Dados clínicos atualizados",
      description: "Os dados clínicos foram salvos com sucesso.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tipoSanguineo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo Sanguíneo</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: O+" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex flex-col space-y-2 md:col-span-2">
            <h3 className="text-lg font-medium">Condições Especiais</h3>
            <div className="flex flex-wrap gap-6">
              <FormField
                control={form.control}
                name="diabetico"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer">Diabético</FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hipertenso"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer">Hipertenso</FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gestante"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer">Gestante</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="alergias"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Alergias</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Liste todas as alergias (medicamentos, alimentos, etc)" 
                    {...field} 
                    className="resize-none" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="medicamentosUso"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Medicamentos em Uso</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Liste todos os medicamentos em uso contínuo" 
                    {...field} 
                    className="resize-none" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="doencasCronicas"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Doenças Crônicas</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Liste todas as doenças crônicas" 
                    {...field} 
                    className="resize-none" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="historicoFamiliar"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Histórico Familiar</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Histórico de doenças na família" 
                    {...field} 
                    className="resize-none" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="emergenciaContato"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contato de Emergência</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="emergenciaTelefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone de Emergência</FormLabel>
                <FormControl>
                  <Input placeholder="(00) 00000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Salvar Informações</Button>
        </div>
      </form>
    </Form>
  );
};
