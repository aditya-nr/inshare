import { Clock } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";

function CountDown(end: number, onChange: any, onTimeOut: any) {
  let timeEvent = setInterval(() => {
    let leftMs = end - Date.now();
    let leftSec = leftMs / 1000;
    let leftM = Math.floor(leftSec / 60); // Round down to get minutes
    leftSec = Math.floor(leftSec % 60); // Round down to get seconds
    if (leftMs <= 0) {
      clearInterval(timeEvent);
      onTimeOut && onTimeOut();
      return;
    }

    if (onChange) {
      onChange([leftM, leftSec]);
    }
  }, 1000);
  return timeEvent; // Return interval ID
}

const Timer = ({
  endTime,
  onTimeOut,
}: {
  endTime: number;
  onTimeOut?: any;
}) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    let timeEvent = CountDown(
      endTime,
      ([leftM, leftSec]: any) => setTimeLeft(`${leftM}:${leftSec}`),
      onTimeOut
    );

    return () => {
      clearInterval(timeEvent);
    };
  }, []);
  return (
    <div className="flex items-center gap-1">
      <Clock size={36} />
      <p className="text-lg">{timeLeft}</p>
    </div>
  );
};

export default Timer;
