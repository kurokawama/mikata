'use client';

import { Clock, User } from 'lucide-react';

export function AdminHeader() {
  const currentTime = new Date().toLocaleString('ja-JP', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-20">
      <div className="flex items-center justify-between px-6 py-4 md:ml-64">
        <h2 className="text-xl font-bold text-[#1A1A2E]">ダッシュボード</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-[#4B5563]">
            <Clock size={16} />
            <span>{currentTime}</span>
          </div>
          <button className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors">
            <User size={20} className="text-[#16213E]" />
          </button>
        </div>
      </div>
    </header>
  );
}
