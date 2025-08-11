CREATE TABLE `experiences` (
	`id` text PRIMARY KEY NOT NULL,
	`company` text NOT NULL,
	`position` text NOT NULL,
	`description` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text,
	`location` text,
	`skills` text,
	`order` integer DEFAULT 0,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`title` text NOT NULL,
	`bio` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`location` text,
	`linkedin_url` text,
	`github_url` text,
	`resume_url` text,
	`avatar_url` text,
	`skills` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`long_description` text,
	`image_url` text,
	`demo_url` text,
	`github_url` text,
	`technologies` text,
	`category` text DEFAULT 'web' NOT NULL,
	`featured` integer DEFAULT false,
	`order` integer DEFAULT 0,
	`created_at` integer,
	`updated_at` integer
);
