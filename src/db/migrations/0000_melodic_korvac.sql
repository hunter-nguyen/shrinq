CREATE TABLE `urls` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`short_code` text NOT NULL,
	`regular_url` text NOT NULL,
	`usage_count` integer DEFAULT 0,
	`user_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
