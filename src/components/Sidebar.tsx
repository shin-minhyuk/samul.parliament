import { X } from "lucide-react";
import Link from "next/link";

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
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-black text-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 rounded-lg p-2 transition-colors hover:bg-white/10"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <nav className="mt-8">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="block rounded-lg p-2 transition-colors hover:bg-white/10"
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block rounded-lg p-2 transition-colors hover:bg-white/10"
                >
                  소개
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="block rounded-lg p-2 transition-colors hover:bg-white/10"
                >
                  서비스
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block rounded-lg p-2 transition-colors hover:bg-white/10"
                >
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
