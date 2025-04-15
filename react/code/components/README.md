# Best practices for React komponenter
- prøv å unngå export default i komponenter
- komponenter skal skrives som funksjoner, ikke const arrow function
- komponenter skal ligge i `components` mappen
- `components` mappen skal være organisert med følgende mapper
    - layout: inneholder basic layouts, ikke hele komponenter med tekst/bilder osv
    - ui: Visuelle elementer som ikke inneholder noe logikk, eksempel på undermapper: 
      - links, buttons, cards, lists, modals, dialogs, forms
    - 
    
