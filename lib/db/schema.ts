import { relations } from "drizzle-orm";
import {
    boolean,
    integer,
    pgTable,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
});

export const postsTable = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    userId: integer("user_id")
        .notNull()
        .references(() => usersTable.id),
    createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
    posts: many(postsTable),
}));

export const postsRelations = relations(postsTable, ({ one }) => {
    return {
        user: one(usersTable, {
            fields: [postsTable.userId],
            references: [usersTable.id],
        }),
    };
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
export type Post = typeof postsTable.$inferSelect;
export type NewPost = typeof postsTable.$inferInsert;
