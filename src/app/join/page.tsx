"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JoinRoomForm } from "@/sections/join";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-[100vh]">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">Join Room</CardTitle>
          </CardHeader>

          <CardContent className="flex gap-4 flex-col">
            <JoinRoomForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
