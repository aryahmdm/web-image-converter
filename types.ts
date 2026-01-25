
export enum ProjectStatus {
  PLANNING = 'Planning',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  ON_HOLD = 'On Hold'
}

export enum InvoiceStatus {
  DRAFT = 'Draft',
  SENT = 'Sent',
  PAID = 'Paid',
  OVERDUE = 'Overdue'
}

export interface Client {
  id: string;
  companyName: string;
  picName: string;
  phone: string;
  email: string;
  address: string;
  subDistrict: string;
  city: string;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  description: string;
  status: ProjectStatus;
  budget: number;
  startDate: string;
  endDate?: string;
  tasks?: string[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: string;
  projectId: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  status: InvoiceStatus;
  notes?: string;
}

export type ViewType = 'dashboard' | 'projects' | 'invoices' | 'clients' | 'settings';
