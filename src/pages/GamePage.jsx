import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@mantine/core';
import {
  IconTrophy,
  IconEye,
  IconRefresh,
  IconSparkles,
  IconUsers,
} from '@tabler/icons-react';
import {
  selectPlayers,
  selectSelectedPair,
  selectJournalist,
  selectImpostor,
  selectDisciples,
  resetGame,
} from '../store/gameSlice';

function GamePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const selectedPair = useSelector(selectSelectedPair);
  const journalist = useSelector(selectJournalist);
  const impostor = useSelector(selectImpostor);
  const disciples = useSelector(selectDisciples);
  
  const [showSolution, setShowSolution] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  if (!selectedPair) {
    navigate('/');
    return null;
  }

  const journalistPlayer = players.find(p => p.id === journalist);
  const impostorPlayer = players.find(p => p.id === impostor);
  const disciplePlayers = players.filter(p => disciples.includes(p.id));

  const handleReset = () => {
    dispatch(resetGame());
    navigate('/');
  };

  return (
    <Container size="sm" py="xl" style={{ minHeight: '100vh' }}>
      <Stack gap="lg">
        <Paper
          shadow="md"
          p="xl"
          radius="lg"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <Stack align="center" gap="md">
            <IconTrophy size={50} />
            <Title order={1} ta="center">
              Partita in Corso
            </Title>
            <Text size="lg" ta="center">
              Fate a turno domande e cercate di scoprire l'impostore!
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
              const isJournalist = player.id === journalist;
              const isImpostor = player.id === impostor;
              
              return (
                <Paper key={player.id} p="md" withBorder>
                  <Group justify="space-between">
                    <Text fw={500} size="md">{player.name}</Text>
                    {isJournalist && (
                      <Badge color="green" variant="light">
                        👤
                      </Badge>
                    )}
                    {!isJournalist && !isImpostor && (
                      <Badge color="blue" variant="light">
                        👥
                      </Badge>
                    )}
                    {isImpostor && (
                      <Badge color="orange" variant="light">
                        ❓
                      </Badge>
                    )}
                  </Group>
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
                  Ogni giocatore descrive la propria parola senza dirla direttamente.
                </Text>
                <Text size="sm">
                  <strong>2. Individuate l'impostore</strong>
                  <br />
                  I Discepoli hanno la stessa parola, l'Impostore ne ha una diversa ma simile.
                </Text>
                <Text size="sm">
                  <strong>3. Il Giornalista conduce</strong>
                  <br />
                  Il Giornalista (che conosce il suo ruolo) deve scoprire chi è l'Impostore.
                </Text>
                <Text size="sm">
                  <strong>4. Votate</strong>
                  <br />
                  Alla fine, votate per chi pensate sia l'Impostore!
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
        title={<Text fw={700} size="lg">🎯 Soluzione</Text>}
        size="md"
        centered
      >
        <Stack gap="md">
          <Alert color="green" variant="light">
            <Text fw={600} size="sm" mb="xs">
              🔍 Giornalista
            </Text>
            <Text size="lg" fw={700}>
              {journalistPlayer?.name}
            </Text>
          </Alert>

          <Alert color="orange" variant="light">
            <Text fw={600} size="sm" mb="xs">
              🎭 Impostore
            </Text>
            <Text size="lg" fw={700} mb="xs">
              {impostorPlayer?.name}
            </Text>
            <Text size="sm" c="dimmed">
              Parola: <strong>{selectedPair.impostor}</strong>
            </Text>
          </Alert>

          <Alert color="blue" variant="light">
            <Text fw={600} size="sm" mb="xs">
              📚 Discepoli
            </Text>
            {disciplePlayers.map(p => (
              <Text key={p.id} size="md" fw={500}>
                • {p.name}
              </Text>
            ))}
            <Text size="sm" c="dimmed" mt="xs">
              Parola: <strong>{selectedPair.disciple}</strong>
            </Text>
          </Alert>

          <Button
            fullWidth
            onClick={() => setShowSolution(false)}
            mt="md"
          >
            Chiudi
          </Button>
        </Stack>
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
            Sei sicuro di voler iniziare una nuova partita? Tutti i dati attuali verranno persi.
          </Text>
          <Group grow>
            <Button
              variant="light"
              onClick={() => setShowResetModal(false)}
            >
              Annulla
            </Button>
            <Button
              color="red"
              onClick={handleReset}
            >
              Nuova Partita
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}

export default GamePage;

