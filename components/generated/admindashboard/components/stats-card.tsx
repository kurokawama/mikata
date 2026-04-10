import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  unit?: string;
  trend?: {
    direction: 'up' | 'down';
    percentage: string;
  };
  color?: 'amber' | 'green' | 'blue';
}

export function StatsCard({
  label,
  value,
  unit,
  trend,
  color = 'blue'
}: StatsCardProps) {
  const colorClasses = {
    amber: 'text-[#F59E0B]',
    green: 'text-[#22C55E]',
    blue: 'text-[#16213E]'
  };

  return (
    <Card className="p-6 bg-white border-[#E5E7EB]">
      <p className="text-sm font-medium text-[#4B5563] mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-bold text-[#1A1A2E]">{value}</h3>
        {unit && <span className="text-sm text-[#9CA3AF]">{unit}</span>}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 mt-4 ${
          trend.direction === 'up' ? 'text-[#22C55E]' : 'text-[#EF4444]'
        }`}>
          {trend.direction === 'up' ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
          <span className="text-sm font-medium">{trend.percentage}</span>
        </div>
      )}
    </Card>
  );
}
