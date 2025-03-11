"use client";
import { Box, Button, Container, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import { addTask, editTask, getTaskById } from "@/config/ApiConfig";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EditTodo = () => {
  const [task, setTask] = useState({
    title: "title",
    description: "",
    color: "",
  });

  const [updatedTask, setUpdatedTask] = useState({ title: "title", description: "", color: "" });

  const router = useRouter();
  const { taskId } = useParams();

  const [error, setError] = useState({ description: false, message: "" });

  const handleUpdate = async () => {
    if (!task.description.trim()) {
      setError({ description: true, message: "Task title cannot be empty!" });
      return;
    }
    setError({ description: false, message: "" });

    const response = await editTask(`tasks/${taskId}/update`, updatedTask);
    if (response && response.success) {
      router.push("/");
      toast.success("Task updated successfully.");
    } else {
      toast.error("Error updating the task.");
    }
  };

  const handleInputChange = (description: string) => {
    setUpdatedTask((prevTask) => ({ ...prevTask, description: description }));
    if (description.trim()) {
      setError({ description: false, message: "" });
    }
  };

  const handleColorChange = (selectedColor: string) => {
    if (selectedColor === updatedTask.color) {
      setUpdatedTask((prevTask) => ({ ...prevTask, color: "" }));
    } else {
      setUpdatedTask((prevTask) => ({ ...prevTask, color: selectedColor }));
    }
  };

  const fetchTask = async () => {
    const response = await getTaskById(`tasks/${taskId}`);
    if (response && response.success) {
      const { description, color } = response.data;
      setTask((prevTask) => ({ ...prevTask, description: description, color: color }));
      setUpdatedTask((prevTask) => ({ ...prevTask, description: description, color: color }));
    }
  };

  const handleBack = () => {
    if (task.description === updatedTask.description && task.color === updatedTask.color) {
      router.back();
    } else {
      handleUpdate();
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const colors = ["#FF5733", "#FFC107", "#4CAF50", "#2196F3", "#9C27B0", "#E91E63", "#795548"];

  return (
    <>
      <Container sx={{ display: "flex", height: "100%", justifyContent: "center", pt: 2, flexGrow: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center", width: "80%", gap: 2 }}>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "start" }}>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon sx={{ color: "text.primary" }} />
            </IconButton>
          </Box>
          <Typography variant="body1" sx={{ width: "100%", color: "primary.main", fontWeight: "bold", mt: 4, fontSize: "1.2rem" }}>
            Title
          </Typography>
          <TextField
            variant="filled"
            name="description"
            label="Enter your title here"
            value={updatedTask.description}
            fullWidth
            error={error.description}
            helperText={error.message}
            sx={{
              width: "100%",
              backgroundColor: "background.paper",
              fontSize: "1.5rem",
            }}
            onChange={(e) => handleInputChange(e.target.value)}
          />

          {/* Color Selection */}
          <Typography variant="body1" sx={{ color: "primary.main", fontWeight: "bold", mb: 1, fontSize: "1.2rem", width: "100%" }}>
            Color
          </Typography>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "start", gap: 2 }}>
            {colors.map((color) => (
              <Box
                key={color}
                onClick={() => handleColorChange(color)}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: color,
                  cursor: "pointer",
                  border: updatedTask.color === color ? "3px solid white" : "3px solid transparent",
                  boxShadow: updatedTask.color === color ? "0 0 8px rgba(255, 255, 255, 0.8)" : "none",
                }}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%", fontSize: "1rem", mt: 2, "&:hover": { bgcolor: "primary.main" } }}
            onClick={handleUpdate}
          >
            Update
            <DoneIcon sx={{ ml: 1 }} />
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default EditTodo;
