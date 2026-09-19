import React from 'react';
import { Image, Video, Newspaper } from 'lucide-react';
import { User, UploadType } from '../types';

interface PostComposerProps {
  currentUser: User;
  onOpenUpload: (type: UploadType) => void;
}

export const PostComposer: React.FC<PostComposerProps> = ({ currentUser, onOpenUpload }) => {
  return (
    <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl p-4 shadow-sm mb-4">
      <div className="flex items-center gap-3">
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover border border-[#dcebea]"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#078da3] to-[#7bcbd0] text-white flex items-center justify-center font-bold text-sm">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div
          id="composer-trigger"
          onClick={() => onOpenUpload('post')}
          className="flex-1 bg-[#f2faf9] hover:bg-white border border-[#dcebea] hover:border-[#078da3]/40 rounded-xl px-4 py-2.5 text-xs text-[#718991] cursor-pointer transition flex items-center justify-between"
        >
          <span>What&apos;s on your mind, {currentUser.name.split(' ')[0]}?</span>
          <span className="text-[11px] text-[#078da3] font-semibold">Post</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#f0f7f6]">
        <button
          onClick={() => onOpenUpload('post')}
          className="flex-1 py-2 px-2 bg-white hover:bg-[#eaf7f6] border border-[#dcebea] rounded-xl text-xs font-bold text-[#078da3] flex items-center justify-center gap-1.5 transition"
        >
          <Image className="w-4 h-4 text-[#078da3]" />
          <span>Photo</span>
        </button>

        <button
          onClick={() => onOpenUpload('reel')}
          className="flex-1 py-2 px-2 bg-white hover:bg-[#eaf7f6] border border-[#dcebea] rounded-xl text-xs font-bold text-[#078da3] flex items-center justify-center gap-1.5 transition"
        >
          <Video className="w-4 h-4 text-[#078da3]" />
          <span>Reel</span>
        </button>

        <button
          onClick={() => onOpenUpload('news')}
          className="flex-1 py-2 px-2 bg-white hover:bg-[#eaf7f6] border border-[#dcebea] rounded-xl text-xs font-bold text-[#078da3] flex items-center justify-center gap-1.5 transition"
        >
          <Newspaper className="w-4 h-4 text-[#078da3]" />
          <span>News</span>
        </button>
      </div>
    </div>
  );
};
