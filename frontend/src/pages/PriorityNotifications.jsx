import {
  Container,
  Typography
} from "@mui/material";

import {
  useEffect,
  useState
} from "react";

import { fetchNotifications }
from "../api/notificationApi";

import { sortByPriority }
from "../utils/priorityUtils";

import NotificationCard
from "../components/NotificationCard";

export default function PriorityNotifications() {

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {

    async function loadData() {

      try {

        const data =
          await fetchNotifications(1, 20);

        const sorted =
          sortByPriority(data);

        setNotifications(
          sorted.slice(0, 10)
        );

      } catch (error) {

        console.log(error.message);
      }
    }

    loadData();

  }, []);

  return (

    <Container sx={{ marginTop: 4 }}>

      <Typography
        variant="h4"
        marginBottom={3}
      >
        Priority Notifications
      </Typography>

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