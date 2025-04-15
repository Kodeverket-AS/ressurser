# Retningslinjer for bruk av React

Dette dokumentet beskriver retningslinjer og beste praksiser for bruk av React i våre prosjekter. Målet er å sikre konsistens, lesbarhet og vedlikeholdbarhet i koden.

---

## 📑 Innholdsfortegnelse

1. [Prosjektstruktur](#-prosjektstruktur)
2. [Komponenter](#-komponenter)
   - [Funksjonelle komponenter](#funksjonelle-komponenter)
   - [Filnavn og mappestruktur](#filnavn-og-mappestruktur)
3. [State-håndtering](#-state-håndtering)
4. [Styling](#-styling)
5. [Hooks](#-hooks)
6. [Testing](#-testing)
7. [Ytelse](#-ytelse)
8. [Oppsummering](#-oppsummering)

---

## 📂 Prosjektstruktur

- **Hold en ryddig mappestruktur:**  
  Del prosjektet inn i logiske moduler som `components`, `pages`, `hooks`, `utils`, og `assets`.
  
  Eksempel:
  ```
  src/
  ├── components/
  ├── pages/
  ├── hooks/
  ├── utils/
  ├── assets/
  └── App.tsx
  ```

- **Unngå dype mappestrukturer:**  
  Maks 2-3 nivåer for å holde det oversiktlig.

---

## 🧩 Komponenter

### Funksjonelle komponenter

- **Bruk alltid funksjonelle komponenter:**  
  Vi bruker funksjonelle komponenter fremfor klassekomponenter for enklere syntaks og bedre støtte for hooks.

  ```tsx
  // ✅ Riktig
  const Button = ({ label }: { label: string }) => {
    return <button>{label}</button>;
  };

  // ❌ Unngå
  class Button extends React.Component<{ label: string }> {
    render() {
      return <button>{this.props.label}</button>;
    }
  }
  ```

- **Del opp store komponenter:**  
  Hvis en komponent blir for stor (mer enn 200 linjer), del den opp i mindre komponenter.

### Filnavn og mappestruktur

- **Bruk PascalCase for komponentfiler:**  
  Eksempel: `Button.tsx`, `UserProfile.tsx`.

- **Organiser komponenter i mapper:**  
  Hvis en komponent har tilhørende filer (f.eks. CSS eller tester), legg dem i en egen mappe.

  Eksempel:
  ```
  components/
  └── Button/
      ├── Button.tsx
      ├── Button.test.tsx
      └── Button.module.css
  ```

---

## 🌐 State-håndtering

- **Bruk lokal state der det er mulig:**  
  Bruk Reacts `useState` og `useReducer` for lokal state.

- **Bruk Context API for global state:**  
  Hvis state må deles mellom flere komponenter, bruk Context API. For mer komplekse behov, vurder tredjepartsbiblioteker som Redux eller Zustand.

  ```tsx
  const UserContext = React.createContext<User | null>(null);

  const App = () => {
    const [user, setUser] = useState<User | null>(null);

    return (
      <UserContext.Provider value={user}>
        <HomePage />
      </UserContext.Provider>
    );
  };
  ```

---

## 🎨 Styling

- **Foretrukket metode:**  
  Bruk CSS-in-JS (f.eks. `styled-components`) eller CSS-moduler for komponentbasert styling.

- **Navngivning:**  
  Bruk BEM-konvensjonen hvis du bruker vanlig CSS.

  ```css
  /* Eksempel på BEM */
  .button {
    background-color: blue;
  }

  .button--primary {
    background-color: green;
  }
  ```

- **Unngå inline-styling:**  
  Inline-styling kan gjøre koden vanskeligere å vedlikeholde.

---

## ⚓ Hooks

- **Bruk hooks for logikk:**  
  Flytt logikk ut av komponentene ved å bruke egendefinerte hooks.

  ```tsx
  const useFetchData = (url: string) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data));
    }, [url]);

    return data;
  };
  ```

- **Regler for hooks:**  
  - Kall hooks kun på toppnivå.
  - Kall hooks kun i React-komponenter eller egendefinerte hooks.

---

## 🧪 Testing

- **Test alle komponenter:**  
  Bruk `jest` og `react-testing-library` for å teste komponenter.

- **Skriv snapshot-tester:**  
  For å sikre at UI ikke endres utilsiktet.

  ```tsx
  import { render } from '@testing-library/react';
  import Button from './Button';

  test('Button renders correctly', () => {
    const { asFragment } = render(<Button label="Click me" />);
    expect(asFragment()).toMatchSnapshot();
  });
  ```

---

## ⚡ Ytelse

- **Memoisering:**  
  Bruk `React.memo` og `useMemo` for å optimalisere ytelsen.

  ```tsx
  const ExpensiveComponent = React.memo(({ data }: { data: string[] }) => {
    return <div>{data.join(', ')}</div>;
  });
  ```

- **Lazy loading:**  
  Bruk `React.lazy` og `Suspense` for å laste inn komponenter ved behov.

  ```tsx
  const LazyComponent = React.lazy(() => import('./LazyComponent'));

  const App = () => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
  ```

---

## 🎉 Oppsummering

Ved å følge disse retningslinjene kan vi sikre at våre React-prosjekter er konsistente, vedlikeholdbare og effektive. Husk at god struktur og klare konvensjoner gjør det enklere for alle i teamet å samarbeide.

Har du forslag til forbedringer? Del dem gjerne med teamet!