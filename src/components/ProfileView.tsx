import React, { useState, useRef } from 'react';
import { User, Post, Reel, NewsItem } from '../types';
import {
  Edit3,
  Bookmark,
  Share2,
  Calendar,
  Phone,
  CheckCircle2,
  Camera,
  MapPin,
  Briefcase,
  Globe,
  Upload,
  Image,
  X,
  Sparkles,
  User as UserIcon,
  Trash2,
  Film,
} from 'lucide-react';
import { PostCard } from './PostCard';

interface ProfileViewProps {
  currentUser: User;
  posts: Post[];
  reels: Reel[];
  news: NewsItem[];
  onUpdateUser: (updated: User) => void;
  onLikePost: (id: number) => void;
  onAddComment: (postId: number, text: string) => void;
  onSharePost: (post: Post) => void;
  onToggleSavePost: (postId: number) => void;
  showToast: (msg: string) => void;
  onOpenPromote?: () => void;
  onDeletePost?: (id: number) => void;
  onDeleteReel?: (id: number) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  posts,
  reels,
  news,
  onUpdateUser,
  onLikePost,
  onAddComment,
  onSharePost,
  onToggleSavePost,
  showToast,
  onOpenPromote,
  onDeletePost,
  onDeleteReel,
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'saved'>('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [reelToDelete, setReelToDelete] = useState<number | null>(null);

  // Form State
  const [editName, setEditName] = useState(currentUser.name);
  const [editBio, setEditBio] = useState(currentUser.bio || '');
  const [editAvatar, setEditAvatar] = useState(currentUser.avatar || '');
  const [editCover, setEditCover] = useState(currentUser.coverImage || '');
  const [editLocation, setEditLocation] = useState(currentUser.location || 'Hyderabad, Telangana');
  const [editOccupation, setEditOccupation] = useState(currentUser.occupation || 'Community Creator');
  const [editWebsite, setEditWebsite] = useState(currentUser.website || '');

  // File Input References
  const directAvatarInputRef = useRef<HTMLInputElement>(null);
  const modalAvatarInputRef = useRef<HTMLInputElement>(null);
  const directCoverInputRef = useRef<HTMLInputElement>(null);
  const modalCoverInputRef = useRef<HTMLInputElement>(null);

  const myPosts = posts.filter(
    (p) => p.user.toLowerCase() === currentUser.name.toLowerCase()
  );
  const myReels = reels.filter(
    (r) => r.user.toLowerCase() === currentUser.name.toLowerCase()
  );
  const myNews = news.filter(
    (n) => (n.author || '').toLowerCase() === currentUser.name.toLowerCase()
  );
  const savedPosts = posts.filter((p) => p.saved);

  // Direct file reader helper
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        callback(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Direct 1-click change photo on the avatar
  const handleDirectAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, (dataUrl) => {
      const updated = { ...currentUser, avatar: dataUrl };
      onUpdateUser(updated);
      setEditAvatar(dataUrl);
      showToast('Profile photo updated successfully!');
    });
  };

