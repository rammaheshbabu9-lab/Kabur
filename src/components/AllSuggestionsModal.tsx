import React, { useState } from 'react';
import { X, RefreshCw, UserPlus, Check, MessageSquare, Search, Sparkles, MapPin, UserX } from 'lucide-react';
import { SuggestedUser } from '../types';

interface AllSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  allUsers: SuggestedUser[];
  onToggleFollow: (userId: string) => void;
  onMessageUser: (userName: string) => void;
  onChangeAllSuggestions: () => void;
  onDismissSuggestion?: (userId: string) => void;
}

export const AllSuggestionsModal: React.FC<AllSuggestionsModalProps> = ({
  isOpen,
  onClose,
  allUsers,
  onToggleFollow,
  onMessageUser,
  onChangeAllSuggestions,
  onDismissSuggestion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const categories = ['All', 'Tech & AI', 'Creators', 'Startups', 'Culture', 'Sports', 'Eco'];

  const filteredUsers = allUsers.filter((user) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      user.category?.toLowerCase() === selectedCategory.toLowerCase();

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      user.name.toLowerCase().includes(q) ||
      (user.handle && user.handle.toLowerCase().includes(q)) ||
      (user.role && user.role.toLowerCase().includes(q)) ||
      (user.location && user.location.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onChangeAllSuggestions();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fffef9] border border-[#dcebea] rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e6f2f1] flex items-center justify-between gap-3 bg-[#f8fcfc]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#078da3]/10 text-[#078da3] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-heading font-extrabold text-[#163b49]">
                Suggested Connections
              </h2>
              <p className="text-xs text-[#718991]">
                Discover creators, founders, researchers, and inspiring community members
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="change-all-suggestions-modal-btn"
              onClick={handleRefreshClick}
              disabled={isRefreshing}
              className="px-3 py-1.5 bg-[#078da3] hover:bg-[#066f80] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-60"
              title="Shuffle and change all suggestions"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Change Suggestions</span>
              <span className="sm:hidden">Change</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#718991] hover:text-[#163b49] hover:bg-[#eef8f7] rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 border-b border-[#e6f2f1] space-y-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-[#078da3] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role, handle, or location..."
              className="w-full pl-10 pr-4 py-2 bg-[#f4fafa] border border-[#dcebea] rounded-xl text-xs sm:text-sm text-[#163b49] focus:outline-none focus:border-[#078da3] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#718991] hover:text-[#163b49]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition border ${
                  selectedCategory === cat
                    ? 'bg-[#078da3] text-white border-[#078da3]'
                    : 'bg-white text-[#52707b] border-[#dcebea] hover:bg-[#eaf7f6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-[#fafdfd]">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12 px-4">
              <UserX className="w-10 h-10 text-[#078da3]/40 mx-auto mb-2" />
              <p className="font-bold text-sm text-[#163b49]">No suggestions match your filter</p>
              <p className="text-xs text-[#718991] mt-1">
                Try clearing your search or clicking &apos;Change Suggestions&apos; to load new people.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  onChangeAllSuggestions();
                }}
                className="mt-3 px-4 py-1.5 bg-[#078da3] text-white text-xs font-bold rounded-xl hover:bg-[#066f80] transition"
              >
                Reset & Change Suggestions
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-white border border-[#dcebea] rounded-2xl p-4 shadow-sm hover:border-[#078da3]/50 transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2.5 mb-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-12 h-12 rounded-2xl object-cover border border-[#dcebea] shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-[#078da3] text-white flex items-center justify-center font-bold text-base shrink-0">
                            {user.name.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-[#163b49] truncate group-hover:text-[#078da3] transition">
                            {user.name}
                          </h4>
                          {user.handle && (
                            <p className="text-[11px] text-[#718991] truncate font-medium">
                              {user.handle}
                            </p>
                          )}
                          {user.category && (
                            <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.2 bg-[#e8f7f6] text-[#078da3] font-bold rounded">
                              {user.category}
                            </span>
                          )}
                        </div>
                      </div>

                      {onDismissSuggestion && (
                        <button
                          onClick={() => onDismissSuggestion(user.id)}
                          title="Hide this suggestion"
                          className="text-[#96adb4] hover:text-[#e05252] p-1 rounded-lg transition opacity-60 hover:opacity-100"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {user.role && (
                      <p className="text-xs font-semibold text-[#25505e] mb-1 line-clamp-1">
                        {user.role}
                      </p>
                    )}

                    {user.bio && (
                      <p className="text-xs text-[#5f7b85] mb-2 line-clamp-2 leading-relaxed">
                        {user.bio}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-[#718991] pt-2 border-t border-[#f0f8f8] mb-3">
                      <span>{user.mutual} mutual connections</span>
                      {user.location && (
                        <span className="flex items-center gap-1 text-[10px]">
                          <MapPin className="w-3 h-3 text-[#078da3]" />
                          {user.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        onMessageUser(user.name);
                        onClose();
                      }}
                      className="flex-1 py-1.5 px-3 border border-[#dcebea] hover:bg-[#eaf7f6] text-[#163b49] text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#078da3]" />
                      <span>Message</span>
                    </button>

                    <button
                      onClick={() => onToggleFollow(user.id)}
                      className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm ${
                        user.followed
                          ? 'bg-[#eaf7f6] text-[#078da3] border border-[#b2e2de]'
                          : 'bg-[#078da3] hover:bg-[#066f80] text-white'
                      }`}
                    >
                      {user.followed ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Following</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Follow</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-[#f8fcfc] border-t border-[#e6f2f1] flex items-center justify-between text-xs text-[#718991]">
          <span>Showing {filteredUsers.length} community suggestions</span>
          <button
            onClick={handleRefreshClick}
            className="text-[#078da3] font-bold hover:underline flex items-center gap-1"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Change All Suggestions</span>
          </button>
        </div>
      </div>
    </div>
  );
};
