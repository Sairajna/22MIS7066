import {
  Container,
  Typography,
  Select,
  MenuItem
} from "@mui/material";

import {
  useEffect,
  useState
} from "react";

import { fetchNotifications }
from "../api/notificationApi";

import NotificationCard
from "../components/NotificationCard";

export default function FilterNotifications() {

  const [type, setType] =
    useState("");

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {

    async function loadData() {

      try {

        const data =
          await fetchNotifications(
            1,
            10,
            type
          );

        setNotifications(data);

      } catch (error) {

        console.log(error.message);
      }
    }

    loadData();

  }, [type]);

  return (

    <Container sx={{ marginTop: 4 }}>

      <Typography
        variant="h4"
        marginBottom={3}
      >
        Filter Notifications
      </Typography>

      <Select

        value={type}

        onChange={(event) =>
          setType(event.target.value)
        }

        displayEmpty

        fullWidth

        sx={{ marginBottom: 3 }}
      >

        <MenuItem value="">
          All
        </MenuItem>

        <MenuItem value="Placement">
          Placement
        </MenuItem>

        <MenuItem value="Result">
          Result
        </MenuItem>

        <MenuItem value="Event">
          Event
        </MenuItem>

      </Select>

      {notifications.map(notification => (

        <NotificationCard
          key={notification.ID}
          notification={notification}
          viewed={false}
        />
      ))}

    </Container>
  );
}