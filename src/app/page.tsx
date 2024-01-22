"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center items-center h-screen gap-6 flex-col">
        <h1 className="text-3xl font-medium mb-4 text-center">
          Welcome to{" "}
          <span className="text-lime-500 font-bold text-3xl">
            inshare<span className="border-b-2 border-gradient">.online</span>
          </span>
        </h1>
        <div className="w-full max-w-md mx-auto text-center mb-5 max-sm:px-4">
          <p className="text-gray-600">
            Share files instantly and securely with inshare.online. Create a
            room and start sharing with just a few clicks!
          </p>
        </div>
        <div className="w-full max-w-md mx-auto">
          <div className="mb-6 max-sm:hidden">
            <h2 className="text-xl font-bold mb-2">Features:</h2>
            <ul className="list-disc pl-4 ">
              <li>Instantly create a sharing room</li>
              <li>Join a room with a unique code</li>
              <li>Share text and files securely</li>
            </ul>
          </div>
          <div className="flex gap-4 max-sm:flex-col max-sm:px-3">
            <Button
              onClick={(e) => router.push("create")}
              className="w-full bg-gradient-to-r from-cyan-400 to-lime-500"
            >
              <span className="text-lime-900">Create a Room</span>
            </Button>
            <div className="border-l-2 h-10 w-1 border-dashed border-lime-500 max-sm:h-1 max-sm:w-full max-sm:border-t-2" />
            <Button
              onClick={(e) => router.push("join")}
              className="w-full bg-gradient-to-r from-lime-500 to-cyan-500"
            >
              <span className="text-lime-900">Join a Room</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
