"use client";

import "@/app/globals.css";
import { useEffect, useReducer, useState } from "react";
import { io } from "socket.io-client";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { AppContext, IntialState, Reducer } from "@/context/AppContext";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

function changeFavicon(src: string) {
  let link: any =
    document.querySelector("link[rel='shortcut icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = src;
  document.getElementsByTagName("head")[0].appendChild(link);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(Reducer, IntialState);
  const [socket, setSocket] = useState<any>();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "InShare";
    changeFavicon("/favicon.png");

    if (!socket) {
      let new_socket = io(`${SERVER_URL}`);
      setSocket(new_socket);
    } else {
      socket.on("notification", (data: any) => {
        toast({
          description: data,
        });
      });

      socket.on("disconnect", (data: any) => {
        console.log("SERVER DISCONNECTED");
      });

      socket.on("timeout", (data: any) => {
        window.location.reload();
      });
    }

    return () => {
      socket?.off();
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <html lang="en">
      <body className="bg-slate-100">
        <AppContext.Provider value={{ state, dispatch, socket }}>
          {children}
          <Toaster />
        </AppContext.Provider>
      </body>
    </html>
  );
}
