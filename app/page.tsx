"use client"

import { useAuthContext } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/modeToggle";
import { useRouter } from "next/navigation";
export default function Home() {
  const { user, isLoggedIn, logout } = useAuthContext();
  const router = useRouter()

  const handleLogout = () => {
    logout();
    // router.push("/login")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home
      <div className="flex flex-col items-center justify-center space-x-3 space-y-3">
        <h1 className="text-5xl font-bold text-gray-800">
          {isLoggedIn ? `Hello user with ID : ${user?.id}` : "Welcome"}
        </h1>
        <ModeToggle />

        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={async () => await router.push("/login")}>
            Login
          </button>
        )}
      </div>
    </main>
  );
}
