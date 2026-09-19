import React, { useState } from 'react';
import { TrendingUp, UserPlus, Check, MessageSquare, RefreshCw, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { TrendingTopic, SuggestedUser } from '../types';

interface RightSidebarProps {
  trendingTopics: TrendingTopic[];
  suggestedUsers: SuggestedUser[];
  onSelectTag: (tag: string) => void;
  onToggleFollow: (userId: string) => void;
  onMessageUser: (userName: string) => void;
  onChangeSuggestions?: () => void;
  onOpenAllSuggestions?: () => void;
  onChangeTrending?: () => void;
  onOpenPromote?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  trendingTopics,
  suggestedUsers,
  onSelectTag,
  onToggleFollow,
  onMessageUser,
  onChangeSuggestions,
  onOpenAllSuggestions,
  onChangeTrending,
  onOpenPromote,
}) => {
  const [refreshingUsers, setRefreshingUsers] = useState(false);
  const [refreshingTopics, setRefreshingTopics] = useState(false);

  const handleUserRefresh = () => {
    if (!onChangeSuggestions) return;
    setRefreshingUsers(true);
    onChangeSuggestions();
    setTimeout(() => {
      setRefreshingUsers(false);
    }, 450);
  };

  const handleTopicRefresh = () => {
    if (!onChangeTrending) return;
    setRefreshingTopics(true);
    onChangeTrending();
    setTimeout(() => {
      setRefreshingTopics(false);
    }, 450);
  };

  return (
    <aside className="w-64 shrink-0 space-y-4">
      {/* Trending Card */}
      <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#078da3]" />
            <h3 className="font-heading font-extrabold text-sm text-[#163b49]">
              Trending on KABUR
            </h3>
          </div>

          {onChangeTrending && (
            <button
              onClick={handleTopicRefresh}
              className="text-[#718991] hover:text-[#078da3] p-1 rounded-lg transition"
              title="Change trending topics"
            >
              <RefreshCw className={`w-3 h-3 ${refreshingTopics ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>

        <div className="space-y-2.5">
          {trendingTopics.map((topic) => (
            <div
              key={topic.tag}
              onClick={() => onSelectTag(topic.tag)}
              className="group cursor-pointer py-1.5 border-b border-[#f2faf9] last:border-0"
            >
              <div className="text-xs font-bold text-[#163b49] group-hover:text-[#078da3] transition">
                {topic.tag}
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#718991] mt-0.5">
                <span>{topic.postCount}</span>
                {topic.category && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-[#f0f9f8] text-[#078da3] rounded font-medium">
                    {topic.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* People You May Know */}
      <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <UserPlus className="w-4 h-4 text-[#078da3]" />
            <h3 className="font-heading font-extrabold text-sm text-[#163b49]">
              People you may know
            </h3>
          </div>

          <div className="flex items-center gap-1">
            {onChangeSuggestions && (
              <button
                id="sidebar-change-suggestions-btn"
                onClick={handleUserRefresh}
                className="flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-bold text-[#078da3] hover:bg-[#eaf7f6] rounded-md transition active:scale-95"
                title="Change suggestions"
              >
                <RefreshCw className={`w-2.5 h-2.5 ${refreshingUsers ? 'animate-spin' : ''}`} />
                <span>Change</span>
              </button>
            )}

            {onOpenAllSuggestions && (
              <button
                onClick={onOpenAllSuggestions}
                className="text-[11px] font-bold text-[#718991] hover:text-[#078da3] px-1 py-0.5 rounded transition"
                title="See all suggestions"
              >
                All
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {suggestedUsers.length === 0 ? (
            <p className="text-xs text-[#718991] py-2 text-center">
              No suggestions available right now
            </p>
          ) : (
            suggestedUsers.slice(0, 4).map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between gap-2 py-1 border-b border-[#f2faf9] last:border-0"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {person.avatar ? (
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#dcebea] shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#078da3] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {person.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#163b49] truncate">{person.name}</p>
                    <p className="text-[10px] text-[#718991] truncate font-medium">
                      {person.role ? person.role.split('&')[0].trim() : `${person.mutual} mutual connections`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onMessageUser(person.name)}
                    title="Message"
                    className="p-1.5 text-[#718991] hover:text-[#078da3] hover:bg-[#eaf7f6] rounded-lg transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onToggleFollow(person.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                      person.followed
                        ? 'bg-[#eaf7f6] text-[#078da3]'
                        : 'bg-[#078da3] text-white hover:bg-[#066f80]'
                    }`}
                  >
                    {person.followed ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Following</span>
                      </>
                    ) : (
                      <span>Follow</span>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {onOpenAllSuggestions && (
          <button
            onClick={onOpenAllSuggestions}
            className="w-full mt-3 py-2 border border-dashed border-[#dcebea] hover:border-[#078da3] rounded-xl text-xs font-bold text-[#078da3] bg-[#f8fcfc] hover:bg-[#eef8f8] transition flex items-center justify-center gap-1.5"
          >
            <span>See All Suggestions</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Promote KABUR Banner */}
      {onOpenPromote && (
        <div className="bg-gradient-to-br from-[#eaf7f6] via-[#f4faf9] to-[#e4f5f4] border border-[#bde4e0] rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-xl bg-[#078da3] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h4 className="font-heading font-extrabold text-xs text-[#163b49]">
              Spread the Word!
            </h4>
          </div>
          <p className="text-[11px] text-[#4d707b] mb-3 leading-relaxed">
            Invite friends to KABUR with 1-click WhatsApp and social links.
          </p>
          <button
            id="sidebar-promote-banner-btn"
            onClick={onOpenPromote}
            className="w-full py-2 bg-[#078da3] hover:bg-[#066f80] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Promote KABUR</span>
          </button>
        </div>
      )}
    </aside>
  );
};
