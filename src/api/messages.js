import { apiRequest } from "./apiRequest";
import { BASE_URL } from "./baseUrl";

export const getMessagesApi = () => {
  const config = {
    method: "GET",
    url: `messages`,
  };
  return apiRequest(config);
};

export const getMessagesApiBySender = (sender) => {
  const config = {
    method: "GET",
    url: `messages`,
    params: {
      sender,
    },
  };
  return apiRequest(config);
};

export const fetchSenders = () => {
  const config = {
    method: "GET",
    url: `senders`,
  };
  return apiRequest(config);
};

export const loginApi = (sender) => {
  const config = {
    method: "POST",
    url: `${BASE_URL}/login`,
    data: {
      sender,
    },
  };
  return apiRequest(config);
};

export const sendMessageApi = (sender, receiver, message, title) => {
  const config = {
    method: "POST",
    url: `${BASE_URL}/message`,
    data: {
      sender,
      receiver,
      message,
      title,
    },
  };
  return apiRequest(config);
};
