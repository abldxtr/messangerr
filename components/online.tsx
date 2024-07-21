"use client";

import { useSocket } from "@/provider/socket-provider";

export default function Online() {
  const { isConnected } = useSocket();

  return <>{isConnected && <div>you online</div>}</>;
}
