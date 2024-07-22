"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JoinRoomForm } from "@/sections/join";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-[100vh] px-4">
        <Card style={{"boxShadow": "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"}}>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Join Room</CardTitle>
          </CardHeader>

          <CardContent className="flex gap-4 flex-col text-[#48091a]">
            <JoinRoomForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
