import { Post, Reel, NewsItem, ChatConversation, TrendingTopic, SuggestedUser, User } from '../types';

export const INITIAL_USER: User = {
  id: 'user-1',
  name: 'Ram Mahesh',
  mobile: '9876543210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&auto=format&fit=crop&q=80',
  bio: 'Digital explorer • Storyteller • Community builder at KABUR 🌿',
  location: 'Hyderabad, Telangana',
  occupation: 'Product Designer & Community Creator',
  website: 'https://kabur.community',
  joinedDate: 'September 2024',
  followersCount: 342,
  followingCount: 180,
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

export const ALL_SUGGESTED_USERS_POOL: SuggestedUser[] = [
  {
    id: 'sug-ananya',
    name: 'Dr. Ananya Sen',
    handle: '@ananya_biotech',
    role: 'Biotech Scientist & AI Researcher',
    category: 'Tech & AI',
    mutual: 14,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    bio: 'Working on computational genomics and accessible health tech for rural communities.',
    location: 'Bengaluru, India',
    followed: false
  },
  {
    id: 'sug-rohan',
    name: 'Rohan Kulkarni',
    handle: '@rohan_wildlife',
    role: 'Conservation Filmmaker',
    category: 'Photography',
    mutual: 9,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    bio: 'Documenting Western Ghats biodiversity and indigenous forest conservation.',
    location: 'Pune, India',
    followed: false
  },
  {
    id: 'sug-meera',
    name: 'Meera Deshmukh',
    handle: '@meera_crafts',
    role: 'Founder, Vistara Handlooms',
    category: 'Creators',
    mutual: 18,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    bio: 'Connecting traditional handloom weavers directly with conscious buyers.',
    location: 'Jaipur, India',
    followed: false
  },
  {
    id: 'sug-tarun',
    name: 'Tarun Bhargav',
    handle: '@tarun_fintech',
    role: 'AgriTech Entrepreneur',
    category: 'Startups',
    mutual: 11,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
    bio: 'Empowering smallholder farmers with solar microgrids and fair trade market prices.',
    location: 'Hyderabad, India',
    followed: false
  },
  {
    id: 'sug-deepa',
    name: 'Deepa Sundaram',
    handle: '@deepa_reads',
    role: 'Cultural Columnist & Author',
    category: 'Culture',
    mutual: 8,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    bio: 'Writing on regional literature, oral folk histories, and South Asian art.',
    location: 'Chennai, India',
    followed: false
  },
  {
    id: 'sug-neil',
    name: "Neil D'Souza",
    handle: '@neil_culinary',
    role: 'Farm-to-Table Chef',
    category: 'Food & Living',
    mutual: 6,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80',
    bio: 'Reviving heirloom grain recipes and slow seasonal dining experiences.',
    location: 'Goa, India',
    followed: false
  },
  {
    id: 'sug-shreya',
    name: 'Shreya Chawla',
    handle: '@shreya_sports',
    role: 'Badminton Coach & Sports Mentor',
    category: 'Sports',
    mutual: 15,
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=250&q=80',
    bio: 'Training next-generation state junior champions and promoting girl child sports.',
    location: 'Chandigarh, India',
    followed: false
  },
  {
    id: 'sug-karthik',
    name: 'Karthik Reddy',
    handle: '@karthik_dev',
    role: 'Open Source Cloud Architect',
    category: 'Tech & AI',
    mutual: 22,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    bio: 'Rust & Distributed systems enthusiast. Speaker and open web community advocate.',
    location: 'Bengaluru, India',
    followed: false
  },
  {
    id: 'sug-divya',
    name: 'Divya Mallick',
    handle: '@divya_planet',
    role: 'Ecologist & Urban Forester',
    category: 'Eco',
    mutual: 7,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    bio: 'Creating Miyawaki pocket forests and educating citizens about native trees.',
    location: 'Kolkata, India',
    followed: false
  },
  {
    id: 'sug-sameer',
    name: 'Sameer Joshi',
    handle: '@sameer_films',
    role: 'Independent Docu Director',
    category: 'Creators',
    mutual: 12,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80',
    bio: 'Stories of unseen India, traditional musicians, and vanishing crafts.',
    location: 'Mumbai, India',
    followed: false
  },
  {
    id: 'sug-tanvi',
    name: 'Tanvi Nair',
    handle: '@tanvi_music',
    role: 'Classical Fusion Violinist',
    category: 'Culture',
    mutual: 10,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    bio: 'Blending Carnatic classical roots with modern ambient acoustic soundscapes.',
    location: 'Kochi, India',
    followed: false
  },
  {
    id: 'sug-aditya',
    name: 'Aditya Vardhan',
    handle: '@aditya_arch',
    role: 'Sustainable Architect',
    category: 'Design',
    mutual: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
    bio: 'Designing passive-solar mud brick homes and water-neutral campuses.',
    location: 'Auroville, India',
    followed: false
  }
];

export const SUGGESTED_USERS: SuggestedUser[] = ALL_SUGGESTED_USERS_POOL.slice(0, 4);
