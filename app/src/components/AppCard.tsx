import type { Item } from '@/types';
import { DeviceFrameCompact } from './DeviceFrame';
import { LikeButton } from './LikeButton';
import { ActionButton } from './ActionButton';
import { Award } from 'lucide-react';

interface AppCardProps {
  item: Item;
  onLike?: (id: string, liked: boolean) => void;
  onClick?: () => void;
}

export function AppCard({ item, onLike, onClick }: AppCardProps) {
  const isIOS = item.platforms.includes('iOS');
  const platform = isIOS ? 'iOS' : 'Web App';

  const handleLike = (liked: boolean) => {
    onLike?.(item.id, liked);
  };

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer animate-slide-up"
    >
      {/* Card Container - Atelie Style */}
      <div className="
        bg-white rounded-[14px] 
        shadow-[0_6px_20px_rgba(0,0,0,0.04)]
        hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]
        transition-all duration-300 ease-out
        hover:-translate-y-0.5
        overflow-hidden
        border border-[#E6E6E2]/50
      ">
        
        {/* Header - Title, Developer & Actions */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-start justify-between gap-4">
            {/* Title & Developer */}
            <div className="flex-1 min-w-0">
              <h2 className="
                text-xl font-medium text-[#1C1C1C] 
                group-hover:text-[#5B8DEF] 
                transition-colors duration-300
                truncate tracking-tight
              ">
                {item.name}
              </h2>
              <p className="text-sm text-[#9A9A9A] mt-0.5">
                by {item.developer_name}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div 
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <ActionButton 
                platform={platform} 
                appLink={item.app_link}
                size="md"
              />
              <LikeButton 
                onLike={handleLike}
                size="md"
              />
            </div>
          </div>
          
          {/* Tags Row */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {/* Primary Category */}
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
            
            {/* Accolades */}
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
        <div className="px-4 pb-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Screenshot */}
            <div className="w-full sm:w-auto sm:max-w-[260px]">
              <DeviceFrameCompact 
                imageUrl={item.hero_image_url}
                platform={platform}
                className="w-full"
              />
            </div>
            
            {/* Secondary Screenshot - Hidden on mobile */}
            {item.gallery_image_urls[0] && (
              <div className="hidden sm:block w-full sm:w-auto sm:max-w-[260px]">
                <DeviceFrameCompact 
                  imageUrl={item.gallery_image_urls[0]}
                  platform={platform}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
