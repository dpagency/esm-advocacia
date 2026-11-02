import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { practiceAreas } from "@/lib/practiceAreas";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const selectedArea = practiceAreas.find(area => area.category === searchParams.get("assunto"));
  return (
    <div className="min-h-screen bg-[#ffffff] py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#091f1a] mb-4">Entre em Contato</h1>
          <p className="text-lg text-[#091f1a]/75">Nossa equipe está pronta para orientar você com segurança jurídica.</p>
          {selectedArea && <p className="mt-4 text-[#091f1a]">Assunto selecionado: <strong>{selectedArea.title}</strong> ({selectedArea.category}).</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#091f1a]">Envie sua Mensagem</h2>
              <p id="form-unavailable" className="mb-6 rounded-md border border-[#091f1a]/20 bg-[#f5af00]/10 p-4 text-sm text-[#091f1a]">O envio pelo formulário está indisponível. Utilize os canais de telefone ou e-mail apresentados nesta página.</p>
              <form className="space-y-4" aria-describedby="form-unavailable" onSubmit={event => event.preventDefault()}>
                <fieldset disabled className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="contact-first-name" className="text-sm font-medium">Nome</label>
                    <Input id="contact-first-name" placeholder="João" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-last-name" className="text-sm font-medium">Sobrenome</label>
                    <Input id="contact-last-name" placeholder="Silva" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium">E-mail</label>
                  <Input id="contact-email" type="email" placeholder="joao@email.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-sm font-medium">Assunto</label>
                  <Input id="contact-subject" key={selectedArea?.id ?? "general"} defaultValue={selectedArea?.category ?? ""} placeholder="Consulta Jurídica" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-medium">Mensagem</label>
                  <Textarea id="contact-message" placeholder="Como podemos ajudar você?" className="min-h-[150px]" />
                </div>
                <Button disabled type="button" className="w-full bg-[#f5af00] hover:bg-[#d99a00] text-[#091f1a]">Envio indisponível</Button>
                </fieldset>
              </form>
            </CardContent>
          </Card>

          {/* Info & Map */}
          <div className="space-y-8">
            <div className="grid gap-6">
              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-[#f5af00]/20 p-3 rounded-lg text-[#091f1a]">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-[#091f1a]">Endereço</h3>
                    <p className="text-[#091f1a]/75">Av. Paulista, 1000, Conj. 101<br />São Paulo - SP, 01310-100</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-[#f5af00]/20 p-3 rounded-lg text-[#091f1a]">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-[#091f1a]">Telefone</h3>
                    <p className="text-[#091f1a]/75"><a className="rounded underline underline-offset-4 focus-visible:outline focus-visible:outline-2" href="tel:+551135550000">+55 (11) 3555-0000</a><br />Seg-Sex, 9h às 18h</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-[#f5af00]/20 p-3 rounded-lg text-[#091f1a]">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-[#091f1a]">E-mail</h3>
                    <p className="break-all text-[#091f1a]/75"><a className="rounded underline underline-offset-4 focus-visible:outline focus-visible:outline-2" href={`mailto:contato@esmadvocacia.com.br${selectedArea ? `?subject=${encodeURIComponent(selectedArea.category)}` : ""}`}>contato@esmadvocacia.com.br</a><br /><a className="rounded underline underline-offset-4 focus-visible:outline focus-visible:outline-2" href={`mailto:atendimento@esmadvocacia.com.br${selectedArea ? `?subject=${encodeURIComponent(selectedArea.category)}` : ""}`}>atendimento@esmadvocacia.com.br</a></p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="bg-[#091f1a]/10 h-64 rounded-xl flex items-center justify-center text-[#091f1a]/70 border border-[#091f1a]/20">
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>O mapa interativo será exibido aqui</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
