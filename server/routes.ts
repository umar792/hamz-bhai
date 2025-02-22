import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertMallSchema, insertExpenseSchema, insertSaleSchema, insertCompanySchema, insertTransactionSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Auth routes
  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await storage.getUser(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json(user);
  });

  // Mall routes
  app.get("/api/malls", async (req, res) => {
    const malls = await storage.getMalls();
    res.json(malls);
  });

  app.post("/api/malls", async (req, res) => {
    const parsed = insertMallSchema.parse(req.body);
    const mall = await storage.createMall(parsed);
    res.json(mall);
  });

  // Expense routes
  app.get("/api/expenses", async (req, res) => {
    const expenses = await storage.getExpenses();
    res.json(expenses);
  });

  app.post("/api/expenses", async (req, res) => {
    const parsed = insertExpenseSchema.parse(req.body);
    const expense = await storage.createExpense(parsed);
    res.json(expense);
  });

  // Sales routes
  app.get("/api/sales", async (req, res) => {
    const sales = await storage.getSales();
    res.json(sales);
  });

  app.post("/api/sales", async (req, res) => {
    const parsed = insertSaleSchema.parse(req.body);
    const sale = await storage.createSale(parsed);
    res.json(sale);
  });

  // Company routes
  app.get("/api/companies", async (req, res) => {
    const companies = await storage.getCompanies();
    res.json(companies);
  });

  app.get("/api/companies/:id", async (req, res) => {
    const company = await storage.getCompany(parseInt(req.params.id));
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json(company);
  });

  app.post("/api/companies", async (req, res) => {
    const parsed = insertCompanySchema.parse(req.body);
    const company = await storage.createCompany(parsed);
    res.json(company);
  });

  // Transaction routes
  app.get("/api/companies/:id/transactions", async (req, res) => {
    const transactions = await storage.getTransactions(parseInt(req.params.id));
    res.json(transactions);
  });

  app.post("/api/companies/:id/transactions", async (req, res) => {
    const parsed = insertTransactionSchema.parse({
      ...req.body,
      companyId: parseInt(req.params.id)
    });
    const transaction = await storage.createTransaction(parsed);
    res.json(transaction);
  });

  return createServer(app);
}
