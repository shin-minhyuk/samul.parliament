"use client";

import { X, ChevronDown, Home, Info, FileText, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  title: string;
  icon: React.ReactElement;
  href?: string;
  subItems?: { title: string; href: string }[];
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const menuItems: MenuItem[] = [
    {
      title: "홈",
      icon: <Home className="h-5 w-5" />,
      href: "/",
    },
    {
      title: "소개",
      icon: <Info className="h-5 w-5" />,
      subItems: [
        { title: "행사 소개", href: "/about/event" },
        { title: "연사 소개", href: "/about/speakers" },
        { title: "장소 안내", href: "/about/location" },
      ],
    },
    {
      title: "프로그램",
      icon: <FileText className="h-5 w-5" />,
      subItems: [
        { title: "컨퍼런스 일정", href: "/program/schedule" },
        { title: "세션 소개", href: "/program/sessions" },
        { title: "워크샵", href: "/program/workshops" },
      ],
    },
    {
      title: "문의하기",
      icon: <Mail className="h-5 w-5" />,
      href: "/contact",
    },
  ];

  const toggleAccordion = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`bg-nature-forest/20 fixed inset-0 z-40 backdrop-blur-lg transition-all duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`border-nature-forest/20 text-nature-forest fixed top-0 left-0 z-50 h-full w-64 transform border-r bg-white/80 shadow-lg backdrop-blur-sm transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            type="button"
            onClick={onClose}
            className="hover:bg-nature-forest/10 absolute top-2 right-2 rounded-full p-1 transition-colors"
            aria-label="사이드바 닫기"
          >
            <X className="h-6 w-6" />
          </button>

          <nav className="mt-8">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={item.title}>
                  {item.subItems ? (
                    <div className="overflow-hidden rounded-lg">
                      <button
                        type="button"
                        onClick={() => toggleAccordion(index)}
                        className="hover:bg-nature-forest/10 flex w-full items-center justify-between rounded-lg p-2 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          {item.icon}
                          {item.title}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transform transition-transform duration-200 ${
                            expandedItems.includes(index) ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`grid transition-all duration-200 ease-in-out ${
                          expandedItems.includes(index)
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <ul className="border-nature-forest/20 ml-4 space-y-1 border-l pt-1 pl-4">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.title}>
                                <Link
                                  href={subItem.href}
                                  className="hover:bg-nature-forest/10 block rounded-lg p-2 text-sm transition-colors"
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      className="hover:bg-nature-forest/10 flex items-center gap-2 rounded-lg p-2 transition-colors"
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
