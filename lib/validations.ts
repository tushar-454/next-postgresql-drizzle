import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
});

export const createPostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    userId: z.number().int().positive("Invalid user ID"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
