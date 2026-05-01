"use server";

import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
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

export async function updateUser(formData: FormData) {
    try {
        const id = Number(formData.get("id"));
        const name = formData.get("name") as string;

        await db.update(usersTable).set({ name }).where(eq(usersTable.id, id));
        revalidatePath("/");
        return {
            success: true,
        };
    } catch (error) {
        console.error("Error updating user:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Update failed",
        };
    }
}

export async function deleteUser(formData: FormData) {
    try {
        const id = Number(formData.get("id"));
        await db.delete(usersTable).where(eq(usersTable.id, id));
        revalidatePath("/");
        return {
            success: true,
        };
    } catch (error) {
        console.error("Error deleting user:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Delete failed",
        };
    }
}
