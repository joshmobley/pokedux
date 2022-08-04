import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
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
  RED,
  YELLOW,
} from "../../colors";
import { addPlayer, removePlayer, selectPlayers } from "./PlayersSlice";

const Players = () => {
  const [name, setName] = useState<string>();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

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
      <Box py={8}>
        <Paper>
          <Box p={4}>
            <Typography variant="h5">Add a player!</Typography>
            <Box mt={2}>
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
          <Typography variant="h5" color={YELLOW}>
            Players Ready
          </Typography>
          <Box mt={2} maxWidth={"sm"}>
            {error && (
              <Box p={2} sx={{ background: LIGHT_RED, borderRadius: "6px" }}>
                <Typography color={"#fff"}>{error}</Typography>
              </Box>
            )}
            {players.players.map((player) => (
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  background: "#fff",
                  border: `1px solid ${YELLOW}`,
                  borderRadius: "6px",
                  color: BLUE,
                  padding: ".5rem 1rem",
                  marginBottom: ".5rem",
                }}
              >
                <Typography variant="h6" fontWeight={"bold"}>
                  {player.name}
                </Typography>
                <IconButton onClick={() => handleRemovePlayer(player.id)}>
                  <Delete sx={{ color: RED }} />
                </IconButton>
              </Grid>
            ))}
          </Box>
          <Box pt={4}>
            <Button
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
