import { createClient } from '@supabase/supabase-js';
import {
  type User, type Mall, type Expense, type Sale,
  type Company, type Transaction,
  type InsertUser, type InsertMall, type InsertExpense,
  type InsertSale, type InsertCompany, type InsertTransaction
} from "@shared/schema";

const supabase = createClient(
  'https://odnnwiimnqrwcswijaxn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kbm53aWltbnFyd2Nzd2lqYXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMzAyMTYsImV4cCI6MjA1NTgwNjIxNn0.ZRJWG7vaEO_kawD8-Xd3SM83PywGgvuWfsRSt6O2XAM'
);

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

export class SupabaseStorage implements IStorage {
  async getUser(email: string, password: string): Promise<User | undefined> {
    const { data } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .eq('password', password)
      .single();
    return data || undefined;
  }

  async getMalls(): Promise<Mall[]> {
    const { data } = await supabase.from('malls').select();
    return data || [];
  }

  async createMall(mall: InsertMall): Promise<Mall> {
    const { data } = await supabase
      .from('malls')
      .insert(mall)
      .select()
      .single();
    return data!;
  }

  async getExpenses(): Promise<Expense[]> {
    const { data } = await supabase.from('expenses').select();
    return data || [];
  }

  async createExpense(expense: InsertExpense): Promise<Expense> {
    const { data } = await supabase
      .from('expenses')
      .insert(expense)
      .select()
      .single();
    return data!;
  }

  async getSales(): Promise<Sale[]> {
    const { data } = await supabase.from('sales').select();
    return data || [];
  }

  async createSale(sale: InsertSale): Promise<Sale> {
    const { data } = await supabase
      .from('sales')
      .insert(sale)
      .select()
      .single();
    return data!;
  }

  async getCompanies(): Promise<Company[]> {
    const { data } = await supabase.from('companies').select();
    return data || [];
  }

  async getCompany(id: number): Promise<Company | undefined> {
    const { data } = await supabase
      .from('companies')
      .select()
      .eq('id', id)
      .single();
    return data || undefined;
  }

  async createCompany(company: InsertCompany): Promise<Company> {
    const { data } = await supabase
      .from('companies')
      .insert(company)
      .select()
      .single();
    return data!;
  }

  async getTransactions(companyId: number): Promise<Transaction[]> {
    const { data } = await supabase
      .from('transactions')
      .select()
      .eq('companyId', companyId);
    return data || [];
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const { data } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single();
    return data!;
  }
}

export const storage = new SupabaseStorage();