import assert from "node:assert/strict";
import { test } from "node:test";
import { filterPracticeAreas, getContactPath, normalizeSearch, practiceAreas } from "../src/lib/practiceAreas.ts";

const scenarios = [
  ["Golpe no Pix", 8], ["Empréstimo que não fiz", 8],
  ["Meu voo foi cancelado", 3], ["Minha mala sumiu", 3],
  ["Plano negou cirurgia", 2], ["Problemas com aluguel", 1],
  ["Preciso fazer inventário", 5], ["Pensão alimentícia", 4],
  ["Não recebi minha rescisão", 6], ["Cobrança de telefone", 7],
  ["Vazamento de dados", 9],
];

for (const [query, id] of scenarios) {
  test(`Busca cotidiana: ${query}`, () => {
    assert.ok(filterPracticeAreas(query).some(area => area.id === id));
    assert.deepEqual(filterPracticeAreas(query.toUpperCase()), filterPracticeAreas(normalizeSearch(query)));
  });
}

test("Nove assuntos preservados, com exemplos, detalhes e contato contextual", () => {
  assert.equal(practiceAreas.length, 9);
  assert.equal(new Set(practiceAreas.map(area => area.id)).size, 9);
  for (const area of practiceAreas) {
    assert.ok(area.description && area.details && area.services.length === 3);
    assert.ok(area.situations.length >= 3);
    assert.deepEqual(filterPracticeAreas("", area.category), [area]);
    const url = new URL(getContactPath(area.category), "https://example.test");
    assert.equal(url.pathname, "/contact");
    assert.equal(url.searchParams.get("assunto"), area.category);
    assert.ok(filterPracticeAreas(area.title).includes(area));
  }
});

test("Busca vazia, sem resultados e combinação com filtro", () => {
  assert.equal(filterPracticeAreas("  ").length, 9);
  assert.equal(filterPracticeAreas("astronomia").length, 0);
  assert.equal(filterPracticeAreas("preciso de ajuda").length, 0);
  assert.equal(filterPracticeAreas("pix", "Direito de Família").length, 0);
  assert.deepEqual(filterPracticeAreas("pix", "Direito Bancário").map(area => area.id), [8]);
  assert.equal(normalizeSearch("  PENSÃO, Alimentícia! "), "pensao alimenticia");
});
