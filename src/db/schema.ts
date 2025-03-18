import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Define the users table first so urls can reference it
export const users = sqliteTable("users", {
    id: integer("id").primaryKey(),
    userName: text("user_name").notNull(), // user_name cannot be null
    email: text("email").notNull(), // email cannot be null
    hashedPassword: text("password").notNull() // hashedPassword cannot be null
});

// Define the urls table after users
export const urls = sqliteTable("urls", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(), // alias cannot be null
    shortCode: text("short_code").notNull(),
    regularUrl: text("regular_url").notNull(),
    usageCount: integer("usage_count").default(0), // usageCount starts at 0 by default
    userId: integer("user_id").references(() => users.id) // Foreign key reference to users
});

// Define relations
export const userRelations = relations(users, ({ many }) => ({
    urls: many(urls, {
        relationName: "user_urls", // relationName for URLs owned by users
    }),
}));

export const urlRelations = relations(urls, ({ one }) => ({
    user: one(users, {
        fields: [urls.userId], // links to userId field in urls table
        references: [users.id], // refers to users' id field
        relationName: "user_urls", // relationName for user owning URLs
    }),
}));
