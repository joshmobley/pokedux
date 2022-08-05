import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { DARK_YELLOW, LIGHT_RED, POKEMON_SOLID, YELLOW } from "../../colors";
import {
  resetCurrentRound,
  selectGuess,
  setGameStatus,
} from "../guess/GuessSlice";
import {
  resetPlayers,
  resetScores,
  selectPlayers,
} from "../players/PlayersSlice";

const Scores = () => {
  const players = useAppSelector(selectPlayers);
  const guess = useAppSelector(selectGuess);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { players: playerList } = players;

  const scoreOrder = [...playerList];

  useEffect(() => {
    if (guess.gameStatus === "lobby") navigate("/");
  }, [guess.gameStatus]);

  scoreOrder.sort((a, b) => (a.score < b.score ? 1 : -1));

  const handleStartOver = () => {
    dispatch(setGameStatus("lobby"));
    dispatch(resetCurrentRound());
    dispatch(resetScores());
  };

  return (
    <Container maxWidth={"sm"}>
      <Box py={4}>
        <Typography variant="overline" fontSize={20} color="yellow">
          Final Score
        </Typography>
        {scoreOrder.map((player, index) => (
          <Box mb={2}>
            <Paper>
              <Box p={2}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5">
                    {player.name} - {player.score}
                  </Typography>

                  {index === 0 && (
                    <Typography
                      fontFamily={POKEMON_SOLID}
                      align="center"
                      fontSize={30}
                      color={DARK_YELLOW}
                    >
                      Pokemon Master
                    </Typography>
                  )}

                  {index === 1 && (
                    <Typography
                      fontFamily={POKEMON_SOLID}
                      align="center"
                      fontSize={30}
                      color={LIGHT_RED}
                    >
                      Pokemon Apprentice
                    </Typography>
                  )}
                </Grid>
              </Box>
            </Paper>
          </Box>
        ))}
        <Box pt={4}>
          <Button
            onClick={handleStartOver}
            size="large"
            sx={{ background: YELLOW }}
          >
            Play Again
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Scores;
