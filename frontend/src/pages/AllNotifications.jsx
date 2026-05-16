import {
  Container,
  Grid,
  Typography
} from "@mui/material";

import {
  useEffect,
  useState
} from "react";

import { fetchNotifications }
from "../api/notificationApi";

import NotificationCard
from "../components/NotificationCard";

import PaginationControls
from "../components/PaginationControls";

export default function AllNotifications() {

  const [notifications, setNotifications] =
    useState([]);

  const [page, setPage] = useState(1);

  const [viewedIds, setViewedIds] =
    useState([]);

  useEffect(() => {

    async function loadNotifications() {

      try {

        const data =
          await fetchNotifications(page);

        setNotifications(data);

      } catch (error) {

        console.log(error.message);
      }
    }

    loadNotifications();

  }, [page]);

  function markViewed(id) {

    if (!viewedIds.includes(id)) {

      setViewedIds([
        ...viewedIds,
        id
      ]);
    }
  }

  return (

    <Container sx={{ marginTop: 4 }}>

      <Typography
        variant="h4"
        marginBottom={3}
      >
        All Notifications
      </Typography>

      <Grid container spacing={2}>

        {notifications.map(notification => (

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={notification.ID}
          >

            <NotificationCard

              notification={notification}

              viewed={
                viewedIds.includes(
                  notification.ID
                )
              }

              onClick={() =>
                markViewed(notification.ID)
              }
            />

          </Grid>
        ))}

      </Grid>

      <PaginationControls
        page={page}
        setPage={setPage}
      />

    </Container>
  );
}