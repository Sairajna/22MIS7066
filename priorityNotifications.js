const axios = require("axios");

const API_URL =
    "http://4.224.186.213/evaluation-service/notifications";

const notificationPriority = {
    Placement: 3,
    Result: 2,
    Event: 1
};

function calculatePriorityScore(notification) {

    const priorityWeight =
        notificationPriority[notification.Type] || 0;

    const timestamp =
        new Date(notification.Timestamp).getTime();

    return (priorityWeight * 1000000000) + timestamp;
}

function sortNotifications(notifications) {

    return notifications
        .map(notification => {

            return {
                ...notification,
                score: calculatePriorityScore(notification)
            };
        })
        .sort((first, second) => {

            return second.score - first.score;
        });
}

function getTopNotifications(notifications, limit = 10) {

    return notifications.slice(0, limit);
}

function displayNotifications(notifications) {

    console.table(

        notifications.map(notification => ({

            Type: notification.Type,

            Message: notification.Message,

            Timestamp: notification.Timestamp
        }))
    );
}

async function fetchNotifications() {

    try {

        console.log(
            "Fetching notifications from evaluation API..."
        );

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
    }
];

        if (!notifications.length) {

            console.log(
                "No notifications received"
            );

            return;
        }

        const rankedNotifications =
            sortNotifications(notifications);

        const topNotifications =
            getTopNotifications(rankedNotifications);

        console.log(
            "\nTop Priority Notifications:\n"
        );

        displayNotifications(topNotifications);

    } catch (error) {

        console.log(
            "Failed to fetch notifications"
        );

        if (error.response) {

            console.log(
                `Server responded with status ${error.response.status}`
            );

        } else if (error.request) {

            console.log(
                "No response received from server"
            );

        } else {

            console.log(error.message);
        }
    }
}

fetchNotifications();