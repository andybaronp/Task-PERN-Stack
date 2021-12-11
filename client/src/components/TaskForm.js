import {
  Grid,
  Card,
  Typography,
  TextField,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  //loadin
  const [loading, setLoading] = useState(false);
  const [editind, setEditind] = useState(false);
  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const navigate = useNavigate();
  const { id } = useParams();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (editind) {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
    } else {
      await fetch("http://localhost:4000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    navigate("/");
    setLoading(false);
  };
  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`);
    const data = await res.json();
    setTask({ title: data.title, description: data.description });
    setEditind(true);
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (id) {
      loadTask(id);
    }
    //onsuscribe
    return () => {
      abortController.abort();
    };
  }, [id]);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography variant="h5" textaling="center" color="white">
            {editind ? "Edit Task" : "Add Task"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Task Name"
                sx={{
                  display: "block",
                  margin: " dense",
                  color: "white",
                }}
                name="title"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                value={task.title}
              />
              <TextField
                variant="filled"
                label="Write your description"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: ".dense",
                }}
                name="description"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                value={task.description}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!task.title || !task.description}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
