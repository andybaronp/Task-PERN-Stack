import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
