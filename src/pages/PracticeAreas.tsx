import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { filterPracticeAreas, getContactPath, practiceAreas } from "@/lib/practiceAreas";
import "./PracticeAreas.css";

const contactClass = "subject-contact";

const PracticeAreas = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredAreas = filterPracticeAreas(searchQuery, selectedCategory);

  function clearFilters() {
    setSelectedCategory("Todas");
    setSearchQuery("");
  }

  return (
    <div className="practice-experience min-h-screen pb-12">
      <header className="subject-hero py-6 md:py-7">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-5 max-w-3xl text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Como podemos ajudar você?</h1>
            <p className="text-base leading-relaxed md:text-lg">
              Encontre informações sobre questões jurídicas do cotidiano.
            </p>
          </div>

          <section aria-label="Pesquisa de assuntos" className="subject-search mx-auto max-w-4xl">
            <label htmlFor="subject-search" className="mb-2 block font-semibold">Sobre qual assunto você procura orientação?</label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="relative min-w-0 flex-1">
              <Search aria-hidden="true" className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
              <Input id="subject-search" type="search" placeholder="Ex.: golpe bancário, atraso de voo, inventário, plano de saúde..." className="h-12 pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} aria-describedby="search-help search-results" />
            </div>
            <Link to="/contact" className="subject-contact subject-hero-contact sm:min-h-12">Entrar em contato</Link>
            </div>
            <p id="search-help" className="mt-2 text-sm leading-relaxed">Descreva o assunto com suas palavras.</p>
          </section>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-5 md:px-6">
        <section aria-labelledby="subjects-heading">
          <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h2 id="subjects-heading" className="text-2xl font-semibold">Conheça nossas áreas de atuação</h2>
            <div className="min-w-0 md:w-72">
              <label htmlFor="specialty-filter" className="mb-1 block text-sm font-medium">Filtrar por especialidade</label>
              <select id="specialty-filter" className="subject-filter min-h-11 w-full rounded-md border px-3 py-2 text-sm" value={selectedCategory} onChange={event => setSelectedCategory(event.target.value)}>
                {["Todas", ...practiceAreas.map(area => area.category)].map(category => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <p id="search-results" role="status" aria-live="polite" aria-atomic="true" className="min-w-0 break-words text-sm">
              {filteredAreas.length} {filteredAreas.length === 1 ? "assunto encontrado" : "assuntos encontrados"}{searchQuery.trim() ? ` para “${searchQuery.trim()}”` : ""}{selectedCategory !== "Todas" ? ` em ${selectedCategory}` : ""}.
            </p>
            {(searchQuery || selectedCategory !== "Todas") && <Button variant="outline" className="subject-filter min-h-11 h-auto whitespace-normal" onClick={clearFilters}>Limpar pesquisa e filtros</Button>}
          </div>

          <div className="subject-cards">
            {filteredAreas.map(area => (
              <Card key={area.id} className="subject-card min-w-0">
                <CardHeader className="space-y-1 p-4 pb-1">
                  <Badge variant="outline" className="subject-specialty w-fit">{area.category}</Badge>
                  <h3 className="text-xl font-semibold leading-snug tracking-tight">{area.title}</h3>
                  <CardDescription className="subject-description leading-relaxed">{area.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-3 pt-0">
                  <details className="subject-details text-sm">
                    <summary className="min-h-11 cursor-pointer rounded py-3 font-semibold underline underline-offset-4" aria-label={`Mais informações sobre ${area.title}`}>Mais informações</summary>
                    <section aria-labelledby={`subject-detail-${area.id}`} className="subject-panel mt-2 rounded-lg p-4">
                      <h4 id={`subject-detail-${area.id}`} className="mb-2 font-semibold">Situações em que podemos atuar</h4>
                      <ul className="mb-4 list-disc space-y-2 pl-4 leading-relaxed">
                        {area.situations.map(situation => <li key={situation}>{situation}</li>)}
                      </ul>
                      <h4 className="mb-2 font-semibold">Sobre a atuação profissional</h4>
                      <p className="leading-relaxed">{area.details}</p>
                      <p className="mt-3 leading-relaxed">Estas informações são gerais. A orientação jurídica depende da análise individual de cada situação.</p>
                      <div className="subject-panel-contact mt-5 border-t pt-4">
                        <h4 className="font-semibold leading-relaxed">Precisa de informações sobre atendimento jurídico?</h4>
                        <p className="my-3 leading-relaxed">Entre em contato com a ESM Advocacia para conhecer nossos canais de atendimento profissional.</p>
                        <Link to={getContactPath(area.category)} className={`${contactClass} w-full`} aria-label={`Entrar em contato sobre ${area.title}`}>Entrar em contato</Link>
                      </div>
                    </section>
                  </details>
                </CardContent>
              </Card>
            ))}
            {filteredAreas.length === 0 && (
              <div className="subject-empty col-span-full rounded-xl border px-5 py-12 text-center">
                <h3 className="mb-3 text-xl font-semibold">Não encontrou o que procura?</h3>
                <p className="mx-auto mb-6 max-w-xl leading-relaxed">Tente outras palavras ou limpe os filtros. Se preferir, consulte os canais de contato do escritório para informações sobre atendimento.</p>
                <Link to="/contact" className={contactClass}>Ver canais de contato</Link>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="institutional-heading" className="subject-institutional mt-12 rounded-xl p-6 md:p-8">
          <p className="mb-3 text-sm font-medium">Proposta sujeita à validação institucional</p>
          <h2 id="institutional-heading" className="mb-4 text-2xl font-semibold">Nossa forma de compreender o Direito</h2>
          <p className="max-w-3xl leading-relaxed">Acreditamos que o conhecimento jurídico deve ser acessível e que o respeito à dignidade humana deve orientar as relações profissionais. Nossa atuação busca unir responsabilidade técnica, escuta e compromisso com uma sociedade mais justa.</p>
          <Link to="/contact" className="mt-4 inline-flex min-h-11 items-center rounded font-medium underline underline-offset-4">Conheça nossos canais de atendimento</Link>
        </section>
      </div>
      <aside className="subject-mobile-contact" aria-label="Contato sempre disponível">
        <Link to="/contact" className={`${contactClass} w-full`}>Entrar em contato</Link>
      </aside>
    </div>
  );
};

export default PracticeAreas;
