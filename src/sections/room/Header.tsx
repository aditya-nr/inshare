import React from "react";
import { X } from "@phosphor-icons/react";
import IconButton from "@/components/custom/IconButton";
import Timer from "@/components/custom/Timer";
import { HeaderProp } from "@/types";

export const Header = ({ roomId, timeOut, socket, onTimeOut }: HeaderProp) => {
  return (
    <>
      <div className="py-1.5 px-4 shadow-md flex items-center justify-between ">
        {/* Room ID */}
        <div>
          <p className="text-xl font-mono  text-lime-900 font-light border py-1 px-2 rounded-lg  bg-lime-50 bg-opacity-30">
            {roomId}
          </p>
          {/* <p className="text-gray-400 text-sm -mt-1">No of members</p> */}
        </div>

        {/* Timer */}
        {socket && <Timer endTime={Number(timeOut)} onTimeOut={onTimeOut} />}

        {/* action button */}
        <div className="w-20 flex justify-end">
          <IconButton
            onClick={onTimeOut}
            className="bg-red-50 hover:bg-red-100"
          >
            <X size={26} color="red" />
          </IconButton>
        </div>
      </div>
    </>
  );
};
