import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/types";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Socket } from "socket.io";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
    if (req.method !== "POST") {
        return res.status(400).json({ error: "Method not allowed" });
    }

    // const currentprofile = auth()
    console.log("req.body", req.body);
    console.log("req.query", req.query);
    // console.log("req.query", currentprofile);



    try {
        const { message, senderId, receiverId } = req.body;
        // const { messageId: receiverId } = req.query;
        // const senderId = req.user.id;


        const channelKey = `chat:${receiverId}:message`;


        let conversation = await db.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, receiverId],
                },
            },
        });

        // the very first message is being sent, that's why we need to create a new conversation
        if (!conversation) {
            conversation = await db.conversation.create({
                data: {
                    participantIds: {
                        set: [senderId, receiverId],
                    },
                },
            });
        }

        const newMessage = await db.message.create({
            data: {
                senderId,
                body: message,
                conversationId: conversation.id,
            },
        });

        if (newMessage) {
            conversation = await db.conversation.update({
                where: {
                    id: conversation.id,
                },
                data: {
                    messages: {
                        connect: {
                            id: newMessage.id,
                        },
                    },
                },
            });
        }

        console.log("channelKey _server", channelKey, message)


        res?.socket?.server?.io?.emit(channelKey, message)



        res.status(201).json(newMessage);
    } catch (error: any) {
        console.error("Error in sendMessage: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}