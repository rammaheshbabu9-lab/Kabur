import React, { useState, useRef } from 'react';
import { X, Image, Video, Newspaper, Upload, Check } from 'lucide-react';
import { UploadType, Post, Reel, NewsItem, User } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  initialType?: UploadType;
  currentUser: User;
  onClose: () => void;
  onPublishPost: (newPost: Partial<Post>) => void;
  onPublishReel: (newReel: Partial<Reel>) => void;
  onPublishNews: (newNews: Partial<NewsItem>) => void;
  showToast: (msg: string) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  initialType = 'post',
  currentUser,
  onClose,
  onPublishPost,
  onPublishReel,
  onPublishNews,
  showToast,
}) => {
  const [activeType, setActiveType] = useState<UploadType>(initialType);
  const [caption, setCaption] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string>('');
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('Technology');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setMediaPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeType === 'post') {
      if (!caption.trim() && !mediaPreview) {
        showToast('Please add text or a photo');
        return;
      }
      onPublishPost({
        user: currentUser.name,
        avatar: currentUser.avatar,
        text: caption.trim() || 'Sharing an update with the community 🌱',
        img: mediaPreview || undefined,
        likes: 0,
        liked: false,
        timestamp: 'Just now',
        comments: [],
      });
      showToast('Post published to KABUR!');
    } else if (activeType === 'reel') {
      if (!mediaPreview) {
        showToast('Please upload a video for your reel');
        return;
      }
      onPublishReel({
        user: currentUser.name,
        avatar: currentUser.avatar,
        caption: caption.trim() || 'New Reel ✨',
        video: mediaPreview,
        likes: 0,
        liked: false,
        commentsCount: 0,
        audioName: `Original Audio - ${currentUser.name}`,
      });
      showToast('Reel uploaded successfully!');
    } else if (activeType === 'news') {
      if (!newsTitle.trim() || !caption.trim()) {
        showToast('Please provide both title and description');
        return;
      }
      onPublishNews({
        title: newsTitle.trim(),
        desc: caption.trim(),
        category: newsCategory,
        author: currentUser.name,
        time: 'Just now',
        img: mediaPreview || '',
      });
      showToast('Community news submitted!');
    }

    // Reset and close
    setCaption('');
    setMediaPreview('');
    setNewsTitle('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#073944]/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#fffef9] rounded-3xl shadow-2xl border border-[#dcebea] p-5 sm:p-7 overflow-y-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#f0f7f6]">
          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#163b49]">
            Create on KABUR
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2faf9] hover:bg-[#eaf7f6] text-[#718991] flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Type selector tabs */}
        <div className="flex items-center gap-2 my-4 p-1 bg-[#f2faf9] rounded-2xl border border-[#dcebea]">
          <button
            type="button"
            onClick={() => {
              setActiveType('post');
              setMediaPreview('');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeType === 'post'
                ? 'bg-white text-[#078da3] shadow-sm'
                : 'text-[#718991] hover:text-[#078da3]'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Post</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveType('reel');
              setMediaPreview('');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeType === 'reel'
                ? 'bg-white text-[#078da3] shadow-sm'
                : 'text-[#718991] hover:text-[#078da3]'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Reel</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveType('news');
              setMediaPreview('');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeType === 'news'
                ? 'bg-white text-[#078da3] shadow-sm'
                : 'text-[#718991] hover:text-[#078da3]'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>News</span>
          </button>
        </div>

        <form onSubmit={handlePublish} className="space-y-4">
          {/* News Title & Category */}
          {activeType === 'news' && (
            <>
              <div>
                <label className="block text-xs font-bold text-[#163b49] mb-1">
                  News Headline
                </label>
                <input
                  type="text"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  placeholder="Enter a descriptive headline..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#dcebea] rounded-xl text-xs sm:text-sm text-[#163b49] focus:outline-none focus:border-[#078da3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#163b49] mb-1">
                  Category
                </label>
                <select
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#dcebea] rounded-xl text-xs sm:text-sm text-[#163b49] focus:outline-none focus:border-[#078da3]"
                >
                  <option value="Technology">Technology</option>
                  <option value="India">India & Heritage</option>
                  <option value="Business">Business & Startups</option>
                  <option value="Sports">Sports</option>
                  <option value="Community">Community Life</option>
                </select>
              </div>
            </>
          )}

          {/* Media Upload Area */}
          <div>
            <label className="block text-xs font-bold text-[#163b49] mb-1.5">
              {activeType === 'reel' ? 'Upload Video Clip' : 'Add Image or Photo'}
            </label>

            {mediaPreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-[#dcebea] bg-black/5 max-h-56">
                {activeType === 'reel' ? (
                  <video src={mediaPreview} controls className="w-full max-h-56 object-cover" />
                ) : (
                  <img src={mediaPreview} alt="Preview" className="w-full max-h-56 object-cover" />
                )}
                <button
                  type="button"
                  onClick={() => setMediaPreview('')}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#9dd8dc] hover:border-[#078da3] rounded-2xl p-6 text-center cursor-pointer bg-[#f8fdfc] hover:bg-[#effaf8] transition"
              >
                <Upload className="w-8 h-8 text-[#078da3] mx-auto mb-2" />
                <p className="text-xs font-bold text-[#163b49]">
                  {activeType === 'reel' ? 'Choose Video file' : 'Choose Photo or drag & drop'}
                </p>
                <p className="text-[11px] text-[#718991] mt-0.5">
                  {activeType === 'reel' ? 'MP4, WebM or quick clip' : 'PNG, JPG, WebP supported'}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={activeType === 'reel' ? 'video/*' : 'image/*'}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Caption / Description Textarea */}
          <div>
            <label className="block text-xs font-bold text-[#163b49] mb-1">
              {activeType === 'news'
                ? 'Article Content'
                : activeType === 'reel'
                ? 'Caption & Hashtags'
                : 'Post Caption'}
            </label>
            <textarea
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={
                activeType === 'news'
                  ? 'Write full article details and community takeaways...'
                  : activeType === 'reel'
                  ? 'Add a caption, music credit, or #hashtags...'
                  : "What's happening? Share thoughts, stories, or questions..."
              }
              className="w-full px-3.5 py-2.5 bg-white border border-[#dcebea] rounded-xl text-xs sm:text-sm text-[#163b49] focus:outline-none focus:border-[#078da3] resize-none"
            />
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#f0f7f6]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-[#dcebea] text-[#718991] hover:bg-[#f2faf9] rounded-xl text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#078da3] hover:bg-[#066f80] text-white rounded-xl text-xs font-bold shadow-md shadow-[#078da3]/20 flex items-center gap-1.5 transition"
            >
              <Check className="w-4 h-4" />
              <span>Publish to KABUR</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
