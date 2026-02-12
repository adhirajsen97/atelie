import { useState } from 'react';
import type { Item, Submission, AdminStats } from '@/types';
import { 
  LayoutDashboard, 
  Package, 
  Lightbulb, 
  Inbox, 
  Search, 
  Edit, 
  Trash2, 
  Check, 
  X,
  Star,
  Eye,
  LogOut
} from 'lucide-react';

interface AdminDashboardProps {
  stats: AdminStats;
  items: Item[];
  submissions: Submission[];
  onLogout: () => void;
}

export function AdminDashboard({ stats, items, submissions, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'items' | 'submissions' | 'stats'>('items');
  const [searchQuery, setSearchQuery] = useState('');
  const [itemFilter, setItemFilter] = useState<'all' | 'apps' | 'ideas'>('all');

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.developer_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = itemFilter === 'all' || 
                         (itemFilter === 'apps' && item.type === 'app') ||
                         (itemFilter === 'ideas' && item.type === 'idea');
    return matchesSearch && matchesFilter;
  });

  const filteredSubmissions = submissions.filter((sub) =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.developer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-[#1C1C1C]">Welcome back</h1>
          <p className="text-sm text-[#9A9A9A]">Admin Dashboard</p>
        </div>
        <button
          onClick={onLogout}
          className="
            self-start flex items-center gap-2
            px-4 py-2 
            bg-white border border-[#E6E6E2]
            rounded-xl text-sm text-[#6B6B6B]
            hover:bg-[#F1F1EE] hover:text-[#1C1C1C]
            transition-all duration-200
          "
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Apps"
          value={stats.totalApps}
          icon={<Package className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Total Ideas"
          value={stats.totalIdeas}
          icon={<Lightbulb className="w-5 h-5" />}
          color="purple"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<Inbox className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Weekly Views"
          value={stats.weeklyViews}
          icon={<Eye className="w-5 h-5" />}
          color="emerald"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="
          flex-1 flex items-center justify-center gap-2
          px-5 py-3 
          bg-[#1C1C1C] text-white
          rounded-xl text-sm font-medium
          hover:bg-[#3D3D3D]
          transition-colors
        ">
          <Package className="w-4 h-4" />
          Add New App
        </button>
        <button className="
          flex-1 flex items-center justify-center gap-2
          px-5 py-3 
          bg-white border border-[#E6E6E2]
          text-[#1C1C1C]
          rounded-xl text-sm font-medium
          hover:bg-[#F1F1EE]
          transition-colors
        ">
          <Lightbulb className="w-4 h-4" />
          Add New Idea
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-[14px] border border-[#E6E6E2]/50 overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-[#E6E6E2]">
          {[
            { id: 'items' as const, label: 'Items', count: items.length, icon: Package },
            { id: 'submissions' as const, label: 'Submissions', count: submissions.length, icon: Inbox },
            { id: 'stats' as const, label: 'Analytics', icon: LayoutDashboard },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2
                px-4 py-3 
                text-sm font-medium
                transition-colors
                ${activeTab === tab.id
                  ? 'text-[#1C1C1C] border-b-2 border-[#5B8DEF]'
                  : 'text-[#9A9A9A] hover:text-[#6B6B6B]'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && (
                <span className="
                  px-2 py-0.5 
                  bg-[#F1F1EE] text-[#6B6B6B]
                  rounded-full text-xs
                ">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {activeTab === 'items' && (
            <>
              {/* Filter & Search */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                  <input
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="
                      w-full pl-10 pr-4 py-2.5
                      bg-[#FAFAF8]
                      border border-[#E6E6E2]
                      rounded-xl
                      text-sm text-[#1C1C1C]
                      placeholder:text-[#9A9A9A]
                      focus:outline-none focus:ring-2 focus:ring-[#5B8DEF]/20 focus:border-[#5B8DEF]
                    "
                  />
                </div>
                <div className="flex gap-2">
                  {(['all', 'apps', 'ideas'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setItemFilter(filter)}
                      className={`
                        px-4 py-2 
                        rounded-xl text-sm font-medium
                        transition-colors
                        ${itemFilter === filter
                          ? 'bg-[#1C1C1C] text-white'
                          : 'bg-white border border-[#E6E6E2] text-[#6B6B6B] hover:bg-[#F1F1EE]'
                        }
                      `}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <ItemRow key={item.id} item={item} />
                ))}
                {filteredItems.length === 0 && (
                  <div className="text-center py-12 text-[#9A9A9A]">
                    No items found matching your search.
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'submissions' && (
            <>
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                <input
                  placeholder="Search submissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="
                    w-full pl-10 pr-4 py-2.5
                    bg-[#FAFAF8]
                    border border-[#E6E6E2]
                    rounded-xl
                    text-sm text-[#1C1C1C]
                    placeholder:text-[#9A9A9A]
                    focus:outline-none focus:ring-2 focus:ring-[#5B8DEF]/20 focus:border-[#5B8DEF]
                  "
                />
              </div>

              {/* Submissions List */}
              <div className="space-y-2">
                {filteredSubmissions.map((submission) => (
                  <SubmissionRow key={submission.id} submission={submission} />
                ))}
                {filteredSubmissions.length === 0 && (
                  <div className="text-center py-12 text-[#9A9A9A]">
                    No pending submissions.
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'stats' && (
            <div className="text-center py-12">
              <LayoutDashboard className="w-12 h-12 text-[#E6E6E2] mx-auto mb-4" />
              <h3 className="text-base font-medium text-[#1C1C1C] mb-2">
                Analytics Coming Soon
              </h3>
              <p className="text-sm text-[#9A9A9A]">
                Detailed analytics and insights will be available in a future update.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'amber' | 'emerald';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };

  return (
    <div className="bg-white rounded-[14px] border border-[#E6E6E2]/50 p-5">
      <div className={`w-10 h-10 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-xs text-[#9A9A9A] uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-medium text-[#1C1C1C] mt-1">{value}</p>
    </div>
  );
}

function ItemRow({ item }: { item: Item }) {
  return (
    <div className={`
      flex items-center gap-4 p-3 
      bg-[#FAFAF8] rounded-xl
      ${item.is_featured ? 'border border-[#5B8DEF]/30' : ''}
    `}>
      {/* Thumbnail */}
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-[#E6E6E2]">
        <img
          src={item.hero_image_url}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-[#1C1C1C] text-sm truncate">{item.name}</h4>
          {item.is_featured && (
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          )}
          <span className={`
            px-2 py-0.5 rounded-full text-[10px] font-medium
            ${item.type === 'app'
              ? 'bg-blue-50 text-blue-600'
              : 'bg-purple-50 text-purple-600'
            }
          `}>
            {item.type === 'app' ? 'App' : 'Idea'}
          </span>
        </div>
        <p className="text-xs text-[#9A9A9A] truncate">by {item.developer_name}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button className="p-2 text-[#9A9A9A] hover:text-[#5B8DEF] hover:bg-blue-50 rounded-lg transition-colors">
          <Edit className="w-4 h-4" />
        </button>
        <button className="p-2 text-[#9A9A9A] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function SubmissionRow({ submission }: { submission: Submission }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-[#FAFAF8] rounded-xl">
      {/* Icon */}
      <div className={`
        w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
        ${submission.type === 'app'
          ? 'bg-blue-50 text-blue-600'
          : 'bg-purple-50 text-purple-600'
        }
      `}>
        {submission.type === 'app' ? <Package className="w-4 h-4" /> : <Lightbulb className="w-4 h-4" />}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-[#1C1C1C] text-sm">{submission.name}</h4>
        <p className="text-xs text-[#9A9A9A]">by {submission.developer_name}</p>
        <p className="text-[10px] text-[#9A9A9A] mt-0.5">{submission.email}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button className="p-2 text-[#9A9A9A] hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors">
          <Check className="w-4 h-4" />
        </button>
        <button className="p-2 text-[#9A9A9A] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
