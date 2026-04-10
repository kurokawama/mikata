'use client';

import { useState } from 'react';
import { Menu, X, Home, BarChart3, Settings, HelpCircle, LogOut } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  badge?: string;
}

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'ダッシュボード', icon: <Home size={20} />, href: '#' },
    { id: 'analytics', label: 'アナリティクス', icon: <BarChart3 size={20} />, href: '#' },
    { id: 'settings', label: '設定', icon: <Settings size={20} />, href: '#' },
    { id: 'help', label: 'ヘルプ', icon: <HelpCircle size={20} />, href: '#', badge: '新' },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 hover:bg-gray-200 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#16213E] text-[#E8E8F0] transition-all duration-300 z-40 ${
          !isOpen ? '-translate-x-full' : ''
        } md:translate-x-0 overflow-y-auto`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A2E]">
          <h1 className="text-lg font-bold text-white">MIKAYAS ADMIN</h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#1A1A2E] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#F59E0B] group-hover:text-[#FEF3C7]">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-xs bg-[#F59E0B] text-[#16213E] px-2 py-1 rounded">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#1A1A2E]">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1A1A2E] transition-colors text-sm font-medium">
            <LogOut size={20} className="text-[#EF4444]" />
            <span>ログアウト</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
}
