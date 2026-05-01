"use server";

import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

export async function createUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    try {
        const newUser = await db
            .insert(usersTable)
            .values({
                name,
                email,
            })
            .returning();
        console.log("New user created:", newUser);
        revalidatePath("/");
        return {
            success: true,
            data: newUser,
        };
    } catch (error) {
        console.error("Error creating user:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}
