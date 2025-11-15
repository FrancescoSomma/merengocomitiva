import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Paper,
  Group,
  Badge,
  Accordion,
  Modal,
  Alert,
  Divider,
} from "@mantine/core";
import {
  IconTrophy,
  IconEye,
  IconEyeOff,
  IconRefresh,
  IconSparkles,
  IconUsers,
} from "@tabler/icons-react";
import {
  selectPlayers,
  selectSelectedPair,
  selectJournalists,
  selectImpostors,
  selectDisciples,
  selectPlayerPowers,
  resetGame,
} from "../store/gameSlice";

function GamePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const selectedPair = useSelector(selectSelectedPair);
  const journalists = useSelector(selectJournalists);
  const impostors = useSelector(selectImpostors);
  const disciples = useSelector(selectDisciples);
  const playerPowers = useSelector(selectPlayerPowers);

  const [showSolution, setShowSolution] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const hasPowers = Object.keys(playerPowers).length > 0;

  if (!selectedPair) {
    navigate("/");
    return null;
  }

  const journalistPlayers = players.filter((p) => journalists.includes(p.id));
  const impostorPlayers = players.filter((p) => impostors.includes(p.id));
  const disciplePlayers = players.filter((p) => disciples.includes(p.id));

  const handleReset = () => {
    dispatch(resetGame());
    navigate("/");
  };

  const getPlayerInfo = (player) => {
    const isJournalist = journalists.includes(player.id);
    const isImpostor = impostors.includes(player.id);

    if (isJournalist) {
      return {
        showRole: true,
        role: journalists.length > 1 ? "Giornalista" : "Il Giornalista",
        word: "🔍 GIORNALISTA",
        description: "Il tuo compito è scoprire la parola dei Discepoli",
      };
    } else if (isImpostor) {
      return {
        showRole: false,
        word: selectedPair.impostor,
        description: "Questa è la tua parola. Non la rivelare agli altri!",
      };
    } else {
      return {
        showRole: false,
        word: selectedPair.disciple,
        description: "Questa è la tua parola. Non la rivelare agli altri!",
      };
    }
  };

  return (
    <Container size="sm" py="xl" style={{ minHeight: "100vh" }}>
      <Stack gap="lg">
        <Paper
          shadow="md"
          p="xl"
          radius="lg"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <Stack align="center" gap="md">
            <IconTrophy size={50} />
            <Title order={1} ta="center">
              Partita in Corso
            </Title>
            <Text size="lg" ta="center">
              Fate a turno domande e cercate di scoprire{" "}
              {impostors.length > 1 ? "gli impostori" : "l'impostore"}!
            </Text>
          </Stack>
        </Paper>

        <Paper shadow="sm" p="lg" radius="md">
          <Stack gap="md">
            <Group justify="space-between" align="center">
              <Group gap="xs">
                <IconUsers size={20} />
                <Text fw={600} size="lg">
                  Giocatori
                </Text>
              </Group>
              <Badge color="violet" size="lg">
                {players.length}
              </Badge>
            </Group>

            <Divider />

            {players.map((player) => {
              const playerPower = playerPowers[player.id];
              return (
                <Paper
                  key={player.id}
                  p="md"
                  withBorder
                  style={{ cursor: "pointer", transition: "all 0.2s" }}
                  onClick={() => setSelectedPlayer(player)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text fw={500} size="md">
                        {player.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        Clicca per vedere
                      </Text>
                    </Group>
                    {hasPowers && playerPower && (
                      <Group gap="xs">
                        <Badge color="grape" variant="light" size="sm">
                          🎯 Potere
                        </Badge>
                        <Text size="xs" c="dimmed">
                          {playerPower}
                        </Text>
                      </Group>
                    )}
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Paper>

        <Button
          size="lg"
          variant="light"
          color="violet"
          fullWidth
          leftSection={<IconEye size={20} />}
          onClick={() => setShowSolution(true)}
        >
          Mostra Parole
        </Button>

        <Button
          size="md"
          variant="subtle"
          color="red"
          fullWidth
          leftSection={<IconRefresh size={18} />}
          onClick={() => setShowResetModal(true)}
        >
          Nuova Partita
        </Button>
      </Stack>

      {/* Modal Parole */}
      <Modal
        opened={showSolution}
        onClose={() => setShowSolution(false)}
        title={
          <Text fw={700} size="lg">
            📖 Parole della Partita
          </Text>
        }
        size="md"
        centered
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed" ta="center">
            Le due parole utilizzate in questa partita
          </Text>

          <Paper p="xl" radius="md" withBorder>
            <Stack gap="lg" align="center">
              <div style={{ width: "100%" }}>
                <Text size="xs" c="dimmed" ta="center" mb="xs">
                  PAROLA DISCEPOLI
                </Text>
                <Title order={2} ta="center" c="blue">
                  {selectedPair.disciple}
                </Title>
              </div>

              <Divider style={{ width: "100%" }} />

              <div style={{ width: "100%" }}>
                <Text size="xs" c="dimmed" ta="center" mb="xs">
                  PAROLA IMPOSTORI
                </Text>
                <Title order={2} ta="center" c="orange">
                  {selectedPair.impostor}
                </Title>
              </div>
            </Stack>
          </Paper>

          <Button fullWidth onClick={() => setShowSolution(false)} mt="md">
            Chiudi
          </Button>
        </Stack>
      </Modal>

      {/* Modal Giocatore Selezionato */}
      <Modal
        opened={selectedPlayer !== null}
        onClose={() => setSelectedPlayer(null)}
        title={
          <Text fw={700} size="lg">
            {selectedPlayer?.name}
          </Text>
        }
        size="md"
        centered
      >
        {selectedPlayer && (
          <Stack gap="lg">
            <Paper
              p="xl"
              radius="md"
              style={{
                backgroundColor: "#f8f9fa",
                border: "2px solid #dee2e6",
              }}
            >
              {getPlayerInfo(selectedPlayer).showRole && (
                <Text
                  fw={600}
                  size="sm"
                  mb="md"
                  ta="center"
                  c="green"
                  style={{ textTransform: "uppercase" }}
                >
                  {getPlayerInfo(selectedPlayer).role}
                </Text>
              )}
              <Title
                order={2}
                ta="center"
                style={{
                  fontSize: getPlayerInfo(selectedPlayer).showRole
                    ? "1.5rem"
                    : "2.5rem",
                  color: "#667eea",
                }}
              >
                {getPlayerInfo(selectedPlayer).word}
              </Title>
            </Paper>

            <Text size="sm" ta="center" c="dimmed">
              {getPlayerInfo(selectedPlayer).description}
            </Text>

            {hasPowers && playerPowers[selectedPlayer.id] && (
              <Alert color="grape" variant="light">
                <Text
                  size="xs"
                  fw={600}
                  mb="xs"
                  style={{ textTransform: "uppercase" }}
                >
                  🎯 Potere di {selectedPlayer.name}
                </Text>
                <Text size="sm" fw={500}>
                  {playerPowers[selectedPlayer.id]}
                </Text>
              </Alert>
            )}

            <Alert icon={<IconEyeOff size={18} />} color="red" variant="light">
              <Text size="sm" ta="center">
                Non far vedere questa schermata agli altri giocatori!
              </Text>
            </Alert>

            <Button fullWidth onClick={() => setSelectedPlayer(null)}>
              Chiudi
            </Button>
          </Stack>
        )}
      </Modal>

      {/* Modal Reset */}
      <Modal
        opened={showResetModal}
        onClose={() => setShowResetModal(false)}
        title={<Text fw={700}>Nuova Partita?</Text>}
        centered
      >
        <Stack gap="md">
          <Text>
            Sei sicuro di voler iniziare una nuova partita? Tutti i dati attuali
            verranno persi.
          </Text>
          <Group grow>
            <Button variant="light" onClick={() => setShowResetModal(false)}>
              Annulla
            </Button>
            <Button color="red" onClick={handleReset}>
              Nuova Partita
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}

export default GamePage;
