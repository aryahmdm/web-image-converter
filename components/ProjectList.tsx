
import React, { useState } from 'react';
import { Project, Client, ProjectStatus } from '../types';
import { Icons } from '../constants';
import { generateProjectDescription } from '../services/geminiService';

interface Props {
  projects: Project[];
  clients: Client[];
  onAddProject: (project: Project) => void;
  onUpdateProject: (project: Project) => void;
  onSelectProject: (projectId: string) => void;
}

const ProjectList: React.FC<Props> = ({ projects, clients, onAddProject, onSelectProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    clientId: clients[0]?.id || '',
    description: '',
    budget: 0,
    status: ProjectStatus.PLANNING,
    startDate: new Date().toISOString().split('T')[0]
  });

  const handleAiAssist = async () => {
    if (!formData.name) return;
    setIsAiLoading(true);
    const client = clients.find(c => c.id === formData.clientId);
    const desc = await generateProjectDescription(formData.name, client?.companyName || 'Client');
    setFormData(prev => ({ ...prev, description: desc }));
    setIsAiLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
    };
    onAddProject(newProject);
    setIsModalOpen(false);
    setFormData({
      name: '',
      clientId: clients[0]?.id || '',
      description: '',
      budget: 0,
      status: ProjectStatus.PLANNING,
      startDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-display font-black tracking-tighter text-white uppercase">Project_Fleet</h2>
          <p className="tech-label text-gray-500 mt-2 uppercase">ACTIVE_OPERATION_REGISTRY_V2</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-hover text-black px-8 py-4 rounded-3xl font-display font-black flex items-center transition-all shadow-[0_10px_40px_rgba(249,115,22,0.15)] hover:scale-105 active:scale-95 uppercase text-xs tracking-tighter"
        >
          <Icons.Plus className="w-5 h-5 mr-3" />
          INIT_PROJECT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <div 
            key={project.id} 
            onClick={() => onSelectProject(project.id)}
            className="glass-card p-8 rounded-[2.5rem] shadow-2xl hover:border-white/10 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
               <Icons.Projects className="w-16 h-16 text-white" />
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className={`tech-label px-3 py-1 rounded-lg text-[9px] border ${
                project.status === ProjectStatus.ACTIVE ? 'border-green-500/30 text-green-400' :
                project.status === ProjectStatus.COMPLETED ? 'border-blue-500/30 text-blue-400' :
                'border-gray-500/30 text-gray-400'
              }`}>
                {project.status.toUpperCase()}
              </span>
              <p className="font-display font-black text-primary text-xl tracking-tighter">${project.budget.toLocaleString()}</p>
            </div>

            <h3 className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors leading-tight mb-2 uppercase">{project.name}</h3>
            <p className="tech-label text-gray-600 mb-4 opacity-70">UID_{project.id.toUpperCase()}</p>
            
            <p className="text-sm text-gray-400 line-clamp-2 mb-8 font-medium tracking-tight">{project.description}</p>
            
            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                 <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                 <span className="tech-label text-gray-500 uppercase">SYS_ACTIVE</span>
              </div>
              <span className="tech-label text-gray-600">ST_DATE_{project.startDate}</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-3xl flex items-center justify-center z-50 p-6">
          <div className="glass-card w-full max-w-lg rounded-4xl p-12 animate-in fade-in zoom-in duration-300 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-display font-black text-white tracking-tighter uppercase">NEW_OP_INIT</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white text-3xl font-light">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="tech-label text-gray-500 mb-2 block uppercase">OP_IDENTIFIER</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/40 outline-none transition-all text-white font-bold"
                  placeholder="e.g. GRID_REBOOT"
                />
              </div>
              <div>
                <label className="tech-label text-gray-500 mb-2 block uppercase">CLIENT_REL_ID</label>
                <select 
                  value={formData.clientId}
                  onChange={e => setFormData(prev => ({...prev, clientId: e.target.value}))}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/40 outline-none transition-all text-white font-bold appearance-none"
                >
                  {clients.map(c => <option key={c.id} value={c.id} className="bg-dark-900">{c.companyName}</option>)}
                </select>
              </div>
              <div className="relative">
                <label className="tech-label text-gray-500 mb-2 block uppercase">OP_PARAMETERS</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/40 outline-none transition-all text-gray-300 text-sm font-medium"
                  placeholder="Detailed mission brief..."
                />
                <button 
                  type="button"
                  onClick={handleAiAssist}
                  disabled={isAiLoading || !formData.name}
                  className="absolute right-3 bottom-3 bg-dark-950 text-primary px-4 py-2 rounded-xl hover:bg-black disabled:opacity-50 flex items-center tech-label transition-all shadow-lg border border-primary/20"
                >
                  <Icons.Sparkles className={`w-3 h-3 mr-2 ${isAiLoading ? 'animate-spin' : ''}`} />
                  {isAiLoading ? 'PROCESSING...' : 'AI_ENHANCE'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-5 glass border border-white/5 rounded-2xl font-bold tech-label transition-all hover:bg-white/5 uppercase">Abort</button>
                <button type="submit" className="flex-1 py-5 bg-primary text-black font-display font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-tighter text-sm">Deploy_Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
