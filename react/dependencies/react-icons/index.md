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
import { FaBeer } from 'react-icons/fa'

const Cheers = () => (
  <div>
    <p>Cheers! <FaBeer /></p>
  </div>
)
```

Du kan bruke Tailwind CSS eller vanlig CSS for å style ikonene:

```ts
<FaBeer className="text-yellow-500 text-2xl" />
```



## 🧠 Avansert bruk

Hvis du bruker mange ikoner gjentatte ganger, kan du lage en ikon-komponent for gjenbruk:

```ts
import { FaBeer, FaCoffee } from 'react-icons/fa'

type IconName = 'beer' | 'coffee'

const icons = {
  beer: FaBeer,
  coffee: FaCoffee,
}

interface IconProps {
  name: IconName
  className?: string
}

export const Icon = ({ name, className }: IconProps) => {
  const IconComponent = icons[name]
  return <IconComponent className={className} />
}
```

Bruk:

```ts
<Icon name="beer" className="text-xl text-blue-600" />
```



## 🧩 Bruk av `IconType` for props

Alle ikoner i `react-icons` implementerer typen `IconType`. Dette gjør det mulig å sende ikoner som props på en trygg måte:

```ts
import { IconType } from 'react-icons'

interface NavItemProps {
  icon: IconType
  label: string
}

const NavItem = ({ icon: Icon, label }: NavItemProps) => (
  <div className="flex items-center gap-2">
    <Icon className="text-lg" />
    <span>{label}</span>
  </div>
)
```

Bruk:

```ts
// Importer ønsket icon
import { FaHome } from 'react-icons/fa'

// Bruk iconet som en prop i komponentet
<NavItem icon={FaHome} label="Hjem" />
```



## ✅ Anbefalte praksiser

- Importer kun ikonene du bruker, ikke hele ikonsett.
- Lag wrapper-komponenter for gjenbruk og enhetlig styling.
- Bruk `IconType` der det gir fleksibilitet og typesikkerhet.

