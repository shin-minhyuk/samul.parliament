import { X } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-black text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors absolute right-2 top-2"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <nav className="mt-8">
            <ul className="space-y-2">
              <li>
                <Link href="/" className="block p-2 hover:bg-white/10 rounded-lg transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/about" className="block p-2 hover:bg-white/10 rounded-lg transition-colors">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/services" className="block p-2 hover:bg-white/10 rounded-lg transition-colors">
                  서비스
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block p-2 hover:bg-white/10 rounded-lg transition-colors">
                  문의하기
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
} 