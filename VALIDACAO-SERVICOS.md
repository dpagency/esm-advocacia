# Reformulação da página de serviços

Implementação local na branch `melhorias/experiencia-cliente-20261102`, em 02/11/2026. Sem commit, push ou deploy. Página inicial preservada.

## Entrega

- Nova apresentação e pesquisa destacada na rota `/practice-areas`.
- Abertura compacta em `#123D32`, com texto branco e o subtítulo “Encontre informações sobre questões jurídicas do cotidiano.”. Pesquisa branca diretamente sobre o verde e botão “Entrar em contato”, sem cartão envolvente ou link isolado. Fundo marfim, cartões brancos e painéis sálvia preservados, sem ampliar o dourado. Mudança de tonalidade limitada à abertura.
- Nove cartões com título cotidiano, especialidade, descrição curta e “Mais informações”. Exemplos permanecem no conteúdo expandido e na busca. Painéis sem repetir título, especialidade ou descrição; contêm “Situações em que podemos atuar”, explicação da atuação e contato contextual. Abrir um cartão não estica os vizinhos.
- Ajuste pontual de compactação: removidos `min-height: 235px` de `.subject-card` e `flex-grow` do cabeçalho. Paddings reduzidos de 24 para 16 px nas laterais e no topo, com menor espaço antes do controle expansível. Área de toque de 44 px preservada. Espaços entre título, filtro e cartões reduzidos moderadamente.
- Cartões organizados por colunas CSS, sem linhas com alturas compartilhadas: uma coluna no celular, duas no tablet e três a partir de 1024 px. Cada cartão permanece inteiro com `break-inside: avoid`, sem limite de altura. A ordem do DOM e do teclado é preservada e segue o fluxo vertical das colunas; o navegador pode redistribuir cartões entre colunas ao expandir, sem aumentar a altura dos demais. Nenhuma dependência ou estado de expansão adicional foi criado.
- Busca local por palavras-chave e sinônimos, normalizando acentos, caixa, espaços e pontuação. Palavras conversacionais são ignoradas; resultados podem incluir mais de uma área relacionada. Sem IA ou dependências novas.
- Seletor nativo compacto “Filtrar por especialidade”, em celular e computador, com opção “Todas”. Filtro combinado com a pesquisa, contagem anunciada por leitor de tela, limpeza dos filtros e estado vazio com contato. Seção intitulada “Conheça nossas áreas de atuação”.
- Contato geral e contextual pela rota existente `/contact`. O parâmetro `assunto` aceita apenas especialidades cadastradas e é preservado no assunto dos links de e-mail.
- Formulário sem integração sinalizado como indisponível e desabilitado para evitar simular envio. Telefone e e-mails existentes receberam links clicáveis.
- Seção “Nossa forma de compreender o Direito”, após os serviços, com o texto solicitado e identificação explícita de proposta sujeita à validação institucional. Não há anúncio de atendimento gratuito ou de iniciativas ainda não implementadas.
- Cabeçalho fixo existente compactado somente em serviços, com contato permanente no computador. Menu adaptado a tablets. Barra inferior fixa de contato somente em celulares, com reserva de espaço incluindo o rodapé e área segura do dispositivo; não existe outro botão fixo de contato no cabeçalho móvel.
- O CTA do cabeçalho deixou de anunciar agendamento e passou a levar ao contato. A rota `/schedule` informa “Agendamento online indisponível” e oferece contato. O fluxo demonstrativo anterior foi preservado no código, mas não é exibido nem pode produzir confirmações ao visitante.

## Arquivos alterados

