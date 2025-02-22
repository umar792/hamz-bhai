import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertMallSchema, insertExpenseSchema, insertSaleSchema, insertCompanySchema, insertTransactionSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Auth routes
  app.post("/api/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUser(email, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

  // Mall routes
  app.get("/api/malls", async (req, res, next) => {
    try {
      const malls = await storage.getMalls();
      res.json(malls);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/malls", async (req, res, next) => {
    try {
      const parsed = insertMallSchema.parse(req.body);
      const mall = await storage.createMall(parsed);
      res.json(mall);
    } catch (error) {
      next(error);
    }
  });

  // Expense routes
  app.get("/api/expenses", async (req, res, next) => {
    try {
      const expenses = await storage.getExpenses();
      res.json(expenses);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/expenses", async (req, res, next) => {
    try {
      const parsed = insertExpenseSchema.parse(req.body);
      const expense = await storage.createExpense(parsed);
      res.json(expense);
    } catch (error) {
      next(error);
    }
  });

  // Sales routes
  app.get("/api/sales", async (req, res, next) => {
    try {
      const sales = await storage.getSales();
      res.json(sales);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/sales", async (req, res, next) => {
    try {
      const parsed = insertSaleSchema.parse(req.body);
      const sale = await storage.createSale(parsed);
      res.json(sale);
    } catch (error) {
      next(error);
    }
  });

  // Company routes
  app.get("/api/companies", async (req, res, next) => {
    try {
      const companies = await storage.getCompanies();
      res.json(companies);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/companies/:id", async (req, res, next) => {
    try {
      const company = await storage.getCompany(parseInt(req.params.id));
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/companies", async (req, res, next) => {
    try {
      const parsed = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(parsed);
      res.json(company);
    } catch (error) {
      next(error);
    }
  });

  // Transaction routes
  app.get("/api/companies/:id/transactions", async (req, res, next) => {
    try {
      const transactions = await storage.getTransactions(parseInt(req.params.id));
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/companies/:id/transactions", async (req, res, next) => {
    try {
      const parsed = insertTransactionSchema.parse({
        ...req.body,
        companyId: parseInt(req.params.id)
      });
      const transaction = await storage.createTransaction(parsed);
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  });

  return createServer(app);
}
