import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { AppShell } from "@mantine/core";

function App() {
  return (
    <BrowserRouter>
      <AppShell
        padding={0}
        styles={{
          main: {
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
          },
        }}
      >
        <AppRouter />
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
