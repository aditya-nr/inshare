"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateRoomForm } from "@/sections/create";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-[100vh] px-4">
        <Card style={{"boxShadow": "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"}}>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Create Room</CardTitle>
          </CardHeader>

          <CardContent className="flex gap-4 flex-col">
            <CreateRoomForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
