import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { like, or } from "drizzle-orm/sql/expressions/conditions";

export async function getUsers() {
    const users = await db
        .select()
        .from(usersTable)
        .where(or(like(usersTable.email, "%gmail%")))
        .orderBy(usersTable.id);
    return users;
}

export async function getUsersWithPosts() {
    const users = await db.query.usersTable.findMany({
        with: {
            posts: true,
        },
        orderBy: (users, { desc }) => [desc(users.createdAt)],
    });
    return users;
}
