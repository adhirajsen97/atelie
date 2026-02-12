import { useEffect, useState } from 'react';
import type { Item } from '@/types';
import { DeviceFrame } from './DeviceFrame';
import { LikeButton } from './LikeButton';
import { X, Mail, Lightbulb, Target, TrendingUp, Users } from 'lucide-react';

interface IdeaDetailViewProps {
  item: Item;
  relatedItems: Item[];
  onClose: () => void;
  onItemClick: (item: Item) => void;
  onLike: (id: string, liked: boolean) => void;
}

export function IdeaDetailView({ item, relatedItems, onClose, onItemClick, onLike }: IdeaDetailViewProps) {
  const [localLiked, setLocalLiked] = useState(false);
  
  const isIOS = item.platforms.includes('iOS');
  const platform = isIOS ? 'iOS' : 'Web App';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleInterested = () => {
    const subject = encodeURIComponent(`Interest in ${item.name}`);
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in the idea "${item.name}" by ${item.developer_name}.\n\n` +
        `My name: \n` +
        `My background: \n` +
        `Reason for interest: \n`
    );
    window.location.href = `mailto:curator@atelie.app?subject=${subject}&body=${body}`;
  };

  const handleLike = (liked: boolean) => {
    setLocalLiked(liked);
    onLike(item.id, liked);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAFAF8]/98 backdrop-blur-sm overflow-y-auto animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[101] w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#F1F1EE] transition-colors border border-[#E6E6E2]"
      >
        <X className="w-5 h-5 text-[#6B6B6B]" />
      </button>

      {/* Content */}
      <div className="min-h-screen py-12 px-4 animate-slide-up">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            {/* Early Stage Badge */}
            <div className="
              inline-flex items-center gap-1.5 
              px-3 py-1 
              bg-amber-50 text-amber-600 
              rounded-full text-xs font-medium mb-4
              border border-amber-100
            ">
              <Lightbulb className="w-3.5 h-3.5" />
              Early Stage Concept
            </div>

            <h1 className="text-3xl sm:text-4xl font-medium text-[#1C1C1C] mb-2 tracking-tight">
              {item.name}
            </h1>
            <p className="text-base text-[#9A9A9A]">
              by {item.developer_name}
            </p>
            
            {/* Category Tag */}
            {item.categories[0] && (
              <span className="
                inline-block mt-4 
                px-3 py-1 
                bg-purple-50 text-purple-600
                rounded-full text-xs font-medium
                border border-purple-100
              ">
                {item.categories[0]}
              </span>
            )}
          </div>

          {/* Device Frames */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-12">
            <DeviceFrame 
              imageUrl={item.hero_image_url}
              platform={platform}
              className="w-full max-w-xs lg:max-w-sm"
            />
            
            {item.gallery_image_urls[0] && (
              <DeviceFrame 
                imageUrl={item.gallery_image_urls[0]}
                platform={platform}
                className="w-full max-w-xs lg:max-w-sm hidden sm:block"
              />
            )}
          </div>

          {/* Problem & Solution */}
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {/* Problem */}
            {item.problem && (
              <div className="
                bg-red-50 rounded-[14px] p-6 
                border-l-4 border-red-300
              ">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-base font-medium text-red-700">The Problem</h3>
                </div>
                <p className="text-sm text-red-600/80 leading-relaxed">{item.problem}</p>
              </div>
            )}

            {/* Solution */}
            {item.solution && (
              <div className="
                bg-emerald-50 rounded-[14px] p-6 
                border-l-4 border-emerald-300
              ">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="text-base font-medium text-emerald-700">The Solution</h3>
                </div>
                <p className="text-sm text-emerald-600/80 leading-relaxed">{item.solution}</p>
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="
            bg-white rounded-[14px] p-6 sm:p-8 
            shadow-sm border border-[#E6E6E2]/50
            mb-8
          ">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Target Audience */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-5 h-5 text-indigo-500" />
                </div>
                <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wider mb-1">Target Audience</p>
                <p className="text-sm font-medium text-[#1C1C1C]">{item.target_audience}</p>
              </div>

              {/* Goal/Scale */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wider mb-1">Goal</p>
                <p className="text-sm font-medium text-[#1C1C1C]">{item.scale_info}</p>
              </div>

              {/* Views */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wider mb-1">Views</p>
                <p className="text-sm font-medium text-[#1C1C1C]">{item.view_count.toLocaleString()}</p>
              </div>

              {/* Likes */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wider mb-1">Likes</p>
                <p className="text-sm font-medium text-[#1C1C1C]">{item.like_count.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3 mb-16">
            <button
              onClick={handleInterested}
              className="
                flex items-center gap-2 
                px-6 py-3 rounded-full 
                font-medium text-white text-sm
                bg-gradient-to-r from-purple-500 to-indigo-600 
                shadow-lg shadow-purple-500/20
                transition-all duration-300 
                hover:scale-105 active:scale-95
              "
            >
              <Mail className="w-4 h-4" />
              I'm Interested
            </button>
            <LikeButton 
              initialLiked={localLiked}
              onLike={handleLike}
              size="lg"
            />
          </div>

          {/* Related Ideas */}
          {relatedItems.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-[#1C1C1C] mb-6 text-center">
                Similar Ideas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedItems.slice(0, 3).map((relatedItem) => (
                  <div
                    key={relatedItem.id}
                    onClick={() => onItemClick(relatedItem)}
                    className="
                      bg-white rounded-[14px] p-4 
                      shadow-sm border border-[#E6E6E2]/50
                      cursor-pointer 
                      hover:shadow-md hover:-translate-y-0.5
                      transition-all duration-300
                    "
                  >
                    <div className="aspect-video rounded-xl overflow-hidden bg-[#F1F1EE] mb-3">
                      <img 
                        src={relatedItem.hero_image_url}
                        alt={relatedItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-medium text-[#1C1C1C] text-sm">{relatedItem.name}</h4>
                    <p className="text-xs text-[#9A9A9A]">by {relatedItem.developer_name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
