import {
  Card,
  CardContent,
  Typography
} from "@mui/material";

export default function NotificationCard({

  notification,
  viewed,
  onClick

}) {

  return (

    <Card

      onClick={onClick}

     sx={{
  marginBottom: 2,
  borderRadius: 3,
  boxShadow: 3,
  padding: 1,
  cursor: "pointer",
  border: viewed
    ? "1px solid #cccccc"
    : "2px solid #1976d2",
  backgroundColor:
    viewed ? "#f5f5f5" : "#ffffff"
}}
    >

      <CardContent>

        <Typography variant="h6">
          {notification.Type}
        </Typography>

        <Typography>
          {notification.Message}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {notification.Timestamp}
        </Typography>

      </CardContent>

    </Card>
  );
}