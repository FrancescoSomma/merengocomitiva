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
  TextInput,
  Group,
  ActionIcon,
  Alert,
  Badge,
} from '@mantine/core';
import { IconUserPlus, IconTrash, IconAlertCircle, IconArrowLeft, IconWand } from '@tabler/icons-react';
import { addPlayer, removePlayer, selectPlayers, selectCustomWords, startGame } from '../store/gameSlice';

function AddPlayersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const customWords = useSelector(selectCustomWords);
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      dispatch(addPlayer({
        id: Date.now().toString(),
        name: newPlayerName.trim(),
      }));
      setNewPlayerName('');
    }
  };

  const handleRemovePlayer = (playerId) => {
    dispatch(removePlayer(playerId));
  };

  const handleStartGame = () => {
    dispatch(startGame());
    navigate('/show-word');
  };

  const canStartGame = players.length >= 3;

  return (
    <Container size="sm" py="xl" style={{ minHeight: '100vh' }}>
      <Stack gap="lg">
        <Group>
          <ActionIcon
            variant="subtle"
            size="lg"
            onClick={() => navigate('/')}
          >
            <IconArrowLeft size={20} />
          </ActionIcon>
          <div style={{ flex: 1 }}>
            <Title order={2}>Aggiungi Giocatori</Title>
            <Text size="sm" c="dimmed">
              Servono almeno 3 giocatori per iniziare
            </Text>
          </div>
        </Group>

        {customWords && (
          <Alert icon={<IconWand size={18} />} color="violet" variant="light">
            <Text size="sm" fw={500}>
              Partita Custom
            </Text>
            <Text size="xs" c="dimmed" mt="xs">
              Discepoli: <strong>{customWords.disciple}</strong> • Impostori: <strong>{customWords.impostor}</strong>
            </Text>
          </Alert>
        )}

        <Paper shadow="sm" p="md" radius="md">
          <Stack gap="md">
            <Group>
              <TextInput
                placeholder="Nome giocatore"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                style={{ flex: 1 }}
                size="md"
              />
              <Button
                leftSection={<IconUserPlus size={18} />}
                onClick={handleAddPlayer}
                disabled={!newPlayerName.trim()}
              >
                Aggiungi
              </Button>
            </Group>

            {players.length > 0 && (
              <Stack gap="xs" mt="md">
                <Group>
                  <Text fw={500} size="sm">
                    Giocatori
                  </Text>
                  <Badge color="violet" variant="light">
                    {players.length}
                  </Badge>
                </Group>
                
                {players.map((player, index) => (
                  <Paper key={player.id} p="sm" withBorder>
                    <Group justify="space-between">
                      <Group gap="sm">
                        <Badge variant="filled" color="gray" size="lg" circle>
                          {index + 1}
                        </Badge>
                        <Text fw={500}>{player.name}</Text>
                      </Group>
                      <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() => handleRemovePlayer(player.id)}
                      >
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            )}
          </Stack>
        </Paper>

        {!canStartGame && players.length > 0 && (
          <Alert
            icon={<IconAlertCircle size={18} />}
            color="yellow"
            variant="light"
          >
            Aggiungi ancora {3 - players.length} giocator{3 - players.length === 1 ? 'e' : 'i'} per iniziare
          </Alert>
        )}

        {canStartGame && (
          <Button
            size="lg"
            fullWidth
            onClick={handleStartGame}
            style={{ marginTop: 'auto' }}
          >
            Inizia il Gioco ({players.length} giocatori)
          </Button>
        )}
      </Stack>
    </Container>
  );
}

export default AddPlayersPage;

