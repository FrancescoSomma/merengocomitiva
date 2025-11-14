import { createSlice } from '@reduxjs/toolkit';
import wordsData from '../data/words.json';

const initialState = {
  players: [],
  words: wordsData,
  selectedPair: null,
  gameStep: 'start', // 'start' | 'add-players' | 'show-word' | 'playing'
  currentPlayerIndex: 0,
  journalist: null,
  impostor: null,
  disciples: [],
  revealedPlayers: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter(p => p.id !== action.payload);
    },
    startGame: (state) => {
      // Seleziona una coppia di parole casuale
      const randomIndex = Math.floor(Math.random() * state.words.length);
      state.selectedPair = state.words[randomIndex];
      
      // Assegna i ruoli
      const shuffledPlayers = [...state.players].sort(() => Math.random() - 0.5);
      
      state.journalist = shuffledPlayers[0].id;
      state.impostor = shuffledPlayers[1].id;
      state.disciples = shuffledPlayers.slice(2).map(p => p.id);
      
      state.gameStep = 'show-word';
      state.currentPlayerIndex = 0;
      state.revealedPlayers = [];
    },
    nextPlayer: (state) => {
      if (state.currentPlayerIndex < state.players.length - 1) {
        state.currentPlayerIndex += 1;
        state.revealedPlayers.push(state.players[state.currentPlayerIndex - 1].id);
      } else {
        state.gameStep = 'playing';
        state.revealedPlayers.push(state.players[state.currentPlayerIndex].id);
      }
    },
    resetGame: (state) => {
      state.selectedPair = null;
      state.gameStep = 'start';
      state.currentPlayerIndex = 0;
      state.journalist = null;
      state.impostor = null;
      state.disciples = [];
      state.revealedPlayers = [];
      state.players = [];
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
export const selectJournalist = (state) => state.game.journalist;
export const selectImpostor = (state) => state.game.impostor;
export const selectDisciples = (state) => state.game.disciples;
export const selectCurrentPlayerIndex = (state) => state.game.currentPlayerIndex;
export const selectRevealedPlayers = (state) => state.game.revealedPlayers;

export default gameSlice.reducer;

