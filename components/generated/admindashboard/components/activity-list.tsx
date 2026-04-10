import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Clock, Zap } from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  status: 'warning' | 'success' | 'pending' | 'alert';
  timestamp: string;
  actionLabel?: string;
  actionColor?: 'red' | 'green' | 'amber';
}

const getStatusIcon = (status: ActivityItem['status']) => {
  switch (status) {
    case 'warning':
      return <AlertCircle size={18} className="text-[#F59E0B]" />;
    case 'success':
      return <CheckCircle2 size={18} className="text-[#22C55E]" />;
    case 'pending':
      return <Clock size={18} className="text-[#9CA3AF]" />;
    case 'alert':
      return <Zap size={18} className="text-[#EF4444]" />;
  }
};

const getStatusBadge = (status: ActivityItem['status']) => {
  switch (status) {
    case 'warning':
      return <Badge className="bg-[#FEF3C7] text-[#D97706] hover:bg-[#FEF3C7]">注意</Badge>;
    case 'success':
      return <Badge className="bg-[#DCFCE7] text-[#22C55E] hover:bg-[#DCFCE7]">完了</Badge>;
    case 'pending':
      return <Badge className="bg-[#F3F4F6] text-[#4B5563] hover:bg-[#F3F4F6]">保留中</Badge>;
    case 'alert':
      return <Badge className="bg-[#FEE2E2] text-[#EF4444] hover:bg-[#FEE2E2]">警告</Badge>;
  }
};

interface ActivityListProps {
  items: ActivityItem[];
  isLoading?: boolean;
  isEmpty?: boolean;
}

export function ActivityList({
  items,
  isLoading = false,
  isEmpty = false
}: ActivityListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-[#F8F9FA] rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center py-8">
        <p className="text-[#9CA3AF] text-sm">アクティビティはありません</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 bg-white border border-[#E5E7EB] rounded-lg hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start gap-3">
            <div className="mt-1">{getStatusIcon(item.status)}</div>
            <div className="flex-1">
              <h4 className="font-medium text-[#1A1A2E]">{item.title}</h4>
              <p className="text-sm text-[#4B5563] mt-1">{item.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-[#9CA3AF]">{item.timestamp}</span>
                <div className="flex items-center gap-2">
                  {item.actionLabel && (
                    <span className={`text-xs font-medium ${
                      item.actionColor === 'red' ? 'text-[#EF4444]' :
                      item.actionColor === 'green' ? 'text-[#22C55E]' :
                      'text-[#F59E0B]'
                    }`}>
                      {item.actionLabel}
                    </span>
                  )}
                  {getStatusBadge(item.status)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
