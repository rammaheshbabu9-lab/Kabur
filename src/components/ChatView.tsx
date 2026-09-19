import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import { ChatConversation } from '../types';

interface ChatViewProps {
  chats: Record<string, ChatConversation>;
  currentChatKey: string;
  onSelectChat: (key: string) => void;
  onSendMessage: (chatKey: string, text: string) => void;
  showToast: (msg: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  chats,
  currentChatKey,
  onSelectChat,
  onSendMessage,
  showToast,
}) => {
  const [inputText, setInputText] = useState('');
  const [mobileView, setMobileView] = useState<'list' | 'window'>('window');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatKeys = Object.keys(chats);
  const activeConversation = chats[currentChatKey] || chats[chatKeys[0]];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(currentChatKey, inputText.trim());
    setInputText('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#163b49]">
          Direct Messages
        </h2>
        <span className="text-xs text-[#718991] font-medium">
          {chatKeys.length} Active Conversations
        </span>
      </div>

      <div className="bg-[#fffef9] border border-[#dcebea] rounded-2xl shadow-sm overflow-hidden h-[620px] grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Conversations List */}
        <div
          className={`md:col-span-4 border-r border-[#dcebea] flex flex-col bg-[#fffef9] ${
            mobileView === 'window' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="p-3.5 border-b border-[#f0f7f6]">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-3 py-2 bg-[#f2faf9] border border-[#dcebea] rounded-xl text-xs text-[#163b49] focus:outline-none focus:border-[#078da3]"
            />
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {chatKeys.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#718991]">
                <p className="font-bold text-[#163b49] mb-1">No chats yet</p>
                <p>Start a conversation with members from suggestions or user profiles.</p>
              </div>
            ) : (
              chatKeys.map((key) => {
                const conv = chats[key];
                const isSelected = key === currentChatKey;
                const lastMsg = conv.messages[conv.messages.length - 1];

                return (
                  <div
                    key={key}
                    onClick={() => {
                      onSelectChat(key);
                      setMobileView('window');
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                      isSelected
                        ? 'bg-[#eaf7f6] text-[#078da3]'
                        : 'hover:bg-[#f2faf9] text-[#163b49]'
                    }`}
                  >
                    <div className="relative shrink-0">
                      {conv.avatar ? (
                        <img
                          src={conv.avatar}
                          alt={conv.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#dcebea]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#078da3] text-white flex items-center justify-center font-bold text-sm">
                          {conv.name.charAt(0)}
                        </div>
                      )}
                      {conv.status === 'online' && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold truncate">{conv.name}</span>
                        <span className="text-[10px] text-[#718991]">
                          {lastMsg ? lastMsg.time : ''}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#718991] truncate mt-0.5">
                        {lastMsg ? (lastMsg.sender === 'me' ? `You: ${lastMsg.text}` : lastMsg.text) : 'Start a chat'}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Chat Window */}
        <div
          className={`md:col-span-8 flex flex-col bg-[#fafdfe] ${
            mobileView === 'list' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {activeConversation ? (
            <>
              {/* Header */}
              <div className="px-4 py-3 bg-[#fffef9] border-b border-[#dcebea] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileView('list')}
                    className="md:hidden p-1.5 -ml-1 text-[#718991] hover:text-[#078da3] rounded-lg"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="relative">
                    {activeConversation.avatar ? (
                      <img
                        src={activeConversation.avatar}
                        alt={activeConversation.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#dcebea]"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#078da3] text-white flex items-center justify-center font-bold text-sm">
                        {activeConversation.name.charAt(0)}
                      </div>
                    )}
                    {activeConversation.status === 'online' && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1.5 ring-white" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#163b49]">
                      {activeConversation.name}
                    </h3>
                    <p className="text-[10px] text-[#718991]">
                      {activeConversation.status === 'online' ? 'Online' : activeConversation.lastSeen || 'Offline'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => showToast(`Starting audio call with ${activeConversation.name}`)}
                    className="p-2 text-[#718991] hover:text-[#078da3] hover:bg-[#eaf7f6] rounded-xl transition"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => showToast(`Starting video call with ${activeConversation.name}`)}
                    className="p-2 text-[#718991] hover:text-[#078da3] hover:bg-[#eaf7f6] rounded-xl transition"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => showToast('Conversation options')}
                    className="p-2 text-[#718991] hover:text-[#078da3] hover:bg-[#eaf7f6] rounded-xl transition"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f2faf9]/50">
                {activeConversation.messages.map((msg) => {
                  const isMe = msg.sender === 'me';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                          isMe
                            ? 'bg-[#078da3] text-white rounded-br-sm'
                            : 'bg-white text-[#163b49] border border-[#dcebea] rounded-bl-sm'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[9px] text-[#718991] mt-0.5 px-1">
                        {msg.time}
                      </span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input bar */}
              <form
                onSubmit={handleSend}
                className="p-3 bg-white border-t border-[#dcebea] flex items-center gap-2"
              >
                <input
                  id="chat-message-input"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Message ${activeConversation.name}...`}
                  className="flex-1 px-4 py-2.5 bg-[#f2faf9] border border-[#dcebea] rounded-full text-xs sm:text-sm text-[#163b49] focus:outline-none focus:border-[#078da3] transition"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-10 h-10 rounded-full bg-[#078da3] hover:bg-[#066f80] disabled:opacity-40 text-white flex items-center justify-center transition shadow-sm shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-xs text-[#718991]">
              <div className="w-12 h-12 rounded-2xl bg-[#eaf7f6] text-[#078da3] flex items-center justify-center mb-3">
                <Send className="w-6 h-6" />
              </div>
              <p className="font-heading font-extrabold text-base text-[#163b49] mb-1">
                Your messages
              </p>
              <p className="max-w-xs">
                Select a conversation on the left or tap 'Message' on any member's profile to chat directly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
