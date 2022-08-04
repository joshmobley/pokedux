import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Player {
  id: number;
  name: string;
  score: number;
}

export interface PlayerState {
  count: number;
  players: Player[];
  currentPlayer: number;
}

const initialState: PlayerState = {
  count: 0,
  players: [],
  currentPlayer: 0,
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<string>) => {
      state.players.push({
        id: state.count++,
        name: action.payload,
        score: 0,
      });
    },
    removePlayer: (state, action: PayloadAction<number>) => {
      const newPlayers = state.players.filter(
        (player) => player.id !== action.payload
      );
      return {
        count: newPlayers.length,
        currentPlayer: 0,
        players: newPlayers,
      };
    },
    resetPlayers: (state) => {
      return {
        count: 0,
        currentPlayer: 0,
        players: [],
      };
    },
    incrementScore: (state, action: PayloadAction<number>) => {
      const playerMatches = state.players.filter(
        (player) => player.id === action.payload
      );
      const player = playerMatches[0];
      player.score++;
    },
    changePlayer: (state) => {
      let newCurrent;
      if (state.currentPlayer === state.count - 1) {
        newCurrent = 0;
      } else {
        newCurrent = state.currentPlayer + 1;
      }
      return {
        ...state,
        currentPlayer: newCurrent,
      };
    },
  },
});

export const {
  addPlayer,
  removePlayer,
  incrementScore,
  changePlayer,
  resetPlayers,
} = playersSlice.actions;

export const selectPlayers = (state: RootState) => state.players;

export default playersSlice.reducer;
