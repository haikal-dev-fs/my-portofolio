CREATE TABLE "experiences" (
	"id" varchar(36) PRIMARY KEY DEFAULT 'kgutkc2efd1zb2mrzst84btj' NOT NULL,
	"company" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"start_date" varchar(50) NOT NULL,
	"end_date" varchar(50),
	"location" varchar(255),
	"skills" text,
	"order" serial NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" varchar(36) PRIMARY KEY DEFAULT 'j9mgkiinm0tbenqznp8cqw2w' NOT NULL,
	"name" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"bio" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"location" varchar(255),
	"linkedin_url" varchar(255),
	"github_url" varchar(255),
	"resume_url" varchar(255),
	"avatar_url" varchar(255),
	"skills" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" varchar(36) PRIMARY KEY DEFAULT 'obqmqljlbxazgaordzcy81tu' NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"long_description" text,
	"image_url" varchar(255),
	"demo_url" varchar(255),
	"github_url" varchar(255),
	"technologies" text,
	"category" varchar(50) DEFAULT 'web' NOT NULL,
	"featured" boolean DEFAULT false,
	"order" serial NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
