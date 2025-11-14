import { useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Stack, Paper, Center } from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';

function StartPage() {
  const navigate = useNavigate();

  return (
    <Center style={{ minHeight: '100vh', padding: '1rem' }}>
      <Container size="sm">
        <Paper
          shadow="md"
          p="xl"
          radius="lg"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <Stack align="center" gap="xl">
            <IconSparkles size={80} stroke={1.5} />
            
            <Title order={1} ta="center" style={{ fontSize: '2.5rem' }}>
              Little Secret
            </Title>
            
            <Text size="lg" ta="center" style={{ maxWidth: '400px' }}>
              Un gioco di parole, ruoli e deduzione. Riuscirai a scoprire chi è l'impostore?
            </Text>

            <Stack gap="md" style={{ width: '100%', marginTop: '1rem' }}>
              <Button
                size="lg"
                variant="white"
                color="violet"
                fullWidth
                onClick={() => navigate('/add-players')}
                style={{ fontWeight: 600 }}
              >
                Inizia Partita
              </Button>
              
              <Paper p="md" radius="md" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <Text size="sm" ta="center" fw={500}>
                  📋 Regole del Gioco
                </Text>
                <Text size="xs" ta="center" mt="xs" style={{ opacity: 0.9 }}>
                  • 1 Giornalista (conosce il suo ruolo)<br />
                  • 1 Impostore (non sa di esserlo)<br />
                  • Altri giocatori: Discepoli (non sanno di esserlo)
                </Text>
              </Paper>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Center>
  );
}

export default StartPage;

