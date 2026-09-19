export interface User {
  id: string;
  name: string;
  mobile: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  location?: string;
  occupation?: string;
  website?: string;
  joinedDate?: string;
  followersCount?: number;
  followingCount?: number;
}

export interface Comment {
  id: string;
  user: string;
  avatar?: string;
  text: string;
  time: string;
}

export interface Post {
  id: number;
  user: string;
  avatar?: string;
  text: string;
  img?: string;
  likes: number;
  liked: boolean;
  timestamp: string;
  comments: Comment[];
  saved?: boolean;
}

export interface Reel {
  id: number;
  user: string;
  avatar?: string;
  caption: string;
  video: string;
  likes: number;
  liked: boolean;
  commentsCount: number;
  saved?: boolean;
  views?: string;
  audioName?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  desc: string;
  category: string;
  img: string;
  author?: string;
  time: string;
  saved?: boolean;
  likes?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

export interface ChatConversation {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline';
  messages: ChatMessage[];
  lastSeen?: string;
}

export interface TrendingTopic {
  tag: string;
  postCount: string;
  category?: string;
}

export interface SuggestedUser {
  id: string;
  name: string;
  mutual: number;
  avatar?: string;
  followed?: boolean;
  handle?: string;
  role?: string;
  category?: string;
  bio?: string;
  location?: string;
}

export type PageTab = 'home' | 'posts' | 'reels' | 'news' | 'chat' | 'profile' | 'search';
export type UploadType = 'post' | 'reel' | 'news';