- `src/pages/PracticeAreas.tsx`: nova experiência de pesquisa e cartões.
- `src/pages/PracticeAreas.css`: paleta, contraste, foco visível e redução de movimento, com estilos restritos à página.
- `src/App.tsx`: espaçamento do cabeçalho e reserva para a barra móvel somente em serviços.
- `src/components/layout/Navbar.tsx`: contato em lugar do agendamento, identificação acessível do menu e ajustes visuais limitados ao cabeçalho de serviços.
- `src/pages/Schedule.tsx`: aviso de indisponibilidade, preservando o protótipo sem expô-lo como agendamento real.
- `src/lib/practiceAreas.ts`: catálogo, vocabulário de busca, normalização e destino de contato.
- `src/pages/Contact.tsx`: contexto do assunto, links diretos e indicação de indisponibilidade do formulário.
- `src/vite-env.d.ts`: tipos padrão do Vite para importação das imagens existentes; corrige os erros TS2307 encontrados na verificação inicial.
- `tests/practiceAreas.test.mjs`: testes de busca, filtros e destinos de contato com o executor nativo do Node.
- `VALIDACAO-SERVICOS.md`: registro da entrega e pendências.

## Validação realizada

- TypeScript: `npm.cmd run lint` (`tsc --noEmit`) — passou.
- Produção: `npm.cmd run build` — passou; 2014 módulos transformados.
- Testes: `node --test tests/practiceAreas.test.mjs` — 13 passaram, nenhum falhou. Incluem os 11 exemplos solicitados, equivalência de caixa/acentos, nove assuntos, filtros, busca vazia, ausência de resultados e parâmetros dos contatos.
- Chrome headless, na prévia do build: os 11 exemplos de busca renderizaram a área esperada; nove detalhes abriram pela tecla Enter; filtros e limpeza funcionaram; estado vazio exibiu contato; os nove destinos de contato preservaram a especialidade e os links de telefone/e-mail. Nenhuma exceção JavaScript detectada.
- Responsividade medida no navegador em 320, 375, 768, 1024 e 1440 px, com altura de 900 px: sem rolagem horizontal e sem estouro dos botões de contato, incluindo os detalhes abertos. Capturas finais de cartões fechados em 375 e 1440 px inspecionadas. Não realizado teste em aparelhos físicos ou com leitor de tela real.
- Medição após a compactação, em 1440 × 900 px: cartões fechados entre 158,25 e 181 px, em lugar dos 235 px anteriores. Em 375 px de largura, todos mediram 181 px; em 320 px, variaram de 181 a 208,5 px conforme a quebra do texto. Não há altura mínima imposta. Exemplos e contatos contextuais continuam ocultos até a expansão.
- Na validação específica da compactação, os nove cartões foram abertos e fechados por Enter em 1440 e 375 px; nas larguras 320, 768 e 1024 px, foi testada a expansão do primeiro. Confirmado que os outros cartões conservaram suas alturas, nenhum cartão ou painel foi dividido entre colunas, o conteúdo expandido não foi cortado e o contato contextual ficou dentro do cartão. Controle “Mais informações” a no máximo 12 px do fim da descrição. Pesquisa com `pix` combinada ao filtro bancário preservou o resultado esperado.
- Barra inferior visível apenas abaixo de 768 px e removida ao sair da página; CTA do cabeçalho visível a partir de 768 px e oculto em celulares. Ao rolar até o final, o rodapé permanece acima da barra. Os botões fixos de computador e celular foram acionados e levaram a `/contact`.
- Nove painéis com situações de atuação e seção de contato renderizados; seção institucional identificada como proposta. Sob emulação de `prefers-reduced-motion: reduce`, os controles expansíveis apresentaram duração de transição de `0s`.
- Menu móvel aberto pela tecla Enter; links com áreas de toque de ao menos 44 px e texto `#091F1A` sobre branco. Foco visível confirmado no seletor. Rota de agendamento testada: aviso de indisponibilidade, link para contato e ausência dos campos do protótipo.
- Contraste calculado a partir das cores efetivamente renderizadas: abertura 12,07:1; corpo 11,28:1; botões 4,61:1; seletor 12,18:1; especialidades 14,80:1; painéis 10,50:1; descrições 12,18:1; placeholder 6,15:1. Todos esses pares de texto excedem 4,5:1. O esmeralda `#0B8565` foi preservado nos botões; o botão sobre a abertura recebeu borda branca. Isso não constitui auditoria WCAG completa dos componentes globais herdados.
- `git diff --check` — passou.

