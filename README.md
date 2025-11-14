# 🎭 Little Secret

Un'applicazione React per giocare a Little Secret - un gioco di parole, ruoli e deduzione!

## 🎮 Come Funziona

**Little Secret** è un gioco sociale dove i giocatori devono scoprire chi è l'Impostore:

- **1 Giornalista**: conosce il suo ruolo e deve scoprire l'Impostore
- **1 Impostore**: ha una parola diversa ma simile, non sa di essere l'Impostore
- **Discepoli**: hanno tutti la stessa parola, non sanno di essere Discepoli

### Obiettivo

I giocatori fanno domande a turno per descrivere la propria parola senza dirla direttamente. Il Giornalista e i Discepoli devono scoprire chi è l'Impostore!

## 🚀 Installazione

```bash
# Installa le dipendenze
yarn install

# Avvia il server di sviluppo
yarn dev

# Build per produzione
yarn build
```

## 🛠️ Stack Tecnologico

- **Vite** - Build tool
- **React** - UI Library
- **Redux Toolkit** - State Management
- **Mantine** - UI Framework
- **React Router** - Routing
- **Mobile-first** - Design responsive

## 📱 Schermate

1. **Schermata di Partenza**: Benvenuto e introduzione al gioco
2. **Inserimento Giocatori**: Aggiungi i giocatori (minimo 3)
3. **Mostra Parola**: Ogni giocatore vede segretamente la sua parola
4. **Fase di Gioco**: Partita con riepilogo e soluzione

## 🎯 Caratteristiche

- ✅ 100 coppie di parole simili
- ✅ Assegnazione automatica dei ruoli
- ✅ Interfaccia mobile-first
- ✅ Animazioni fluide
- ✅ Stato in RAM (no backend)
- ✅ Deploy-ready per Vercel

## 📦 Struttura del Progetto

```
src/
├── components/       # Componenti riutilizzabili
├── pages/           # Pagine principali
│   ├── StartPage.jsx
│   ├── AddPlayersPage.jsx
│   ├── ShowWordPage.jsx
│   └── GamePage.jsx
├── store/           # Redux store e slice
│   ├── store.js
│   └── gameSlice.js
├── data/            # Dati statici
│   └── words.json
├── App.jsx          # Componente principale
├── main.jsx         # Entry point
└── router.jsx       # Configurazione routing
```

## 🎨 Design

L'app utilizza **Mantine** con un tema personalizzato:

- Colore primario: Violet/Purple
- Design moderno e minimalista
- Gradiente accattivante
- Completamente responsive

## 🌐 Deploy su Vercel

```bash
# Build
yarn build

# La cartella dist/ è pronta per il deploy
```

Oppure connetti il repository a Vercel per deploy automatici!

## 👨‍💻 Autore

Francesco Somma

## 📝 Licenza

ISC
