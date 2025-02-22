import { pgTable, text, serial, integer, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const malls = pgTable("malls", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  reason: text("reason").notNull(),
  date: date("date").notNull(),
});

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  reason: text("reason").notNull(),
  name: text("name").notNull(),
  date: date("date").notNull(),
});

export const sales = pgTable("sales", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  reason: text("reason").notNull(),
  description: text("description").notNull(),
  date: date("date").notNull(),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull(),
  amount: integer("amount").notNull(),
  type: text("type").notNull(), // 'mall' | 'payment'
  date: date("date").notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertMallSchema = createInsertSchema(malls);
export const insertExpenseSchema = createInsertSchema(expenses);
export const insertSaleSchema = createInsertSchema(sales);
export const insertCompanySchema = createInsertSchema(companies);
export const insertTransactionSchema = createInsertSchema(transactions);

export type User = typeof users.$inferSelect;
export type Mall = typeof malls.$inferSelect;
export type Expense = typeof expenses.$inferSelect;
export type Sale = typeof sales.$inferSelect;
export type Company = typeof companies.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertMall = z.infer<typeof insertMallSchema>;
export type InsertExpense = z.infer<typeof insertExpenseSchema>;
export type InsertSale = z.infer<typeof insertSaleSchema>;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
