const FirebaseApp = require("./Firebase");

const messages = require("../config/messages");

const SendPushNotification = async ({
  push_token = null,
  data = {},
  title,
  body,
  channelId = process.env.default_channel_id,
  imageUrl = null,
}) => {
  try {
    if (push_token === null || push_token.length === 0)
      return { status: 403, data: "Push Token is required", ok: false };

    const response = await FirebaseApp.messaging().send({
      token: push_token,
      notification: {
        title: title,
        body: body,
        ...(imageUrl && {
          imageUrl: imageUrl,
        }),
      },
      android: {
        notification: {
          channelId: channelId,
          ...(imageUrl && {
            imageUrl: imageUrl,
          }),
        },
      },
      data: {
        ...data,
        ...(imageUrl && {
          bigPictureUrl: imageUrl,
          largeIconUrl: imageUrl,
        }),
      },
    });

    return { status: 200, data: response, ok: true };
  } catch (error) {
    return { status: 501, data: messages.serverError, ok: false };
  }
};

exports.SendPushNotification = SendPushNotification;
