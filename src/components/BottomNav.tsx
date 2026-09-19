import React from 'react';
import { Home, FileText, PlaySquare, Newspaper, MessageCircle, User as UserIcon } from 'lucide-react';
import { PageTab } from '../types';

interface BottomNavProps {
  activeTab: PageTab;
  onNavigate: (tab: PageTab) => void;
  unreadChatsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onNavigate,
  unreadChatsCount = 0,
}) => {
  const navButtons: { id: PageTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'posts', label: 'Posts', icon: <FileText className="w-5 h-5" /> },
    { id: 'reels', label: 'Reels', icon: <PlaySquare className="w-5 h-5" /> },
    { id: 'news', label: 'News', icon: <Newspaper className="w-5 h-5" /> },
    { id: 'chat', label: 'Chat', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <UserIcon className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fffef9]/95 backdrop-blur-md border-t border-[#dcebea] px-2 py-1.5 flex items-center justify-around">
      {navButtons.map((btn) => {
        const isActive = activeTab === btn.id;
        return (
          <button
            key={btn.id}
            id={`bottom-nav-${btn.id}`}
            onClick={() => onNavigate(btn.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition relative ${
              isActive ? 'text-[#078da3] font-bold' : 'text-[#718991] font-medium'
            }`}
          >
            <div className="relative">
              {btn.icon}
              {btn.id === 'chat' && unreadChatsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#e84d5b] rounded-full ring-2 ring-white" />
              )}
            </div>
            <span className="text-[10px] mt-0.5">{btn.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
