import { Server as NetServer, Socket } from "net";

import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
