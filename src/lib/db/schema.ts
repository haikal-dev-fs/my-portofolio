import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const profiles = sqliteTable('profiles', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  bio: text('bio').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  location: text('location'),
  linkedinUrl: text('linkedin_url'),
  githubUrl: text('github_url'),
  resumeUrl: text('resume_url'),
  avatarUrl: text('avatar_url'),
  skills: text('skills'), // JSON string
  createdAt: integer('created_at').$defaultFn(() => Date.now()),
  updatedAt: integer('updated_at').$defaultFn(() => Date.now()),
});

export const projects = sqliteTable('projects', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  longDescription: text('long_description'),
  imageUrl: text('image_url'),
  demoUrl: text('demo_url'),
  githubUrl: text('github_url'),
  technologies: text('technologies'), // JSON string array
  category: text('category').notNull().default('web'),
  featured: integer('featured', { mode: 'boolean' }).default(false),
  order: integer('order').default(0),
  createdAt: integer('created_at').$defaultFn(() => Date.now()),
  updatedAt: integer('updated_at').$defaultFn(() => Date.now()),
});

export const experiences = sqliteTable('experiences', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  company: text('company').notNull(),
  position: text('position').notNull(),
  description: text('description').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  location: text('location'),
  skills: text('skills'), // JSON string array
  order: integer('order').default(0),
  createdAt: integer('created_at').$defaultFn(() => Date.now()),
  updatedAt: integer('updated_at').$defaultFn(() => Date.now()),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;
