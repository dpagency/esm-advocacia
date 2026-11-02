import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock, User, Briefcase, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from "date-fns";

const steps = [
  { id: 1, name: "Serviço", icon: Briefcase },
  { id: 2, name: "Profissional", icon: User },
  { id: 3, name: "Data e Hora", icon: CalendarIcon },
  { id: 4, name: "Dados", icon: FileText },
];

const practiceAreas = [
  { id: "imob", name: "Direito Imobiliário", services: ["Consulta", "Análise Contratual", "Estratégia do Caso"] },
  { id: "saude", name: "Direito da Saúde", services: ["Consulta", "Análise de Negativa", "Medida de Urgência"] },
  { id: "aereo", name: "Direito do Passageiro Aéreo", services: ["Consulta", "Avaliação de Danos", "Ação Indenizatória"] },
  { id: "familia", name: "Direito de Família", services: ["Consulta", "Acordo Familiar", "Ação Judicial"] },
  { id: "sucessoes", name: "Direito de Sucessões", services: ["Consulta", "Inventário", "Partilha"] },
  { id: "trabalho", name: "Direito Trabalhista", services: ["Consulta", "Análise de Verbas", "Estratégia Processual"] },
  { id: "telefonia", name: "Direito de Telefonia", services: ["Consulta", "Revisão de Cobranças", "Ação de Reparação"] },
  { id: "bancario", name: "Direito Bancário", services: ["Consulta", "Revisão Contratual", "Negociação e Defesa"] },
  { id: "digital", name: "Direito Digital", services: ["Consulta", "Diagnóstico de LGPD", "Estratégia de Proteção de Dados"] },
];

