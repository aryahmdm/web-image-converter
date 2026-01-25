
import React from 'react';
import { Invoice, Project, Client, InvoiceStatus } from '../types';
import { Icons } from '../constants';

interface Props {
  invoices: Invoice[];
  projects: Project[];
  clients: Client[];
  onOpenAddModal: () => void;
}

const InvoiceList: React.FC<Props> = ({ invoices, projects, clients, onOpenAddModal }) => {
  const getProjectName = (id: string) => projects.find(p => p.id === id)?.name || 'Unknown Project';
  const getClientName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return clients.find(c => c.id === project?.clientId)?.companyName || 'Unknown Client';
  };

  const calculateTotal = (invoice: Invoice) => {
    return invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-display font-black tracking-tighter text-white uppercase">Fiscal_Terminal</h2>
          <p className="tech-label text-gray-500 mt-2 uppercase">REVENUE_STREAM_LOGS_V3.0</p>
        </div>
        <button 
          onClick={onOpenAddModal}
          className="bg-primary hover:bg-primary-hover text-black px-8 py-4 rounded-3xl font-display font-black flex items-center transition-all shadow-[0_10px_40px_rgba(249,115,22,0.15)] hover:scale-105 active:scale-95 uppercase text-xs tracking-tighter"
        >
          <Icons.Plus className="w-5 h-5 mr-3" />
          GENERATE_INVOICE
        </button>
      </div>

      <div className="glass-card rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="tech-label text-gray-500 border-b border-white/5 bg-white/[0.01]">
              <th className="px-10 py-7">TX_SERIAL</th>
              <th className="px-10 py-7">ASSIGNED_ENTITY</th>
              <th className="px-10 py-7">TIMESTAMP</th>
              <th className="px-10 py-7">VALUATION</th>
              <th className="px-10 py-7">STATUS</th>
              <th className="px-10 py-7 text-right">MGMT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {invoices.map(invoice => (
              <tr key={invoice.id} className="hover:bg-white/[0.02] transition-all group">
                <td className="px-10 py-8">
                  <span className="mono-value text-gray-400 font-bold tracking-widest">{invoice.invoiceNumber.toUpperCase()}</span>
                </td>
                <td className="px-10 py-8">
                  <div className="font-display font-bold text-white text-lg tracking-tight group-hover:text-primary transition-colors uppercase leading-tight">
                    {getProjectName(invoice.projectId)}
                  </div>
                  <div className="tech-label text-gray-600 mt-1 uppercase opacity-60">{getClientName(invoice.projectId)}</div>
                </td>
                <td className="px-10 py-8 text-sm tech-label text-gray-500">{invoice.date}</td>
                <td className="px-10 py-8 font-display font-black text-white text-xl tracking-tighter">
                  ${calculateTotal(invoice).toLocaleString()}
                </td>
                <td className="px-10 py-8">
                  <span className={`tech-label px-3 py-1 rounded-lg text-[9px] border ${
                    invoice.status === InvoiceStatus.PAID ? 'border-primary/40 text-primary' :
                    invoice.status === InvoiceStatus.SENT ? 'border-blue-500/30 text-blue-400' :
                    invoice.status === InvoiceStatus.OVERDUE ? 'border-red-500/30 text-red-400' :
                    'border-gray-500/30 text-gray-400'
                  }`}>
                    {invoice.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-10 py-8 text-right">
                   <button className="p-3 glass rounded-2xl text-gray-600 hover:text-white hover:border-white/20 transition-all shadow-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {invoices.length === 0 && (
           <div className="p-24 text-center">
              <p className="tech-label text-gray-600 font-bold uppercase tracking-widest italic">EMPTY_INVOICE_QUEUE</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceList;
