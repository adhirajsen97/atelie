import type { Item } from '@/types';
import { DeviceFrameCompact } from './DeviceFrame';
import { LikeButton } from './LikeButton';
import { Mail, Lightbulb } from 'lucide-react';

interface IdeaCardProps {
  item: Item;
  onLike?: (id: string, liked: boolean) => void;
  onClick?: () => void;
}

export function IdeaCard({ item, onLike, onClick }: IdeaCardProps) {
  const isIOS = item.platforms.includes('iOS');
  const platform = isIOS ? 'iOS' : 'Web App';

  const handleLike = (liked: boolean) => {
    onLike?.(item.id, liked);
  };

  const handleInterested = (e: React.MouseEvent) => {
    e.stopPropagation();
    const subject = encodeURIComponent(`Interest in ${item.name}`);
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in the idea "${item.name}" by ${item.developer_name}.\n\n` +
        `My name: \n` +
        `My background: \n` +
        `Reason for interest: \n`
    );
    window.location.href = `mailto:curator@atelie.app?subject=${subject}&body=${body}`;
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
              {/* Early Stage Badge */}
              <div className="
                inline-flex items-center gap-1.5 
                px-2.5 py-0.5 
                bg-amber-50 text-amber-600 
                rounded-full text-xs font-medium mb-2
                border border-amber-100
              ">
                <Lightbulb className="w-3 h-3" />
                Early Stage
              </div>
              
              <h2 className="
                text-xl font-medium text-[#1C1C1C] 
                group-hover:text-purple-500 
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
              <button
                onClick={handleInterested}
                className="
                  w-10 h-10 rounded-full flex items-center justify-center
                  bg-gradient-to-br from-purple-500 to-indigo-600
                  hover:from-purple-600 hover:to-indigo-700
                  transition-all duration-300 ease-out
                  hover:scale-110 active:scale-95
                  shadow-md hover:shadow-lg
                "
                title="I'm Interested"
              >
                <Mail className="w-5 h-5 text-white" />
              </button>
              <LikeButton 
                onLike={handleLike}
                size="md"
              />
            </div>
          </div>
          
          {/* Category Tag */}
          {item.categories[0] && (
            <div className="mt-3">
              <span className="
                px-3 py-1 
                bg-purple-50 text-purple-600
                rounded-full text-xs font-medium
                border border-purple-100
              ">
                {item.categories[0]}
              </span>
            </div>
          )}
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
