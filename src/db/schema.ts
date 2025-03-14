import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const urls = sqliteTable("urls", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(), // alias
    shortCode: text("short_code").notNull(),
    regularUrl: text("regular_url").notNull(),
    usageCount: integer("usage_count").default(0), // make sure this increments
    userId: integer("user_id").references(() => users.id) // Add foreign key reference
})

export const users = sqliteTable("users", {
    id: integer("id").primaryKey(),
    userName: text("user_name"),
    email: text("email"),
})

export const userRelations = relations(users, ({ many }) => ({
  urls: many(urls, {
    relationName: "user_urls",
  }),
}));

export const urlRelations = relations(urls, ({ one }) => ({
  user: one(users, {
    fields: [urls.userId],
    references: [users.id],
    relationName: "user_urls",
  }),
}));