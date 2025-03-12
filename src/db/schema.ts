import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const urls = sqliteTable("urls", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(), // alias
    shortCode: text("short_code").notNull(),
    regularUrl: text("regular_url").notNull(),
    usageCount: integer("usage_count").default(0) // make sure this increments
})

export const users = sqliteTable("users", {
    id: integer("id").primaryKey(),
    userName: text("user_name"),
    email: text("email"),
})

// One to many relation (users --> urls)
export const userRelations = relations(users, ({ many }) => ({
  urls: many(urls, {
    relationName: "user_urls",
  }),
}));