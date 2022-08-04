import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import guessReducer from "../features/guess/GuessSlice";
import playersReducer from "../features/players/PlayersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    players: playersReducer,
    guess: guessReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
