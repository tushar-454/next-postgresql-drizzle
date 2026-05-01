import { relations } from "drizzle-orm";
import {
    boolean,
    integer,
    pgTable,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

// columns.helpers.ts
const timestamps = {
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow().notNull(),
    deletedAt: timestamp(),
};

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 20 }).notNull(),
    email: varchar({ length: 50 }).notNull().unique(),
    isActive: boolean().default(true),
    ...timestamps,
});

export const postsTable = pgTable("posts", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 100 }).notNull(),
    content: varchar({ length: 255 }).notNull(),
    userId: integer()
        .notNull()
        .references(() => usersTable.id),
    ...timestamps,
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
