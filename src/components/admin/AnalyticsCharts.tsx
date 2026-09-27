import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import type { Lead } from '../../services/leadsService';

interface AnalyticsChartsProps {
  leads: Lead[];
  isAr: boolean;
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ leads, isAr }) => {
  // Aggregate services
  const servicesData = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach(l => {
      let s = l.service || 'general';
      s = s.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      counts[s] = (counts[s] || 0) + 1;
    });
    return Object.keys(counts).map(k => ({
      name: k,
      value: counts[k]
    }));
  }, [leads]);

  // Aggregate by Date
  const trendData = useMemo(() => {
    const dates: Record<string, number> = {};
    // Sort leads chronologically for the chart
    const sortedLeads = [...leads].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    sortedLeads.forEach(l => {
      const d = new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dates[d] = (dates[d] || 0) + 1;
    });
    
    // Take the last 7 days of activity
    return Object.keys(dates).slice(-7).map(k => ({
      date: k,
      leads: dates[k]
    }));
  }, [leads]);

  const COLORS = ['#A78BFA', '#7ED6B7', '#FF8FB1', '#60A5FA', '#FBBF24'];

  if (leads.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6" dir="ltr">
      {/* Leads Trend Bar Chart */}
      <div className="bg-white dark:bg-[#1A1A1A] p-5 rounded-2xl border border-[#1E1E1E]/8 dark:border-white/10 shadow-xs">
        <h3 className={`text-sm font-black mb-4 text-[#1E1E1E] dark:text-white ${isAr ? 'text-right' : 'text-left'}`}>
          {isAr ? 'معدل تدفق الطلبات' : 'Lead Inflow Trend'}
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(167, 139, 250, 0.05)' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#222', color: '#fff' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Bar dataKey="leads" name={isAr ? "الطلبات" : "Leads"} fill="#A78BFA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Distribution Pie Chart */}
      <div className="bg-white dark:bg-[#1A1A1A] p-5 rounded-2xl border border-[#1E1E1E]/8 dark:border-white/10 shadow-xs">
        <h3 className={`text-sm font-black mb-4 text-[#1E1E1E] dark:text-white ${isAr ? 'text-right' : 'text-left'}`}>
          {isAr ? 'توزيع الخدمات المطلوبة' : 'Services Distribution'}
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={servicesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {servicesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#222', color: '#fff' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
