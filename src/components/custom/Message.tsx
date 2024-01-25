"use client";

import { messageObject } from "@/types";
import React, { memo, useEffect, useState } from "react";
import useDownload from "../../hooks/useDownload.js";
import IconButton from "./IconButton";
import { Clock, Download, Spinner, WarningCircle } from "@phosphor-icons/react";

type renderMessageObject = {
  data: messageObject;
  name: string;
};
const Media = ({ data, name }: renderMessageObject) => {
  const download = useDownload();
  const handleDownload = async () => {
    await download("", data.s3_key, data.filename);
  };
  return (
    <div className="flex p-1.5 gap-2 items-center">
      {name == data.from ? (
        <div>
          {data.state == "SENDING" ? (
            <div>
              <div
                className="animate-spin"
                style={{ animationDuration: "2000ms" }}
              >
                <Spinner size={36} />
              </div>
            </div>
          ) : data.state == "DONE" ? (
            <IconButton
              onClick={handleDownload}
              className={"bg-lime-400 hover:bg-opacity-50"}
            >
              <Download size={36} />
            </IconButton>
          ) : (
            <WarningCircle size={40} color="red" />
          )}
        </div>
      ) : (
        <IconButton
          onClick={handleDownload}
          className={"bg-lime-400 hover:bg-opacity-50"}
        >
          <Download size={36} />
        </IconButton>
      )}
      <div>
        <p
          className={`${name != data.from ? "text-lime-900" : "text-lime-100"}`}
        >
          {data.filename}
        </p>
        <p
          className={`${
            name != data.from ? "text-lime-600" : "text-lime-400"
          }  text-xs`}
        >
          {(Number(data.size) / (1024 * 1024)).toFixed(2)} MB
        </p>
      </div>
    </div>
  );
};
const Text = ({ data, name }: renderMessageObject) => {
  return (
    <div>
      <p className={`${name != data.from ? "text-lime-900" : "text-lime-100"}`}>
        {data.message}
      </p>
    </div>
  );
};

const Message = (prop: renderMessageObject) => {
  const { data, name } = prop;

  return (
    <>
      {/* container */}
      <div
        className={`flex w-full ${
          name != data.from ? "justify-start" : "justify-end"
        }`}
      >
        <div
          className={`w-max rounded-lg max-w-[60%] ${
            name != data.from
              ? "rounded-bl-none bg-lime-200"
              : "rounded-br-none bg-lime-600"
          } overflow-hidden`}
        >
          {name != data.from && (
            <p className="w-full bg-black bg-opacity-10 text-xs text-center pt-0.5 text-lime-800">
              {data.from.substring(0, 6).toLowerCase()}
            </p>
          )}

          <div className="py-1 px-2">
            {(() => {
              switch (data.type) {
                case "TEXT":
                  return <Text {...prop} />;
                case "MEDIA":
                  return <Media {...prop} />;
                default:
                  break;
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Message, (prevProps, nextProps) => {
  // Only re-render if data.status has changed
  if (!prevProps.data.state) return true;
  return prevProps.data.state === nextProps.data.state;
});
