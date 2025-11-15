import { createSlice } from "@reduxjs/toolkit";
import wordsData from "../data/words.json";

const initialState = {
  players: [],
  words: wordsData,
  selectedPair: null,
  gameStep: "start", // 'start' | 'add-players' | 'show-word' | 'playing'
  currentPlayerIndex: 0,
  journalists: [],
  impostors: [],
  disciples: [],
  revealedPlayers: [],
  usedWordIndices: [], // Traccia le parole già usate nella sessione
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter((p) => p.id !== action.payload);
    },
    startGame: (state) => {
      // Seleziona una coppia di parole casuale non ancora usata
      const availableIndices = state.words
        .map((_, index) => index)
        .filter((index) => !state.usedWordIndices.includes(index));

      if (availableIndices.length === 0) {
        // Se tutte le parole sono state usate, resetta la lista
        state.usedWordIndices = [];
      }

      const finalAvailableIndices =
        state.usedWordIndices.length === 0
          ? state.words.map((_, index) => index)
          : availableIndices;

      const randomIndex =
        finalAvailableIndices[
          Math.floor(Math.random() * finalAvailableIndices.length)
        ];

      state.selectedPair = state.words[randomIndex];
      state.usedWordIndices.push(randomIndex);

      // Assegna i ruoli in base al numero di giocatori
      const playerCount = state.players.length;
      const shuffledPlayers = [...state.players].sort(
        () => Math.random() - 0.5
      );

      let numJournalists = 0;
      let numImpostors = 0;

      // Logica di assegnazione ruoli
      if (playerCount === 3) {
        numJournalists = 0;
        numImpostors = 1;
      } else if (playerCount === 4) {
        numJournalists = 0;
        numImpostors = 1;
      } else if (playerCount === 5) {
        numJournalists = 1;
        numImpostors = 1;
      } else if (playerCount === 6) {
        numJournalists = 1;
        numImpostors = 1;
      } else if (playerCount === 7) {
        numJournalists = 1;
        numImpostors = 2;
      } else if (playerCount === 8) {
        numJournalists = 1;
        numImpostors = 2;
      } else if (playerCount >= 9) {
        numJournalists = 1;
        numImpostors = 3;
      }

      let currentIndex = 0;

      // Assegna giornalisti
      state.journalists = shuffledPlayers
        .slice(currentIndex, currentIndex + numJournalists)
        .map((p) => p.id);
      currentIndex += numJournalists;

      // Assegna impostori
      state.impostors = shuffledPlayers
        .slice(currentIndex, currentIndex + numImpostors)
        .map((p) => p.id);
      currentIndex += numImpostors;

      // Il resto sono discepoli
      state.disciples = shuffledPlayers.slice(currentIndex).map((p) => p.id);

      state.gameStep = "show-word";
      state.currentPlayerIndex = 0;
      state.revealedPlayers = [];
    },
    nextPlayer: (state) => {
      if (state.currentPlayerIndex < state.players.length - 1) {
        state.currentPlayerIndex += 1;
        state.revealedPlayers.push(
          state.players[state.currentPlayerIndex - 1].id
        );
      } else {
        state.gameStep = "playing";
        state.revealedPlayers.push(state.players[state.currentPlayerIndex].id);
      }
    },
    resetGame: (state) => {
      state.selectedPair = null;
      state.gameStep = "start";
      state.currentPlayerIndex = 0;
      state.journalists = [];
      state.impostors = [];
      state.disciples = [];
      state.revealedPlayers = [];
      state.players = [];
      state.usedWordIndices = []; // Resetta anche le parole usate
    },
    setGameStep: (state, action) => {
      state.gameStep = action.payload;
    },
  },
});

export const {
  setPlayers,
  addPlayer,
  removePlayer,
  startGame,
  nextPlayer,
  resetGame,
  setGameStep,
} = gameSlice.actions;

// Selectors
export const selectPlayers = (state) => state.game.players;
export const selectGameStep = (state) => state.game.gameStep;
export const selectCurrentPlayer = (state) =>
  state.game.players[state.game.currentPlayerIndex];
export const selectSelectedPair = (state) => state.game.selectedPair;
export const selectJournalists = (state) => state.game.journalists;
export const selectImpostors = (state) => state.game.impostors;
export const selectDisciples = (state) => state.game.disciples;
export const selectCurrentPlayerIndex = (state) =>
  state.game.currentPlayerIndex;
export const selectRevealedPlayers = (state) => state.game.revealedPlayers;
export const selectUsedWordIndices = (state) => state.game.usedWordIndices;

export default gameSlice.reducer;
