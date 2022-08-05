import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  BLUE,
  DARK_YELLOW,
  LIGHT_BLUE,
  LIGHT_RED,
  POKEMON_SOLID,
  RED,
  YELLOW,
} from "../../colors";
import { selectGameRounds, setTotalRounds } from "../guess/GuessSlice";
import { addPlayer, removePlayer, selectPlayers } from "./PlayersSlice";

const Players = () => {
  const [name, setName] = useState<string>();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const gameRounds = useAppSelector(selectGameRounds);

  const dispatch = useAppDispatch();
  const players = useAppSelector(selectPlayers);
  const handleAddPlayer = () => {
    setError(undefined);
    if (name) dispatch(addPlayer(name));
    setName("");
  };

  const handleRemovePlayer = (id: number) => {
    dispatch(removePlayer(id));
  };

  const handleRoundChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTotalRounds(parseInt(target.value)));
  };

  const handleChangeName = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setName(target.value);

  const handleStartGame = () => {
    setError(undefined);
    if (players.count < 1) {
      setError("You need at least 1 player to start.");
      return;
    }
    navigate("/guess");
  };

  return (
    <Container maxWidth="sm">
      <Box pt={4}>
        <Typography
          fontFamily={POKEMON_SOLID}
          fontSize={60}
          align="center"
          color={YELLOW}
        >
          Pokemon Masters
        </Typography>
      </Box>
      <Box pt={2}>
        <Typography variant="overline" fontSize={20} color={YELLOW}>
          Add Players
        </Typography>
        <Paper>
          <Box p={2}>
            <Box>
              <Grid container alignItems="center">
                <TextField
                  label="Name"
                  value={name}
                  onChange={handleChangeName}
                />
                <Button
                  variant="outlined"
                  sx={{ marginLeft: "1rem" }}
                  onClick={handleAddPlayer}
                >
                  Add Player
                </Button>
              </Grid>
            </Box>
          </Box>
        </Paper>
        <Box pt={4}>
          <Typography variant="overline" fontSize={18} color={YELLOW}>
            Player List
          </Typography>
          <Box maxWidth={"sm"}>
            {error && (
              <Box p={2} sx={{ background: LIGHT_RED, borderRadius: "6px" }}>
                <Typography color={"#fff"}>{error}</Typography>
              </Box>
            )}
            {players.count === 0 && (
              <Typography color="white">
                Add a player to start the game
              </Typography>
            )}
            {players.players.map((player) => (
              <Box mb={2}>
                <Paper>
                  <Box p={2}>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        color: BLUE,
                      }}
                    >
                      <Typography variant="h6" fontWeight={"bold"}>
                        {player.name}
                      </Typography>
                      <IconButton onClick={() => handleRemovePlayer(player.id)}>
                        <Delete sx={{ color: RED }} />
                      </IconButton>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
          <Box pt={4}>
            <Typography variant="overline" fontSize={18} color={YELLOW}>
              Game Type
            </Typography>
            <Paper>
              <Box p={2}>
                <RadioGroup
                  row
                  value={gameRounds.totalRounds}
                  onChange={handleRoundChange}
                >
                  <FormControlLabel
                    value={5}
                    control={<Radio />}
                    label="5 Rounds"
                  />
                  <FormControlLabel
                    value={10}
                    control={<Radio />}
                    label="10 Rounds"
                  />
                  <FormControlLabel
                    value={-1}
                    control={<Radio />}
                    label="Practice Mode"
                  />
                </RadioGroup>
              </Box>
            </Paper>
          </Box>
          <Box pb={4} pt={6}>
            <Button
              size="large"
              disabled={players.count === 0}
              variant="contained"
              sx={{ background: YELLOW, color: BLUE, fontWeight: "bold" }}
              onClick={handleStartGame}
            >
              Let's Play!
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Players;
