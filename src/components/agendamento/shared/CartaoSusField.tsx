
import React from "react";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface CartaoSusFieldProps {
  form: UseFormReturn<any>;
}

const CartaoSusField: React.FC<CartaoSusFieldProps> = ({ form }) => {
  return (
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
  );
};

export default CartaoSusField;
