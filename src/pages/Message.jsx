import React, { useEffect, useState } from "react";

export const timeConverter = (time) => {
  if (time === "0000-00-00 00:00:00") return "not available";
  let date = time?.split("T")[0];
  let t = time?.split("T")[1];
  let currentTime = t?.split(".")[0].split(":");
  return `${date} ${currentTime[0]}:${currentTime[1]}`;
};

export default function Message({ message }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      onClick={() => setShowMore((prev) => !prev)}
      title={showMore ? "click to see less" : "click to see more"}
      className="relative py-2 px-3 border-2 border-sky-600 my-2 rounded-md cursor-pointer duration-200 hover:scale-y-105 hover:scale-x-[1.01]"
    >
      <h3
        className={`text-[16px] font-bold ${!showMore ? "line-clamp-1" : ""}`}
      >
        {
          <p>
            {" "}
            From {message.sender} to {message.receiver} :{" "}
          </p>
        }
      </h3>

      <h6>{<p>title: {message.title}</p>}</h6>
      {showMore && (
        <p
          className={`text-[14px] leading-4 ${!showMore ? "line-clamp-1" : ""}`}
        >
          {message?.message}
        </p>
      )}

      <span className="absolute top-1 right-2 text-[10px]">
        {timeConverter(message?.date)}
      </span>
    </div>
  );
}
