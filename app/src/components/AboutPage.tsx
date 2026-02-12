import { X, Sparkles, Eye, Heart, Award } from 'lucide-react';

interface AboutPageProps {
  onClose: () => void;
}

export function AboutPage({ onClose }: AboutPageProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-[#FAFAF8] overflow-y-auto animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[101] w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#F1F1EE] transition-colors border border-[#E6E6E2]"
      >
        <X className="w-5 h-5 text-[#6B6B6B]" />
      </button>

      {/* Content */}
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <img 
              src="/atelie_logo_plus_slogan.png" 
              alt="Atelie" 
              className="h-24 mx-auto mb-6"
            />
            <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-xl mx-auto">
              A curated gallery of exceptional digital products. 
              We believe in quality over quantity.
            </p>
          </div>

          {/* Philosophy */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-[#E6E6E2]">
            <h2 className="text-2xl font-medium text-[#1C1C1C] mb-4 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#5B8DEF]" />
              Our Philosophy
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Atelie is a design-first discovery platform that celebrates craftsmanship 
              in digital product design. Every app and idea featured here has been 
              carefully selected for its attention to detail, user experience, and 
              aesthetic excellence.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed">
              We don't list every app—we showcase the ones that inspire. 
              The ones that make you pause and appreciate the thought behind every pixel.
            </p>
          </div>

          {/* What We Feature */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E6E6E2]">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-[#5B8DEF]" />
              </div>
              <h3 className="text-lg font-medium text-[#1C1C1C] mb-2">Explore</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                Discover beautifully crafted iOS and web applications. 
                Each product is showcased with care, highlighting what makes it special.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E6E6E2]">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-medium text-[#1C1C1C] mb-2">Ideas</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                Browse early-stage concepts and innovative ideas. 
                Connect with creators and help shape the future of digital products.
              </p>
            </div>
          </div>

          {/* Criteria */}
          <div className="bg-gradient-to-br from-[#1C1C1C] to-[#3D3D3D] rounded-2xl p-8 mb-8 text-white">
            <h2 className="text-2xl font-medium mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-[#5B8DEF]" />
              Selection Criteria
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Exceptional visual design',
                'Thoughtful user experience',
                'Attention to detail',
                'Innovative functionality',
                'Craftsmanship in execution',
                'Quality over quantity'
              ].map((criteria, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 text-white/80"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5B8DEF]" />
                  <span className="text-sm">{criteria}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-[#E6E6E2]">
            <p className="text-[#9A9A9A] text-sm">
              © 2024 Atelie. Quality over Quantity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
