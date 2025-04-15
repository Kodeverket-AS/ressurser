# React Icons

[React Icons](https://react-icons.github.io/react-icons/) er et biblotek som gir tilgang på mange forskjellige ikon pakker som du kan bruke i dine javascript prosjekter.

## Instalasjon

```console
npm install react-icons
```

## Simplifisert bruk

Enkleste måten å bruke React Icons er å importere ønsket icon fra bibloteket ved å bruke følgende import

```ts
import { FaBeer } from "react-icons/fa";

export function App() {
  return (
    <div>
      <FaBeer />
    </div>
  );
}
```

## Typescript

Hvis du ønsker å bruke React Icon som en component prop kan du definere typen som IconType

```ts
import { type IconType } from "react-icons";
```

Etter du har importert `IconType` kan du bruke den i din type declaration.

```ts
interface IconLabelProps {
  icon: IconType;
  label: string;
}

export function IconLabel({ icon, label }: IconLabelProps) {
  return (
    <span>
      {icon}
      <p>{label}</p>
    </span>
  );
}
```

Du kan nå passe et React Icon som prop til komponentet

```ts
import { IconLabel } from ".../iconLabel";
import { FaBeer } from "react-icons/fa";

export function App() {
  return (
    <div>
      <IconLabel icon={<FaBeer />} label="Mitt Icon" />
    </div>
  );
}
```
