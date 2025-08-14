import { pgTable, varchar, text, timestamp, boolean, serial } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const profiles = pgTable('profiles', {
  id: varchar('id', { length: 36 }).primaryKey().default(createId()),
  name: varchar('name', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  bio: text('bio').notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  location: varchar('location', { length: 255 }),
  linkedinUrl: varchar('linkedin_url', { length: 255 }),
  githubUrl: varchar('github_url', { length: 255 }),
  resumeUrl: varchar('resume_url', { length: 255 }),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  skills: text('skills'), // JSON string
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const projects = pgTable('projects', {
  id: varchar('id', { length: 36 }).primaryKey().default(createId()),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  longDescription: text('long_description'),
  imageUrl: varchar('image_url', { length: 255 }),
  demoUrl: varchar('demo_url', { length: 255 }),
  githubUrl: varchar('github_url', { length: 255 }),
  technologies: text('technologies'), // JSON string array
  category: varchar('category', { length: 50 }).notNull().default('web'),
  featured: boolean('featured').default(false),
  order: serial('order'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const experiences = pgTable('experiences', {
  id: varchar('id', { length: 36 }).primaryKey().default(createId()),
  company: varchar('company', { length: 255 }).notNull(),
  position: varchar('position', { length: 255 }).notNull(),
  description: text('description').notNull(),
  startDate: varchar('start_date', { length: 50 }).notNull(),
  endDate: varchar('end_date', { length: 50 }),
  location: varchar('location', { length: 255 }),
  skills: text('skills'), // JSON string array
  order: serial('order'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const messages = pgTable('messages', {
  id: varchar('id', { length: 36 }).primaryKey().default(createId()),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 500 }).notNull(),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
