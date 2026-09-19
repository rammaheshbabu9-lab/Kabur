import React, { useState } from 'react';
import { Search, X, MessageSquare, RefreshCw, UserPlus, Check, Sparkles, MapPin } from 'lucide-react';
import { Post, Reel, NewsItem, SuggestedUser } from '../types';

interface SearchViewProps {
  initialQuery?: string;
  posts: Post[];
  reels: Reel[];
  news: NewsItem[];
  suggestedUsers: SuggestedUser[];
  onSelectPost: (postId: number) => void;
  onMessageUser: (userName: string) => void;
  onToggleFollow?: (userId: string) => void;
  onChangeSuggestions?: () => void;
  onOpenAllSuggestions?: () => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  initialQuery = '',
  posts,
  reels,
  news,
  suggestedUsers,
  onSelectPost,
  onMessageUser,
  onToggleFollow,
  onChangeSuggestions,
  onOpenAllSuggestions,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<'all' | 'posts' | 'reels' | 'news' | 'people'>('all');
  const [isChangingSuggestions, setIsChangingSuggestions] = useState(false);

  const q = query.toLowerCase().trim();

  const matchedPosts = q
    ? posts.filter((p) => (p.text + p.user).toLowerCase().includes(q))
    : [];

  const matchedReels = q
    ? reels.filter((r) => (r.caption + r.user).toLowerCase().includes(q))
    : [];

  const matchedNews = q
    ? news.filter((n) => (n.title + n.desc + n.category).toLowerCase().includes(q))
    : [];

  const matchedPeople = q
    ? suggestedUsers.filter((u) => {
        const str = `${u.name} ${u.handle || ''} ${u.role || ''} ${u.category || ''}`.toLowerCase();
        return str.includes(q);
      })
    : [];

  const totalResults =
    matchedPosts.length + matchedReels.length + matchedNews.length + matchedPeople.length;

