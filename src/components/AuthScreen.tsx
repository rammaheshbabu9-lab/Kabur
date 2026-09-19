import React, { useState } from 'react';
import { ArrowLeft, Phone, Lock, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface AuthScreenProps {
  onLogin: (user: User) => void;
  showToast: (msg: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, showToast }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(val);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanMobile = mobile.trim();

    if (!cleanName) {
      showToast('Please enter your name');
      return;
    }
    if (!/^\d{10}$/.test(cleanMobile)) {
      showToast('Enter valid 10-digit mobile number');
      return;
    }
    if (!password) {
      showToast('Please enter your password');
      return;
    }

    // Check registered user in localStorage
    const savedUserStr = localStorage.getItem('KABUR_REGISTERED_USER');
    if (savedUserStr) {
      try {
        const saved = JSON.parse(savedUserStr);
        if (
          saved.name.toLowerCase() === cleanName.toLowerCase() &&
          saved.mobile === cleanMobile &&
          saved.password === password
        ) {
          const user: User = {
            id: 'user-' + (saved.id || Date.now()),
            name: saved.name,
            mobile: saved.mobile,
            bio: saved.bio || 'Active KABUR member',
            avatar: saved.avatar || '',
            joinedDate: saved.joinedDate || 'Member',
            followersCount: saved.followersCount || 0,
            followingCount: saved.followingCount || 0,
          };
          onLogin(user);
          showToast(`Welcome back, ${cleanName}!`);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Allow genuine user login with their entered credentials
    const activeUser: User = {
      id: 'user-' + Date.now(),
      name: cleanName,
      mobile: cleanMobile,
      bio: 'Active KABUR member',
      avatar: '',
      joinedDate: 'Joined recently',
      followersCount: 0,
      followingCount: 0,
    };
    onLogin(activeUser);
    showToast(`Welcome back, ${cleanName}!`);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanMobile = mobile.trim();

    if (!cleanName) {
      showToast('Please enter your name');
      return;
    }
    if (!/^\d{10}$/.test(cleanMobile)) {
      showToast('Enter valid 10-digit mobile number');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters');
      return;
    }

    const regData = {
      id: 'user-' + Date.now(),
      name: cleanName,
      mobile: cleanMobile,
      password,
      bio: 'New KABUR member',
      joinedDate: 'Joined today',
      followersCount: 0,
      followingCount: 0,
    };
    localStorage.setItem('KABUR_REGISTERED_USER', JSON.stringify(regData));

    const newUser: User = {
      id: regData.id,
      name: cleanName,
      mobile: cleanMobile,
      bio: 'New KABUR member',
      avatar: '',
      joinedDate: 'Just now',
      followersCount: 0,
      followingCount: 0,
    };

    showToast('Profile created successfully!');
    setTimeout(() => {
      onLogin(newUser);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#e0f5f3] via-[#faf8ef] to-[#dff3f1]">
      <div className="w-full max-w-[430px] bg-[#fffef9] rounded-[30px] shadow-2xl shadow-[#07505c]/15 border border-[#dcebea] overflow-hidden p-6 sm:p-8">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-[22px] bg-gradient-to-br from-[#078da3] to-[#066f80] text-white flex items-center justify-center font-extrabold text-3xl mx-auto shadow-md shadow-[#078da3]/25 font-heading">
            K
          </div>
          <div className="font-heading font-extrabold text-2xl tracking-wider text-[#078da3] mt-2">
            KABUR
          </div>
          <p className="text-xs text-[#58757d] font-medium mt-0.5">Share • Connect • Grow</p>
        </div>

        {!isSignup ? (
          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-extrabold font-heading text-[#163b49]">
                Welcome Back
              </h2>
              <p className="text-xs text-[#718991] mt-0.5">
                Login to your KABUR community account
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#163b49] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-[#718991] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login-name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#dcebea] rounded-xl text-sm text-[#163b49] focus:outline-none focus:border-[#078da3] focus:ring-1 focus:ring-[#078da3] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#163b49] mb-1.5">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#718991] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login-mobile-input"
                    type="tel"
                    inputMode="numeric"
                    value={mobile}
                    onChange={handleMobileInput}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#dcebea] rounded-xl text-sm text-[#163b49] focus:outline-none focus:border-[#078da3] focus:ring-1 focus:ring-[#078da3] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#163b49] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#718991] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login-password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#dcebea] rounded-xl text-sm text-[#163b49] focus:outline-none focus:border-[#078da3] focus:ring-1 focus:ring-[#078da3] transition"
                  />
                </div>
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                className="w-full py-3.5 bg-[#078da3] hover:bg-[#066f80] active:scale-[0.99] text-white font-bold rounded-xl shadow-md shadow-[#078da3]/25 transition flex items-center justify-center gap-2 text-sm mt-2"
              >
                Login to KABUR
              </button>
            </form>

            <div className="text-center mt-5 text-xs text-[#718991]">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignup(true);
                  setName('');
                  setMobile('');
                  setPassword('');
                }}
                className="text-[#078da3] font-bold hover:underline"
              >
                Create Profile
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="p-1.5 -ml-1.5 text-[#078da3] hover:bg-[#eaf7f6] rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-2xl font-extrabold font-heading text-[#163b49]">
                  Create Profile
                </h2>
                <p className="text-xs text-[#718991]">
                  Join KABUR and be part of the community
                </p>
              </div>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#163b49] mb-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-[#718991] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="signup-name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#dcebea] rounded-xl text-sm text-[#163b49] focus:outline-none focus:border-[#078da3] focus:ring-1 focus:ring-[#078da3] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#163b49] mb-1.5">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#718991] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="signup-mobile-input"
                    type="tel"
                    inputMode="numeric"
                    value={mobile}
                    onChange={handleMobileInput}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#dcebea] rounded-xl text-sm text-[#163b49] focus:outline-none focus:border-[#078da3] focus:ring-1 focus:ring-[#078da3] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#163b49] mb-1.5">
                  Create Password (min 6 chars)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#718991] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="signup-password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure password"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#dcebea] rounded-xl text-sm text-[#163b49] focus:outline-none focus:border-[#078da3] focus:ring-1 focus:ring-[#078da3] transition"
                  />
                </div>
              </div>

              <button
                id="signup-submit-btn"
                type="submit"
                className="w-full py-3.5 bg-[#078da3] hover:bg-[#066f80] active:scale-[0.99] text-white font-bold rounded-xl shadow-md shadow-[#078da3]/25 transition flex items-center justify-center gap-2 text-sm mt-2"
              >
                Create Profile & Join
              </button>
            </form>

            <div className="text-center mt-5 text-xs text-[#718991]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="text-[#078da3] font-bold hover:underline"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
