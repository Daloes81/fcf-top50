# FCF Top 50 ⚽

Rànquing dels 50 millors jugadors de qualsevol lliga de la Federació Catalana de Futbol (FCF), basat en l'anàlisi estadística de **dades oficials de fcf.cat**.

## Com funciona

1. Introdueix la URL de la pàgina de **classificació** d'una competició de fcf.cat
2. L'app processa, en aquest ordre:
   - **Equips**: extreu tots els equips de la classificació
   - **Calendaris**: per a cada equip, llegeix el seu calendari per trobar totes les actes de partits
   - **Actes**: llegeix cada acta única (deduplicada) per identificar tots els jugadors i el seu equip
   - **Fitxes individuals**: per a cada jugador, llegeix la seva fitxa (gols, partits jugats, titularitats)
3. Calcula una puntuació per jugador i mostra el Top 50

## Fórmula de puntuació

```
Score = (Gols × 10)
      + (Gols/PartitsJugats × 20)   [si PJ >= 3]
      + min(PartitsJugats × 0.5, 10)
      + (Titular/PartitsJugats × 5) [si PJ >= 3]
```

## Arquitectura

- Pàgina única HTML/CSS/JS sense build.
- `/api/proxy.js`: funció Edge de Vercel que fa de proxy CORS per llegir fcf.cat des del navegador.
- Fallback a proxies CORS públics (codetabs, allorigins, corsproxy, cors.eu.org) si el proxy propi falla.
- Tot el processament (parsing HTML, scoring, rànquing) es fa al client amb JavaScript.

## Desplegament

Vercel (static + edge function), framework: cap (auto-detecció).
