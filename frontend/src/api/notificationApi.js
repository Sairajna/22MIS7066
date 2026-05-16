export async function fetchNotifications(
  page = 1,
  limit = 10,
  type = ""
) {

  const notifications = [

    {
      ID: "101",
      Type: "Placement",
      Message: "Amazon hiring drive",
      Timestamp: "2026-04-22 17:51:18"
    },

    {
      ID: "102",
      Type: "Result",
      Message: "Semester result published",
      Timestamp: "2026-04-22 17:51:30"
    },

    {
      ID: "103",
      Type: "Event",
      Message: "Tech Fest registration open",
      Timestamp: "2026-04-22 17:50:06"
    },

    {
      ID: "104",
      Type: "Placement",
      Message: "Infosys drive tomorrow",
      Timestamp: "2026-04-22 17:52:00"
    },

    {
      ID: "105",
      Type: "Result",
      Message: "Project review marks updated",
      Timestamp: "2026-04-22 17:49:54"
    },

    {
      ID: "106",
      Type: "Event",
      Message: "Hackathon registration open",
      Timestamp: "2026-04-22 17:45:00"
    },

    {
      ID: "107",
      Type: "Placement",
      Message: "Microsoft placement drive",
      Timestamp: "2026-04-22 17:53:00"
    },

    {
      ID: "108",
      Type: "Result",
      Message: "Lab internal marks uploaded",
      Timestamp: "2026-04-22 17:42:00"
    }
  ];

  let filteredNotifications =
    notifications;

  if (type) {

    filteredNotifications =
      notifications.filter(item => {

        return item.Type === type;
      });
  }

  const startIndex =
    (page - 1) * limit;

  const endIndex =
    startIndex + limit;

  return filteredNotifications.slice(
    startIndex,
    endIndex
  );
}