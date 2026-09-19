import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Send, MoreHorizontal, Globe, Trash2 } from 'lucide-react';
import { Post, User } from '../types';

interface PostCardProps {
  post: Post;
  currentUser: User;
  onLike: (id: number) => void;
  onAddComment: (postId: number, text: string) => void;
  onShare: (post: Post) => void;
  onToggleSave: (postId: number) => void;
  onDelete?: (postId: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onLike,
  onAddComment,
  onShare,
  onToggleSave,
  onDelete,
}) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isAuthor =
    Boolean(currentUser?.name) &&
    currentUser.name.toLowerCase() === post.user.toLowerCase();

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText('');
    setShowComments(true);
  };

  // Format hashtags inside text
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(#[a-zA-Z0-9_]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span key={index} className="text-[#078da3] font-semibold hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <article className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-4 sm:p-5 shadow-sm mb-4 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {post.avatar ? (
            <img
              src={post.avatar}
              alt={post.user}
              className="w-10 h-10 rounded-full object-cover border border-[#dcebea]"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#078da3] to-[#7bcbd0] text-white flex items-center justify-center font-bold text-sm">
              {post.user.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#163b49] leading-tight">
              {post.user}
            </h4>
            <div className="flex items-center gap-1.5 text-[11px] text-[#718991] mt-0.5">
              <span>{post.timestamp}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <Globe className="w-2.5 h-2.5" /> Public
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            aria-label="Post options"
            className="w-8 h-8 rounded-lg hover:bg-[#f2faf9] text-[#718991] flex items-center justify-center transition"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-[#dcebea] rounded-xl shadow-lg py-1 z-20 text-xs">
              <button
                onClick={() => {
                  onShare(post);
                  setShowOptions(false);
                }}
                className="w-full px-3 py-1.5 text-left text-[#163b49] hover:bg-[#eaf7f6]"
              >
                Copy Link
              </button>
              <button
                onClick={() => {
                  onToggleSave(post.id);
                  setShowOptions(false);
                }}
                className="w-full px-3 py-1.5 text-left text-[#163b49] hover:bg-[#eaf7f6]"
              >
                {post.saved ? 'Unsave Post' : 'Save Post'}
              </button>
              {isAuthor && onDelete && (
                <button
                  onClick={() => {
                    setShowOptions(false);
                    setShowDeleteConfirm(true);
                  }}
                  className="w-full px-3 py-1.5 text-left text-[#e84d5b] hover:bg-red-50 flex items-center gap-1.5 border-t border-[#f0f7f6] font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Post</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-[#073944]/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-3">
            <div className="w-10 h-10 rounded-full bg-red-100 text-[#e84d5b] flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-extrabold text-base text-[#163b49] text-center">
              Delete this post?
            </h4>
            <p className="text-xs text-[#718991] text-center leading-relaxed">
              This post will be permanently removed from your profile and community feed.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-[#718991] border border-[#dcebea] hover:bg-[#f2faf9] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  onDelete?.(post.id);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-[#e84d5b] hover:bg-red-700 shadow-sm transition active:scale-95"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Content */}
      <div className="text-xs sm:text-sm text-[#163b49] leading-relaxed mb-3 break-words whitespace-pre-line">
        {renderFormattedText(post.text)}
      </div>

      {/* Post Image */}
      {post.img && (
        <div className="rounded-xl overflow-hidden mb-3.5 bg-black/5 border border-[#dcebea]/60 max-h-[440px]">
          <img
            src={post.img}
            alt="Post media"
            className="w-full h-auto max-h-[440px] object-cover hover:scale-[1.01] transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between border-t border-[#f0f7f6] pt-2.5 text-xs text-[#718991]">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg font-bold transition ${
            post.liked
              ? 'text-[#e84d5b] bg-red-50/70'
              : 'hover:text-[#e84d5b] hover:bg-[#f2faf9]'
          }`}
        >
          <Heart className={`w-4 h-4 ${post.liked ? 'fill-[#e84d5b]' : ''}`} />
          <span>{post.likes}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg font-bold hover:text-[#078da3] hover:bg-[#f2faf9] transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post.comments.length}</span>
        </button>

        <button
          onClick={() => onShare(post)}
          className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg font-bold hover:text-[#078da3] hover:bg-[#f2faf9] transition"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>

        <button
          onClick={() => onToggleSave(post.id)}
          className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg font-bold transition ${
            post.saved
              ? 'text-[#078da3] bg-[#eaf7f6]'
              : 'hover:text-[#078da3] hover:bg-[#f2faf9]'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${post.saved ? 'fill-[#078da3]' : ''}`} />
          <span className="hidden sm:inline">{post.saved ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      {/* Comments Section */}
      {(showComments || post.comments.length > 0) && (
        <div className="mt-3 pt-3 border-t border-[#f0f7f6] space-y-2">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2 text-xs bg-[#f8fcfa] p-2.5 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-[#078da3]/20 text-[#078da3] flex items-center justify-center font-bold text-[10px] shrink-0">
                {comment.user.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#163b49]">{comment.user}</span>
                  <span className="text-[10px] text-[#718991]">{comment.time}</span>
                </div>
                <p className="text-[#163b49] mt-0.5">{comment.text}</p>
              </div>
            </div>
          ))}

          {/* Comment Input */}
          <form onSubmit={handleSubmitComment} className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-3.5 py-2 bg-white border border-[#dcebea] rounded-full text-xs text-[#163b49] focus:outline-none focus:border-[#078da3]"
            />
            <button
              type="submit"
              aria-label="Send comment"
              disabled={!commentText.trim()}
              className="w-8 h-8 rounded-full bg-[#078da3] hover:bg-[#066f80] disabled:opacity-40 text-white flex items-center justify-center transition shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
};
