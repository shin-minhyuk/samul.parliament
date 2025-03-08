'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import Sidebar from './Sidebar';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-black border-b border-gray-200 flex items-center justify-between px-4 z-50">
        {/* Left - Sidebar Button */}
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Center - Title */}
        <h1 className="text-xl font-semibold">2025 사물의 의회</h1>

        {/* Right - Apply Button */}
        <button className="px-4 py-2 bg-[#f54fdc] text-[#171717] rounded-full hover:bg-[#e9e76f] transition-colors">
          신청하기
        </button>
      </header>

      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}