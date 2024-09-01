import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

// pages/api/socket/io.ts

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

const userSocketMap: { [key: string]: string } = {}; // {userId: socketId}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("a user connected", socket.id);
      console.log("listt", userSocketMap);


      const userId = socket.handshake.query.userId as string;

      if (userId) userSocketMap[userId] = socket.id;

      // io.emit() is used to send events to all the connected clients
      io.emit("getOnlineUsers", Object.keys(userSocketMap));

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("disconnect", () => {
        // console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
