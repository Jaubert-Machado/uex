import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("User", {
  id: integer("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
});

export const usersRelations = relations(users, ({ many }) => ({
  users: many(location),
}));

export const location = sqliteTable("Location", {
  id: integer("id").primaryKey(),
  name: text("name"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zip: text("zip"),
  country: text("country"),
});

export const locationRelations = relations(location, ({ one }) => ({
  user: one(users),
}));
