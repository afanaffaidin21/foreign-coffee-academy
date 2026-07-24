import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { users } from "./identity";

export const membershipStatusEnum = pgEnum("membership_status", [
  "ACTIVE",
  "REVOKED",
]);

export const transactionStatusEnum = pgEnum("transaction_status", [
  "CREATED",
  "PENDING",
  "PAID",
  "FAILED",
  "CANCELLED",
  "EXPIRED",
  "REFUNDED",
]);

export const environmentEnum = pgEnum("environment", [
  "SANDBOX",
]);

export const membershipPlans = pgTable("membership_plans", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(), // monthly | yearly
  name: text("name").notNull(),
  priceIdr: integer("price_idr").notNull(),
  durationDays: integer("duration_days").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const memberships = pgTable("memberships", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  planId: text("plan_id")
    .notNull()
    .references(() => membershipPlans.id),
  status: membershipStatusEnum("status").default("ACTIVE").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }).defaultNow().notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  orderId: text("order_id").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  planId: text("plan_id")
    .notNull()
    .references(() => membershipPlans.id),
  amountIdr: integer("amount_idr").notNull(),
  environment: environmentEnum("environment").default("SANDBOX").notNull(),
  status: transactionStatusEnum("status").default("CREATED").notNull(),
  snapToken: text("snap_token"),
  entitlementAppliedAt: timestamp("entitlement_applied_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
