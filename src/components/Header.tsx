"use client";
import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { InboxOutlined, Mail, MailOutline } from "@mui/icons-material";
import RocketIcon from "@mui/icons-material/Rocket";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleDrawer = (state: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setOpen(state);
  };

  const list = () => (
    <Box
      sx={{ width: 250, backgroundColor: "background.gray", height: "100%", color: "#ffffff", flexGrow: 0 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "#ffffff" }}>{index % 2 === 0 ? <InboxOutlined /> : <MailOutline />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "#ffffff" }}>{index % 2 === 0 ? <InboxOutlined /> : <MailOutline />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box sx={{ backgroundColor: "background.gray", display: "flex", width: "100%", height: 60, alignItems: "center", position: "relative", p: 2 }}>
        <IconButton onClick={toggleDrawer(true)} sx={{ color: "#ffffff" }}>
          <MenuIcon sx={{ fontSize: { xs: "1.4rem", sm: "1.8rem" } }} />
        </IconButton>
        <Typography
          variant="h3"
          sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: { xs: "1.4rem", sm: "1.8rem" }, color: "#ffffff" }}
        >
          ToDo App Test Task
        </Typography>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} sx={{ backgroundColor: "primary.gray" }}>
          {list()}
        </Drawer>
      </Box>
      <Box
        sx={{
          height: "200px",
          minHeight: "200px",
          width: "100%",
          backgroundColor: "primary.dark",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2, transition: "all 0.3s ease" }}>
          <RocketIcon sx={{ color: "primary.main", fontWeight: "bold", fontSize: { xs: "1.8rem", md: "2.5rem" } }} />
          <Typography sx={{ color: "primary.main", fontWeight: "bold", fontSize: { xs: "1.8rem", md: "2.5rem" } }}>ToDo</Typography>
          <Typography sx={{ color: "primary.light", fontWeight: "bold", ml: 1, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>App</Typography>
        </Box>
        {pathname === "/" && (
          <Button
            onClick={() => router.push("/create")}
            sx={{
              width: { md: "60%", xs: "80%" },
              position: "absolute",
              backgroundColor: "primary.main",
              bottom: "-20px",
              color: "#ffffff",
              fontSize: { xs: "1rem", md: "1.2rem" },
              fontWeight: "bold",
              p: 1,
            }}
          >
            Create Task
            <AddCircleOutlineIcon sx={{ ml: 2 }} />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
