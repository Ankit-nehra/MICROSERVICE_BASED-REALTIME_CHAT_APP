import { z } from "zod";


export const sendMessageSchema = z.object({

  receiverId: z
    .string()
    .min(
      1,
      "Receiver ID is required"
    ),

  content: z
    .string()
    .trim()
    .min(
      1,
      "Message cannot be empty"
    )
    .max(
      5000,
      "Message is too long"
    ),

  messageType: z
    .enum([
      "text",
      "image",
      "file",
    ])
    .optional(),

});



export const markAsReadSchema = z.object({

  senderId: z
    .string()
    .min(
      1,
      "Sender ID is required"
    ),

});