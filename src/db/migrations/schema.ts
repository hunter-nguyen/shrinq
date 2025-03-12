import { sqliteTable, AnySQLiteColumn, integer, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const urls = sqliteTable("urls", {
	id: integer().primaryKey().notNull(),
	name: text().notNull(),
	shortCode: text("short_code").notNull(),
	regularUrl: text("regular_url").notNull(),
	usageCount: integer("usage_count").default(0),
});

export const users = sqliteTable("users", {
	id: integer().primaryKey().notNull(),
	userName: text("user_name"),
	email: text(),
});

export const drizzleMigrations = sqliteTable("__drizzle_migrations", {
});

