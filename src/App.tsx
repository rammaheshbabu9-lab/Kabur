import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { User, Post, Reel, NewsItem, ChatConversation, PageTab, UploadType, TrendingTopic, SuggestedUser } from './types';
import {
  INITIAL_POSTS,
  INITIAL_REELS,
  INITIAL_NEWS,
  INITIAL_CHATS,
  TRENDING_TOPICS,
  TRENDING_TOPICS_SETS,
  SUGGESTED_USERS,
  ALL_SUGGESTED_USERS_POOL,
} from './data/mockData';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { BottomNav } from './components/BottomNav';
import { PostComposer } from './components/PostComposer';
import { PostCard } from './components/PostCard';
import { ReelsView } from './components/ReelsView';
import { NewsView } from './components/NewsView';
import { ChatView } from './components/ChatView';
import { ProfileView } from './components/ProfileView';
import { SearchView } from './components/SearchView';
import { UploadModal } from './components/UploadModal';
import { SuggestionsStrip } from './components/SuggestionsStrip';
import { AllSuggestionsModal } from './components/AllSuggestionsModal';
import { PromoteModal } from './components/PromoteModal';

const STORAGE_KEYS = {
  USER: 'KABUR_CURRENT_USER',
  POSTS: 'KABUR_POSTS_DATA',
  REELS: 'KABUR_REELS_DATA',
  NEWS: 'KABUR_NEWS_DATA',
  CHATS: 'KABUR_CHATS_DATA',
};

