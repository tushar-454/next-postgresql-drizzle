"use server";

import { db } from "@/lib/db";
import { postsTable, usersTable } from "@/lib/db/schema";
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
        const isActive = formData.get("isActive") === "true";

        const updatedUser = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, id));

        if (updatedUser.length === 0) {
            return {
                success: false,
                error: "User not found",
            };
        }

        await db
            .update(usersTable)
            .set({
                name: name ?? updatedUser[0].name,
                isActive: isActive ?? updatedUser[0].isActive,
            })
            .where(eq(usersTable.id, id));
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

export async function createPost(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const userId = Number(formData.get("userId"));
        await db.insert(postsTable).values({
            title,
            content,
            userId,
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
}

export async function deletePost(formData: FormData) {
    try {
        const id = Number(formData.get("id"));
        await db.delete(postsTable).where(eq(postsTable.id, id));
        revalidatePath("/");
        return {
            success: true,
        };
    } catch (error) {
        console.error("Error deleting post:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Delete failed",
        };
    }
}
