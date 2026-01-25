
import React, { useState } from 'react';
import { Client } from '../types';
import { Icons } from '../constants';

interface Props {
  clients: Client[];
  onOpenAddModal: () => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (id: string) => void;
}

const ClientList: React.FC<Props> = ({ clients, onOpenAddModal, onEditClient, onDeleteClient }) => {
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-display font-black tracking-tighter text-white uppercase">Client_Registry</h2>
          <p className="tech-label text-gray-500 mt-2 uppercase">CENTRAL_ENTITY_DATABASE_V1.1</p>
        </div>
        <button 
          onClick={onOpenAddModal}
          className="bg-primary hover:bg-primary-hover text-black px-8 py-4 rounded-3xl font-display font-black flex items-center transition-all shadow-[0_10px_40px_rgba(249,115,22,0.15)] hover:scale-105 active:scale-95 uppercase text-xs tracking-tighter"
        >
          <Icons.Plus className="w-5 h-5 mr-3" />
          NEW_ENTITY
        </button>
      </div>

      <div className="glass-card rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="tech-label text-gray-500 border-b border-white/5 bg-white/[0.01]">
                <th className="px-10 py-7">COMPANY_ENTITY</th>
                <th className="px-10 py-7">CONTACT_REF</th>
                <th className="px-10 py-7">COMMS_ID</th>
                <th className="px-10 py-7">GEOLOCATION</th>
                <th className="px-10 py-7 text-right">OPERATIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clients.map(client => (
                <tr key={client.id} className="hover:bg-white/[0.02] transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center space-x-5">
                      <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center font-display font-black text-primary border border-white/10 group-hover:border-primary/40 transition-all text-xl">
                        {client.companyName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-display font-bold text-white text-lg tracking-tight group-hover:text-primary transition-colors">{client.companyName}</span>
                        <p className="tech-label text-gray-600 mt-1 text-[9px] uppercase tracking-widest">ID_{client.id.slice(0, 6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-sm font-semibold text-gray-400">
                    {client.picName}
                  </td>
                  <td className="px-10 py-8 text-sm font-bold text-gray-200 tech-label">
                    {client.phone}
                  </td>
                  <td className="px-10 py-8">
                    <p className="tech-label text-gray-500 uppercase">{client.city}</p>
                    <p className="text-[10px] text-gray-600 mt-1.5 truncate max-w-[150px] font-medium">{client.address}</p>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end space-x-3">
                      <button onClick={() => onEditClient(client)} className="p-3 glass rounded-2xl text-gray-600 hover:text-white hover:border-white/20 transition-all shadow-xl">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2" strokeLinecap="round"/></svg>
                      </button>
                      <button onClick={() => setClientToDelete(client)} className="p-3 glass rounded-2xl text-gray-600 hover:text-red-400 hover:border-red-400/30 transition-all shadow-xl">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {clients.length === 0 && (
          <div className="p-24 text-center">
            <div className="w-24 h-24 glass rounded-[2rem] flex items-center justify-center mx-auto mb-8 animate-pulse">
              <Icons.Clients className="w-12 h-12 text-gray-700" />
            </div>
            <p className="tech-label text-gray-600 font-bold uppercase tracking-widest">ZERO_RECORDS_DETECTED</p>
          </div>
        )}
      </div>

      {clientToDelete && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl flex items-center justify-center z-[110] p-6">
          <div className="glass-card w-full max-w-md rounded-4xl p-12 border border-white/5 animate-in fade-in zoom-in duration-500 shadow-[0_0_100px_rgba(239,68,68,0.1)]">
            <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
            <h3 className="text-3xl font-display font-black text-center text-white mb-4 uppercase tracking-tighter">Confirm_Purge</h3>
            <p className="text-gray-500 text-center mb-10 text-sm leading-relaxed">System is requesting to permanently remove <span className="text-white font-bold font-display">{clientToDelete.companyName.toUpperCase()}</span>. This operation is irreversible.</p>
            <div className="flex space-x-4">
              <button onClick={() => setClientToDelete(null)} className="flex-1 py-5 glass border border-white/5 rounded-2xl tech-label font-bold hover:bg-white/5 transition-all uppercase">ABORT_CMD</button>
              <button onClick={() => { onDeleteClient(clientToDelete.id); setClientToDelete(null); }} className="flex-1 py-5 bg-red-600 text-white font-display font-black rounded-2xl hover:bg-red-700 transition-all uppercase tracking-tighter text-sm shadow-2xl shadow-red-600/20">EXECUTE_DEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;
