# Bruk av `react-icons` i React-prosjekter

`react-icons` er et praktisk ikonbibliotek som samler populære ikonsett som Font Awesome, Material Icons, Feather og mange flere, tilgjengelig som React-komponenter. Dette gjør det enkelt å bruke skalerbare og stilbare ikoner i grensesnittet uten tunge avhengigheter.

📘 **Offisiell dokumentasjon:**  
[https://react-icons.github.io/react-icons/](https://react-icons.github.io/react-icons/)

## 📦 Installasjon

Bruk npm for å legge til pakken i prosjektet ditt:

```console
npm install react-icons
```

## 🚀 Vanlig bruk

Et enkelt eksempel med et ikon fra Font Awesome:

```ts
// Importer ønsket ikon fra react-icons
import { FaBeer } from "react-icons/fa";

// Definer en komponent som bruker ikonet
const Cheers = () => (
  <div>
    <p>
      Cheers! <FaBeer />
    </p>
  </div>
);
```

Du kan bruke Tailwind CSS eller vanlig CSS for å style ikonene:

```ts
<FaBeer className="text-yellow-500 text-2xl" />
```

## 🧠 Avansert bruk

Hvis du bruker mange ikoner gjentatte ganger, kan du lage en ikon-komponent for gjenbruk:

```ts
import { FaBeer, FaCoffee } from "react-icons/fa";

// Definer en type for ikonnavn
type IconName = "beer" | "coffee";

// Opprett et objekt som kobler navn til ikonkomponenter
const icons = {
  beer: FaBeer,
  coffee: FaCoffee,
};

interface IconProps {
  name: IconName;
  className?: string;
}

// Lag en gjenbrukbar ikon-komponent
export const Icon = ({ name, className }: IconProps) => {
  const IconComponent = icons[name];
  return <IconComponent className={className} />;
};
```

Bruk:

```ts
<Icon name="beer" className="text-xl text-blue-600" />
```

## 🧩 Bruk av `IconType` for props

Alle ikoner i `react-icons` implementerer typen `IconType`. Dette gjør det mulig å sende ikoner som props på en trygg måte:

```ts
import { IconType } from "react-icons";

interface NavItemProps {
  icon: IconType;
  label: string;
}

// Lag en komponent som bruker ikoner som props
const NavItem = ({ icon: Icon, label }: NavItemProps) => (
  <div className="flex items-center gap-2">
    {/* Render ikonet */}
    <Icon className="text-lg" />
    {/* Legg til en etikett ved siden av ikonet */}
    <span>{label}</span>
  </div>
);
```

Bruk:

```ts
// Importer ønsket ikon
import { FaHome } from "react-icons/fa";

// Bruk ikonet som en prop i komponentet
<NavItem icon={FaHome} label="Hjem" />;
```

## ✅ Anbefalte praksiser

For å sikre optimal ytelse og vedlikeholdbarhet i prosjektet, anbefaler vi følgende praksiser:

- Importer kun ikonene du bruker, ikke hele ikonsett.
- Lag wrapper-komponenter for gjenbruk og enhetlig styling.
- Bruk `IconType` der det gir fleksibilitet og typesikkerhet.

---

## ⚡ Ytelse

For å redusere pakkestørrelsen og forbedre ytelsen, anbefaler vi å importere kun de ikonene du trenger, i stedet for hele ikonsettet. Dette kan gjøres slik:

```ts
// Bra: Importer kun spesifikke ikoner
import { FaHome } from "react-icons/fa";

// Dårlig: Importer hele ikonsettet
import * as FaIcons from "react-icons/fa";
```

---

## 🛠️ Feilsøking

### Ikoner vises ikke

- Sørg for at `react-icons` er riktig installert i prosjektet ditt.
- Sjekk at du importerer ikonene med riktig navn og fra riktig ikonsett.

### Styling fungerer ikke

- Kontroller at du bruker riktig CSS-klasse eller Tailwind-klasse.
- Hvis du bruker Tailwind CSS, sørg for at konfigurasjonen din inkluderer alle nødvendige klasser.

---

## 🎉 Oppsummering

`react-icons` er et kraftig verktøy for å legge til ikoner i React-prosjekter. Ved å følge anbefalte praksiser og optimalisere bruken, kan du lage stilige og effektive grensesnitt. Har du forslag til forbedringer? Bidra gjerne til dokumentasjonen!
