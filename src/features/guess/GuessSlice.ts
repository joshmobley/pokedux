import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NamedAPIResource, Pokemon, PokemonClient } from "pokenode-ts";
import { RootState } from "../../app/store";

type GameStatus = "lobby" | "playing" | "ended";

interface GuessState {
  pokemon: Pokemon[];
  correctAnswer: number;
  correctPokemonDetail: Pokemon;
  guessStatus: boolean | null;
  fetchAllStatus: "idle" | "loading" | "succeeded" | "failed";
  fetchOneStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  totalRounds: number;
  currentRound: number;
  gameStatus: GameStatus;
}

const initialState: GuessState = {
  pokemon: [],
  correctAnswer: 0,
  correctPokemonDetail: {} as Pokemon,
  guessStatus: null,
  fetchAllStatus: "idle",
  fetchOneStatus: "idle",
  error: undefined,
  totalRounds: 5,
  currentRound: 1,
  gameStatus: "lobby",
};

const api = new PokemonClient();

export const guessSlice = createSlice({
  name: "guess",
  initialState,
  reducers: {
    guessSuccess: (state) => {
      state.guessStatus = true;
    },
    guessFail: (state) => {
      state.guessStatus = false;
    },
    resetGuess: (state) => {
      state.guessStatus = null;
      state.fetchAllStatus = "idle";
      state.fetchOneStatus = "idle";
    },
    setTotalRounds: (state, action: PayloadAction<number>) => {
      state.totalRounds = action.payload;
    },
    incrementCurrentRound: (state) => {
      state.currentRound++;
    },
    resetCurrentRound: (state) => {
      state.currentRound = 1;
    },
    setGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPokemon.pending, (state, action) => {
        state.fetchAllStatus = "loading";
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.fetchAllStatus = "succeeded";
        state.pokemon =
          (action.payload as unknown as Pokemon[]) || ([] as Pokemon[]);
        state.correctAnswer = Math.floor(Math.random() * 5);
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.fetchAllStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPokemonById.pending, (state, action) => {
        state.fetchOneStatus = "loading";
      })
      .addCase(fetchPokemonById.fulfilled, (state, action) => {
        state.fetchOneStatus = "succeeded";
        state.correctPokemonDetail = action.payload || ({} as Pokemon);
      })
      .addCase(fetchPokemonById.rejected, (state, action) => {
        state.fetchOneStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  guessSuccess,
  guessFail,
  resetGuess,
  setTotalRounds,
  setGameStatus,
  incrementCurrentRound,
  resetCurrentRound,
} = guessSlice.actions;

export const selectGuess = (state: RootState) => state.guess;
export const selectGameRounds = (state: RootState) => ({
  currentRound: state.guess.currentRound,
  totalRounds: state.guess.totalRounds,
});

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async (offset: number) => {
    try {
      const resp = await api.listPokemons(offset, 5);
      return resp.results;
    } catch (err: any) {
      console.error(err.message);
    }
  }
);

export const fetchPokemonById = createAsyncThunk(
  "pokemon/fetchPokemonById",
  async (id: number) => {
    try {
      return api.getPokemonById(id);
    } catch (err: any) {
      console.error(err.message);
    }
  }
);

export default guessSlice.reducer;
