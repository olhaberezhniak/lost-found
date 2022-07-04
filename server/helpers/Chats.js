const { chats } = require("../models/Chats");
const { messages } = require("../models/Messages");
const { UploadToCloudinary } = require("../utils/Cloudinary");

async function getOrCreateChatRoom(user_one, user_two, initialMessage) {
  try {
    let chatRoom = await chats.findOne({
      participants: {
        $all: [user_one, user_two],
      },
    });

    if (!chatRoom) {
      chatRoom = new chats({
        participants: [user_one, user_two],
      });

      await chatRoom.save();
    }

    if (initialMessage !== null) {
      let message = new messages({
        room_id: chatRoom._id,
        sender_id: user_one,
        reciever_id: user_two,
        ...initialMessage,
      });

      chatRoom.last_message = message;

      await message.save();
      await chatRoom.save();
    }

    return { room: chatRoom };
  } catch (error) {
    return error;
  }
}

async function UploadChatFile(destination, message_file) {
  try {
    const fileUploadResponse = await UploadToCloudinary(
      message_file.buffer,
      destination
    );

    if (fileUploadResponse?.secure_url) {
      let payload = {
        _id: fileUploadResponse.asset_id,
        uri: fileUploadResponse.secure_url,
        public_id: fileUploadResponse.public_id,
        width: fileUploadResponse.width,
        height: fileUploadResponse.height,
        mimeType: message_file.mimeType,
      };

      if (message_file?.mimeType?.slice(0, 5) === "audio")
        payload.duration = fileUploadResponse.duration * 1000;

      return { file: payload, message: "File upload Successfull", ok: true };
    } else {
      return { message: "File upload failed", ok: false };
    }
  } catch (error) {
    return { message: "File upload failed", ok: false };
  }
}

exports.GetOrCreateChatRoom = getOrCreateChatRoom;
exports.UploadChatFile = UploadChatFile;
