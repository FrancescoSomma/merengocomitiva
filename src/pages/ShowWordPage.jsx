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
  Center,
  Group,
  Badge,
  Alert,
} from '@mantine/core';
import { IconEye, IconEyeOff, IconArrowRight } from '@tabler/icons-react';
import {
  selectCurrentPlayer,
  selectSelectedPair,
  selectJournalist,
  selectImpostor,
  selectCurrentPlayerIndex,
  selectPlayers,
  nextPlayer,
} from '../store/gameSlice';

function ShowWordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);
  const selectedPair = useSelector(selectSelectedPair);
  const journalist = useSelector(selectJournalist);
  const impostor = useSelector(selectImpostor);
  const currentPlayerIndex = useSelector(selectCurrentPlayerIndex);
  const players = useSelector(selectPlayers);
  
  const [wordVisible, setWordVisible] = useState(false);

  if (!currentPlayer || !selectedPair) {
    navigate('/');
    return null;
  }

  const isJournalist = currentPlayer.id === journalist;
  const isImpostor = currentPlayer.id === impostor;
  
  let displayWord = '';
  let role = 'Discepolo';
  let roleColor = 'blue';

  if (isJournalist) {
    displayWord = '🔍 GIORNALISTA';
    role = 'Giornalista';
    roleColor = 'green';
  } else if (isImpostor) {
    displayWord = selectedPair.impostor;
    role = 'Ruolo Segreto';
    roleColor = 'orange';
  } else {
    displayWord = selectedPair.disciple;
    role = 'Ruolo Segreto';
    roleColor = 'blue';
  }

  const handleNext = () => {
    setWordVisible(false);
    dispatch(nextPlayer());
    
    if (currentPlayerIndex >= players.length - 1) {
      navigate('/game');
    }
  };

  return (
    <Container size="sm" py="xl" style={{ minHeight: '100vh' }}>
      <Stack gap="xl" align="center">
        <Paper p="md" withBorder style={{ width: '100%' }}>
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Giocatore {currentPlayerIndex + 1} di {players.length}
            </Text>
            <Badge variant="light" color="violet">
              {currentPlayerIndex + 1}/{players.length}
            </Badge>
          </Group>
        </Paper>

        <Paper
          shadow="lg"
          p="xl"
          radius="lg"
          style={{
            width: '100%',
            minHeight: '300px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <Stack align="center" gap="xl">
            <Badge size="xl" variant="filled" color={roleColor}>
              {role}
            </Badge>
            
            <Title order={1} c="white" ta="center" style={{ fontSize: '2rem' }}>
              {currentPlayer.name}
            </Title>

            {!wordVisible ? (
              <Center style={{ minHeight: '120px', width: '100%' }}>
                <Button
                  size="xl"
                  variant="white"
                  color="violet"
                  leftSection={<IconEye size={24} />}
                  onClick={() => setWordVisible(true)}
                >
                  Mostra la Parola
                </Button>
              </Center>
            ) : (
              <Paper
                p="xl"
                radius="md"
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Title
                  order={2}
                  ta="center"
                  style={{
                    fontSize: isJournalist ? '1.5rem' : '2.5rem',
                    color: '#667eea',
                  }}
                >
                  {displayWord}
                </Title>
              </Paper>
            )}

            {isJournalist && wordVisible && (
              <Alert color="yellow" variant="filled" style={{ width: '100%' }}>
                <Text size="sm" ta="center" fw={500}>
                  Sei il Giornalista! Il tuo compito è scoprire chi è l'Impostore.
                </Text>
              </Alert>
            )}
          </Stack>
        </Paper>

        {wordVisible && (
          <Stack gap="md" style={{ width: '100%' }}>
            <Alert icon={<IconEyeOff size={18} />} color="red" variant="light">
              Memorizza la tua parola e non farla vedere agli altri!
            </Alert>
            
            <Button
              size="lg"
              fullWidth
              rightSection={<IconArrowRight size={20} />}
              onClick={handleNext}
            >
              {currentPlayerIndex < players.length - 1
                ? 'Giocatore Successivo'
                : 'Inizia la Partita'}
            </Button>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}

export default ShowWordPage;

