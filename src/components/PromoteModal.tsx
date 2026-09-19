import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, ExternalLink, Sparkles, MessageCircle, QrCode } from 'lucide-react';

interface PromoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const PromoteModal: React.FC<PromoteModalProps> = ({ isOpen, onClose, showToast }) => {
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<'telugu' | 'english'>('telugu');
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  const appUrl = window.location.origin || 'https://ais-pre-jrkrzs57ybe6bwxdxnpev7-468553142959.asia-southeast1.run.app';

  const promoTexts = {
    telugu: `🚀 KABUR — Share • Connect • Grow!\nమన కొత్త కమ్యూనిటీ సోషల్ ప్లాట్‌ఫామ్ వచ్చేసింది! పోస్ట్‌లు, రీల్స్, తాజా వార్తలు & చాట్ కోసం ఇప్పుడే చేరండి:\n${appUrl}`,
    english: `🚀 Join KABUR — Share • Connect • Grow!\nExplore vibrant community posts, trending reels, latest journalism news, and real-time chat!\nCheck it out: ${appUrl}`,
  };

  const currentPromoText = promoTexts[language];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    showToast('KABUR link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyFullText = () => {
    navigator.clipboard.writeText(currentPromoText);
    setCopied(true);
    showToast('Promotional message copied!');
    setTimeout(() => setCopied(false), 2500);
  };

  const shareViaWhatsApp = () => {
    const encoded = encodeURIComponent(currentPromoText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const shareViaTelegram = () => {
    const encoded = encodeURIComponent(currentPromoText);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encoded}`, '_blank');
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent(`Explore KABUR — Share • Connect • Grow! Join our vibrant community:`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(appUrl)}&hashtags=KABUR,Community,Reels`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fffef9] border border-[#dcebea] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e6f2f1] flex items-center justify-between bg-gradient-to-r from-[#eaf7f6] via-[#f7fcfc] to-[#fffef9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#078da3] text-white flex items-center justify-center shadow-sm">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#163b49]">
                Promote & Share KABUR
              </h3>
              <p className="text-xs text-[#718991]">
                Invite friends and grow our community together
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#718991] hover:text-[#163b49] hover:bg-white rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* 1-Click Quick Social Sharing */}
          <div>
            <label className="text-xs font-bold text-[#557581] uppercase tracking-wider block mb-2">
              Share in 1-Click
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={shareViaWhatsApp}
                className="py-2.5 px-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition border border-[#25D366]/30 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-[#25D366]" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={shareViaTelegram}
                className="py-2.5 px-3 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 text-[#0088cc] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition border border-[#0088cc]/30 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </button>

              <button
                onClick={shareViaTwitter}
                className="py-2.5 px-3 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition border border-[#1DA1F2]/30 active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                <span>X / Twitter</span>
              </button>

              <button
                onClick={() => setShowQr(!showQr)}
                className="py-2.5 px-3 bg-[#078da3]/10 hover:bg-[#078da3]/20 text-[#078da3] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition border border-[#078da3]/30 active:scale-95"
              >
                <QrCode className="w-4 h-4" />
                <span>QR Code</span>
              </button>
            </div>
          </div>

          {/* QR Code view toggle */}
          {showQr && (
            <div className="p-4 bg-white border border-[#dcebea] rounded-2xl flex flex-col items-center justify-center gap-2 animate-in fade-in">
              <div className="p-2 bg-white rounded-xl border border-[#dcebea]">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(appUrl)}`}
                  alt="KABUR QR Code"
                  className="w-36 h-36"
                />
              </div>
              <p className="text-[11px] text-[#718991] font-medium">Scan with camera to open KABUR</p>
            </div>
          )}

          {/* Direct Link Copier */}
          <div>
            <label className="text-xs font-bold text-[#557581] uppercase tracking-wider block mb-1.5">
              Direct Website Link
            </label>
            <div className="flex items-center gap-2 bg-[#f4fafa] border border-[#dcebea] rounded-xl p-2">
              <input
                type="text"
                readOnly
                value={appUrl}
                className="bg-transparent text-xs sm:text-sm text-[#163b49] font-medium flex-1 outline-none px-1 select-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-[#078da3] hover:bg-[#066f80] text-white text-xs font-bold rounded-lg transition flex items-center gap-1 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Promo Message Preview with Language Switch */}
          <div className="bg-[#f9fdfd] border border-[#e2eff0] rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#163b49]">
                <Sparkles className="w-3.5 h-3.5 text-[#078da3]" />
                <span>Ready-to-Post Message</span>
              </div>

              {/* Language switcher */}
              <div className="flex items-center bg-white border border-[#dcebea] rounded-lg p-0.5 text-[11px] font-bold">
                <button
                  onClick={() => setLanguage('telugu')}
                  className={`px-2 py-0.5 rounded-md transition ${
                    language === 'telugu' ? 'bg-[#078da3] text-white' : 'text-[#718991]'
                  }`}
                >
                  Telugu
                </button>
                <button
                  onClick={() => setLanguage('english')}
                  className={`px-2 py-0.5 rounded-md transition ${
                    language === 'english' ? 'bg-[#078da3] text-white' : 'text-[#718991]'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            <textarea
              readOnly
              rows={3}
              value={currentPromoText}
              className="w-full bg-white border border-[#e2eff0] rounded-xl p-2.5 text-xs text-[#284f5d] resize-none outline-none leading-relaxed select-all"
            />

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={handleCopyFullText}
                className="px-3 py-1.5 text-xs font-bold text-[#078da3] hover:bg-[#eaf7f6] rounded-lg transition flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Message</span>
              </button>
              <button
                onClick={shareViaWhatsApp}
                className="px-3.5 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Send on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#f8fcfc] border-t border-[#e6f2f1] text-center text-[11px] text-[#718991]">
          Share with your friends and community to grow <span className="font-bold text-[#078da3]">KABUR</span> together!
        </div>
      </div>
    </div>
  );
};
