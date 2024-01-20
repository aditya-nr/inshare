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
      <div className="flex justify-center items-center h-[100vh]">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">Create Room</CardTitle>
          </CardHeader>

          <CardContent className="flex gap-4 flex-col">
            <CreateRoomForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
