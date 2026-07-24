import {
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./identity";

export const adminAuditLogs = pgTable("admin_audit_logs", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  adminUserId: text("admin_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  action: text("action").notNull(), // PUBLISH_COURSE | EDIT_PRICE | REVOKE_MEMBERSHIP | etc.
  targetType: text("target_type").notNull(),
  targetId: text("target_id").notNull(),
  payloadJson: text("payload_json"),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
