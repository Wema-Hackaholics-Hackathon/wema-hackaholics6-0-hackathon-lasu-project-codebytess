'use client';

import { useState } from "react";
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Settings, 
  Bell, 
  FileText,
  Map,
  Heart,
  Target,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export function Sidebar({ activeSection = 'overview', onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: Heart },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'channels', label: 'Channels', icon: Target },
    { id: 'geography', label: 'Geography', icon: Map },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-semibold text-gray-900">Wema Bank</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <nav className="px-2 pb-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange?.(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-sm font-medium text-purple-900 mb-1">
              System Health
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-purple-700">All systems operational</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}