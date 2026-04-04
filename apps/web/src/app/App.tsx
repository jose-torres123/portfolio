import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/features/home/index.js";

export function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
