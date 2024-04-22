import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("User", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

export const contacts = sqliteTable("Contacts", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  cpf: text("cpf").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  district: text("district").notNull(),
  addressNumber: text("addressNumber").notNull(),
  addOnAddress: text("addOnAddress"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  cep: text("cep").notNull(),
  coordinates: text("coordinates").notNull(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
});
