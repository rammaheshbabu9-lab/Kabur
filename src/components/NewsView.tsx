import React, { useState } from 'react';
import { Share2, Bookmark, Clock, Plus, ExternalLink, X } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsViewProps {
  news: NewsItem[];
  onToggleSaveNews: (id: number) => void;
  onShareNews: (item: NewsItem) => void;
  onOpenUploadNews: () => void;
  showToast: (msg: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({
  news,
  onToggleSaveNews,
  onShareNews,
  onOpenUploadNews,
  showToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingItem, setReadingItem] = useState<NewsItem | null>(null);

  const categories = ['All', 'Latest', 'India', 'Technology', 'Business', 'Sports'];

  const filteredNews =
    selectedCategory === 'All' || selectedCategory === 'Latest'
      ? news
      : news.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#163b49]">
          Community News
        </h2>
        <button
          onClick={onOpenUploadNews}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#078da3] hover:bg-[#066f80] text-white text-xs font-bold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Publish News</span>
        </button>
      </div>

      {/* Categories Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition border ${
              selectedCategory === cat
                ? 'bg-[#078da3] text-white border-[#078da3]'
                : 'bg-white text-[#163b49] border-[#dcebea] hover:bg-[#eaf7f6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News List */}
      {filteredNews.length === 0 ? (
        <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-10 text-center text-xs text-[#718991] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#eaf7f6] text-[#078da3] flex items-center justify-center mx-auto">
            <Plus className="w-6 h-6" />
          </div>
          <h4 className="font-heading font-extrabold text-base text-[#163b49]">
            No news stories in this section yet
          </h4>
          <p className="max-w-md mx-auto">
            Publish verified community announcements, tech breakthroughs, or local stories for KABUR readers.
          </p>
          <div className="pt-1">
            <button
              onClick={onOpenUploadNews}
              className="px-4 py-2 bg-[#078da3] hover:bg-[#066f80] text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish First Story</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="bg-[#fffef9] border border-[#dcebea] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group"
            >
              {/* News Media */}
              <div
                onClick={() => setReadingItem(item)}
                className="cursor-pointer overflow-hidden aspect-video sm:h-56 w-full bg-black/5"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#e8f7f6] text-[#078da3] text-[11px] font-extrabold uppercase tracking-wide">
                    {item.category}
                  </span>

                  <div className="flex items-center gap-1 text-[11px] text-[#718991]">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                </div>

                <h3
                  onClick={() => setReadingItem(item)}
                  className="font-heading font-extrabold text-base sm:text-lg text-[#163b49] hover:text-[#078da3] cursor-pointer transition leading-snug mb-2"
                >
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5e757c] leading-relaxed line-clamp-3 mb-4">
                  {item.desc}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#f0f7f6]">
                  <span className="text-[11px] font-semibold text-[#718991]">
                    By {item.author || 'Community Editor'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onShareNews(item)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#718991] hover:text-[#078da3] hover:bg-[#eaf7f6] rounded-lg transition"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>

                    <button
                      onClick={() => onToggleSaveNews(item.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                        item.saved
                          ? 'text-[#078da3] bg-[#eaf7f6]'
                          : 'text-[#718991] hover:text-[#078da3] hover:bg-[#eaf7f6]'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${item.saved ? 'fill-[#078da3]' : ''}`} />
                      <span>{item.saved ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Reader Modal */}
      {readingItem && (
        <div
          className="fixed inset-0 z-50 bg-[#073944]/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setReadingItem(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#fffef9] rounded-2xl shadow-2xl border border-[#dcebea] p-5 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 bg-[#e8f7f6] text-[#078da3] text-xs font-extrabold rounded-md uppercase">
                {readingItem.category}
              </span>
              <button
                onClick={() => setReadingItem(null)}
                className="w-8 h-8 rounded-full bg-[#f2faf9] hover:bg-[#eaf7f6] text-[#163b49] flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#163b49] mb-3 leading-tight">
              {readingItem.title}
            </h2>

            <div className="flex items-center justify-between text-xs text-[#718991] mb-4 pb-3 border-b border-[#f0f7f6]">
              <span>Reported by {readingItem.author || 'Community Member'}</span>
              <span>{readingItem.time}</span>
            </div>

            <img
              src={readingItem.img}
              alt={readingItem.title}
              className="w-full max-h-80 object-cover rounded-xl mb-4"
            />

            <div className="text-sm text-[#163b49] leading-relaxed space-y-3">
              <p>{readingItem.desc}</p>
              <p className="text-[#5e757c]">
                Stay connected to local developments and discussions on KABUR. Members can submit reports, highlight neighborhood progress, and organize constructive discussions directly through the community portal.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-[#f0f7f6]">
              <button
                onClick={() => onShareNews(readingItem)}
                className="px-4 py-2 border border-[#dcebea] rounded-xl text-xs font-bold text-[#078da3] hover:bg-[#eaf7f6] flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share News</span>
              </button>
              <button
                onClick={() => {
                  onToggleSaveNews(readingItem.id);
                  setReadingItem({ ...readingItem, saved: !readingItem.saved });
                }}
                className="px-4 py-2 bg-[#078da3] text-white rounded-xl text-xs font-bold hover:bg-[#066f80] flex items-center gap-1.5"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{readingItem.saved ? 'Remove from Saved' : 'Save Article'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
