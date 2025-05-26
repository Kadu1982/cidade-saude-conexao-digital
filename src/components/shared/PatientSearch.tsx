
import React, { useState, useEffect } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { baseCadrastro, Paciente } from "@/services/baseCadastro";

interface PatientSearchProps {
  onSelectPatient: (patient: { name: string, cartaoSus: string }) => void;
  className?: string;
  placeholder?: string;
}

const PatientSearch: React.FC<PatientSearchProps> = ({
  onSelectPatient,
  className,
  placeholder = "Buscar paciente por nome..."
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Paciente[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 1) {
      // Usar a base única de cadastro para buscar pacientes
      const results = baseCadastro.buscarPacientesPorNome(searchTerm);
      setFilteredPatients(results);
      setOpen(true);
    } else {
      setFilteredPatients([]);
      setOpen(false);
    }
  }, [searchTerm]);

  const handleSelect = (patient: Paciente) => {
    onSelectPatient({ name: patient.nome, cartaoSus: patient.cartaoSus });
    setSearchTerm(patient.nome);
    setOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder={placeholder}
          value={searchTerm}
          onValueChange={setSearchTerm}
          className="h-10"
        />
        {open && (
          <CommandGroup className="max-h-64 overflow-auto">
            <CommandEmpty>Nenhum paciente encontrado.</CommandEmpty>
            {filteredPatients.map((patient) => (
              <CommandItem
                key={patient.id}
                value={patient.nome}
                onSelect={() => handleSelect(patient)}
                className="flex justify-between py-3 px-2 cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <User size={18} className="text-gray-500" />
                  <div>
                    <span className="font-medium">{patient.nome}</span>
                    <div className="text-xs text-gray-500">
                      CPF: {patient.cpf}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">
                    SUS: {patient.cartaoSus}
                  </span>
                  {patient.prioridade === 'prioritario' && (
                    <div className="text-xs text-amber-600 font-medium">Prioritário</div>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </Command>
    </div>
  );
};

export default PatientSearch;
