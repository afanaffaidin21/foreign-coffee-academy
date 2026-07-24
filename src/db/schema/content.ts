import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  integer,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./identity";

export const publicationStatusEnum = pgEnum("publication_status", [
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);

export const lessonAccessEnum = pgEnum("lesson_access", [
  "FREE",
  "PREMIUM",
]);

export const contentNodes = pgTable("content_nodes", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  contentType: text("content_type").notNull(), // COURSE | GUIDE | RECIPE
  publicationStatus: publicationStatusEnum("publication_status").default("DRAFT").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const courses = pgTable("courses", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  level: text("level").notNull(), // Pemula | Menengah | Lanjutan
  durationMinutes: integer("duration_minutes").default(0).notNull(),
  instructorName: text("instructor_name").default("Foreign Coffee Team").notNull(),
  outcomesJson: text("outcomes_json"),
  requirementsJson: text("requirements_json"),
  isFeatured: boolean("is_featured").default(false).notNull(),
  publicationStatus: publicationStatusEnum("publication_status").default("DRAFT").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const modules = pgTable("modules", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  courseId: text("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  orderIndex: integer("order_index").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const lessons = pgTable("lessons", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  moduleId: text("module_id")
    .notNull()
    .references(() => modules.id, { onDelete: "cascade" }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  durationMinutes: integer("duration_minutes").default(0).notNull(),
  accessType: lessonAccessEnum("access_type").default("FREE").notNull(),
  youtubeVideoId: text("youtube_video_id"),
  orderIndex: integer("order_index").notNull(),
  publicationStatus: publicationStatusEnum("publication_status").default("PUBLISHED").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    completed: boolean("completed").default(false).notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    lastAccessedAt: timestamp("last_accessed_at", { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userLessonIndex: uniqueIndex("user_lesson_idx").on(table.userId, table.lessonId),
  })
);

export const topics = pgTable("topics", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const contentTopics = pgTable("content_topics", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  contentNodeId: text("content_node_id")
    .notNull()
    .references(() => contentNodes.id, { onDelete: "cascade" }),
  topicId: text("topic_id")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),
});

export const contentRelations = pgTable("content_relations", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  sourceId: text("source_id").notNull(),
  targetId: text("target_id").notNull(),
  relationType: text("relation_type").notNull(), // e.g. LESSON_GUIDE | LESSON_RECIPE
});

export const learningHubs = pgTable("learning_hubs", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name"),
  orderIndex: integer("order_index").notNull(),
});

export const hubContent = pgTable("hub_content", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  hubId: text("hub_id")
    .notNull()
    .references(() => learningHubs.id, { onDelete: "cascade" }),
  contentNodeId: text("content_node_id").notNull(),
  orderIndex: integer("order_index").notNull(),
});
