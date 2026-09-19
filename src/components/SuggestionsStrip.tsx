import React, { useState } from 'react';
import { UserPlus, Check, RefreshCw, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { SuggestedUser } from '../types';

interface SuggestionsStripProps {
  suggestedUsers: SuggestedUser[];
  onToggleFollow: (userId: string) => void;
  onMessageUser: (userName: string) => void;
  onChangeSuggestions: () => void;
  onOpenAllSuggestions: () => void;
}

export const SuggestionsStrip: React.FC<SuggestionsStripProps> = ({
  suggestedUsers,
  onToggleFollow,
  onMessageUser,
  onChangeSuggestions,
  onOpenAllSuggestions,
}) => {
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = () => {
    setSpinning(true);
    onChangeSuggestions();
    setTimeout(() => {
      setSpinning(false);
    }, 450);
  };

  return (
    <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#078da3]/10 text-[#078da3] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-sm text-[#163b49]">
              Suggested for you
            </h3>
            <p className="text-[11px] text-[#718991]">Community members you may know</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="strip-change-suggestions-btn"
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-[#078da3] bg-[#eaf7f6] hover:bg-[#d8f0ee] rounded-xl transition active:scale-95"
            title="Change all suggestions"
          >
            <RefreshCw className={`w-3 h-3 ${spinning ? 'animate-spin' : ''}`} />
            <span>Change</span>
          </button>

          <button
            onClick={onOpenAllSuggestions}
            className="text-xs font-bold text-[#557682] hover:text-[#078da3] flex items-center gap-0.5 transition"
          >
            <span>See all</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Cards row */}
      {suggestedUsers.length === 0 ? (
        <div className="py-4 text-center text-xs text-[#718991]">
          No member suggestions available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {suggestedUsers.slice(0, 3).map((person) => (
            <div
              key={person.id}
              className="bg-[#f8fcfc] border border-[#e2eff0] hover:border-[#078da3]/40 rounded-xl p-3 flex flex-col justify-between transition group"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  {person.avatar ? (
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-10 h-10 rounded-xl object-cover border border-[#dcebea] shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-[#078da3] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {person.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#163b49] truncate group-hover:text-[#078da3] transition">
                      {person.name}
                    </p>
                    <p className="text-[10px] text-[#718991] truncate font-medium">
                      {person.role || `${person.mutual} mutual connections`}
                    </p>
                    {person.category && (
                      <span className="inline-block text-[9px] px-1.5 py-0.2 bg-[#e8f7f6] text-[#078da3] rounded font-bold mt-0.5">
                        {person.category}
                      </span>
                    )}
                  </div>
                </div>

                {person.bio && (
                  <p className="text-[11px] text-[#5e7882] line-clamp-2 mb-2 leading-tight">
                    {person.bio}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1.5 pt-1">
                <button
                  onClick={() => onMessageUser(person.name)}
                  title="Send Message"
                  className="p-1.5 border border-[#dcebea] hover:bg-white text-[#718991] hover:text-[#078da3] rounded-lg transition"
                >
                  <MessageSquare className="w-3 h-3" />
                </button>

                <button
                  onClick={() => onToggleFollow(person.id)}
                  className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1 ${
                    person.followed
                      ? 'bg-[#eaf7f6] text-[#078da3] border border-[#b2e2de]'
                      : 'bg-[#078da3] hover:bg-[#066f80] text-white'
                  }`}
                >
                  {person.followed ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3 h-3" />
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
  );
};
