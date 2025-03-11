"use client";
import { Box, Card, CardContent, Checkbox, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { changeStatus, deleteTask, getAllTasks } from "@/config/ApiConfig";
import NoTasks from "./NoTasks";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {toast} from 'react-toastify'

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  color: string;
}

const TaskCard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [completedCount, setCompletedCount] = useState(0);
  const router = useRouter();

  const toggleCompleted = async (id: number) => {
    const newStatus = status === "COMPLETED" ? "PENDING" : "COMPLETED";
    const response = await changeStatus(`tasks/${id}/update/status`);
    if (response && response.success) {
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, status: task.status === "PENDING" ? "COMPLETED" : "PENDING" } : task)));
      setCompletedCount((prevCount) => (tasks.find((task) => task.id === id)?.status === "PENDING" ? prevCount + 1 : prevCount - 1));
      toast.success(`Task marked as ${newStatus.toLowerCase()}`)
    }else{
      toast.error("Error toggling the task.")
    }
  };

  const handleDeleteTask = async (id: number) => {
    const response = await deleteTask(`tasks/${id}/delete`);
    if (response && response.success) {
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success("Task deleted successfully.")
    }else{
      toast.error("Error deleting the task.")
    }
  };

  const fetchTasks = async () => {
    const response = await getAllTasks("tasks");
    if (response && response.success) {
      setTasks(response.data);
      const completedTasks = response.data.filter((task: any) => task.status === "COMPLETED").length;
      setCompletedCount(completedTasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      {tasks.length === 0 ? (
        <NoTasks />
      ) : (
        <>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", mt: 2, flexGrow: 0 }}>
            <Typography variant="body1" sx={{ color: "primary.main", fontWeight: "bold", fontSize: "1.2rem" }}>
              Tasks : {tasks.length}
            </Typography>
            <Typography variant="body1" sx={{ color: "primary.light", fontWeight: "bold", fontSize: "1.2rem" }}>
              Completed: {completedCount} of {tasks.length}
            </Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexGrow: 1,
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              color: "text.secondary",
              mt: 2,
              gap: 2,
              pb: 4,
              overflowX: "hidden",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "4px", // Scrollbar width
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "primary.main", // Thumb color
                borderRadius: "8px", // Rounded edges
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "primary.dark", // Thumb color on hover
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "background.default", // Track color
              },
            }}
          >
            <AnimatePresence>
              {tasks
                .slice()
                .sort((a, b) => (a.status === "PENDING" ? -1 : 1))
                .map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }} // Animation when appearing
                    animate={{ opacity: 1, y: 0 }} // Animation when in place
                    exit={{ opacity: 0, x: -100 }} // Animation when removed
                    transition={{ duration: 0.3 }}
                    style={{ width: "100%", display:"flex" }}
                  >
                    <Card
                      elevation={2}
            
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        minHeight: "60px",
                        cursor:"pointer"
                      }}
                      sx={{ pr: 2, p: 0, bgcolor: "background.paper", transition:"background-color 0.3s ease", "&:hover": {bgcolor:"secondary.main", transition:"background-color 0.3s ease"} }}
                   
                    >
                      {/*Color Indicator */}

                      <Box sx={{ width: "6px", height: "100%", bgcolor: task.color ? task.color: "secondary.main", borderRadius: "0", mr: 1 }} />

                      {/* Circular Checkbox */}
                      <Checkbox
                        checked={task.status === "COMPLETED"}
                        onChange={() => toggleCompleted(task.id)}
                        icon={<RadioButtonUncheckedIcon sx={{ color: "primary.main" }} />}
                        checkedIcon={<CheckCircleIcon sx={{ color: "primary.light" }} />}
                      />

                      {/* Task Title */}
                      <CardContent style={{ flexGrow: 1 }} sx={{ py: 2 }}  onClick = {()=>{router.push(`/edit/${task.id}`)}}>
                        <Typography
                          variant="h6"
                          style={{ wordWrap: "break-word", color: "text.secondary" }}
                          sx={[task.status === "COMPLETED" && { textDecoration: "line-through", color: "text.secondary" }]}
                        >
                          {task.description}
                        </Typography>
                      </CardContent>

                      {/* Delete Button */}
                      <IconButton onClick={() => handleDeleteTask(task.id)} aria-label="Delete task">
                        <DeleteIcon sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }} />
                      </IconButton>
                    </Card>
                  </motion.div>
                ))}
            </AnimatePresence>
          </Box>
        </>
      )}
    </>
  );
};

export default TaskCard;
