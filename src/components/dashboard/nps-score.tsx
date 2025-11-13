'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface NPSData {
  score: number;
  promoters: number;
  passives: number;
  detractors: number;
  totalResponses: number;
  trend: number;
}

interface NPSScoreProps {
  npsData?: NPSData;
}

export function NPSScore({ 
  npsData = {
    score: 42,
    promoters: 156,
    passives: 89,
    detractors: 45,
    totalResponses: 290,
    trend: 5.2
  }
}: NPSScoreProps) {
  
  const getScoreColor = (score: number) => {
    if (score >= 50) return "text-green-600";
    if (score >= 0) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 50) return "from-green-500 to-green-600";
    if (score >= 0) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "Excellent";
    if (score >= 50) return "Great";
    if (score >= 30) return "Good";
    if (score >= 0) return "Okay";
    return "Poor";
  };

  const promoterPercentage = (npsData.promoters / npsData.totalResponses) * 100;
  const passivePercentage = (npsData.passives / npsData.totalResponses) * 100;
  const detractorPercentage = (npsData.detractors / npsData.totalResponses) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Net Promoter Score (NPS)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className={`text-5xl font-bold ${getScoreColor(npsData.score)} mb-2`}>
            {npsData.score}
          </div>
          <div className="text-lg text-gray-600 mb-1">
            {getScoreLabel(npsData.score)}
          </div>
          <div className="flex items-center justify-center space-x-1 text-sm">
            {npsData.trend > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : npsData.trend < 0 ? (
              <TrendingDown className="w-4 h-4 text-red-600" />
            ) : (
              <Minus className="w-4 h-4 text-gray-600" />
            )}
            <span className={npsData.trend > 0 ? "text-green-600" : npsData.trend < 0 ? "text-red-600" : "text-gray-600"}>
              {npsData.trend > 0 ? "+" : ""}{npsData.trend?.toFixed(1) || '0'}% from last period
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-green-700">Promoters (9-10)</span>
              <span className="text-sm text-gray-600">{npsData.promoters} ({promoterPercentage.toFixed(1)}%)</span>
            </div>
            <Progress value={promoterPercentage} max={100} color="bg-green-500" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-yellow-700">Passives (7-8)</span>
              <span className="text-sm text-gray-600">{npsData.passives} ({passivePercentage.toFixed(1)}%)</span>
            </div>
            <Progress value={passivePercentage} max={100} color="bg-yellow-500" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-red-700">Detractors (0-6)</span>
              <span className="text-sm text-gray-600">{npsData.detractors} ({detractorPercentage.toFixed(1)}%)</span>
            </div>
            <Progress value={detractorPercentage} max={100} color="bg-red-500" />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Total Responses</div>
            <div className="text-xl font-bold text-gray-900">{npsData.totalResponses.toLocaleString()}</div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          NPS = % Promoters - % Detractors
        </div>
      </CardContent>
    </Card>
  );
}