'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FilterTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    count?: number;
  }>;
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function FilterTabs({
  tabs,
  defaultTab,
  onTabChange
}: FilterTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="bg-white border-b border-[#E5E7EB] rounded-none p-0 h-auto">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="border-b-2 border-transparent rounded-none px-4 py-3 font-medium text-sm text-[#4B5563] data-[state=active]:border-[#F59E0B] data-[state=active]:text-[#F59E0B] data-[state=active]:bg-transparent hover:text-[#1A1A2E] transition-colors"
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 text-xs bg-[#F3F4F6] px-2 py-0.5 rounded">
                {tab.count}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
