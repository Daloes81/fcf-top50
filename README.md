# FCF Top 50 ⚽

Rànquing dels 50 millors jugadors de qualsevol lliga de la Federació Catalana de Futbol (FCF), basat en l'anàlisi estadística agregada de **totes les actes de partits**, complementada amb les estadístiques de cada equip.

## Com funciona

1. Introdueix la URL de la pàgina de **classificació** d'una competició de fcf.cat
2. L'app llegeix:
   - Tots els equips de la classificació
   - Totes les actes de partits disputats (`/resultats/`)
   - Les pàgines d'estadístiques de cada equip
   - La llista de golejadors (com a font complementària)
3. Fusiona totes les fonts per evitar jugadors que falten o dades incompletes
4. Calcula una puntuació per jugador i mostra el Top 50

## Fórmula de puntuació

```
Score = (Gols × 10)
      + (Gols/PartitsJugats × 20)   [si PJ >= 3]
      + min(PartitsJugats × 0.5, 10)
      + (Titular% × 5)
```

## Tecnologia

Una sola pàgina HTML/CSS/JS sense dependències de build. Utilitza l'API de Claude (Anthropic) amb `web_search` per llegir i extreure dades de fcf.cat en temps real.

## Desplegament

Desplegat a Vercel com a static site (`vercel.json` amb `@vercel/static`).
