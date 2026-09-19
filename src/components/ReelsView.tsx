import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Music, Volume2, VolumeX, Plus, Trash2 } from 'lucide-react';
import { Reel, User } from '../types';

interface ReelsViewProps {
  reels: Reel[];
  currentUser?: User;
  onLikeReel: (id: number) => void;
  onToggleSaveReel: (id: number) => void;
  onShareReel: (reel: Reel) => void;
  onOpenUploadReel: () => void;
  onDeleteReel?: (id: number) => void;
  showToast: (msg: string) => void;
}

export const ReelsView: React.FC<ReelsViewProps> = ({
  reels,
  currentUser,
  onLikeReel,
  onToggleSaveReel,
  onShareReel,
  onOpenUploadReel,
  onDeleteReel,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'foryou' | 'following' | 'trending'>('foryou');
  const [muted, setMuted] = useState(true);
  const [reelToDelete, setReelToDelete] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#163b49]">
          Reels
        </h2>
        <button
          onClick={onOpenUploadReel}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#078da3] hover:bg-[#066f80] text-white text-xs font-bold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Reel</span>
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('foryou')}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition border ${
            activeTab === 'foryou'
              ? 'bg-[#078da3] text-white border-[#078da3]'
              : 'bg-white text-[#163b49] border-[#dcebea] hover:bg-[#eaf7f6]'
          }`}
        >
          For You
        </button>
        <button
          onClick={() => setActiveTab('following')}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition border ${
            activeTab === 'following'
              ? 'bg-[#078da3] text-white border-[#078da3]'
              : 'bg-white text-[#163b49] border-[#dcebea] hover:bg-[#eaf7f6]'
          }`}
        >
          Following
        </button>
        <button
          onClick={() => setActiveTab('trending')}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition border ${
            activeTab === 'trending'
              ? 'bg-[#078da3] text-white border-[#078da3]'
              : 'bg-white text-[#163b49] border-[#dcebea] hover:bg-[#eaf7f6]'
          }`}
        >
          Trending
        </button>
      </div>

      {/* Reels Grid */}
      {reels.length === 0 ? (
        <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-10 text-center text-xs text-[#718991] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#eaf7f6] text-[#078da3] flex items-center justify-center mx-auto">
            <Plus className="w-6 h-6" />
          </div>
          <h4 className="font-heading font-extrabold text-base text-[#163b49]">
            No reels uploaded yet
          </h4>
          <p className="max-w-md mx-auto">
            Upload short vertical videos, creative moments, and talent clips to share with the KABUR community!
          </p>
          <div className="pt-1">
            <button
              onClick={onOpenUploadReel}
              className="px-4 py-2 bg-[#078da3] hover:bg-[#066f80] text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Your First Reel</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {reels.map((reel) => (
          <div
            key={reel.id}
            className="relative bg-[#09252b] rounded-2xl overflow-hidden shadow-lg border border-[#dcebea] aspect-[9/15] group"
          >
            {/* HTML5 Video element */}
            <video
              src={reel.video}
              controls
              playsInline
              loop
              muted={muted}
              className="w-full h-full object-cover"
            />

            {/* Top controls: Mute toggle & Delete button if author */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              {currentUser &&
                currentUser.name.toLowerCase() === reel.user.toLowerCase() &&
                onDeleteReel && (
                  <button
                    onClick={() => setReelToDelete(reel.id)}
                    className="w-8 h-8 rounded-full bg-red-600/80 hover:bg-red-600 backdrop-blur-md text-white flex items-center justify-center transition shadow"
                    title="Delete your reel"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              <button
                onClick={() => setMuted(!muted)}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition"
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Action buttons (Right side overlay) */}
            <div className="absolute right-3 bottom-14 z-10 flex flex-col items-center gap-3">
              <button
                onClick={() => onLikeReel(reel.id)}
                className="flex flex-col items-center gap-1 group/btn"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition ${
                    reel.liked ? 'bg-[#e84d5b] text-white' : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${reel.liked ? 'fill-white' : ''}`} />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow">
                  {reel.likes}
                </span>
              </button>

              <button
                onClick={() => showToast(`Opening comments for ${reel.user}'s reel`)}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow">
                  {reel.commentsCount}
                </span>
              </button>

              <button
                onClick={() => onShareReel(reel)}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow">Share</span>
              </button>

              <button
                onClick={() => onToggleSaveReel(reel.id)}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition ${
                    reel.saved ? 'bg-[#078da3] text-white' : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${reel.saved ? 'fill-white' : ''}`} />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow">
                  {reel.saved ? 'Saved' : 'Save'}
                </span>
              </button>
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute left-3 right-16 bottom-3 z-10 text-white text-shadow p-2">
              <div className="flex items-center gap-2 mb-1">
                {reel.avatar ? (
                  <img
                    src={reel.avatar}
                    alt={reel.user}
                    className="w-7 h-7 rounded-full object-cover border border-white/40"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#078da3] flex items-center justify-center font-bold text-xs">
                    {reel.user.charAt(0)}
                  </div>
                )}
                <span className="text-xs font-bold drop-shadow">@{reel.user}</span>
              </div>
              <p className="text-xs line-clamp-2 text-white/95 leading-relaxed drop-shadow">
                {reel.caption}
              </p>
              {reel.audioName && (
                <div className="flex items-center gap-1.5 text-[11px] text-white/80 mt-1.5">
                  <Music className="w-3 h-3 text-[#7bcbd0]" />
                  <span className="truncate">{reel.audioName}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        </div>
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
              This short video will be permanently removed from your profile and the Reels feed.
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
    </div>
  );
};
