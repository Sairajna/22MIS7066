import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@mui/material";

import { Link } from "react-router-dom";

export default function Navbar() {

  return (

    <AppBar position="static">

      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Notification Portal
        </Typography>

        <Button
          color="inherit"
          component={Link}
          to="/"
        >
          All
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/priority"
        >
          Priority
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/filter"
        >
          Filter
        </Button>

      </Toolbar>

    </AppBar>
  );
}