import React from 'react'
import { Box, Divider, Typography } from '@mui/material'
import AssignmentIcon from "@mui/icons-material/Assignment";
const NoTasks = () => {
  return (
   <>
   <Divider sx={{bgcolor:"text.secondary", mt:2}}/>
     <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              color: "text.secondary",
              pt: 8,
              gap: 2,
            }}
          >
            <AssignmentIcon sx={{ fontSize: "3rem" }} />
            <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.2rem" , textAlign:"center"}}>
              You don't have any tasks registered yet.
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "gray", fontSize: "1.2rem", textAlign:"center" }}>
              Create tasks and organize your todo items.
            </Typography>
          </Box>
   </>
  )
}

export default NoTasks