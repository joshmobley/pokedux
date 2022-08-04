import { Image } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import { Pokemon } from "pokenode-ts";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { YELLOW } from "../../colors";
import {
  changePlayer,
  incrementScore,
  resetPlayers,
  selectPlayers,
} from "../players/PlayersSlice";
import {
  fetchPokemon,
  fetchPokemonById,
  guessFail,
  guessSuccess,
  resetGuess,
  selectGuess,
} from "./GuessSlice";

const Guess = () => {
  const dispatch = useDispatch();
  const guess = useSelector(selectGuess);
  const players = useSelector(selectPlayers);
  const navigate = useNavigate();
  const fetchAllStatus = useSelector(
    (state: RootState) => state.guess.fetchAllStatus
  );
  const fetchOneStatus = useSelector(
    (state: RootState) => state.guess.fetchOneStatus
  );

  const randomNumber = useMemo(
    () => Math.floor(Math.random() * 300),
    [guess.guessStatus]
  );

  const handleGuess = (name: string) => {
    if (name === guess.correctPokemonDetail.name) {
      dispatch(guessSuccess());
      dispatch(incrementScore(players.currentPlayer));
    } else {
      dispatch(guessFail());
    }
  };

  const handleNext = () => {
    dispatch(resetGuess());
    dispatch(changePlayer());
  };

  const handleStartOver = () => {
    dispatch(resetPlayers());
  };

  useEffect(() => {
    if (fetchAllStatus === "idle") {
      dispatch(fetchPokemon(randomNumber) as unknown as AnyAction);
    }
  }, [fetchAllStatus, dispatch]);

  useEffect(() => {
    if (fetchAllStatus === "succeeded" && fetchOneStatus === "idle") {
      dispatch(
        fetchPokemonById(
          randomNumber + guess.correctAnswer + 1
        ) as unknown as AnyAction
      );
    }
  }, [fetchAllStatus, fetchOneStatus, dispatch]);

  useEffect(() => {
    if (players.players.length < 1) navigate("/");
  }, [players]);

  const image =
    guess.correctPokemonDetail?.sprites?.other["official-artwork"]
      .front_default || "";

  if (players.players.length < 1) return null;

  return (
    <Container maxWidth="md" sx={{ paddingBottom: "2rem" }}>
      <Paper>
        <Box py={1} px={8}>
          <Grid container alignItems={"center"} justifyContent="space-between">
            <Typography variant="overline">Scoreboard</Typography>
            <Grid item>
              <Grid container columnGap={4}>
                {players.players.map((player) => (
                  <Typography
                    style={{
                      background:
                        players.currentPlayer === player.id
                          ? YELLOW
                          : "inherit",
                      borderRadius: "6px",
                      padding: "0 .5rem",
                    }}
                  >
                    {player.name}: {player.score} {}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Button size="small" variant="outlined" onClick={handleStartOver}>
              Start Over
            </Button>
          </Grid>
        </Box>
      </Paper>
      <Box>
        <img
          src={image}
          style={{
            marginLeft: "auto",
            display: "block",
            marginRight: "auto",
          }}
        />
      </Box>
      <Typography
        color={YELLOW}
        style={{ fontSize: "1.2rem" }}
        variant="overline"
      >
        {players.players[players.currentPlayer].name}'s turn!
      </Typography>

      {typeof guess.guessStatus === "boolean" ? (
        <>
          {guess.guessStatus === true && (
            <Alert
              severity="success"
              action={
                <Button size="small" variant="outlined" onClick={handleNext}>
                  Next Pokemon
                </Button>
              }
            >
              You did it!
            </Alert>
          )}

          {guess.guessStatus === false && (
            <Alert
              severity="error"
              action={
                <Button size="small" variant="outlined" onClick={handleNext}>
                  Next Pokemon
                </Button>
              }
            >
              Nope - it was {guess.correctPokemonDetail.name}
            </Alert>
          )}
        </>
      ) : (
        <Grid container>
          {guess.pokemon.map((pokemon) => (
            <Button
              key={`name-${pokemon.name}`}
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#fff", marginRight: ".5rem" }}
              onClick={() => handleGuess(pokemon.name)}
            >
              {pokemon.name}
            </Button>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Guess;
