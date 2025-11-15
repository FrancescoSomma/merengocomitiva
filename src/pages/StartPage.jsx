import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Paper,
  Center,
  Modal,
  SimpleGrid,
  Badge,
  Group,
  Divider,
  ScrollArea,
  TextInput,
  Alert,
} from "@mantine/core";
import {
  IconSparkles,
  IconBook,
  IconWand,
  IconAlertCircle,
} from "@tabler/icons-react";
import wordsData from "../data/words.json";
import { setCustomWords } from "../store/gameSlice";

function StartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showWords, setShowWords] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [discipleWord, setDiscipleWord] = useState("");
  const [impostorWord, setImpostorWord] = useState("");
  const [error, setError] = useState("");

  return (
    <Center style={{ minHeight: "100vh", padding: "1rem" }}>
      <Container size="sm">
        <Paper
          shadow="md"
          p="xl"
          radius="lg"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <Stack align="center" gap="xl">
            <IconSparkles size={80} stroke={1.5} />

            <Title order={1} ta="center" style={{ fontSize: "2.5rem" }}>
              Little Secret
            </Title>

            <Text size="lg" ta="center" style={{ maxWidth: "400px" }}>
              Un gioco di parole, ruoli e deduzione. Riuscirai a scoprire chi è
              l'impostore?
            </Text>

            <Stack gap="md" style={{ width: "100%", marginTop: "1rem" }}>
              <Button
                size="lg"
                variant="white"
                color="violet"
                fullWidth
                onClick={() => navigate("/add-players")}
                style={{ fontWeight: 600 }}
              >
                Inizia Partita
              </Button>

              <Button
                size="md"
                variant="light"
                color="white"
                fullWidth
                leftSection={<IconWand size={18} />}
                onClick={() => setShowCustomModal(true)}
              >
                Partita Custom
              </Button>

              <Button
                size="md"
                variant="light"
                color="white"
                fullWidth
                leftSection={<IconBook size={18} />}
                onClick={() => setShowWords(true)}
              >
                Visualizza Parole Disponibili
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>

      {/* Modal Partita Custom */}
      <Modal
        opened={showCustomModal}
        onClose={() => {
          setShowCustomModal(false);
          setDiscipleWord("");
          setImpostorWord("");
          setError("");
        }}
        title={
          <Group gap="xs">
            <IconWand size={24} />
            <Text fw={700} size="lg">
              Crea Partita Custom
            </Text>
          </Group>
        }
        size="md"
        centered
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed" ta="center">
            Scegli le due parole che verranno usate nella partita
          </Text>

          {error && (
            <Alert
              icon={<IconAlertCircle size={18} />}
              color="red"
              variant="light"
            >
              {error}
            </Alert>
          )}

          <TextInput
            label="Parola Discepoli"
            placeholder="Es: CANE"
            value={discipleWord}
            onChange={(e) => setDiscipleWord(e.target.value.toUpperCase())}
            size="md"
            required
          />

          <TextInput
            label="Parola Impostori"
            placeholder="Es: GATTO"
            value={impostorWord}
            onChange={(e) => setImpostorWord(e.target.value.toUpperCase())}
            size="md"
            required
          />

          <Alert color="blue" variant="light">
            <Text size="xs">
              💡 Le parole devono essere simili ma diverse per rendere il gioco
              interessante!
            </Text>
          </Alert>

          <Button
            fullWidth
            size="md"
            onClick={() => {
              if (!discipleWord.trim() || !impostorWord.trim()) {
                setError("Entrambe le parole sono obbligatorie!");
                return;
              }
              if (discipleWord.trim() === impostorWord.trim()) {
                setError("Le due parole devono essere diverse!");
                return;
              }
              dispatch(
                setCustomWords({
                  disciple: discipleWord.trim(),
                  impostor: impostorWord.trim(),
                })
              );
              setShowCustomModal(false);
              setDiscipleWord("");
              setImpostorWord("");
              setError("");
              navigate("/add-players");
            }}
          >
            Continua con questi Parole
          </Button>
        </Stack>
      </Modal>

      {/* Modal Lista Parole */}
      <Modal
        opened={showWords}
        onClose={() => setShowWords(false)}
        title={
          <Group gap="xs">
            <IconBook size={24} style={{ color: "#fff" }} />
            <Text fw={700} size="lg" style={{ color: "#fff" }}>
              Parole Disponibili ({wordsData.length})
            </Text>
          </Group>
        }
        size="lg"
        centered
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed" ta="center">
            Ecco tutte le coppie di parole con cui puoi giocare. I Discepoli
            ricevono la parola a sinistra, gli Impostori quella a destra.
          </Text>

          <Divider />

          <ScrollArea h={500}>
            <Stack gap="xs">
              {wordsData.map((pair, index) => (
                <Paper key={index} p="sm" withBorder>
                  <SimpleGrid cols={2} spacing="md">
                    <Group gap="xs">
                      <Badge color="blue" variant="light" size="sm">
                        Discepolo
                      </Badge>
                      <Text fw={600} size="sm">
                        {pair.disciple}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <Badge color="orange" variant="light" size="sm">
                        Impostore
                      </Badge>
                      <Text fw={600} size="sm">
                        {pair.impostor}
                      </Text>
                    </Group>
                  </SimpleGrid>
                </Paper>
              ))}
            </Stack>
          </ScrollArea>

          <Button fullWidth onClick={() => setShowWords(false)} mt="md">
            Chiudi
          </Button>
        </Stack>
      </Modal>
    </Center>
  );
}

export default StartPage;
