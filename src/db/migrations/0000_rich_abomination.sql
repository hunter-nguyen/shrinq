CREATE TABLE `urls` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`short_url` text NOT NULL,
	`regular_url` text NOT NULL,
	`usage_count` integer DEFAULT 0
);
