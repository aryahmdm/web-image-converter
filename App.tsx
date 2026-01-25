
import React, { useState, useEffect, useRef } from 'react';
import { ViewType, Project, Client, Invoice, InvoiceStatus, InvoiceItem } from './types';
import { INITIAL_CLIENTS, INITIAL_PROJECTS, INITIAL_INVOICES, Icons } from './constants';
import DashboardOverview from './components/DashboardOverview';
import ProjectList from './components/ProjectList';
import InvoiceList from './components/InvoiceList';
import ClientList from './components/ClientList';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeModal, setActiveModal] = useState<'client' | 'invoice' | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const [clientForm, setClientForm] = useState({ 
    companyName: '', picName: '', phone: '', email: '', address: '', subDistrict: '', city: ''
  });

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      setClients(prev => prev.map(c => c.id === editingClient.id ? { ...clientForm, id: editingClient.id } : c));
    } else {
      setClients(prev => [{ ...clientForm, id: `c${Date.now()}` }, ...prev]);
    }
    setActiveModal(null);
    setEditingClient(null);
  };

  return (
    <div className="flex h-screen w-screen bg-dark-950 text-gray-200 font-sans tracking-tight">
      {/* Sidebar - Precision Glass Aesthetic */}
      <aside className="w-72 sidebar-glass flex flex-col z-30 border-r border-white/5">
        <div className="p-8 pt-10">
          <div className="w-12 h-12 flex items-center justify-center text-white mb-2">
            <Icons.LogoKnot className="w-10 h-10" />
          </div>
        </div>

        <div className="flex-1 px-4 space-y-8 overflow-y-auto pb-10">
          <section>
            <h3 className="px-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Main Menu</h3>
            <div className="space-y-1">
              <SidebarLink active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} icon={<Icons.Dashboard className="w-5 h-5"/>} label="Dashboard" />
              <SidebarLink active={activeView === 'projects'} onClick={() => setActiveView('projects')} icon={<Icons.Projects className="w-5 h-5"/>} label="Projects" hasSubmenu />
              <SidebarLink active={activeView === 'invoices'} onClick={() => setActiveView('invoices')} icon={<Icons.Invoices className="w-5 h-5"/>} label="Invoices" />
            </div>
          </section>

          <section>
            <h3 className="px-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Record</h3>
            <div className="space-y-1">
              <SidebarLink active={activeView === 'clients'} onClick={() => setActiveView('clients')} icon={<Icons.Clients className="w-5 h-5"/>} label="Clients" />
              <SidebarLink active={false} onClick={() => {}} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>} label="Companies" />
            </div>
          </section>
        </div>

        <div className="p-6">
           <div className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-black">
                AM
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Alex Morgan</p>
                <p className="text-xs text-gray-500 truncate">alex@proinvoice.com</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header - Industrial Modernism */}
        <header className="h-24 flex items-center justify-between px-12 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center">
            {/* Home Icon */}
            <button 
              onClick={() => setActiveView('dashboard')}
              className="text-gray-500 hover:text-gray-300 transition-colors p-1"
            >
              <Icons.Dashboard className="w-5 h-5" strokeWidth={2} />
            </button>

            {/* Separator */}
            <svg className="w-4 h-4 mx-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>

            {/* Page Title */}
            <span className="text-xl font-medium text-gray-200 tracking-tight">
              {activeView === 'dashboard' ? 'Overviews' : activeView.charAt(0).toUpperCase() + activeView.slice(1)}
            </span>
          </div>

          <div className="flex items-center space-x-8">
            <div className="relative group hidden lg:block">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 w-72 transition-all placeholder:text-gray-600 tech-label text-gray-300"
              />
            </div>

            <div className="flex items-center space-x-4 pl-8 border-l border-white/5 cursor-pointer group" onClick={() => setShowProfileMenu(!showProfileMenu)}>
               <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-black"></span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>
               </button>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-12">
          <div className="max-w-[1500px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeView === 'dashboard' && <DashboardOverview projects={projects} invoices={invoices} />}
            {activeView === 'projects' && (
              <ProjectList 
                projects={projects} 
                clients={clients} 
                onAddProject={(p) => setProjects(prev => [p, ...prev])}
                onUpdateProject={(p) => setProjects(prev => prev.map(proj => proj.id === p.id ? p : proj))}
                onSelectProject={() => {}} 
              />
            )}
            {activeView === 'invoices' && (
              <InvoiceList 
                invoices={invoices} projects={projects} clients={clients} 
                onOpenAddModal={() => setActiveModal('invoice')} 
              />
            )}
            {activeView === 'clients' && (
              <ClientList 
                clients={clients} 
                onOpenAddModal={() => setActiveModal('client')} 
                onEditClient={(c) => { setEditingClient(c); setClientForm(c); setActiveModal('client'); }}
                onDeleteClient={(id) => setClients(prev => prev.filter(cl => cl.id !== id))}
              />
            )}
          </div>
        </main>
      </div>

      {/* Form Modals with Precision Glass style */}
      {activeModal === 'client' && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-3xl flex items-center justify-center z-[100] p-6">
          <div className="glass-card w-full max-w-xl rounded-4xl p-12 animate-in fade-in zoom-in duration-500">
            <h3 className="text-3xl font-display font-black mb-10 text-white tracking-tighter">{editingClient ? 'MOD_CLIENT' : 'NEW_CLIENT'}</h3>
            <form onSubmit={handleClientSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="tech-label text-gray-500 mb-2 block">ENTITY_NAME</label>
                  <input required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/40 outline-none text-white font-medium" value={clientForm.companyName} onChange={e => setClientForm({...clientForm, companyName: e.target.value})} />
                </div>
                <div className="col-span-1">
                  <label className="tech-label text-gray-500 mb-2 block">CORE_CONTACT</label>
                  <input required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/40 outline-none" value={clientForm.picName} onChange={e => setClientForm({...clientForm, picName: e.target.value})} />
                </div>
                <div className="col-span-1">
                  <label className="tech-label text-gray-500 mb-2 block">COMMS_CHANNEL</label>
                  <input required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/40 outline-none" value={clientForm.phone} onChange={e => setClientForm({...clientForm, phone: e.target.value})} />
                </div>
              </div>
              <div className="flex space-x-4 pt-8">
                <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-5 glass border border-white/5 rounded-2xl font-bold tech-label transition-all hover:bg-white/5 uppercase">Abort</button>
                <button type="submit" className="flex-1 py-5 bg-primary text-black font-display font-black rounded-2xl shadow-[0_10px_40px_rgba(249,115,22,0.2)] hover:scale-105 active:scale-95 transition-all uppercase tracking-tighter text-sm">
                  {editingClient ? 'Sync_Update' : 'Commit_Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarLink = ({ active, onClick, icon, label, hasSubmenu }: any) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group border border-transparent ${active ? 'glass-card text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
    <div className="flex items-center space-x-3">
      <div className={`transition-colors duration-300 ${active ? 'text-primary' : 'text-gray-500 group-hover:text-white'}`}>{icon}</div>
      <span className={`text-[15px] font-medium tracking-tight ${active ? 'text-white' : ''}`}>{label}</span>
    </div>
    {hasSubmenu && (
      <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    )}
  </button>
);

export default App;
