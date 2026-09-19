import { Post, Reel, NewsItem, ChatConversation, TrendingTopic, SuggestedUser, User } from '../types';

export const INITIAL_USER: User = {
  id: '',
  name: '',
  mobile: '',
  avatar: '',
  coverImage: '',
  bio: '',
  location: '',
  occupation: '',
  website: '',
  joinedDate: '',
  followersCount: 0,
  followingCount: 0,
};

export const INITIAL_POSTS: Post[] = [];

export const INITIAL_REELS: Reel[] = [];

export const INITIAL_NEWS: NewsItem[] = [];

export const INITIAL_CHATS: Record<string, ChatConversation> = {};

export const TRENDING_TOPICS_SETS: TrendingTopic[][] = [
  [
    { tag: '#AIRevolution', postCount: '2.8K posts', category: 'Tech' },
    { tag: '#IncredibleIndia', postCount: '1.9K posts', category: 'Travel' },
    { tag: '#ZeroWasteIndia', postCount: '1.2K posts', category: 'Eco' },
    { tag: '#CreativeMinds', postCount: '890 posts', category: 'Culture' },
    { tag: '#StartupSprint', postCount: '740 posts', category: 'Business' }
  ],
  [
    { tag: '#CleanEnergy', postCount: '3.1K posts', category: 'Eco' },
    { tag: '#IndianIndieFilm', postCount: '1.5K posts', category: 'Cinema' },
    { tag: '#NextGenDevelopers', postCount: '1.1K posts', category: 'Tech' },
    { tag: '#HeritageWalks', postCount: '920 posts', category: 'Heritage' },
    { tag: '#MindfulLiving', postCount: '680 posts', category: 'Wellness' }
  ],
  [
    { tag: '#SmartCities', postCount: '2.4K posts', category: 'Urban' },
    { tag: '#GrassrootsSports', postCount: '1.7K posts', category: 'Sports' },
    { tag: '#HandmadeHeritage', postCount: '1.3K posts', category: 'Art' },
    { tag: '#FintechFrontier', postCount: '840 posts', category: 'Finance' },
    { tag: '#NatureDocumentary', postCount: '610 posts', category: 'Wildlife' }
  ]
];

export const TRENDING_TOPICS: TrendingTopic[] = TRENDING_TOPICS_SETS[0];

export const ALL_SUGGESTED_USERS_POOL: SuggestedUser[] = [];

export const SUGGESTED_USERS: SuggestedUser[] = [];
