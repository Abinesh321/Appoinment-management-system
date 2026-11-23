import React from 'react';
import { SPECIALTIES } from '../data/expertsData';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function CategoryFilters({ 
  selectedSpecialty, 
  setSelectedSpecialty, 
  sortBy, 
  setSortBy, 
  consultationTypeFilter, 
  setConsultationTypeFilter,
  totalResults
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-12 py-4 mb-6">
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-4">
        
        {/* Specialty Pill Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-2">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Specialty:
          </span>
          {SPECIALTIES.map((spec) => {
            const isSelected = selectedSpecialty === spec;
            return (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {spec}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Controls: Consultation Type & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs">
          
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">Consultation Format:</span>
            
            <button
              onClick={() => setConsultationTypeFilter('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                consultationTypeFilter === 'all'
                  ? 'bg-slate-700 text-slate-100 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Formats
            </button>

            <button
              onClick={() => setConsultationTypeFilter('virtual')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                consultationTypeFilter === 'virtual'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Virtual Video
            </button>

            <button
              onClick={() => setConsultationTypeFilter('in-person')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                consultationTypeFilter === 'in-person'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Clinic / In-Person
            </button>

            <button
              onClick={() => setConsultationTypeFilter('vip-lounge')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                consultationTypeFilter === 'vip-lounge'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              VIP Lounge Access
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">
              Showing <strong className="text-slate-100">{totalResults}</strong> Experts
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Fee: Low to High</option>
                <option value="price-high">Fee: High to Low</option>
              </select>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
