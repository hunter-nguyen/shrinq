ALTER TABLE `urls` ADD `user_id` integer REFERENCES users(id);