import Header from "@/components/Header";
import { Box, Button, Typography } from "@mui/material";

import NoTasks from "@/components/NoTasks";
import TaskCard from "@/components/TaskCard";

export default function Home() {
  
  return (
    
        <Box sx={{ p: 0, height: "100%", width: { md: "60%", xs: "80%" }, display: "flex", flexDirection: "column", flexGrow: 1, overflow: "hidden", pt:4}}>
          <TaskCard />
        </Box>
  );
}