  const handleChangeSuggestions = () => {
    if (!onChangeSuggestions) return;
    setIsChangingSuggestions(true);
    onChangeSuggestions();
    setTimeout(() => {
      setIsChangingSuggestions(false);
    }, 450);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#163b49]">
          Search & Discover
        </h2>
        {onChangeSuggestions && (
          <button
            onClick={handleChangeSuggestions}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#078da3] bg-[#eaf7f6] hover:bg-[#d8f0ee] rounded-xl transition active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isChangingSuggestions ? 'animate-spin' : ''}`} />
            <span>Change Suggestions</span>
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#078da3] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          id="search-main-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by topic, #tag, name, role, or keyword..."
          autoFocus
          className="w-full pl-10 pr-10 py-3 bg-white border border-[#dcebea] rounded-2xl text-xs sm:text-sm text-[#163b49] focus:outline-none focus:border-[#078da3] shadow-sm transition"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#718991] hover:text-[#163b49]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition border ${
            activeFilter === 'all'
              ? 'bg-[#078da3] text-white border-[#078da3]'
              : 'bg-white text-[#163b49] border-[#dcebea] hover:bg-[#eaf7f6]'
          }`}
        >
          All ({totalResults})
        </button>

        <button
          onClick={() => setActiveFilter('posts')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition border ${
            activeFilter === 'posts'
              ? 'bg-[#078da3] text-white border-[#078da3]'
              : 'bg-white text-[#163b49] border-[#dcebea] hover:bg-[#eaf7f6]'
          }`}
        >
          Posts ({matchedPosts.length})
        </button>

        <button
          onClick={() => setActiveFilter('reels')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition border ${
            activeFilter === 'reels'
              ? 'bg-[#078da3] text-white border-[#078da3]'
              : 'bg-white text-[#163b49] border-[#dcebea] hover:bg-[#eaf7f6]'
          }`}
        >
          Reels ({matchedReels.length})
        </button>

        <button
          onClick={() => setActiveFilter('news')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition border ${
            activeFilter === 'news'
              ? 'bg-[#078da3] text-white border-[#078da3]'
              : 'bg-white text-[#163b49] border-[#dcebea] hover:bg-[#eaf7f6]'
          }`}
        >
          News ({matchedNews.length})
        </button>

        <button
          onClick={() => setActiveFilter('people')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition border ${
            activeFilter === 'people'
              ? 'bg-[#078da3] text-white border-[#078da3]'
              : 'bg-white text-[#163b49] border-[#dcebea] hover:bg-[#eaf7f6]'
          }`}
        >
          People ({matchedPeople.length})
        </button>
      </div>

      {/* Results or Suggested Recommendations */}
      <div className="space-y-4">
        {!q ? (
          <div className="space-y-4">
            {/* Suggested People Section */}
            <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#078da3]/10 text-[#078da3] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#163b49]">
                      Suggested Community Members
                    </h3>
                    <p className="text-xs text-[#718991]">People with similar interests on KABUR</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {onChangeSuggestions && (
                    <button
                      onClick={handleChangeSuggestions}
                      className="px-2.5 py-1 text-xs font-bold text-[#078da3] bg-[#eaf7f6] hover:bg-[#d8f0ee] rounded-xl flex items-center gap-1 transition"
                    >
                      <RefreshCw className={`w-3 h-3 ${isChangingSuggestions ? 'animate-spin' : ''}`} />
                      <span>Change</span>
                    </button>
                  )}

                  {onOpenAllSuggestions && (
                    <button
                      onClick={onOpenAllSuggestions}
                      className="px-2.5 py-1 text-xs font-bold text-[#5e7c87] hover:text-[#078da3] transition"
                    >
                      See all
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedUsers.map((person) => (
                  <div
                    key={person.id}
                    className="bg-[#f8fcfc] border border-[#e2eff0] hover:border-[#078da3]/50 rounded-2xl p-3.5 flex flex-col justify-between transition group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2.5 mb-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {person.avatar ? (
                            <img
                              src={person.avatar}
                              alt={person.name}
                              className="w-11 h-11 rounded-2xl object-cover border border-[#dcebea] shrink-0"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-2xl bg-[#078da3] text-white flex items-center justify-center font-bold text-sm shrink-0">
                              {person.name.charAt(0)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-[#163b49] truncate group-hover:text-[#078da3] transition">
                              {person.name}
                            </p>
                            {person.handle && (
                              <p className="text-[11px] text-[#718991] font-medium truncate">
                                {person.handle}
                              </p>
                            )}
                            {person.category && (
                              <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 bg-[#e8f7f6] text-[#078da3] font-bold rounded">
                                {person.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {person.role && (
                        <p className="text-xs font-semibold text-[#224855] mb-1 line-clamp-1">
                          {person.role}
                        </p>
                      )}

                      {person.bio && (
                        <p className="text-[11px] text-[#5e7882] line-clamp-2 mb-2 leading-relaxed">
                          {person.bio}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-[#718991] mb-2.5">
                        <span>{person.mutual} mutual connections</span>
                        {person.location && (
                          <span className="flex items-center gap-0.5 text-[10px]">
                            <MapPin className="w-2.5 h-2.5 text-[#078da3]" />
                            {person.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-[#edf6f6]">
                      <button
                        onClick={() => onMessageUser(person.name)}
                        className="flex-1 py-1.5 px-2 border border-[#dcebea] hover:bg-white text-[#163b49] text-xs font-bold rounded-xl transition flex items-center justify-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#078da3]" />
                        <span>Message</span>
                      </button>

                      {onToggleFollow && (
                        <button
                          onClick={() => onToggleFollow(person.id)}
                          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                            person.followed
                              ? 'bg-[#eaf7f6] text-[#078da3] border border-[#b2e2de]'
                              : 'bg-[#078da3] hover:bg-[#066f80] text-white'
                          }`}
                        >
                          {person.followed ? (
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
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Topics suggestion tags */}
            <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-4 shadow-sm">
              <h4 className="text-xs font-bold text-[#718991] uppercase tracking-wider mb-2.5">
                Popular Search Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  '#AIRevolution',
                  '#IncredibleIndia',
                  '#CleanEnergy',
                  '#HandmadeHeritage',
                  '#SmartCities',
                  '#GrassrootsSports',
                  '#Startups',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-[#f3f9f9] hover:bg-[#e4f5f4] text-[#078da3] text-xs font-bold rounded-xl transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : totalResults === 0 ? (
          <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-8 text-center text-xs text-[#718991]">
            <p className="font-bold text-sm text-[#163b49] mb-1">No matches found for &quot;{query}&quot;</p>
            <p className="mb-4">Try different keywords, hashtags, or reset search.</p>
            {onChangeSuggestions && (
              <button
                onClick={handleChangeSuggestions}
                className="px-4 py-2 bg-[#078da3] text-white rounded-xl text-xs font-bold hover:bg-[#066f80] transition"
              >
                Change Suggestions Pool
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Matched People */}
            {(activeFilter === 'all' || activeFilter === 'people') && matchedPeople.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-[#718991] uppercase tracking-wider">
                  People ({matchedPeople.length})
                </h4>
                {matchedPeople.map((person) => (
                  <div
                    key={person.id}
                    className="bg-[#fffef9] border border-[#dcebea] rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {person.avatar ? (
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-10 h-10 rounded-xl object-cover border border-[#dcebea] shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-[#078da3] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {person.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-[#163b49] truncate">{person.name}</p>
                        <p className="text-[11px] text-[#718991] truncate font-medium">
                          {person.role || `${person.mutual} mutual connections`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onMessageUser(person.name)}
                        className="px-3 py-1.5 bg-[#f0f8f8] hover:bg-[#e4f5f4] text-[#078da3] text-xs font-bold rounded-lg flex items-center gap-1 transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Message</span>
                      </button>

                      {onToggleFollow && (
                        <button
                          onClick={() => onToggleFollow(person.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
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
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Matched Posts */}
            {(activeFilter === 'all' || activeFilter === 'posts') && matchedPosts.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#718991] uppercase tracking-wider">
                  Posts ({matchedPosts.length})
                </h4>
                {matchedPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => onSelectPost(post.id)}
                    className="bg-[#fffef9] border border-[#dcebea] rounded-xl p-3.5 hover:border-[#078da3] cursor-pointer transition shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-[#163b49]">{post.user}</span>
                      <span className="text-[10px] text-[#718991]">{post.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#163b49] line-clamp-2">{post.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Matched News */}
            {(activeFilter === 'all' || activeFilter === 'news') && matchedNews.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#718991] uppercase tracking-wider">
                  News Articles ({matchedNews.length})
                </h4>
                {matchedNews.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#fffef9] border border-[#dcebea] rounded-xl p-3.5 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-[#e8f7f6] text-[#078da3] text-[10px] font-bold">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-[#718991]">{item.time}</span>
                    </div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#163b49] mb-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-[#5e757c] line-clamp-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Matched Reels */}
            {(activeFilter === 'all' || activeFilter === 'reels') && matchedReels.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#718991] uppercase tracking-wider">
                  Reels ({matchedReels.length})
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {matchedReels.map((reel) => (
                    <div
                      key={reel.id}
                      className="bg-[#09252b] rounded-xl p-3 text-white aspect-[9/10] flex flex-col justify-end relative overflow-hidden shadow-sm"
                    >
                      <div className="absolute inset-0 opacity-40">
                        <video src={reel.video} className="w-full h-full object-cover" muted />
                      </div>
                      <div className="relative z-10">
                        <p className="text-xs font-bold">@{reel.user}</p>
                        <p className="text-[10px] line-clamp-1 opacity-90">{reel.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
