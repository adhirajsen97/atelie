import type { Platform } from '@/types';

interface DeviceFrameProps {
  imageUrl: string;
  platform: Platform;
  className?: string;
}

export function DeviceFrame({ imageUrl, platform, className = '' }: DeviceFrameProps) {
  // iPhone 15 Pro frame - Atelie style
  if (platform === 'iOS') {
    return (
      <div className={`relative ${className}`}>
        <div 
          className="
            relative mx-auto 
            border-[10px] border-[#1C1C1C] 
            bg-[#1C1C1C]
            rounded-[2.5rem] 
            shadow-[0_20px_50px_rgba(0,0,0,0.15)]
            overflow-hidden
          "
        >
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
          
          {/* Screen */}
          <div className="rounded-[1.8rem] overflow-hidden bg-black aspect-[9/19.5]">
            <img 
              src={imageUrl} 
              alt="App screenshot" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {/* Side buttons */}
          <div className="absolute -left-[12px] top-20 w-[3px] h-6 bg-[#2D2D2D] rounded-l" />
          <div className="absolute -left-[12px] top-32 w-[3px] h-10 bg-[#2D2D2D] rounded-l" />
          <div className="absolute -left-[12px] top-48 w-[3px] h-10 bg-[#2D2D2D] rounded-l" />
          <div className="absolute -right-[12px] top-28 w-[3px] h-14 bg-[#2D2D2D] rounded-r" />
        </div>
      </div>
    );
  }

  // Desktop Browser Frame - Atelie style
  return (
    <div className={`relative ${className}`}>
      <div 
        className="
          relative 
          bg-white
          rounded-[14px] 
          shadow-[0_20px_50px_rgba(0,0,0,0.12)]
          overflow-hidden
          border border-[#E6E6E2]
        "
      >
        {/* Browser Chrome */}
        <div className="bg-[#F1F1EE] px-4 py-3 flex items-center gap-3 border-b border-[#E6E6E2]">
          {/* Traffic Lights */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
          </div>
          {/* Address Bar */}
          <div className="flex-1 mx-4">
            <div className="bg-white rounded-lg px-3 py-1.5 text-xs text-[#9A9A9A] text-center border border-[#E6E6E2]">
              app.example.com
            </div>
          </div>
        </div>
        
        {/* Screen */}
        <div className="aspect-[16/10] bg-white overflow-hidden">
          <img 
            src={imageUrl} 
            alt="App screenshot" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

// Compact version for cards
export function DeviceFrameCompact({ imageUrl, platform, className = '' }: DeviceFrameProps) {
  if (platform === 'iOS') {
    return (
      <div className={`relative ${className}`}>
        <div 
          className="
            relative mx-auto 
            border-[6px] border-[#1C1C1C] 
            bg-[#1C1C1C]
            rounded-[1.5rem] 
            shadow-[0_12px_30px_rgba(0,0,0,0.12)]
            overflow-hidden
          "
        >
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-10" />
          <div className="rounded-[1rem] overflow-hidden bg-black aspect-[9/19.5]">
            <img 
              src={imageUrl} 
              alt="App screenshot" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        className="
          relative 
          bg-white
          rounded-[10px] 
          shadow-[0_12px_30px_rgba(0,0,0,0.1)]
          overflow-hidden
          border border-[#E6E6E2]
        "
      >
        <div className="bg-[#F1F1EE] px-2.5 py-2 flex items-center gap-1.5 border-b border-[#E6E6E2]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
          </div>
        </div>
        <div className="aspect-[16/10] bg-white overflow-hidden">
          <img 
            src={imageUrl} 
            alt="App screenshot" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