  // Direct 1-click change cover on the banner
  const handleDirectCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, (dataUrl) => {
      const updated = { ...currentUser, coverImage: dataUrl };
      onUpdateUser(updated);
      setEditCover(dataUrl);
      showToast('Cover photo updated successfully!');
    });
  };

  const handleOpenEdit = () => {
    setEditName(currentUser.name);
    setEditBio(currentUser.bio || '');
    setEditAvatar(currentUser.avatar || '');
    setEditCover(currentUser.coverImage || '');
    setEditLocation(currentUser.location || 'Hyderabad, Telangana');
    setEditOccupation(currentUser.occupation || 'Community Creator');
    setEditWebsite(currentUser.website || '');
    setIsEditing(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      showToast('Name cannot be empty');
      return;
    }
    const updated: User = {
      ...currentUser,
      name: editName.trim(),
      bio: editBio.trim(),
      avatar: editAvatar.trim() || undefined,
      coverImage: editCover.trim() || undefined,
      location: editLocation.trim() || undefined,
      occupation: editOccupation.trim() || undefined,
      website: editWebsite.trim() || undefined,
    };
    onUpdateUser(updated);
    setIsEditing(false);
    showToast('Profile updated successfully!');
  };

  return (
    <div className="space-y-4">
      {/* Hidden file inputs for direct camera triggers */}
      <input
        type="file"
        ref={directAvatarInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleDirectAvatarUpload}
      />
      <input
        type="file"
        ref={directCoverInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleDirectCoverUpload}
      />

      {/* Profile Header Card */}
      <div className="bg-[#fffef9] border border-[#dcebea] rounded-3xl overflow-hidden shadow-sm">
        {/* Cover Banner */}
        <div
          className="h-32 sm:h-44 relative bg-cover bg-center transition-all"
          style={{
            backgroundImage: currentUser.coverImage
              ? `url(${currentUser.coverImage})`
              : 'linear-gradient(to right, #078da3, #43aab8, #91d6d3)',
          }}
        >
          {/* Change Cover Photo Trigger */}
          <button
            onClick={() => directCoverInputRef.current?.click()}
            className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
            title="Change Cover Banner"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Change Cover</span>
          </button>
        </div>

        <div className="px-5 sm:px-8 pb-6 relative">
          {/* Avatar and Top Actions */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 sm:-mt-16 mb-4 gap-3">
            {/* Avatar with Camera Overlay */}
            <div className="relative inline-block group">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-md bg-white"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#066f80] to-[#078da3] text-white flex items-center justify-center font-extrabold text-3xl sm:text-4xl border-4 border-white shadow-md font-heading">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Instant Camera overlay button */}
              <button
                onClick={() => directAvatarInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white border-4 border-transparent cursor-pointer"
                title="Click to change profile picture"
              >
                <Camera className="w-6 h-6" />
                <span className="text-[10px] font-bold mt-1">Change</span>
              </button>

              {/* Verified badge & Mobile Camera button */}
              <button
                onClick={() => directAvatarInputRef.current?.click()}
                className="absolute bottom-1 right-1 bg-[#078da3] hover:bg-[#066f80] text-white rounded-full p-2 shadow-md border-2 border-white transition active:scale-95 sm:hidden"
                title="Upload Photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>

              <span className="absolute bottom-1 right-1 hidden sm:block bg-white rounded-full p-0.5 text-[#078da3] shadow">
                <CheckCircle2 className="w-5 h-5 fill-[#078da3] text-white" />
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                id="btn-profile-edit"
                onClick={handleOpenEdit}
                className="px-4 py-2 bg-[#078da3] hover:bg-[#066f80] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
              <button
                id="btn-profile-share-invite"
                onClick={() => {
                  if (onOpenPromote) {
                    onOpenPromote();
                  } else if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    showToast('Profile link copied to clipboard!');
                  }
                }}
                className="px-3.5 py-2 bg-[#f2faf9] hover:bg-[#eaf7f6] text-[#078da3] border border-[#dcebea] rounded-xl transition text-xs font-bold flex items-center gap-1.5 active:scale-95"
                title="Share & Promote Profile"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share & Invite</span>
              </button>
            </div>
          </div>

          {/* User Details */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#163b49]">
                {currentUser.name}
              </h2>
              <span className="hidden sm:inline-block px-2 py-0.5 bg-[#eaf7f6] text-[#078da3] text-[10px] font-bold rounded-md border border-[#c4e6e3]">
                Verified Member
              </span>
            </div>

            {/* Occupation / Headline */}
            <p className="text-xs sm:text-sm font-semibold text-[#078da3] mt-0.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#078da3]" />
              <span>{currentUser.occupation || 'Community Creator • KABUR Member'}</span>
            </p>

            {/* Meta Tags: Phone, Location, Website, Joined */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#718991] mt-2">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {currentUser.mobile}
              </span>

              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#078da3]" />
                {currentUser.location || 'Hyderabad, Telangana'}
              </span>

              {currentUser.website && (
                <a
                  href={
                    currentUser.website.startsWith('http')
                      ? currentUser.website
                      : `https://${currentUser.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#078da3] hover:underline"
                >
                  <Globe className="w-3 h-3" />
                  <span>{currentUser.website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}

              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Joined {currentUser.joinedDate || 'September 2026'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#163b49] mt-3 leading-relaxed max-w-xl">
              {currentUser.bio || 'Sharing moments, insights, and community stories on KABUR.'}
            </p>
          </div>

          {/* Stats Counters */}
          <div className="grid grid-cols-5 gap-2 mt-5 pt-5 border-t border-[#f0f7f6] text-center">
            <div>
              <div className="font-heading font-extrabold text-base sm:text-lg text-[#163b49]">
                {myPosts.length}
              </div>
              <div className="text-[10px] sm:text-xs text-[#718991]">Posts</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-base sm:text-lg text-[#163b49]">
                {myReels.length}
              </div>
              <div className="text-[10px] sm:text-xs text-[#718991]">Reels</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-base sm:text-lg text-[#163b49]">
                {myNews.length}
              </div>
              <div className="text-[10px] sm:text-xs text-[#718991]">News</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-base sm:text-lg text-[#163b49]">
                {currentUser.followersCount ?? 0}
              </div>
              <div className="text-[10px] sm:text-xs text-[#718991]">Followers</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-base sm:text-lg text-[#163b49]">
                {currentUser.followingCount ?? 0}
              </div>
              <div className="text-[10px] sm:text-xs text-[#718991]">Following</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: My Posts vs My Reels vs Saved */}
      <div className="flex items-center gap-2 border-b border-[#dcebea] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeTab === 'posts'
              ? 'bg-[#078da3] text-white shadow-sm'
              : 'text-[#718991] hover:text-[#163b49] hover:bg-[#f2faf9]'
          }`}
        >
          <span>My Posts ({myPosts.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('reels')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeTab === 'reels'
              ? 'bg-[#078da3] text-white shadow-sm'
              : 'text-[#718991] hover:text-[#163b49] hover:bg-[#f2faf9]'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>My Reels ({myReels.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeTab === 'saved'
              ? 'bg-[#078da3] text-white shadow-sm'
              : 'text-[#718991] hover:text-[#163b49] hover:bg-[#f2faf9]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved ({savedPosts.length})</span>
        </button>
      </div>

      {/* Content Feed based on Active Tab */}
      {activeTab === 'posts' && (
        myPosts.length > 0 ? (
          myPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onLike={onLikePost}
              onAddComment={onAddComment}
              onShare={onSharePost}
              onToggleSave={onToggleSavePost}
              onDelete={onDeletePost}
            />
          ))
        ) : (
          <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-8 text-center text-xs text-[#718991]">
            <p className="font-bold text-sm text-[#163b49] mb-1">No posts published yet</p>
            <p>Share your first story, travel photo, or reflection with the community!</p>
          </div>
        )
      )}

      {activeTab === 'reels' && (
        myReels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myReels.map((reel) => (
              <div
                key={reel.id}
                className="bg-[#fffef9] border border-[#dcebea] rounded-2xl overflow-hidden shadow-sm flex flex-col group transition-all hover:shadow-md"
              >
                {/* Reel video container */}
                <div className="relative aspect-[9/14] bg-black">
                  <video
                    src={reel.video}
                    controls
                    playsInline
                    loop
                    className="w-full h-full object-cover"
                  />

                  {/* Top-right quick delete button */}
                  {onDeleteReel && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <button
                        onClick={() => setReelToDelete(reel.id)}
                        className="w-8 h-8 rounded-full bg-red-600/85 hover:bg-red-600 text-white flex items-center justify-center transition shadow-md active:scale-95"
                        title="Delete this reel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Reel info & action bar */}
                <div className="p-3.5 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <p className="text-xs text-[#163b49] font-medium line-clamp-2 leading-relaxed">
                      {reel.caption}
                    </p>
                    {reel.audioName && (
                      <p className="text-[11px] text-[#718991] mt-1 truncate">
                        🎵 {reel.audioName}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#f0f7f6] text-[11px] text-[#718991]">
                    <span>❤️ {reel.likes} likes</span>
                    <span>💬 {reel.commentsCount} comments</span>
                    {onDeleteReel && (
                      <button
                        onClick={() => setReelToDelete(reel.id)}
                        className="text-[#e84d5b] hover:text-red-700 font-bold flex items-center gap-1 transition"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-8 text-center text-xs text-[#718991]">
            <Film className="w-8 h-8 text-[#078da3] mx-auto mb-2 opacity-50" />
            <p className="font-bold text-sm text-[#163b49] mb-1">No reels uploaded yet</p>
            <p>Upload short vertical videos to share your talents with KABUR!</p>
          </div>
        )
      )}

      {activeTab === 'saved' && (
        savedPosts.length > 0 ? (
          savedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onLike={onLikePost}
              onAddComment={onAddComment}
              onShare={onSharePost}
              onToggleSave={onToggleSavePost}
              onDelete={onDeletePost}
            />
          ))
        ) : (
          <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-8 text-center text-xs text-[#718991]">
            <Bookmark className="w-8 h-8 text-[#078da3] mx-auto mb-2 opacity-50" />
            <p className="font-bold text-sm text-[#163b49] mb-1">No saved items yet</p>
            <p>Tap the bookmark icon on any post or news to read it later here.</p>
          </div>
        )
      )}

      {/* Delete Reel Confirmation Modal */}
      {reelToDelete !== null && (
        <div className="fixed inset-0 z-50 bg-[#073944]/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-3">
            <div className="w-10 h-10 rounded-full bg-red-100 text-[#e84d5b] flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-extrabold text-base text-[#163b49] text-center">
              Delete this reel?
            </h4>
            <p className="text-xs text-[#718991] text-center leading-relaxed">
              This short video will be permanently removed from your profile and community reels.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setReelToDelete(null)}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-[#718991] border border-[#dcebea] hover:bg-[#f2faf9] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const id = reelToDelete;
                  setReelToDelete(null);
                  if (id !== null) {
                    onDeleteReel?.(id);
                  }
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-[#e84d5b] hover:bg-red-700 shadow-sm transition active:scale-95"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-[#073944]/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-[#fffef9] rounded-3xl shadow-2xl border border-[#dcebea] p-5 sm:p-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#eaf2f2]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#078da3] text-white flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#163b49]">
                  Edit Profile Details & Photo
                </h3>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-[#718991] hover:text-[#163b49] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Profile Photo Selector Section */}
              <div className="p-3.5 bg-[#f8fcfc] border border-[#e2eff0] rounded-2xl space-y-3">
                <label className="block text-xs font-bold text-[#163b49]">
                  Profile Photo (Avatar)
                </label>

                <div className="flex items-center gap-3">
                  {editAvatar ? (
                    <img
                      src={editAvatar}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#078da3] shadow-xs shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#078da3] text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
                      {editName.charAt(0) || 'K'}
                    </div>
                  )}

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={modalAvatarInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange(e, (dataUrl) => setEditAvatar(dataUrl))
                        }
                      />
                      <button
                        type="button"
                        onClick={() => modalAvatarInputRef.current?.click()}
                        className="px-3 py-1.5 bg-[#078da3] hover:bg-[#066f80] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload from Device</span>
                      </button>

                      {editAvatar && (
                        <button
                          type="button"
                          onClick={() => setEditAvatar('')}
                          className="px-2.5 py-1.5 text-xs text-[#e84d5b] hover:bg-red-50 rounded-xl transition font-medium"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-[#718991]">
                      Upload your profile picture (PNG, JPG, WebP) or remove to use your initials.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cover Banner Selector Section */}
              <div className="p-3.5 bg-[#f8fcfc] border border-[#e2eff0] rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-[#163b49] block">
                      Cover Banner Photo
                    </label>
                    <p className="text-[11px] text-[#718991]">
                      Upload a custom banner image or use default gradient
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={modalCoverInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(e, (dataUrl) => setEditCover(dataUrl))
                      }
                    />
                    <button
                      type="button"
                      onClick={() => modalCoverInputRef.current?.click()}
                      className="px-3 py-1.5 bg-[#078da3] hover:bg-[#066f80] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Image className="w-3.5 h-3.5" />
                      <span>Upload Cover</span>
                    </button>
                    {editCover && (
                      <button
                        type="button"
                        onClick={() => setEditCover('')}
                        className="px-2.5 py-1.5 text-xs text-[#e84d5b] hover:bg-red-50 rounded-xl transition font-medium"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Name & Occupation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#163b49] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#dcebea] rounded-xl text-xs sm:text-sm text-[#163b49] focus:outline-none focus:border-[#078da3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#163b49] mb-1">
                    Occupation / Headline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer, Designer"
                    value={editOccupation}
                    onChange={(e) => setEditOccupation(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#dcebea] rounded-xl text-xs sm:text-sm text-[#163b49] focus:outline-none focus:border-[#078da3]"
                  />
                </div>
              </div>

              {/* Location & Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#163b49] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad, India"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#dcebea] rounded-xl text-xs sm:text-sm text-[#163b49] focus:outline-none focus:border-[#078da3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#163b49] mb-1">
                    Website or Social Link
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. instagram.com/myhandle"
                    value={editWebsite}
                    onChange={(e) => setEditWebsite(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#dcebea] rounded-xl text-xs sm:text-sm text-[#163b49] focus:outline-none focus:border-[#078da3]"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-[#163b49] mb-1">
                  Bio / About Yourself
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#dcebea] rounded-xl text-xs sm:text-sm text-[#163b49] focus:outline-none focus:border-[#078da3] resize-none"
                  placeholder="Share your interests, passions, and background..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#eaf2f2]">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-[#dcebea] text-[#718991] hover:bg-[#f2faf9] rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#078da3] hover:bg-[#066f80] text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
