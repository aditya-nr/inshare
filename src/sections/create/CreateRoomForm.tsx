import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { createRoomDataObject } from "@/types";
import { useToast } from "@/components/ui/use-toast";

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

export const CreateRoomForm = () => {
  const defaultName = useMemo(() => {
    return FruitName[Math.floor(Math.random() * 10)];
  }, []);

  const router = useRouter();
  const { toast } = useToast();
  const { socket, dispatch } = useContext(AppContext);

  const [showPasswordField, setShowPasswordField] = useState(false);
  const [errors, setErrors] = useState({ password: "", name: "" });
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [timeOut, setTimeOut] = useState("5");
  const [maxCandidate, setMaxCandidate] = useState("2");

  const validateData = (
    name: string,
    password: string,
    timeOut: string,
    maxCandidate: string
  ): createRoomDataObject => {
    let data: any = {};
    try {
      // name
      if (name) name = name.trim();
      data.name = name || defaultName;

      // password
      if (showPasswordField) {
        password = password.trim();
        if (password.length == 0)
          throw { field: "password", message: "Password is required" };
        data.password = password;
      }

      // timeOut
      data.timeOut = timeOut;
      // maxCandidate
      data.maxCandidate = maxCandidate;

      return data;
    } catch (error) {
      throw error;
    }
  };
  const handleSubmit = async () => {
    try {
      let data = validateData(name, password, timeOut, maxCandidate);
      let res = await socket.emitWithAck("create-room", data);
      if (res.status == "ERROR") throw res;
      dispatch({
        type: "UPDATE_ROOM",
        roomId: res.roomId,
        name: data.name,
        timeOut: Date.now() + 1000 * 60 * Number(data.timeOut),
      });
      router.push("room");
    } catch (error: any) {
      if (error.field) {
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

      {/* Password */}
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center gap-2">
          <Label htmlFor="password" className="text-xl cursor-pointer">Password</Label>
          <Switch onCheckedChange={() => setShowPasswordField((p) => !p)} />
          <p className="text-sm text-gray-400">(Optional)</p>
        </div>
        {showPasswordField && (
          <>
            <Input
              id="password"
              placeholder="Enter Password"
              type="password"
              name="password"
              className={`${!!errors.password ? "border-red-500" : ""} input`}
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
          </>
        )}
      </div>

      {/* Time Out */}
      <div className="flex flex-col place-items-start space-y-1.5">
        <Label htmlFor="duration" className="text-xl cursor-pointer">Room Duration</Label>
        <ToggleGroup
          type="single"
          value={timeOut}
          onValueChange={(val) => setTimeOut(val)}
        >
          <ToggleGroupItem value="5">5 min</ToggleGroupItem>
          <ToggleGroupItem value="15">15 min</ToggleGroupItem>
          <ToggleGroupItem value="30">30 min</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Max Candidate */}
      <div className="flex items-center gap-2 ">
        <Label htmlFor="maxCandidate" className="text-xl cursor-pointer">Maximum Candidate</Label>
        <Select
          value={maxCandidate}
          onValueChange={(val) => setMaxCandidate(val)}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="w-[80px]">
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="7">7</SelectItem>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="9">9</SelectItem>
            <SelectItem value="10">10</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full bg-blue-400 hover:bg-blue-500 text-xl h-11" onClick={handleSubmit}>
        Create Room
      </Button>
    </>
  );
};
