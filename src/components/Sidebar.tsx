import React from 'react';
import { Home, FileText, PlaySquare, Newspaper, MessageCircle, User as UserIcon, PlusCircle, LogOut, Share2 } from 'lucide-react';
import { PageTab } from '../types';

interface SidebarProps {
  activeTab: PageTab;
  onNavigate: (tab: PageTab) => void;
  onOpenUpload: () => void;
  onLogout: () => void;
  isOpen: boolean;
  onOpenPromote?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigate,
  onOpenUpload,
  onLogout,
  isOpen,
  onOpenPromote,
}) => {
  const menuItems: { id: PageTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'posts', label: 'Posts', icon: <FileText className="w-5 h-5" /> },
    { id: 'reels', label: 'Reels', icon: <PlaySquare className="w-5 h-5" /> },
    { id: 'news', label: 'News', icon: <Newspaper className="w-5 h-5" /> },
    { id: 'chat', label: 'Chat', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <UserIcon className="w-5 h-5" /> },
  ];

  if (!isOpen) return null;

  return (
    <aside className="w-56 shrink-0 sticky top-20 bg-[#fffef9] border border-[#dcebea] rounded-2xl p-3 shadow-sm h-fit space-y-1">
      {menuItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            id={`nav-item-${item.id}`}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
              isActive
                ? 'bg-[#eaf7f6] text-[#078da3]'
                : 'text-[#163b49] hover:bg-[#f2faf9] hover:text-[#078da3]'
            }`}
          >
            <span className={isActive ? 'text-[#078da3]' : 'text-[#718991]'}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}

      <div className="pt-2 border-t border-[#f0f7f6] space-y-1">
        {onOpenPromote && (
          <button
            id="btn-sidebar-promote"
            onClick={onOpenPromote}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-[#078da3] bg-[#eaf7f6] hover:bg-[#dbf3f0] transition text-left"
          >
            <Share2 className="w-5 h-5 text-[#078da3]" />
            <span>Promote KABUR</span>
          </button>
        )}

        <button
          id="btn-sidebar-create"
          onClick={onOpenUpload}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-[#078da3] bg-[#f2faf9] hover:bg-[#eaf7f6] transition text-left"
        >
          <PlusCircle className="w-5 h-5 text-[#078da3]" />
          <span>Create Post</span>
        </button>

        <button
          id="btn-sidebar-logout"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-[#718991] hover:text-[#e84d5b] hover:bg-red-50 transition text-left"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
