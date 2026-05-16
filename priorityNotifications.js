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

        const response = await axios.get(API_URL);

        const notifications =
            response.data.notifications || [];

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