import { Button, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const loadTasks = async () => {
    const res = await fetch("http://localhost:4000/tasks");
    const data = await res.json();
    setTasks(data);
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      {tasks.length <= 0 ? <h1>No Task</h1> : <h1>List Tasks</h1>}
      {tasks.map((task) => (
        <Card
          key={task.id}
          style={{
            marginBottom: "1rem",
            backgroundColor: "#1e272e",
          }}
        >
          <CardContent
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "white",
              }}
            >
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                style={{
                  marginRight: ".5rem",
                }}
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                Edit
              </Button>
              <Button
                color="warning"
                variant="contained"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default TaskList;
