import axios from "axios";

import {
  GET_ALL_CHATS,
  GET_ALL_MESSAGES_OF_A_CONVERSATION,
  GET_NEXT_BATCH,
  NEW_REQUEST,
  SEND_MESSAGE,
  BASE_URL,
} from "../constants/AllConstants";

export const getAllChats = (data) => async (dispatch) => {
  debugger;
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });

  try {
    const res = await axios.post(BASE_URL + "/chats/get-chats", {
      headers: {
        authorization: `Bearer ${data.token}`,
      },
      data,
    });

    dispatch({
      type: GET_ALL_CHATS,
      payload: res.data.Chats,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getMessages = (data) => async (dispatch) => {
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });

  try {
    const res = await axios.get(
      BASE_URL + `/chats/get-messages?room_id=${data.room_id}`,
      {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      }
    );
    console.log(res.data.messages.reverse())
    dispatch({
      type: GET_ALL_MESSAGES_OF_A_CONVERSATION,
      payload: res.data.messages.reverse(),
    });
  } catch (err) {
    console.log(err.response);
    console.log(err);
  }
};

export const getNextBacthOfMessages = (data) => async (dispatch) => {
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });

  try {
    const res = await axios.get(
      BASE_URL +
        `/chats/get-messages?room_id=${data.room_id}&skip=${data.skip}`,
      {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      }
    );

    dispatch({
      type: GET_NEXT_BATCH,
      payload: res.data.messages.reverse(),
    });
  } catch (err) {
    console.log(err.response);
    console.log(err);
  }
};

export const sendMessage = (data) => async (dispatch) => {
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });

  try {
    let token = "";
    for (let key of data.entries()) {
      if (key[0] === "token") {
        token = key[1];
      }
    }
    const res = await axios.post(BASE_URL + `/chats/send-message`, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: SEND_MESSAGE,
      payload: res.data.newMessage,
    });
  } catch (err) {
    console.log(err.response);
    console.log(err);
  }
};