// Immediate purge of all legacy dummy data and stock pictures for clean production deployment
if (typeof window !== 'undefined') {
  const PURGE_FLAG = 'KABUR_CLEAN_PRODUCTION_V3';
  if (!localStorage.getItem(PURGE_FLAG)) {
    localStorage.removeItem(STORAGE_KEYS.POSTS);
    localStorage.removeItem(STORAGE_KEYS.REELS);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.CHATS);

    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        if (
          !u.name ||
          u.name === 'Ram Mahesh' ||
          (u.avatar && u.avatar.includes('unsplash.com')) ||
          (u.coverImage && u.coverImage.includes('unsplash.com'))
        ) {
          localStorage.removeItem(STORAGE_KEYS.USER);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
    localStorage.setItem(PURGE_FLAG, 'true');
  }
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try {
        const u: User = JSON.parse(saved);
        if (!u.name || u.name === 'Ram Mahesh') return null;
        if (u.avatar && u.avatar.includes('unsplash.com')) u.avatar = '';
        if (u.coverImage && u.coverImage.includes('unsplash.com')) u.coverImage = '';
        return u;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
    if (saved) {
      try {
        const parsed: Post[] = JSON.parse(saved);
        return parsed.filter(
          (p) =>
            p.id !== 1 &&
            p.id !== 2 &&
            p.id !== 3 &&
            !(p.img && p.img.includes('unsplash.com')) &&
            !(p.avatar && p.avatar.includes('unsplash.com'))
        );
      } catch {
        return [];
      }
    }
    return [];
  });

  const [reels, setReels] = useState<Reel[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REELS);
    if (saved) {
      try {
        const parsed: Reel[] = JSON.parse(saved);
        return parsed.filter(
          (r) =>
            r.id !== 11 &&
            r.id !== 12 &&
            r.id !== 13 &&
            !(r.avatar && r.avatar.includes('unsplash.com'))
        );
      } catch {
        return [];
      }
    }
    return [];
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (saved) {
      try {
        const parsed: NewsItem[] = JSON.parse(saved);
        return parsed.filter(
          (n) =>
            n.id !== 21 &&
            n.id !== 22 &&
            n.id !== 23 &&
            n.id !== 24 &&
            !(n.img && n.img.includes('unsplash.com'))
        );
      } catch {
        return [];
      }
    }
    return [];
  });

  const [chats, setChats] = useState<Record<string, ChatConversation>>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHATS);
    if (saved) {
      try {
        const parsed: Record<string, ChatConversation> = JSON.parse(saved);
        const cleaned: Record<string, ChatConversation> = {};
        for (const [key, conv] of Object.entries(parsed)) {
          if (
            conv.id !== 'chat-sneha' &&
            conv.id !== 'chat-arjun' &&
            conv.id !== 'chat-kavya' &&
            !(conv.avatar && conv.avatar.includes('unsplash.com'))
          ) {
            cleaned[key] = conv;
          }
        }
        return cleaned;
      } catch {
        return {};
      }
    }
    return {};
  });

  const [currentChatKey, setCurrentChatKey] = useState<string>('');
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadModal, setUploadModal] = useState<{ isOpen: boolean; type: UploadType }>({
    isOpen: false,
    type: 'post',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [allSuggestionsPool, setAllSuggestionsPool] = useState<SuggestedUser[]>(ALL_SUGGESTED_USERS_POOL);
  const [suggestedBatchIndex, setSuggestedBatchIndex] = useState(0);
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>(SUGGESTED_USERS);
  const [trendingSetIndex, setTrendingSetIndex] = useState(0);
  const [currentTrendingTopics, setCurrentTrendingTopics] = useState<TrendingTopic[]>(TRENDING_TOPICS);
  const [allSuggestionsModalOpen, setAllSuggestionsModalOpen] = useState(false);
  const [promoteModalOpen, setPromoteModalOpen] = useState(false);

  // Auto-dismiss splash screen after brief transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  // Sync state to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REELS, JSON.stringify(reels));
  }, [reels]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
  }, [chats]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  // Auth Handlers
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActiveTab('home');
    showToast(`Welcome to KABUR, ${user.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully');
  };

  // Post Actions
  const handleLikePost = (postId: number) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newLiked = !p.liked;
          return {
            ...p,
            liked: newLiked,
            likes: newLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: number, text: string) => {
    if (!currentUser) return;
    const newComment = {
      id: 'c-' + Date.now(),
      user: currentUser.name,
      avatar: currentUser.avatar,
      text,
      time: 'Just now',
    };
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );
    showToast('Comment added');
  };

  const handleShare = (item: { title?: string; text?: string; user?: string }) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    showToast('Link copied to clipboard');
  };

  const handleToggleSavePost = (postId: number) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newSaved = !p.saved;
          showToast(newSaved ? 'Post saved to your profile' : 'Post removed from saved');
          return { ...p, saved: newSaved };
        }
        return p;
      })
    );
  };

  // Reel Actions
  const handleLikeReel = (reelId: number) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          const newLiked = !r.liked;
          return {
            ...r,
            liked: newLiked,
            likes: newLiked ? r.likes + 1 : Math.max(0, r.likes - 1),
          };
        }
        return r;
      })
    );
  };

  const handleToggleSaveReel = (reelId: number) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          const newSaved = !r.saved;
          showToast(newSaved ? 'Reel saved' : 'Reel unsaved');
          return { ...r, saved: newSaved };
        }
        return r;
      })
    );
  };

  // News Actions
  const handleToggleSaveNews = (newsId: number) => {
    setNews((prev) =>
      prev.map((n) => {
        if (n.id === newsId) {
          const newSaved = !n.saved;
          showToast(newSaved ? 'News saved' : 'News unsaved');
          return { ...n, saved: newSaved };
        }
        return n;
      })
    );
  };

  // Chat Actions
  const handleSendMessage = (chatKey: string, text: string) => {
    const newMsg = {
      id: 'm-' + Date.now(),
      sender: 'me' as const,
      text,
      time: 'Just now',
    };

    setChats((prev) => {
      const conv = prev[chatKey] || {
        id: 'chat-' + chatKey.toLowerCase(),
        name: chatKey,
        status: 'online',
        messages: [],
      };
      return {
        ...prev,
        [chatKey]: {
          ...conv,
          messages: [...conv.messages, newMsg],
        },
      };
    });

    // Simulate smart friendly auto-reply
    setTimeout(() => {
      const replies = [
        'Thanks for your message! 😊',
        'Got it, looks awesome!',
        'Totally agree with you on that.',
        'Great to connect on KABUR!',
        'Let me check and update you shortly 👍',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const replyMsg = {
        id: 'm-reply-' + Date.now(),
        sender: 'other' as const,
        text: randomReply,
        time: 'Just now',
      };

      setChats((prev) => {
        const conv = prev[chatKey];
        if (!conv) return prev;
        return {
          ...prev,
          [chatKey]: {
            ...conv,
            messages: [...conv.messages, replyMsg],
          },
        };
      });
    }, 700);
  };

  const handleMessageUser = (userName: string) => {
    const key = userName.split(' ')[0];
    if (!chats[key]) {
      setChats((prev) => ({
        ...prev,
        [key]: {
          id: 'chat-' + key.toLowerCase(),
          name: userName,
          status: 'online',
          lastSeen: 'Active now',
          messages: [
            {
              id: 'm-init-' + Date.now(),
              sender: 'other',
              text: `Hi! Nice to connect with you on KABUR.`,
              time: 'Just now',
            },
          ],
        },
      }));
    }
    setCurrentChatKey(key);
    setActiveTab('chat');
  };

  const handleToggleFollow = (userId: string) => {
    let targetName = '';
    let isNowFollowed = false;

    setAllSuggestionsPool((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          targetName = u.name;
          isNowFollowed = !u.followed;
          return { ...u, followed: isNowFollowed };
        }
        return u;
      })
    );

    setSuggestedUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          targetName = u.name;
          isNowFollowed = !u.followed;
          return { ...u, followed: isNowFollowed };
        }
        return u;
      })
    );

    if (targetName) {
      showToast(isNowFollowed ? `You are now following ${targetName}` : `Unfollowed ${targetName}`);
    }
  };

  const handleChangeAllSuggestions = () => {
    const batchSize = 4;
    const totalBatches = Math.ceil(allSuggestionsPool.length / batchSize);
    const nextIndex = (suggestedBatchIndex + 1) % totalBatches;
    setSuggestedBatchIndex(nextIndex);

    const start = nextIndex * batchSize;
    let newBatch = allSuggestionsPool.slice(start, start + batchSize);
    if (newBatch.length < batchSize) {
      newBatch = [...newBatch, ...allSuggestionsPool.slice(0, batchSize - newBatch.length)];
    }
    setSuggestedUsers(newBatch);
    showToast('Suggestions changed! New community members loaded.');
  };

  const handleChangeTrending = () => {
    const nextIdx = (trendingSetIndex + 1) % TRENDING_TOPICS_SETS.length;
    setTrendingSetIndex(nextIdx);
    setCurrentTrendingTopics(TRENDING_TOPICS_SETS[nextIdx]);
    showToast('Trending topics updated');
  };

  const handleDismissSuggestion = (userId: string) => {
    setSuggestedUsers((prev) => {
      const remaining = prev.filter((u) => u.id !== userId);
      const replacement = allSuggestionsPool.find(
        (u) => u.id !== userId && !remaining.some((r) => r.id === u.id)
      );
      return replacement ? [...remaining, replacement] : remaining;
    });
    showToast('Suggestion removed');
  };

  const handleSelectTag = (tag: string) => {
    setSearchQuery(tag);
    setActiveTab('search');
  };

  // Upload Callbacks
  const handlePublishPost = (newPostData: Partial<Post>) => {
    const newPost: Post = {
      id: Date.now(),
      user: currentUser?.name || 'Ram Mahesh',
      avatar: currentUser?.avatar,
      text: newPostData.text || '',
      img: newPostData.img,
      likes: 0,
      liked: false,
      timestamp: 'Just now',
      comments: [],
      saved: false,
    };
    setPosts([newPost, ...posts]);
    setActiveTab('posts');
  };

  const handlePublishReel = (newReelData: Partial<Reel>) => {
    const newReel: Reel = {
      id: Date.now(),
      user: currentUser?.name || 'Ram Mahesh',
      avatar: currentUser?.avatar,
      caption: newReelData.caption || '',
      video: newReelData.video || '',
      likes: 0,
      liked: false,
      commentsCount: 0,
      audioName: newReelData.audioName,
      views: '1',
    };
    setReels([newReel, ...reels]);
    setActiveTab('reels');
  };

  const handlePublishNews = (newNewsData: Partial<NewsItem>) => {
    const newNewsItem: NewsItem = {
      id: Date.now(),
      title: newNewsData.title || '',
      desc: newNewsData.desc || '',
      category: newNewsData.category || 'Technology',
      author: currentUser?.name || 'Community Editor',
      time: 'Just now',
      img: newNewsData.img || '',
      saved: false,
      likes: 0,
    };
    setNews([newNewsItem, ...news]);
    setActiveTab('news');
  };

  const handleUpdateUser = (updated: User) => {
    const oldName = currentUser?.name;
    setCurrentUser(updated);
    // If avatar or name updated, propagate to user's authored posts/reels
    if (updated.avatar !== currentUser?.avatar || updated.name !== oldName) {
      if (oldName) {
        setPosts((prev) =>
          prev.map((p) =>
            p.user.toLowerCase() === oldName.toLowerCase()
              ? { ...p, user: updated.name, avatar: updated.avatar }
              : p
          )
        );
        setReels((prev) =>
          prev.map((r) =>
            r.user.toLowerCase() === oldName.toLowerCase()
              ? { ...r, user: updated.name, avatar: updated.avatar }
              : r
          )
        );
      }
    }
  };

  const handleDeletePost = (postId: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    showToast('Post deleted successfully');
  };

  const handleDeleteReel = (reelId: number) => {
    setReels((prev) => prev.filter((r) => r.id !== reelId));
    showToast('Reel deleted successfully');
  };

  // If splash is showing
  if (showSplash) {
    return <SplashScreen />;
  }

  // If user is not authenticated
  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} showToast={showToast} />;
  }

  return (
    <div className="min-h-screen bg-[#f3f9f9] text-[#163b49] flex flex-col font-sans selection:bg-[#078da3]/20 selection:text-[#078da3]">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#163e49] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xl border border-[#2d5866] animate-in fade-in slide-in-from-bottom-3 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Main App Navigation Header */}
      <Header
        currentUser={currentUser}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenUpload={() => setUploadModal({ isOpen: true, type: 'post' })}
        onLogout={handleLogout}
        onOpenPromote={() => setPromoteModalOpen(true)}
      />

      {/* App Body Layout */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 flex gap-5">
        {/* Left Sidebar (Collapsible / Desktop) */}
        <Sidebar
          activeTab={activeTab}
          onNavigate={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenUpload={() => setUploadModal({ isOpen: true, type: 'post' })}
          onLogout={handleLogout}
          isOpen={sidebarOpen}
          onOpenPromote={() => setPromoteModalOpen(true)}
        />

        {/* Center Main Content Area */}
        <main className="flex-1 min-w-0 pb-20 md:pb-8">
          {/* HOME FEED */}
          {activeTab === 'home' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#163b49]">
                  Community Feed
                </h2>
                <span className="text-xs text-[#718991] font-semibold">
                  Latest Updates
                </span>
              </div>

              <PostComposer
                currentUser={currentUser}
                onOpenUpload={(type) => setUploadModal({ isOpen: true, type })}
              />

              {/* Suggestions Strip */}
              <SuggestionsStrip
                suggestedUsers={suggestedUsers}
                onToggleFollow={handleToggleFollow}
                onMessageUser={handleMessageUser}
                onChangeSuggestions={handleChangeAllSuggestions}
                onOpenAllSuggestions={() => setAllSuggestionsModalOpen(true)}
              />

              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUser={currentUser}
                  onLike={handleLikePost}
                  onAddComment={handleAddComment}
                  onShare={() => handleShare(post)}
                  onToggleSave={handleToggleSavePost}
                />
              ))}
            </div>
          )}

          {/* POSTS TAB */}
          {activeTab === 'posts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#163b49]">
                  Posts
                </h2>
                <button
                  onClick={() => setUploadModal({ isOpen: true, type: 'post' })}
                  className="text-xs font-bold text-[#078da3] hover:underline"
                >
                  + Write a Post
                </button>
              </div>

              <PostComposer
                currentUser={currentUser}
                onOpenUpload={(type) => setUploadModal({ isOpen: true, type })}
              />

              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                    onLike={handleLikePost}
                    onAddComment={handleAddComment}
                    onShare={() => handleShare(post)}
                    onToggleSave={handleToggleSavePost}
                    onDelete={handleDeletePost}
                  />
                ))
              ) : (
                <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-8 text-center text-xs text-[#718991] space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#eaf7f6] text-[#078da3] flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-extrabold text-base text-[#163b49]">
                    No posts yet
                  </h4>
                  <p className="max-w-md mx-auto">
                    Your feed is clean and ready. Click &quot;Write a Post&quot; or use the composer above to publish your first post to KABUR!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* REELS TAB */}
          {activeTab === 'reels' && (
            <ReelsView
              reels={reels}
              currentUser={currentUser}
              onLikeReel={handleLikeReel}
              onToggleSaveReel={handleToggleSaveReel}
              onShareReel={() => handleShare({})}
              onOpenUploadReel={() => setUploadModal({ isOpen: true, type: 'reel' })}
              onDeleteReel={handleDeleteReel}
              showToast={showToast}
            />
          )}

          {/* NEWS TAB */}
          {activeTab === 'news' && (
            <NewsView
              news={news}
              onToggleSaveNews={handleToggleSaveNews}
              onShareNews={() => handleShare({})}
              onOpenUploadNews={() => setUploadModal({ isOpen: true, type: 'news' })}
              showToast={showToast}
            />
          )}

          {/* CHAT TAB */}
          {activeTab === 'chat' && (
            <ChatView
              chats={chats}
              currentChatKey={currentChatKey}
              onSelectChat={setCurrentChatKey}
              onSendMessage={handleSendMessage}
              showToast={showToast}
            />
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <ProfileView
              currentUser={currentUser}
              posts={posts}
              reels={reels}
              news={news}
              onUpdateUser={handleUpdateUser}
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
              onSharePost={() => handleShare({})}
              onToggleSavePost={handleToggleSavePost}
              onDeletePost={handleDeletePost}
              onDeleteReel={handleDeleteReel}
              showToast={showToast}
              onOpenPromote={() => setPromoteModalOpen(true)}
            />
          )}

          {/* SEARCH TAB */}
          {activeTab === 'search' && (
            <SearchView
              initialQuery={searchQuery}
              posts={posts}
              reels={reels}
              news={news}
              suggestedUsers={suggestedUsers}
              onSelectPost={() => setActiveTab('posts')}
              onMessageUser={handleMessageUser}
              onToggleFollow={handleToggleFollow}
              onChangeSuggestions={handleChangeAllSuggestions}
              onOpenAllSuggestions={() => setAllSuggestionsModalOpen(true)}
            />
          )}
        </main>

        {/* Right Sidebar (Desktop only) */}
        <div className="hidden lg:block">
          <RightSidebar
            trendingTopics={currentTrendingTopics}
            suggestedUsers={suggestedUsers}
            onSelectTag={handleSelectTag}
            onToggleFollow={handleToggleFollow}
            onMessageUser={handleMessageUser}
            onChangeSuggestions={handleChangeAllSuggestions}
            onOpenAllSuggestions={() => setAllSuggestionsModalOpen(true)}
            onChangeTrending={handleChangeTrending}
            onOpenPromote={() => setPromoteModalOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        unreadChatsCount={1}
      />

      {/* Create / Upload Modal */}
      <UploadModal
        isOpen={uploadModal.isOpen}
        initialType={uploadModal.type}
        currentUser={currentUser}
        onClose={() => setUploadModal({ isOpen: false, type: 'post' })}
        onPublishPost={handlePublishPost}
        onPublishReel={handlePublishReel}
        onPublishNews={handlePublishNews}
        showToast={showToast}
      />

      {/* All Suggestions Modal */}
      <AllSuggestionsModal
        isOpen={allSuggestionsModalOpen}
        onClose={() => setAllSuggestionsModalOpen(false)}
        allUsers={allSuggestionsPool}
        onToggleFollow={handleToggleFollow}
        onMessageUser={handleMessageUser}
        onChangeAllSuggestions={handleChangeAllSuggestions}
        onDismissSuggestion={handleDismissSuggestion}
      />

      {/* Promote & Share KABUR Modal */}
      <PromoteModal
        isOpen={promoteModalOpen}
        onClose={() => setPromoteModalOpen(false)}
        showToast={showToast}
      />
    </div>
  );
}
