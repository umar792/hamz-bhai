import {
  type User, type Mall, type Expense, type Sale,
  type Company, type Transaction,
  type InsertUser, type InsertMall, type InsertExpense,
  type InsertSale, type InsertCompany, type InsertTransaction
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(email: string, password: string): Promise<User | undefined>;
  
  // Mall
  getMalls(): Promise<Mall[]>;
  createMall(mall: InsertMall): Promise<Mall>;
  
  // Expenses
  getExpenses(): Promise<Expense[]>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  
  // Sales
  getSales(): Promise<Sale[]>;
  createSale(sale: InsertSale): Promise<Sale>;
  
  // Companies
  getCompanies(): Promise<Company[]>;
  getCompany(id: number): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  
  // Transactions
  getTransactions(companyId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private malls: Map<number, Mall>;
  private expenses: Map<number, Expense>;
  private sales: Map<number, Sale>;
  private companies: Map<number, Company>;
  private transactions: Map<number, Transaction>;
  
  private currentIds: {
    user: number;
    mall: number;
    expense: number;
    sale: number;
    company: number;
    transaction: number;
  };

  constructor() {
    this.users = new Map();
    this.malls = new Map();
    this.expenses = new Map();
    this.sales = new Map();
    this.companies = new Map();
    this.transactions = new Map();
    
    this.currentIds = {
      user: 1,
      mall: 1,
      expense: 1,
      sale: 1,
      company: 1,
      transaction: 1
    };

    // Add static user
    this.users.set(1, {
      id: 1,
      email: "hamza@gmail.com",
      password: "hamza123"
    });
  }

  async getUser(email: string, password: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      user => user.email === email && user.password === password
    );
  }

  async getMalls(): Promise<Mall[]> {
    return Array.from(this.malls.values());
  }

  async createMall(mall: InsertMall): Promise<Mall> {
    const id = this.currentIds.mall++;
    const newMall = { ...mall, id };
    this.malls.set(id, newMall);
    return newMall;
  }

  async getExpenses(): Promise<Expense[]> {
    return Array.from(this.expenses.values());
  }

  async createExpense(expense: InsertExpense): Promise<Expense> {
    const id = this.currentIds.expense++;
    const newExpense = { ...expense, id };
    this.expenses.set(id, newExpense);
    return newExpense;
  }

  async getSales(): Promise<Sale[]> {
    return Array.from(this.sales.values());
  }

  async createSale(sale: InsertSale): Promise<Sale> {
    const id = this.currentIds.sale++;
    const newSale = { ...sale, id };
    this.sales.set(id, newSale);
    return newSale;
  }

  async getCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async getCompany(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async createCompany(company: InsertCompany): Promise<Company> {
    const id = this.currentIds.company++;
    const newCompany = { ...company, id };
    this.companies.set(id, newCompany);
    return newCompany;
  }

  async getTransactions(companyId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      t => t.companyId === companyId
    );
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentIds.transaction++;
    const newTransaction = { ...transaction, id };
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }
}

export const storage = new MemStorage();
