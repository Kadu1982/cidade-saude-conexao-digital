
import React from "react";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { LOCAIS } from "../utils/mockData";

interface LocalExameFieldProps {
  form: UseFormReturn<any>;
}

const LocalExameField: React.FC<LocalExameFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="local"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Local do Exame</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o local" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {LOCAIS.map((local) => (
                <SelectItem key={local} value={local}>{local}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LocalExameField;
