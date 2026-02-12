import { useState, useRef } from 'react';
import { CATEGORIES, PLATFORMS } from '@/types';
import type { ItemType, Category, Platform } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, X, Check, Loader2 } from 'lucide-react';

interface SubmitFormProps {
  onSubmitSuccess?: () => void;
}

export function SubmitForm({ onSubmitSuccess }: SubmitFormProps) {
  const [type, setType] = useState<ItemType>('app');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [developerName, setDeveloperName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [targetAudience, setTargetAudience] = useState('');
  const [scaleInfo, setScaleInfo] = useState('');
  const [appLink, setAppLink] = useState('');
  const [whyExceptional, setWhyExceptional] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!name.trim()) {
      newErrors.name = 'App/Idea name is required';
    }
    if (!developerName.trim()) {
      newErrors.developerName = 'Developer name is required';
    }
    if (description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }
    if (selectedCategories.length === 0) {
      newErrors.categories = 'Please select at least one category';
    }
    if (selectedCategories.length > 3) {
      newErrors.categories = 'Please select up to 3 categories';
    }
    if (selectedPlatforms.length === 0) {
      newErrors.platforms = 'Please select at least one platform';
    }
    if (!targetAudience.trim()) {
      newErrors.targetAudience = 'Target audience is required';
    }
    if (!scaleInfo.trim()) {
      newErrors.scaleInfo = 'Scale information is required';
    }
    if (type === 'app' && !appLink.trim()) {
      newErrors.appLink = 'App link is required for finished apps';
    }
    if (uploadedImages.length < 2) {
      newErrors.images = 'Please upload at least 2 images';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCategoryToggle = (category: Category) => {
    if (category === 'All') return;
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, category];
    });
  };

  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platform)) {
        return prev.filter((p) => p !== platform);
      }
      return [...prev, platform];
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Simulate file upload with placeholder images
    const newImages: string[] = [];
    for (let i = 0; i < Math.min(files.length, 6 - uploadedImages.length); i++) {
      newImages.push(`https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000000)}?w=400&h=400&fit=crop`);
    }

    setUploadedImages((prev) => [...prev, ...newImages].slice(0, 6));
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    onSubmitSuccess?.();
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 animate-fade-in">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">
          Thank You!
        </h2>
        <p className="text-stone-600 text-lg mb-2">
          Your submission has been received.
        </p>
        <p className="text-stone-500">
          We'll review and contact you within 3 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      {/* Email */}
      <div data-error={!!errors.email}>
        <Label htmlFor="email" className="text-sm font-semibold">
          Your Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className={`mt-2 ${errors.email ? 'border-red-400' : ''}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        <p className="text-xs text-stone-500 mt-1">
          We'll review and contact you within 3 days
        </p>
      </div>

      {/* Type Selection */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">
          Type <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setType('app')}
            className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
              type === 'app'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-stone-300 hover:border-indigo-400'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full mx-auto mb-2 ${
                type === 'app' ? 'bg-indigo-600' : 'border-2 border-stone-300'
              }`}
            />
            <span className="font-medium">Finished App</span>
          </button>
          <button
            type="button"
            onClick={() => setType('idea')}
            className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
              type === 'idea'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-stone-300 hover:border-indigo-400'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full mx-auto mb-2 ${
                type === 'idea' ? 'bg-indigo-600' : 'border-2 border-stone-300'
              }`}
            />
            <span className="font-medium">Idea/Concept</span>
          </button>
        </div>
      </div>

      {/* App Details */}
      <div className="space-y-6 pt-6 border-t border-stone-200">
        <h3 className="text-lg font-bold">{type === 'app' ? 'App' : 'Idea'} Details</h3>

        {/* Name */}
        <div data-error={!!errors.name}>
          <Label htmlFor="name" className="text-sm font-semibold">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={type === 'app' ? 'App name' : 'Idea name'}
            className={`mt-2 ${errors.name ? 'border-red-400' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Developer Name */}
        <div data-error={!!errors.developerName}>
          <Label htmlFor="developerName" className="text-sm font-semibold">
            Developer/Creator Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="developerName"
            value={developerName}
            onChange={(e) => setDeveloperName(e.target.value)}
            placeholder="Your name or company"
            className={`mt-2 ${errors.developerName ? 'border-red-400' : ''}`}
          />
          {errors.developerName && (
            <p className="text-red-500 text-xs mt-1">{errors.developerName}</p>
          )}
        </div>

        {/* Description */}
        <div data-error={!!errors.description}>
          <Label htmlFor="description" className="text-sm font-semibold">
            Description (50-300 words) <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Describe your ${type}...`}
            className={`mt-2 min-h-[120px] ${errors.description ? 'border-red-400' : ''}`}
          />
          <div className="flex justify-between mt-1">
            {errors.description ? (
              <p className="text-red-500 text-xs">{errors.description}</p>
            ) : (
              <span />
            )}
            <p className="text-xs text-stone-500">{description.length} characters</p>
          </div>
        </div>

        {/* Categories */}
        <div data-error={!!errors.categories}>
          <Label className="text-sm font-semibold mb-3 block">
            Categories (Select up to 3) <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CATEGORIES.filter((c) => c !== 'All').map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryToggle(category)}
                className={`p-3 border-2 rounded-lg text-sm text-left transition-all duration-200 flex items-center gap-2 ${
                  selectedCategories.includes(category)
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-stone-300 hover:border-indigo-400'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded ${
                    selectedCategories.includes(category)
                      ? 'bg-indigo-600'
                      : 'border-2 border-stone-300'
                  }`}
                >
                  {selectedCategories.includes(category) && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
                <span>{category}</span>
              </button>
            ))}
          </div>
          {errors.categories && (
            <p className="text-red-500 text-xs mt-1">{errors.categories}</p>
          )}
        </div>

        {/* Platforms */}
        <div data-error={!!errors.platforms}>
          <Label className="text-sm font-semibold mb-3 block">
            Platforms <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {PLATFORMS.map((platform) => (
              <button
                key={platform}
                type="button"
                onClick={() => handlePlatformToggle(platform)}
                className={`p-3 border-2 rounded-lg text-sm text-left transition-all duration-200 flex items-center gap-2 ${
                  selectedPlatforms.includes(platform)
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-stone-300 hover:border-indigo-400'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded ${
                    selectedPlatforms.includes(platform)
                      ? 'bg-indigo-600'
                      : 'border-2 border-stone-300'
                  }`}
                >
                  {selectedPlatforms.includes(platform) && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
                <span>{platform}</span>
              </button>
            ))}
          </div>
          {errors.platforms && (
            <p className="text-red-500 text-xs mt-1">{errors.platforms}</p>
          )}
        </div>

        {/* Target Audience */}
        <div data-error={!!errors.targetAudience}>
          <Label htmlFor="targetAudience" className="text-sm font-semibold">
            Target Audience <span className="text-red-500">*</span>
          </Label>
          <Input
            id="targetAudience"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder='e.g., "Freelance designers", "Students"'
            className={`mt-2 ${errors.targetAudience ? 'border-red-400' : ''}`}
          />
          {errors.targetAudience && (
            <p className="text-red-500 text-xs mt-1">{errors.targetAudience}</p>
          )}
        </div>

        {/* Scale */}
        <div data-error={!!errors.scaleInfo}>
          <Label htmlFor="scaleInfo" className="text-sm font-semibold">
            Scale <span className="text-red-500">*</span>
          </Label>
          <Input
            id="scaleInfo"
            value={scaleInfo}
            onChange={(e) => setScaleInfo(e.target.value)}
            placeholder={type === 'app' ? 'e.g., "500 users", "10K+"' : 'e.g., "Pre-launch", "Goal: 5K users"'}
            className={`mt-2 ${errors.scaleInfo ? 'border-red-400' : ''}`}
          />
          {errors.scaleInfo && <p className="text-red-500 text-xs mt-1">{errors.scaleInfo}</p>}
        </div>

        {/* App Link (conditional) */}
        {type === 'app' && (
          <div data-error={!!errors.appLink}>
            <Label htmlFor="appLink" className="text-sm font-semibold">
              App Link <span className="text-red-500">*</span>
            </Label>
            <Input
              id="appLink"
              type="url"
              value={appLink}
              onChange={(e) => setAppLink(e.target.value)}
              placeholder="https://yourapp.com"
              className={`mt-2 ${errors.appLink ? 'border-red-400' : ''}`}
            />
            {errors.appLink && <p className="text-red-500 text-xs mt-1">{errors.appLink}</p>}
          </div>
        )}

        {/* Image Upload */}
        <div data-error={!!errors.images}>
          <Label className="text-sm font-semibold mb-3 block">
            Screenshots/Mockups (2-6 images) <span className="text-red-500">*</span>
          </Label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-stone-400 rounded-lg p-8 bg-stone-50 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
            <Upload className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <p className="text-sm text-stone-600">Drop files or click to upload</p>
            <p className="text-xs text-stone-500 mt-1">PNG or JPG, max 5MB each</p>
          </div>

          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-stone-100">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
        </div>

        {/* Why Exceptional */}
        <div>
          <Label htmlFor="whyExceptional" className="text-sm font-semibold">
            Why is this design exceptional? (Optional)
          </Label>
          <Textarea
            id="whyExceptional"
            value={whyExceptional}
            onChange={(e) => setWhyExceptional(e.target.value)}
            placeholder="What makes your app visually/UX stand out?"
            className="mt-2 min-h-[100px]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </span>
        ) : (
          'Submit for Review'
        )}
      </Button>
    </form>
  );
}
