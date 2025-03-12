ALTER TABLE `urls` RENAME COLUMN "short_url" TO "short_code";--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_name` text,
	`email` text
);
