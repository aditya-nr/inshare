import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { joinRoomDataObject } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
const FruitName = [
  "Aam",
  "Khira",
  "Akhrot",
  "Badam",
  "Kaju",
  "Santra",
  "Mausambi",
  "Gajar",
  "Kela",
  "Anar",
];

export const JoinRoomForm = () => {
  const defaultName = useMemo(() => {
    return FruitName[Math.floor(Math.random() * 10)];
  }, []);

  const router = useRouter();
  const { toast } = useToast();
  const { socket, dispatch } = useContext(AppContext);

  const [showPasswordField, setShowPasswordField] = useState(false);
  const [errors, setErrors] = useState({ password: "", room: "" });

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");

  const [Join, setJoin] = useState(false);

  const validateData = (
    name: string,
    room: string,
    password: string
  ): joinRoomDataObject => {
    let data: any = {};
    try {
      // name
      if (name) name = name.trim();
      data.name = name || defaultName;

      // room
      room = room.trim();
      if (!room) throw { field: "room", message: "Room ID is required" };
      data.roomId = room;

      // password
      if (showPasswordField) {
        password = password.trim();
        if (password.length == 0)
          throw { field: "password", message: "Password is required" };
        data.password = password;
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      let data = validateData(name, room, password);
      let res = await socket.emitWithAck("join-room", data);
      if (res.status == "ERROR") throw res;
      dispatch({
        type: "UPDATE_ROOM",
        roomId: room,
        name: data.name,
        timeOut: Number(res.timeOut),
      });
      router.push("room");
    } catch (error: any) {
      if (error.type == "INVALID_ROOMID") {
        setErrors((p) => ({ ...p, room: error.message }));
      } else if (error.type == "PASSWORD_REQUIRED") {
        setShowPasswordField(true);
        toast({
          title: "Password protected",
          description: "This room is password protected",
        });
      } else if (error.type == "INVALID_PASSWORD") {
        setErrors((p) => ({ ...p, password: error.message }));
        toast({
          title: "Invalid Password",
          description: "You have entered invalid password",
        });
      } else if (error.field) {
        setErrors((p) => ({ ...p, [error.field]: error.message }));
      } else {
        toast({
          description: "Something Went Wrong !",
          variant: "destructive",
        });
      }
    }
  };
  return (
    <>
      {/* Name */}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name" className="text-xl cursor-pointer">Name</Label>
        <Input
          id="name"
          placeholder={defaultName}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
      </div>

      {/* Room */}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="room" className="text-xl cursor-pointer">Room ID</Label>
        <Input
          id="room"
          placeholder={"Enter Room ID"}
          value={room}
          onChange={(e) => {
            errors.room && setErrors((p) => ({ ...p, room: "" }));
            setRoom(e.target.value);
          }}
          className={`${!!errors.room ? "border-red-500" : ""} input`}
          disabled={showPasswordField}
        />
        {!!errors.room && (
          <p className="text-red-500 text-xs font-semibold">{errors.room}</p>
        )}
      </div>

      {/* Password */}
      {showPasswordField && (
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password" className="text-xl cursor-pointer">Password</Label>
          <Input
            id="password"
            placeholder="Enter Password"
            name="password"
            type="password"
            className={!!errors.password ? "border-red-500" : ""}
            value={password}
            onChange={(e) => {
              errors.password && setErrors((p) => ({ ...p, password: "" }));
              setPassword(e.target.value);
            }}
          />
          {!!errors.password && (
            <p className="text-red-500 text-xs font-semibold">
              {errors.password}
            </p>
          )}
        </div>
      )}

      <Button className="w-full bg-blue-400 hover:bg-blue-500 text-xl h-11" onClick={handleSubmit}>
        Join Room
      </Button>
    </>
  );
};