const professionals = [
  { id: 1, name: "Sofia Mendes", role: "Sócia Sênior", specialty: "Direito Imobiliário", image: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Ricardo Alves", role: "Associado", specialty: "Direito da Saúde", image: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Camila Duarte", role: "Sócia", specialty: "Direito do Passageiro Aéreo", image: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Bruno Farias", role: "Associado Sênior", specialty: "Direito Trabalhista", image: "https://i.pravatar.cc/150?u=4" },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

const Schedule = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    area: "",
    service: "",
    professional: null,
    date: new Date(),
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Calendar Logic
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const startDate = startOfWeek(currentMonth);

  // The existing wizard only simulates submission. Preserve it for future integration,
  // but do not expose a confirmation until a real booking service is implemented.
  const schedulingAvailable = false;
  if (!schedulingAvailable) {
    return (
      <div className="min-h-screen bg-white px-4 py-12">
        <section className="mx-auto max-w-2xl rounded-xl border border-[#091f1a]/20 p-6 md:p-8" aria-labelledby="schedule-unavailable">
          <h1 id="schedule-unavailable" className="mb-4 text-3xl font-bold text-[#091f1a]">Agendamento online indisponível</h1>
          <p className="mb-6 leading-relaxed text-[#303735]">O agendamento pelo site ainda não está disponível. Consulte os canais de contato da ESM Advocacia para informações sobre atendimento profissional.</p>
          <Link to="/contact" className="inline-flex min-h-11 items-center rounded-md bg-[#091f1a] px-4 py-3 font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Entrar em contato</Link>
        </section>
      </div>
    );
  }

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      days.push(
        <div
          key={i}
          className={cn(
            "p-2 text-center border border-[#091f1a]/20 rounded-lg cursor-pointer transition-colors hover:bg-[#f5af00]/15",
            isSameDay(day, formData.date) ? "bg-[#f5af00] text-[#091f1a] hover:bg-[#d99a00]" : "bg-[#ffffff]"
          )}
          onClick={() => updateFormData("date", day)}
        >
          <div className="text-xs font-medium uppercase opacity-70">{format(day, "EEE")}</div>
          <div className="text-lg font-bold">{format(day, "d")}</div>
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-2 mb-4">{days}</div>;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8">
          <div className="mx-auto h-16 w-16 bg-[#f5af00]/25 rounded-full flex items-center justify-center mb-6">
            <Check className="h-8 w-8 text-[#091f1a]" />
          </div>
          <h2 className="text-2xl font-bold text-[#091f1a] mb-2">Agendamento Confirmado!</h2>
          <p className="text-[#091f1a]/75 mb-6">
            Sua consulta com {formData.professional?.name} foi agendada para {format(formData.date, "dd/MM/yyyy")} às {formData.time}.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button>Ir para o Portal</Button>
            </Link>
            <Link to="/">
              <Button variant="outline">Voltar ao Início</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#091f1a]">Agendar Consulta</h1>
          <p className="text-[#091f1a]/75">Siga as etapas abaixo para concluir seu agendamento.</p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#091f1a]/15 -z-10" />
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center gap-2 bg-[#ffffff] px-2",
                  currentStep >= step.id ? "text-[#091f1a]" : "text-[#091f1a]/40"
                )}
              >
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors",
                    currentStep >= step.id
                      ? "bg-[#f5af00] border-[#f5af00] text-[#091f1a]"
                      : "bg-[#ffffff] border-[#091f1a]/25 text-[#091f1a]/40"
                  )}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium hidden sm:block">{step.name}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="min-h-[400px]">
          <CardContent className="p-6">
            {/* Step 1: Service */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Selecione um Serviço</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {practiceAreas.map((area) => (
                    <div key={area.id} className="space-y-2">
                      <h3 className="font-medium text-[#091f1a]">{area.name}</h3>
                      <div className="grid gap-2">
                        {area.services.map((svc) => (
                          <button
                            key={svc}
                            className={cn(
                              "text-left px-4 py-3 rounded-lg border transition-all hover:border-[#f5af00]",
                              formData.service === svc && formData.area === area.name
                                ? "border-[#f5af00] bg-[#f5af00]/15 ring-1 ring-[#f5af00]"
                                : "border-[#091f1a]/20 bg-[#ffffff]"
                            )}
                            onClick={() => {
                              updateFormData("area", area.name);
                              updateFormData("service", svc);
                            }}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{svc}</span>
                              {formData.service === svc && formData.area === area.name && (
                                <Check className="h-4 w-4 text-[#091f1a]" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Professional */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Escolha o Profissional</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {professionals.map((prof) => (
                    <button
                      key={prof.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg border transition-all hover:border-[#f5af00] text-left",
                        formData.professional?.id === prof.id
                          ? "border-[#f5af00] bg-[#f5af00]/15 ring-1 ring-[#f5af00]"
                          : "border-[#091f1a]/20 bg-[#ffffff]"
                      )}
                      onClick={() => updateFormData("professional", prof)}
                    >
                      <img src={prof.image} alt={prof.name} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-[#091f1a]">{prof.name}</div>
                        <div className="text-xs text-[#091f1a]/65">{prof.role} • {prof.specialty}</div>
                      </div>
                      {formData.professional?.id === prof.id && (
                        <Check className="h-5 w-5 text-[#091f1a] ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Date & Time */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Selecione Data e Horário</h2>
                <div className="flex justify-between items-center mb-4">
                  <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(subWeeks(currentMonth, 1))}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium">{format(startDate, "MMMM yyyy")}</span>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(addWeeks(currentMonth, 1))}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                {renderCalendar()}
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Horários Disponíveis</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        className={cn(
                          "px-3 py-2 text-sm rounded-md border transition-colors",
                          formData.time === slot
                            ? "bg-[#f5af00] text-[#091f1a] border-[#f5af00]"
                            : "bg-[#ffffff] text-[#091f1a] border-[#091f1a]/20 hover:border-[#f5af00]"
                        )}
                        onClick={() => updateFormData("time", slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Details */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Seus Dados</h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        placeholder="João da Silva"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="joao@email.com"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="+55 (11) 99999-0000"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Descrição Resumida do Caso</Label>
                    <Textarea
                      id="notes"
                      placeholder="Descreva brevemente sua demanda jurídica..."
                      value={formData.notes}
                      onChange={(e) => updateFormData("notes", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="bg-[#091f1a]/5 p-4 rounded-lg mt-6 border border-[#091f1a]/15">
                  <h3 className="font-medium mb-2">Resumo</h3>
                  <div className="text-sm text-[#091f1a]/75 space-y-1">
                    <p><span className="font-medium">Serviço:</span> {formData.service} ({formData.area})</p>
                    <p><span className="font-medium">Profissional:</span> {formData.professional?.name}</p>
                    <p><span className="font-medium">Data:</span> {format(formData.date, "dd/MM/yyyy")} às {formData.time}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t border-[#091f1a]/20 p-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Voltar
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !formData.service) ||
                (currentStep === 2 && !formData.professional) ||
                (currentStep === 3 && !formData.time) ||
                (currentStep === 4 && (!formData.name || !formData.email))
              }
              className="bg-[#f5af00] hover:bg-[#d99a00] text-[#091f1a]"
            >
              {currentStep === steps.length ? "Confirmar Agendamento" : "Próxima Etapa"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
