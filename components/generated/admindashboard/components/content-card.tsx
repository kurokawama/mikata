import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Check, X } from 'lucide-react';

interface ContentCardProps {
  title: string;
  description: string;
  imageUrl: string;
  status: 'active' | 'inactive' | 'pending';
  lastUpdated: string;
  onApprove?: () => void;
  onReject?: () => void;
}

const getStatusColor = (status: ContentCardProps['status']) => {
  switch (status) {
    case 'active':
      return 'bg-[#DCFCE7] text-[#22C55E]';
    case 'inactive':
      return 'bg-[#FEE2E2] text-[#EF4444]';
    case 'pending':
      return 'bg-[#FEF3C7] text-[#D97706]';
  }
};

const getStatusLabel = (status: ContentCardProps['status']) => {
  switch (status) {
    case 'active':
      return 'アクティブ';
    case 'inactive':
      return '非アクティブ';
    case 'pending':
      return '保留中';
  }
};

export function ContentCard({
  title,
  description,
  imageUrl,
  status,
  lastUpdated,
  onApprove,
  onReject
}: ContentCardProps) {
  return (
    <Card className="overflow-hidden border-[#E5E7EB]">
      {/* Image */}
      <div className="h-32 md:h-40 bg-gradient-to-br from-[#16213E] to-[#1A1A2E] flex items-center justify-center text-white text-sm overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-[#1A1A2E] line-clamp-2">{title}</h3>
          <Badge className={getStatusColor(status)}>
            {getStatusLabel(status)}
          </Badge>
        </div>

        <p className="text-sm text-[#4B5563] mb-3 line-clamp-2">{description}</p>

        <p className="text-xs text-[#9CA3AF] mb-4">更新日時: {lastUpdated}</p>

        {status === 'pending' && (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={onApprove}
              className="flex-1 bg-[#22C55E] hover:bg-[#16A34A] text-white"
            >
              <Check size={14} className="mr-1" />
              承認
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onReject}
              className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-[#FEE2E2]"
            >
              <X size={14} className="mr-1" />
              却下
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
