import { useState, useRef, useEffect, useCallback } from 'react';
import type { Item, ItemType, Category } from '@/types';
import { AppCard } from './AppCard';
import { IdeaCard } from './IdeaCard';
import { CardDetailView } from './CardDetailView';
import { IdeaDetailView } from './IdeaDetailView';
import { Loader2 } from 'lucide-react';

interface FeedContainerProps {
  items: Item[];
  itemType: ItemType;
  selectedCategory: Category;
}

const ITEMS_PER_PAGE = 6;

export function FeedContainer({ items, itemType, selectedCategory }: FeedContainerProps) {
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [, setLikedItems] = useState<Set<string>>(new Set());
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Filter items by type and category
  const filteredItems = items.filter((item) => {
    const matchesType = item.type === itemType;
    const matchesCategory = selectedCategory === 'All' || item.categories.includes(selectedCategory);
    return matchesType && matchesCategory;
  });

  // Get related items
  const getRelatedItems = (currentItem: Item): Item[] => {
    return items
      .filter((item) => 
        item.id !== currentItem.id && 
        item.type === itemType &&
        (item.categories.some((cat) => currentItem.categories.includes(cat)) ||
         (item.accolades?.length && currentItem.accolades?.length))
      )
      .slice(0, 3);
  };

  // Reset when filters change
  useEffect(() => {
    setDisplayedItems(filteredItems.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(filteredItems.length > ITEMS_PER_PAGE);
  }, [filteredItems, selectedCategory, itemType]);

  // Load more items
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = page * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newItems = filteredItems.slice(startIndex, endIndex);

      if (newItems.length > 0) {
        setDisplayedItems((prev) => [...prev, ...newItems]);
        setPage(nextPage);
        setHasMore(endIndex < filteredItems.length);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 500);
  }, [filteredItems, page, hasMore, isLoading]);

  // Intersection Observer
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  // Handle like toggle
  const handleLike = (id: string, liked: boolean) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (liked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
    // In a real app, this would call the API
    console.log(`${liked ? 'Liked' : 'Unliked'} item:`, id);
  };

  const handleCardClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  const handleRelatedItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  if (displayedItems.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[#6B6B6B] text-lg">
          No {itemType === 'app' ? 'apps' : 'ideas'} found in this category.
        </p>
        <p className="text-[#9A9A9A] text-sm mt-2">
          Try selecting a different category.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {displayedItems.map((item) => (
          <div key={item.id}>
            {itemType === 'app' ? (
              <AppCard
                item={item}
                onLike={handleLike}
                onClick={() => handleCardClick(item)}
              />
            ) : (
              <IdeaCard
                item={item}
                onLike={handleLike}
                onClick={() => handleCardClick(item)}
              />
            )}
          </div>
        ))}

        {/* Loading Sentinel */}
        <div ref={sentinelRef} className="h-20 flex items-center justify-center">
          {isLoading && (
            <div className="flex items-center gap-2 text-[#9A9A9A]">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Loading more...</span>
            </div>
          )}
          {!hasMore && displayedItems.length > 0 && (
            <p className="text-[#9A9A9A] text-sm">
              You've seen all {filteredItems.length} {itemType === 'app' ? 'apps' : 'ideas'}
            </p>
          )}
        </div>
      </div>

      {/* Detail View Modal */}
      {selectedItem && itemType === 'app' && (
        <CardDetailView
          item={selectedItem}
          relatedItems={getRelatedItems(selectedItem)}
          onClose={handleCloseDetail}
          onItemClick={handleRelatedItemClick}
          onLike={handleLike}
        />
      )}

      {selectedItem && itemType === 'idea' && (
        <IdeaDetailView
          item={selectedItem}
          relatedItems={getRelatedItems(selectedItem)}
          onClose={handleCloseDetail}
          onItemClick={handleRelatedItemClick}
          onLike={handleLike}
        />
      )}
    </>
  );
}
