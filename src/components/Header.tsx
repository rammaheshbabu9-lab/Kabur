import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Plus, User as UserIcon, Bookmark, LogOut, ChevronDown, Share2 } from 'lucide-react';
import { User, PageTab } from '../types';

interface HeaderProps {
  currentUser: User;
  onToggleSidebar: () => void;
  onNavigate: (tab: PageTab) => void;
  onOpenUpload: () => void;
  onLogout: () => void;
  onOpenPromote?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onToggleSidebar,
  onNavigate,
  onOpenUpload,
  onLogout,
  onOpenPromote,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#fffef9]/95 backdrop-blur-md border-b border-[#dcebea] px-4 sm:px-6 flex items-center justify-between transition">
      {/* Left section: Hamburger & Brand */}
      <div className="flex items-center gap-3">
        <button
          id="btn-toggle-sidebar"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          className="w-10 h-10 rounded-xl border border-[#dcebea] bg-white flex items-center justify-center text-[#078da3] hover:bg-[#eaf7f6] active:scale-95 transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#078da3] to-[#066f80] text-white flex items-center justify-center font-extrabold text-lg shadow-sm font-heading group-hover:scale-105 transition-transform">
            K
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl tracking-wider text-[#078da3]">
              KABUR
            </span>
          </div>
        </div>
      </div>

      {/* Center section: Quick Search trigger (desktop) */}
      <div className="hidden md:flex items-center max-w-xs w-full mx-4">
        <button
          id="btn-desktop-search"
          onClick={() => onNavigate('search')}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 bg-[#f2faf9] hover:bg-white border border-[#dcebea] hover:border-[#078da3]/40 rounded-full text-xs text-[#718991] transition"
        >
          <Search className="w-4 h-4 text-[#078da3]" />
          <span>Search posts, reels, news...</span>
          <kbd className="ml-auto text-[10px] bg-white border border-[#dcebea] px-1.5 py-0.5 rounded text-[#718991]">
            /
          </kbd>
        </button>
      </div>

      {/* Right section: Promote, Create, Mobile Search, User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onOpenPromote && (
          <button
            id="btn-header-promote"
            onClick={onOpenPromote}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#eaf7f6] hover:bg-[#d5f0ed] text-[#078da3] text-xs font-bold rounded-xl border border-[#bce2df] transition active:scale-95"
            title="Promote KABUR & Share with Friends"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Promote App</span>
          </button>
        )}

        <button
          id="btn-quick-create"
          onClick={onOpenUpload}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-[#078da3] hover:bg-[#066f80] text-white text-xs font-bold rounded-xl shadow-sm transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create</span>
        </button>

        <button
          id="btn-mobile-search"
          onClick={() => onNavigate('search')}
          aria-label="Search"
          className="md:hidden w-10 h-10 rounded-xl border border-[#dcebea] bg-white flex items-center justify-center text-[#078da3] hover:bg-[#eaf7f6] transition"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* User profile avatar dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            id="btn-user-avatar-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-[#078da3]/30 transition"
          >
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover border border-[#dcebea]"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#078da3] to-[#7bcbd0] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            )}
            <ChevronDown className="w-3.5 h-3.5 text-[#718991] hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#dcebea] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3.5 py-2 border-b border-[#f0f7f6]">
                <p className="text-xs font-bold text-[#163b49] truncate">{currentUser.name}</p>
                <p className="text-[11px] text-[#718991]">{currentUser.mobile}</p>
              </div>

              <button
                id="menu-item-profile"
                onClick={() => {
                  onNavigate('profile');
                  setMenuOpen(false);
                }}
                className="w-full px-3.5 py-2.5 text-left text-xs text-[#163b49] hover:bg-[#eaf7f6] flex items-center gap-2.5 transition font-medium"
              >
                <UserIcon className="w-4 h-4 text-[#078da3]" />
                View Profile
              </button>

              <button
                id="menu-item-saved"
                onClick={() => {
                  onNavigate('profile');
                  setMenuOpen(false);
                }}
                className="w-full px-3.5 py-2.5 text-left text-xs text-[#163b49] hover:bg-[#eaf7f6] flex items-center gap-2.5 transition font-medium"
              >
                <Bookmark className="w-4 h-4 text-[#078da3]" />
                Saved Items
              </button>

              {onOpenPromote && (
                <button
                  id="menu-item-promote"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenPromote();
                  }}
                  className="w-full px-3.5 py-2.5 text-left text-xs text-[#078da3] hover:bg-[#eaf7f6] flex items-center gap-2.5 transition font-bold"
                >
                  <Share2 className="w-4 h-4" />
                  Promote / Share App
                </button>
              )}

              <div className="my-1 border-t border-[#f0f7f6]" />

              <button
                id="menu-item-logout"
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="w-full px-3.5 py-2.5 text-left text-xs text-[#e84d5b] hover:bg-red-50 flex items-center gap-2.5 transition font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
