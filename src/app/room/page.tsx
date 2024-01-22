"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { messageObject } from "@/types";
import Message from "@/components/custom/Message";
import { useToast } from "@/components/ui/use-toast";
import { Footer, Header } from "@/sections/room";

const uuid = (): string => {
  return `${Date.now()}_${Math.floor(Math.random() * 10000)}}`;
};

const Room = () => {
  const router = useRouter();
  const {
    socket,
    state: { name, roomId, timeOut },
  } = useContext(AppContext);

  const { toast } = useToast();
  const [text, setText] = useState("");
  const [message, setMessage] = useState<messageObject[]>([]);
  const chatSectionRef = useRef<any>();

  const handleSend = async () => {
    try {
      setMessage((p) => [
        ...p,
        {
          _id: uuid(),
          from: name,
          type: "TEXT",
          message: text,
          state: "SENDING",
        },
      ]);
      setText("");

      let res = await socket.emitWithAck("message", {
        message: text || "Hello",
        type: "TEXT",
      });

      if (res.status != "OK") throw res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFile = async (e: any) => {
    try {
      const file = e.target.files[0];

      // get the upload url
      let res = await socket.emitWithAck("get-upload-url", {
        size: file.size,
        type: file.size,
      });

      if (res.status != "OK")
        throw { message: "Something went wrong. Try Again!" };

      // push in
      const dataToPush = {
        _id: uuid(),
        from: name,
        type: "MEDIA",
        s3_key: res.key,
        filename: file.name,
        size: file.size,
        state: "SENDING",
      };
      setMessage((p) => [...p, dataToPush]);

      // upload the file
      let resOfUpload = await fetch(res.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (resOfUpload.status != 200)
        throw { message: "Something went wrong. Try Again !", dataToPush };

      // emit this message

      let resOfMessage = await socket.emitWithAck("message", {
        type: "MEDIA",
        s3_key: res.key,
        filename: file.name,
        size: file.size,
      });

      if (resOfMessage.status != "OK")
        throw { message: "Failed to send file. Try Again !", dataToPush };

      // change the state to DONE
      let id = dataToPush._id;
      setMessage((p) =>
        p.map((e) => {
          if (e._id == id) return { ...e, state: "DONE" };
          else return e;
        })
      );
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "destructive",
      });
      if (error.dataToPush) {
        let id = error.dataToPush._id;
        setMessage((p) =>
          p.map((e) => {
            if (e._id == id) return { ...e, state: "Error" };
            else return e;
          })
        );
      }
    }
  };

  const onTimeOut = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (!roomId) router.push("/");

    if (socket) {
      socket.on("message", (data: messageObject) => {
        setMessage((p) => [...p, data]);
      });
    }

    return () => {
      socket?.off("message");
    };
  }, [socket]);

  useEffect(() => {
    // Scroll to bottom when message state changes
    chatSectionRef.current?.scrollTo({
      top: chatSectionRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [message]);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div
          className="rounded-xl w-8/12 h-4/5 overflow-hidden"
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
        >
          {/* TODO:: info panel  */}

          {/* chat panel */}
          <div className="flex flex-col h-full">
            {/* header */}
            <Header {...{ onTimeOut, roomId, socket, timeOut }} />

            {/* chats */}
            <div
              className="flex flex-col flex-1 overflow-y-auto"
              ref={chatSectionRef}
            >
              <div className="flex-1" />
              <div className="p-2 gap-1 flex flex-col">
                {message.map((el) => (
                  <Message {...{ data: el, name }} key={el._id} />
                ))}
              </div>
            </div>

            {/* footer */}
            <Footer {...{ handleFile, handleSend, setText, text }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
