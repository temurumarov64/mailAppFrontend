import { useState, useEffect } from "react";
import MessageComponent from "./Message";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AutoCompleteInput } from "./index";
import {
  sendMessageApi,
  getMessagesApiBySender,
  fetchSenders,
} from "../api/messages";

function Mail() {
  const navigate = useNavigate();
  const { sender } = useParams();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
  } = useForm();

  const logout = () => {
    navigate("/login");
  };

  async function fetchMessages() {
    const { data } = await getMessagesApiBySender(sender);
    setMessages(data);
  }

  async function getSenders() {
    const { data } = await fetchSenders();
    setUsers(data);
  }

  useEffect(() => {
    fetchMessages();
    getSenders();
  }, []);

  const sendMessage = async (data) => {
    const { receiver, message, title } = data;
    await sendMessageApi(sender, receiver, message, title);
    fetchMessages();
    reset();
  };

  return (
    <div className="custom-container flex justify-center items-center min-h-screen py-10 pb-20">
      <div className="w-[800px] bg-slate-50 rounded px-5 pt-3 pb-10">
        <div className="flex justify-between items-center pb-2">
          <h1 className="text-[32px] text-sky-700 ">E-mail Service</h1>
          <button
            onClick={logout}
            className="px-3 py-1.5 text-[14px] font-bold bg-sky-700 text-white rounded"
          >
            Logout
          </button>
        </div>
        <div className="h-[300px] overflow-y-auto overflow-x-hidden border-2 border-sky-700 rounded px-2 py-4">
          {messages?.length > 0 ? (
            messages?.map((msg, i) => (
              <MessageComponent key={i} message={msg} />
            ))
          ) : (
            <span className="flex justify-center items-center text-[20px] font-semibold h-full w-full">
              New messages will appear here...
            </span>
          )}
        </div>
        <form
          id="send-form"
          onSubmit={handleSubmit(sendMessage)}
          className="mt-2 font-bold"
        >
          <h2 className="mb-4 mt-5 text-[20px] text-sky-700 ">
            Create a new message
          </h2>
          <label className="block">
            <span>recipient:</span>
            <div className="flex gap-2 items-start">
              <div className="w-full">
                <AutoCompleteInput
                  error={errors.receiver}
                  registers={register("receiver")}
                  items={users?.map((usr) => ({
                    id: usr.sender,
                    label: usr.sender,
                  }))}
                  setValue={(value) => setValue("receiver", value)}
                  value={watch("receiver")}
                />
                {errors.receiver ? (
                  <span className="text-red-600 text-[14px]">
                    {errors.receiver?.message}
                  </span>
                ) : null}
              </div>
            </div>
          </label>
          <label className="mt-2 flex items-center gap-3">
            <span>title:</span>
            <div className="w-full">
              <input
                type="text"
                placeholder="what are you writing about?"
                className={`px-3 py-2 border-2 rounded w-full font-medium ${
                  errors.title ? "border-red-600" : "border-sky-600"
                }`}
                {...register("title")}
              />
              {errors.title ? (
                <span className="text-red-600 text-[14px]">
                  {errors.title?.message}
                </span>
              ) : null}
            </div>
          </label>

          <label className="mt-2 block">
            <span>message:</span>
            <textarea
              placeholder={" "}
              className={`px-3 py-2 border-2 rounded w-full font-medium ${
                errors.message ? "border-red-600" : "border-sky-700"
              }`}
              rows={3}
              {...register("message")}
            ></textarea>
            {errors.message ? (
              <span className="text-red-600 text-[14px] block mt-[-4px]">
                {errors.message?.message}
              </span>
            ) : null}
            <button
              className="text-[14px] text-sky-700 bg-sky-100"
              type="submit"
            >
              Send
            </button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default Mail;
