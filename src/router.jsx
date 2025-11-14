import { Routes, Route, Navigate } from "react-router-dom";
import StartPage from "./pages/StartPage";
import AddPlayersPage from "./pages/AddPlayersPage";
import ShowWordPage from "./pages/ShowWordPage";
import GamePage from "./pages/GamePage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/add-players" element={<AddPlayersPage />} />
      <Route path="/show-word" element={<ShowWordPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