Os testes de navegador usaram um script temporário com o protocolo do Chrome, sem instalar biblioteca nem adicionar ferramentas ao projeto. Os testes não enviaram mensagens nem realizaram chamadas telefônicas.

## Pendências para validação

1. **WhatsApp:** não existe integração WhatsApp profissional explicitamente configurada. Nenhum telefone existente foi presumido como WhatsApp. Os botões usam a página de contato. Após confirmação do número, será possível adicionar mensagem inicial contendo apenas o assunto selecionado.
2. **Formulário:** o código original não possui handler de envio, endpoint ou serviço de entrega; os campos também não tinham nomes para submissão. A presença visual não representa funcionamento. O envio permanece indisponível e isso é informado ao visitante. É necessário definir e implementar uma integração antes de habilitá-lo.
3. **Dados institucionais:** telefone, endereços de e-mail e endereço físico são os já existentes. Sua titularidade e disponibilidade precisam ser confirmadas pelo escritório. Os testes confirmam os destinos técnicos, não o atendimento real ou a entrega de e-mails.
   Existe divergência entre o rodapé (Rio de Janeiro, telefone com DDD 21 e Gmail) e a página de contato (São Paulo, telefone com DDD 11 e e-mails no domínio do escritório). Não foi escolhida uma versão como verdadeira nem foram inventados dados. O responsável deve confirmar quais contatos devem ser publicados e unificá-los.
4. **Conteúdo:** mantida comunicação informativa, sem promessas de êxito ou indenização; recomenda-se validação editorial pelo responsável do escritório antes da publicação. Não foi realizada auditoria jurídica das normas da OAB.
   O posicionamento sobre dignidade humana, igualdade e acesso à justiça e o texto institucional permanecem propostas para aprovação do responsável. Uma futura seção de compromisso social e eventuais iniciativas pro bono dependem de estruturação e validação jurídica; não foram anunciadas como serviços disponíveis nesta etapa.
5. **Ambiente existente:** a instalação reportou 23 vulnerabilidades nas dependências já declaradas e incompatibilidade declarada de `better-sqlite3` com o Node 26 disponível. Não foram alteradas versões ou aplicado `npm audit fix`. A instalação de validação usou `--ignore-scripts`; TypeScript, build e a prévia estática passaram. Recomenda-se Node 22 LTS atualizado para reproduzir o ambiente.
6. **Agendamento:** o código anterior usava somente `setTimeout` e estado local para anunciar “Agendamento Confirmado!”, sem API, gravação ou entrega. O protótipo foi bloqueado por um aviso de indisponibilidade e o cabeçalho foi direcionado ao contato. Uma integração real e disponibilidade profissional validada são necessárias antes de reativá-lo.
7. **Links herdados no rodapé:** redes sociais, Política de Privacidade, Termos de Uso e Aviso Legal ainda usam destinos `#`. Não são canais de contato válidos e precisam de destinos confirmados. Permaneceram fora dos ajustes pontuais de serviços.

## Como testar localmente

Em PowerShell, usar `npm.cmd` se a política de execução bloquear `npm.ps1`.

```powershell
npm.cmd ci --ignore-scripts
node node_modules/typescript/bin/tsc --noEmit
node --test tests/practiceAreas.test.mjs
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Abrir `http://127.0.0.1:4173/practice-areas`. Pesquisar os exemplos do pedido, combinar com filtros, limpar a busca e pesquisar um termo sem correspondência. Abrir os detalhes com Enter, acessar contato em cada cartão e conferir o assunto selecionado. Redimensionar a janela para celular e computador. Os links de e-mail dependem de um aplicativo de e-mail configurado; os telefônicos dependem do dispositivo.

Para desenvolvimento, `npm.cmd run dev -- --port 4173 --strictPort` e a mesma rota. A porta 3000 estava ocupada por outro projeto durante a validação; esse processo não foi modificado.
