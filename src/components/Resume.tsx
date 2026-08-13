import React, { useState } from 'react';
import { resumeData } from '../data';
import { Mail, Phone, MapPin, Linkedin, Github, Download, Edit2, Check } from 'lucide-react';

export default function Resume() {
  const [address, setAddress] = useState(resumeData.header.location);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);

  const handlePrint = () => {
    window.print();
  };

  const saveAddress = () => {
    setAddress(tempAddress);
    setIsEditingAddress(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-10 px-4 font-sans text-[#1A1A1A] flex flex-col items-center print:bg-white print:py-0 print:px-0">
      
      {/* Print Controls - Hidden in print mode */}
      <div className="w-full max-w-[1024px] mb-6 flex justify-between items-center print:hidden">
        <h1 className="text-2xl font-bold text-[#111827]">Resume Builder</h1>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#111827] text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Download size={18} />
          <span>Export as PDF</span>
        </button>
      </div>

      {/* Resume Document Landscape Sized Container */}
      <div className="w-full max-w-[1024px] bg-[#FAF9F6] shadow-xl min-h-[768px] flex print:shadow-none print:w-full print:max-w-none print:h-[768px] overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-[320px] bg-[#111827] text-[#E5E7EB] p-10 flex flex-col justify-between shrink-0 print:h-full">
          <section>
            <h1 className="text-5xl font-serif font-bold text-white leading-tight mb-2 uppercase break-words">
              {resumeData.header.name.split(' ').map((part, i) => (
                <React.Fragment key={i}>
                  {part}<br/>
                </React.Fragment>
              ))}
            </h1>
            <p className="text-[#F59E0B] font-mono text-sm tracking-widest uppercase mb-8">{resumeData.header.role}</p>
            <div className="space-y-4 text-xs opacity-80">
              <div className="flex items-center gap-3">
                <span className="w-5 h-[1px] bg-[#F59E0B]"></span>
                <p>{resumeData.header.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-[1px] bg-[#F59E0B]"></span>
                <p>{resumeData.header.phone}</p>
              </div>
              <div className="flex items-center gap-3 group relative">
                <span className="w-5 h-[1px] bg-[#F59E0B]"></span>
                {isEditingAddress ? (
                  <div className="flex items-center gap-1 w-full">
                    <input 
                      type="text" 
                      value={tempAddress} 
                      onChange={(e) => setTempAddress(e.target.value)}
                      className="bg-transparent border border-gray-600 rounded px-1 py-0.5 text-xs focus:outline-none focus:border-[#F59E0B] w-full text-white"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && saveAddress()}
                    />
                    <button onClick={saveAddress} className="text-green-500 hover:bg-gray-800 p-1 rounded shrink-0">
                      <Check size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="pr-6">{address}</p>
                    <button 
                      onClick={() => setIsEditingAddress(true)}
                      className="absolute right-0 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                      title="Edit Address"
                    >
                      <Edit2 size={12} />
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-4">
                <Linkedin size={14} className="text-[#F59E0B]" />
                <p>{resumeData.header.linkedin}</p>
              </div>
              <div className="flex items-center gap-3">
                <Github size={14} className="text-[#F59E0B]" />
                <p>{resumeData.header.github}</p>
              </div>
            </div>
          </section>
          
          <section className="mt-8">
            <h3 className="text-[#F59E0B] uppercase text-[10px] tracking-[0.2em] font-bold mb-4">Core Stack</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.flatMap(s => s.items).slice(0, 15).map((skill, idx) => (
                <span key={idx} className="px-2 py-1 border border-white/20 text-[9px] uppercase">{skill}</span>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-[#F59E0B] uppercase text-[10px] tracking-[0.2em] font-bold mb-2">Education</h3>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="mb-3 last:mb-0">
                <p className="text-[11px] font-semibold text-white">{edu.degree}</p>
                <p className="text-[10px] opacity-70">{edu.school}</p>
              </div>
            ))}
          </section>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-12 flex flex-col bg-[#FAF9F6]">
          <header className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[1px] w-12 bg-[#1A1A1A]"></span>
              <p className="font-serif italic text-xl text-[#374151]">Professional Profile</p>
            </div>
            <p className="text-sm leading-relaxed text-[#4B5563] max-w-2xl text-justify">
              {resumeData.summary}
            </p>
          </header>
          
          <div className="flex-1 grid grid-cols-2 gap-8">
            <section className="space-y-6">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9CA3AF] border-b border-gray-200 pb-2">Featured Projects</h2>
              <div className="space-y-5">
                {resumeData.projects.map((project, idx) => (
                  <div key={idx} className="group">
                    <p className="text-[10px] font-mono text-[#F59E0B] mb-1">0{idx + 1} / {project.tech}</p>
                    <h4 className="text-sm font-bold mb-1 uppercase text-[#1A1A1A]">{project.title}</h4>
                    <ul className="text-[11px] text-[#6B7280] leading-snug space-y-1 list-disc list-inside">
                      {project.points.slice(0, 2).map((point, pIdx) => (
                        <li key={pIdx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="space-y-6 flex flex-col h-full">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9CA3AF] border-b border-gray-200 pb-2">Professional History</h2>
              <div className="space-y-5 flex-1">
                {resumeData.experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-bold uppercase text-[#1A1A1A]">{exp.title.split('|')[0].trim()}</h4>
                      <span className="text-[10px] font-mono text-[#9CA3AF]">{exp.date}</span>
                    </div>
                    <p className="text-[10px] text-[#9CA3AF] italic mb-2">{exp.company}</p>
                    <ul className="text-[11px] text-[#4B5563] space-y-1 list-disc list-inside">
                      {exp.points.slice(0, 2).map((point, pIdx) => (
                        <li key={pIdx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {/* Highlight Box for added flair */}
              <div className="p-4 bg-[#F59E0B]/5 border-l-2 border-[#F59E0B] mt-4">
                 <p className="text-[10px] font-bold uppercase text-[#F59E0B] mb-1">Current Focus</p>
                 <p className="text-[11px] text-[#4B5563]">Specializing in Data Engineering pipelines and Big Data architectures for fintech and automation sectors.</p>
              </div>
            </section>
          </div>
          
          <footer className="mt-auto pt-6 border-t border-gray-200 flex justify-between items-center text-[9px] uppercase tracking-widest text-[#9CA3AF] font-bold">
            <p>Portfolio: github.com/Rohit-Roby</p>
            {resumeData.certifications[0] && <p>{resumeData.certifications[0]}</p>}
            <p>{new Date().getFullYear()} Edition</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
