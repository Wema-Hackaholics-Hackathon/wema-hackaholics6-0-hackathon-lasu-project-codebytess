'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { MapPin, TrendingUp, TrendingDown } from "lucide-react";

interface GeographicalData {
  region: string;
  score: number;
  volume: number;
}

interface GeographicalHeatmapProps {
  regions: GeographicalData[];
}

export function GeographicalHeatmap({ regions }: GeographicalHeatmapProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "bg-green-500";
    if (score >= 7.5) return "bg-yellow-500";
    if (score >= 6.5) return "bg-orange-500";
    return "bg-red-500";
  };

  const getScoreIntensity = (score: number) => {
    const intensity = Math.min(Math.max((score - 5) / 5, 0), 1);
    return `opacity-${Math.round(intensity * 100)}`;
  };

  const averageScore = regions.reduce((sum, region) => sum + region.score, 0) / regions.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Regional Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {averageScore.toFixed(1)} <span className="text-sm font-normal text-gray-500">National Average</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Excellent (8.5+)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Good (7.5-8.4)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>Fair (6.5-7.4)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Poor (&lt;6.5)</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {regions
            .sort((a, b) => b.score - a.score)
            .map((region, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${getScoreColor(region.score)}`}></div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{region.region}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-sm text-gray-600">Volume</div>
                  <div className="font-medium">{formatNumber(region.volume)}</div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600">Score</div>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-bold text-gray-900">
                      {region.score.toFixed(1)}
                    </span>
                    {region.score > averageScore ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <div className="text-sm font-medium text-purple-800 mb-2">Regional Insights</div>
          <div className="text-sm text-purple-700">
            <div>• Best performing: {regions.sort((a, b) => b.score - a.score)[0].region} ({regions.sort((a, b) => b.score - a.score)[0].score.toFixed(1)})</div>
            <div>• Highest volume: {regions.sort((a, b) => b.volume - a.volume)[0].region} ({formatNumber(regions.sort((a, b) => b.volume - a.volume)[0].volume)} interactions)</div>
            <div>• {regions.filter(r => r.score > averageScore).length} regions above national average</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}