
import React, { useMemo } from 'react';
import { Project, Invoice, ProjectStatus, InvoiceStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  projects: Project[];
  invoices: Invoice[];
}

const DashboardOverview: React.FC<Props> = ({ projects, invoices }) => {
  const totalRevenue = useMemo(() => {
    return invoices
      .filter(inv => inv.status === InvoiceStatus.PAID)
      .reduce((sum, inv) => sum + inv.items.reduce((itemSum, item) => itemSum + (item.quantity * item.rate), 0), 0);
  }, [invoices]);

  const chartData = [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 28000 },
    { name: 'Mar', value: 19000 },
    { name: 'Apr', value: 15000 },
    { name: 'May', value: 22000 },
    { name: 'Jun', value: 45000 },
    { name: 'Jul', value: 31000 },
    { name: 'Aug', value: 24000 },
  ];

  return (
    <div className="space-y-10">
      {/* High impact stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Income_Total" value={`$${(totalRevenue / 1000).toFixed(3)}k`} trend="+25.8%" icon="income" />
        <StatCard label="Sales_Activity" value="$24.7k" trend="+32.5%" icon="sales" />
        <StatCard label="Deals_Volume" value="927" trend="-19.6%" isNegative icon="deals" />
        <StatCard label="Comm_Rate" value="86.7%" trend="+15.2%" icon="rate" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Performance Graph */}
        <div className="lg:col-span-2 glass-card rounded-4xl p-12 relative">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-2xl font-display font-bold text-white tracking-tighter">System_Performance</h3>
              <p className="tech-label text-gray-500 mt-2">REALTIME_METRIC_ANALYTICS</p>
            </div>
            <div className="flex space-x-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/5">
              <button className="px-6 py-2 bg-dark-700 text-white rounded-xl text-[11px] font-display font-bold tech-label">INCOME</button>
              <button className="px-6 py-2 text-gray-600 hover:text-white rounded-xl text-[11px] font-display font-bold tech-label transition-colors">EXPENSE</button>
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={1} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.02)" strokeDasharray="0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 10, fontFamily: 'Space Mono', fontWeight: 600 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 10, fontFamily: 'Space Mono', fontWeight: 600 }} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', fontFamily: 'Space Grotesk' }}
                />
                <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={45}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Jun' ? 'url(#barGradient)' : '#1a1a1a'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Circular KPI */}
        <div className="glass-card rounded-4xl p-12 flex flex-col items-center justify-between text-center min-h-[480px]">
          <div className="w-full flex justify-between items-center mb-8">
            <h3 className="text-xl font-display font-bold text-white tracking-tighter">Yield_Radar</h3>
            <button className="text-gray-600 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
            </button>
          </div>

          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="128" cy="128" r="110" stroke="rgba(255,255,255,0.02)" strokeWidth="18" fill="transparent" />
              <circle 
                cx="128" cy="128" r="110" 
                stroke="#f97316" strokeWidth="18" strokeLinecap="round" fill="transparent"
                strokeDasharray="691" strokeDashoffset="180"
                className="drop-shadow-[0_0_12px_rgba(249,115,22,0.3)]"
              />
              <circle 
                cx="128" cy="128" r="85" 
                stroke="#fbbf24" strokeWidth="18" strokeLinecap="round" fill="transparent"
                strokeDasharray="534" strokeDashoffset="140"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <p className="text-4xl font-display font-black text-white tracking-tighter">$40.856</p>
              <p className="tech-label text-gray-500 mt-2 opacity-80 uppercase">CYCLE_JUNE_25</p>
            </div>
          </div>

          <div className="flex space-x-10 mt-8">
            <div className="flex items-center space-x-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
              <span className="tech-label text-gray-400">IN_FLOW</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
              <span className="tech-label text-gray-400">OUT_FLOW</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer list */}
      <div className="glass-card rounded-4xl overflow-hidden">
        <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
          <div>
            <h3 className="text-xl font-display font-bold text-white">Project_Log</h3>
            <p className="tech-label text-gray-500 mt-1 uppercase">LATEST_TRANSACTION_RECORDS</p>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-white/[0.03] border border-white/10 rounded-2xl tech-label font-bold hover:bg-white/10 transition-all text-[10px]">EXPORT_DATA</button>
            <button className="px-6 py-3 bg-white/[0.03] border border-white/10 rounded-2xl tech-label font-bold hover:bg-white/10 transition-all text-[10px]">SYNC_NOW</button>
          </div>
        </div>
        <div className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map(p => (
              <div key={p.id} className="p-6 glass-card rounded-3xl group hover:border-white/10 transition-all cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                   <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <div className="flex items-center space-x-5 mb-6">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center font-display font-black text-primary border border-white/10 group-hover:bg-primary/5">{p.name.charAt(0)}</div>
                  <div>
                    <p className="font-display font-bold text-white text-lg tracking-tight leading-tight">{p.name}</p>
                    <p className="tech-label text-gray-500 mt-1 uppercase">ID_{p.id.slice(0, 4)}</p>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                   <div>
                     <p className="tech-label text-gray-600 mb-1">BUDGET_VAL</p>
                     <p className="font-display font-black text-white text-xl tracking-tighter">${p.budget.toLocaleString()}</p>
                   </div>
                   <div className="text-right">
                     <p className="tech-label text-gray-600 mb-1">STATUS</p>
                     <p className={`tech-label font-black ${p.status === 'Active' ? 'text-primary' : 'text-gray-400'}`}>{p.status.toUpperCase()}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, trend, isNegative, icon }: any) => {
  const IconMap: any = {
    income: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.343 3-3 3m0-18c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" strokeWidth="2.5"/></svg>,
    sales: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2.5"/></svg>,
    deals: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2.5"/></svg>,
    rate: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2.5"/></svg>
  };

  return (
    <div className="glass-card p-8 rounded-4xl relative overflow-hidden group hover:border-white/10 transition-all hover:scale-[1.03] shadow-2xl">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-2.5">
          <div className="tech-label text-gray-500 uppercase">{label}</div>
          <svg className="w-3 h-3 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        </div>
        <div className="p-3 glass rounded-2xl border border-white/10 group-hover:text-primary transition-colors">
          {IconMap[icon]}
        </div>
      </div>
      <p className="text-4xl font-display font-black text-white tracking-tighter">{value}</p>
      <div className="mt-6 flex items-center justify-between">
        <p className="tech-label text-gray-600 uppercase">PREV_CYCLE</p>
        <div className={`flex items-center px-3 py-1 rounded-xl text-[10px] font-black tech-label ${isNegative ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
          <svg className={`w-3 h-3 mr-1 ${isNegative ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5z"/></svg>
          {trend}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
