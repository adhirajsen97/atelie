import { useEffect, useState } from 'react';
import type { Item } from '@/types';
import { DeviceFrame } from './DeviceFrame';
import { LikeButton } from './LikeButton';
import { ActionButton } from './ActionButton';
import { X, Award, Star } from 'lucide-react';

interface CardDetailViewProps {
  item: Item;
  relatedItems: Item[];
  onClose: () => void;
  onItemClick: (item: Item) => void;
  onLike: (id: string, liked: boolean) => void;
}

export function CardDetailView({ item, relatedItems, onClose, onItemClick, onLike }: CardDetailViewProps) {
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
            <h1 className="text-3xl sm:text-4xl font-medium text-[#1C1C1C] mb-2 tracking-tight">
              {item.name}
            </h1>
            <p className="text-base text-[#9A9A9A]">
              by {item.developer_name}
            </p>
            
            {/* Tags Row */}
            <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
              {item.categories[0] && (
                <span className="
                  px-3 py-1 
                  bg-[#F1F1EE] text-[#6B6B6B]
                  rounded-full text-xs font-medium
                  border border-[#E6E6E2]/50
                ">
                  {item.categories[0]}
                </span>
              )}
              
              {item.accolades?.map((accolade, idx) => (
                <span 
                  key={idx}
                  className="
                    px-3 py-1 
                    bg-gradient-to-r from-amber-400 to-orange-400
                    text-white 
                    rounded-full text-xs font-medium 
                    flex items-center gap-1
                    shadow-sm
                  "
                >
                  <Award className="w-3 h-3" />
                  {accolade}
                </span>
              ))}
            </div>
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

          {/* Description */}
          <div className="bg-white rounded-[14px] p-6 sm:p-8 shadow-sm border border-[#E6E6E2]/50 mb-8">
            <p className="text-base text-[#6B6B6B] leading-relaxed text-center max-w-2xl mx-auto">
              {item.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3 mb-16">
            <ActionButton 
              platform={platform}
              appLink={item.app_link}
              size="lg"
            />
            <LikeButton 
              initialLiked={localLiked}
              onLike={handleLike}
              size="lg"
            />
          </div>

          {/* Related Apps */}
          {relatedItems.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-[#1C1C1C] mb-6 text-center">
                You might also like
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
                    {relatedItem.accolades?.[0] && (
                      <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full text-[10px]">
                        <Star className="w-3 h-3" />
                        {relatedItem.accolades[0]}
                      </span>
                    )}
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
