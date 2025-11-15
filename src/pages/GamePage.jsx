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

        <Accordion variant="contained">
          <Accordion.Item value="instructions">
            <Accordion.Control icon={<IconSparkles size={20} />}>
              📖 Come si Gioca
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="sm">
                <Text size="sm">
                  <strong>1. Fate domande a turno</strong>
                  <br />
                  Ogni giocatore descrive la propria parola senza dirla
                  direttamente.
                </Text>
                <Text size="sm">
                  <strong>
                    2. Individuate{" "}
                    {impostors.length > 1 ? "gli impostori" : "l'impostore"}
                  </strong>
                  <br />I Discepoli hanno la stessa parola,{" "}
                  {impostors.length > 1
                    ? "gli Impostori hanno"
                    : "l'Impostore ha"}{" "}
                  una parola diversa ma simile.
                </Text>
                {journalists.length > 0 && (
                  <Text size="sm">
                    <strong>
                      3.{" "}
                      {journalists.length > 1
                        ? "I Giornalisti conducono"
                        : "Il Giornalista conduce"}
                    </strong>
                    <br />
                    {journalists.length > 1
                      ? "I Giornalisti (che conoscono il loro ruolo) devono scoprire chi sono gli Impostori"
                      : "Il Giornalista (che conosce il suo ruolo) deve scoprire chi è l'Impostore"}
                    .
                  </Text>
                )}
                {hasPowers && (
                  <Text size="sm">
                    <strong>
                      {journalists.length > 0 ? "4" : "3"}. Usate i poteri
                    </strong>
                    <br />
                    Ogni giocatore ha un potere speciale visibile a tutti.
                    Usatelo strategicamente!
                  </Text>
                )}
                <Text size="sm">
                  <strong>
                    {hasPowers
                      ? journalists.length > 0
                        ? "5"
                        : "4"
                      : journalists.length > 0
                      ? "4"
                      : "3"}
                    . Votate
                  </strong>
                  <br />
                  Alla fine, votate per chi pensate{" "}
                  {impostors.length > 1
                    ? "siano gli Impostori"
                    : "sia l'Impostore"}
                  !
                </Text>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Button
          size="lg"
          variant="light"
          color="violet"
          fullWidth
          leftSection={<IconEye size={20} />}
          onClick={() => setShowSolution(true)}
        >
          Mostra Soluzione
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

      {/* Modal Soluzione */}
      <Modal
        opened={showSolution}
        onClose={() => setShowSolution(false)}
        title={
          <Text fw={700} size="lg">
            🎯 Soluzione
          </Text>
        }
        size="md"
        centered
      >
        <Stack gap="md">
          {journalists.length > 0 && (
            <Alert color="green" variant="light">
              <Text fw={600} size="sm" mb="xs">
                🔍 {journalists.length > 1 ? "Giornalisti" : "Giornalista"}
              </Text>
              {journalistPlayers.map((p) => (
                <Text key={p.id} size="lg" fw={700}>
                  {journalists.length > 1 ? "• " : ""}
                  {p.name}
                </Text>
              ))}
            </Alert>
          )}

          <Alert color="orange" variant="light">
            <Text fw={600} size="sm" mb="xs">
              🎭 {impostors.length > 1 ? "Impostori" : "Impostore"}
            </Text>
            {impostorPlayers.map((p) => (
              <Text key={p.id} size="lg" fw={700}>
                {impostors.length > 1 ? "• " : ""}
                {p.name}
              </Text>
            ))}
            <Text size="sm" c="dimmed" mt="xs">
              Parola: <strong>{selectedPair.impostor}</strong>
            </Text>
          </Alert>

          <Alert color="blue" variant="light">
            <Text fw={600} size="sm" mb="xs">
              📚 Discepoli
            </Text>
            {disciplePlayers.map((p) => (
              <Text key={p.id} size="md" fw={500}>
                • {p.name}
              </Text>
            ))}
            <Text size="sm" c="dimmed" mt="xs">
              Parola: <strong>{selectedPair.disciple}</strong>
            </Text>
          </Alert>

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
