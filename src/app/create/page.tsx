"use client";
import { Box, Button, Container, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import { addTask } from "@/config/ApiConfig";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateTodo = () => {
  const [task, setTask] = useState({
    title: "title",
    description: "",
    color: "",
  });

  const router = useRouter();

  const [error, setError] = useState({description :false, message:""});

  const handleCreate = async () => {
    if  (!task.description.trim()){
      setError({description:true, message:"Task title cannot be empty!"});
      return
    }
    setError({description:false, message:""})
    
    const response = await addTask("task/create", task);
    if(response && response.success){
      router.push("/");
      toast.success("Task created successfully.")
    }else{
      toast.error("Error creating the task.")
    }

  };

  const handleInputChange = (description: string) => {
    setTask((prevTask) => ({ ...prevTask, description: description }));
    if (description.trim()) {
      setError({ description: false, message: "" });
    }
  };

  const handleColorChange = (selectedColor: string) => {
    if(selectedColor === task.color){
      setTask((prevTask) => ({ ...prevTask, color: "" }));
    }else{
      setTask((prevTask) => ({ ...prevTask, color: selectedColor }));
    }
    
  };

  const handleBack = () => {
    router.back();
  }

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
          <Typography variant="body1" sx={{ color: "primary.main", fontWeight: "bold", mb: 1, fontSize: "1.2rem", width:"100%" }}>
            Color
          </Typography>
          <Box sx={{ display: "flex",width:"100%", justifyContent:"start", gap: 2 }}>
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
                  border: task.color === color ? "3px solid white" : "3px solid transparent",
                  boxShadow: task.color === color ? "0 0 8px rgba(255, 255, 255, 0.8)" : "none",
                }}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%", fontSize: "1rem", mt:2, "&:hover": { bgcolor: "primary.main", } }}
            onClick={handleCreate}
          >
            Save
            <DoneIcon sx={{ ml: 1 }} />
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CreateTodo;
