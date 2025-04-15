# Beste praksis for bruk av avhengigheter i React-prosjekter

Denne veiledningen beskriver anbefalte rutiner for håndtering av eksterne avhengigheter (dependencies) i React-prosjekter. Formålet er å sikre stabilitet, lav kompleksitet, og god kommunikasjon i teamet.

---

## 📑 Innholdsfortegnelse

1. [Installasjon av packages via npm](#-installasjon-av-packages-via-npm)
2. [Håndtering av dependency conflicts](#-håndtering-av-dependency-conflicts)
3. [Import vs. require](#-import-vs-require)
4. [Ikke installer packages unødvendig](#-ikke-installer-packages-unødvendig)
5. [Kommunikasjon og godkjenning](#-kommunikasjon-og-godkjenning)
6. [Anbefalte verktøy for avhengigheter](#-anbefalte-verktøy-for-avhengigheter)
7. [Oppdatering og opprydding](#-oppdatering-og-opprydding)
8. [Sikkerhet](#-sikkerhet)
9. [Oppsummering](#-oppsummering)
10. [Avslutning](#-avslutning)

---

## 📦 Installasjon av packages via npm

For å legge til en ny avhengighet i prosjektet bruker vi `npm install`:

```console
npm install <pakkenavn>
```

Vanlig avhengighet (produksjon):

```console
npm install axios
```

Utviklingsverktøy (kun for development):

```console
npm install --save-dev eslint
```

Alternativt kan man bruke `yarn`, men vi anbefaler **konsistens** — bruk kun én pakkehåndterer i prosjektet (helst `npm` dersom ikke annet er avtalt).

---

## ⚠️ Håndtering av dependency conflicts

Ved konflikt mellom versjoner (f.eks. to biblioteker krever ulike versjoner av samme avhengighet):

- Sjekk `npm ls <pakkenavn>` for å se hva som forårsaker konflikten.
- Unngå å tvinge oppdateringer med mindre det er testet.
- Diskuter med teamet før du forsøker `npm dedupe` eller manuell versjonspinning.
- Bruk `resolutions` i `package.json` som siste utvei, og **kun dersom du vet hva du gjør**.

---

## 📥 Import vs. require

**`import`** er en del av ES Modules-standarden og anbefales i moderne React (og TypeScript) prosjekter. `require` er CommonJS og brukes oftest i Node.js eller eldre JavaScript.

**Vi skal alltid bruke `import` fremfor `require`**:

```ts
// ✅ Riktig
import axios from "axios";

// ❌ Unngå
const axios = require("axios");
```

Grunner til å bruke `import`:

- Bedre tre-shaking (dvs. bare bruke det vi trenger)
- TypeScript-støtte
- Fremtidsrettet og mer lesbart
- Modulene lastes statisk, som gir bedre ytelse

---

## 🧠 Ikke installer packages unødvendig

Før du installerer en ny avhengighet, vurder følgende:

- Kan funksjonaliteten implementeres enkelt selv?
- Hvor stor er pakken (bundle size)?
- Er det aktiv utvikling og mange vedlikeholdere?
- Er den testet og brukt av andre?

Eksempel: Trenger du en hel `lodash` for én `debounce`-funksjon, eller kan du skrive en enkel versjon selv?

---

## 🗣 Kommunikasjon og godkjenning

Det er **viktig å informere teamet** før du legger til nye avhengigheter. Dette gjelder både små og store biblioteker.

**Før du installerer:**

1. Del lenke og formål på Discord eller i Github issue/discussions.
2. Forklar hvorfor den trengs og hva den løser.
3. Sjekk om noen har erfaring med pakken, eller om noe lignende allerede er brukt.

**Eksempel på en pull request-beskrivelse:**

> **Tittel:** Legg til `date-fns` for datoformatering
>
> **Beskrivelse:**  
> Jeg foreslår å legge til `date-fns` for å håndtere datoformatering i prosjektet. Den er lettvekt og tre-shakeable sammenlignet med `moment.js`.
>
> **Fordeler:**
>
> - Reduserer pakkestørrelsen.
> - Bedre støtte for moderne JavaScript.
>
> **Tester:**  
> Jeg har testet funksjonaliteten lokalt og bekreftet at den fungerer som forventet.
>
> **Spørsmål:**  
> Er det noen innvendinger mot å bruke denne pakken?

---

## 🧰 Anbefalte verktøy for avhengigheter

- `npm outdated` – sjekker utdaterte pakker.
- `npm update` – oppdaterer utdaterte pakker.
- `npm audit` – sjekker for kjente sikkerhetshull.
- `npm uninstall <pakke>` – fjern ubrukte avhengigheter.

## 🔁 Oppdatering og opprydding

For å holde prosjektet oppdatert og ryddig, følg disse praksisene:

- **Oppdater avhengigheter jevnlig:** Bruk `npm outdated` for å identifisere utdaterte pakker.
  ```console
  npm outdated
  ```
- **Fjern ubrukte avhengigheter:** Bruk `npm uninstall` for å fjerne pakker som ikke lenger er i bruk.
  ```console
  npm uninstall <pakkenavn>
  ```
- **Unngå "zombie packages":** Sjekk at alle installerte avhengigheter faktisk brukes i koden.
- **Bruk Dependabot:** Konfigurer Dependabot i GitHub for å få varsler om oppdateringer og sikkerhetsproblemer.

---

## 🔒 Sikkerhet

For å sikre at prosjektet er trygt mot kjente sårbarheter:

- Bruk `npm audit` for å identifisere sikkerhetsproblemer.
  ```console
  npm audit
  ```
- Følg opp sikkerhetsvarsler fra Dependabot eller andre verktøy.
- Unngå å bruke utdaterte eller dårlig vedlikeholdte biblioteker.
- Diskuter sikkerhetsrelaterte oppdateringer med teamet før implementering.

---

## ✅ Oppsummering

| Regel                            | Hvorfor                                    | Hvordan                                                                 |
| -------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| Installer kun det du trenger     | Lavere kompleksitet og bundle size         | Vurder alternativene før du legger til en ny avhengighet.               |
| Bruk `import`, ikke `require`    | Moderne, lesbart og typesikkert            | Bruk ES Modules for bedre tre-shaking og fremtidsrettet kode.           |
| Diskuter før du legger til       | Forankret utvikling og færre overraskelser | Del forslag i Slack eller PR før du installerer nye avhengigheter.      |
| Vurder alternativ til ny package | Enkel kode er bedre enn tunge biblioteker  | Skriv små funksjoner selv i stedet for å legge til store biblioteker.   |
| Vedlikehold dependency-listen    | Tryggere og mer robust kodebase            | Bruk `npm outdated` og Dependabot for å holde avhengighetene oppdatert. |

---

## 🎉 Avslutning

Ved å følge disse beste praksisene kan vi sikre at våre React-prosjekter forblir stabile, vedlikeholdbare og effektive. Husk at god kommunikasjon og jevnlig oppfølging er nøkkelen til suksess. Har du forslag til forbedringer? Del dem gjerne med teamet!
