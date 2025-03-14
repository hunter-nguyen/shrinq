CREATE TABLE `urls` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`short_code` text NOT NULL,
	`regular_url` text NOT NULL,
	`usage_count` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_name` text,
	`email` text
);
