'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Users, AlertTriangle } from "lucide-react";

interface JourneyStep {
  step: string;
  users: number;
  dropoffRate: number;
  avgTime: string;
  satisfaction: number;
}

interface JourneyAnalyticsProps {
  journeyData?: JourneyStep[];
  journeyName?: string;
}

export function JourneyAnalytics({ 
  journeyName = "Account Opening Journey",
  journeyData = [
    { step: "Landing Page", users: 10000, dropoffRate: 15, avgTime: "2m 30s", satisfaction: 8.2 },
    { step: "Registration Form", users: 8500, dropoffRate: 25, avgTime: "5m 45s", satisfaction: 7.1 },
    { step: "Document Upload", users: 6375, dropoffRate: 18, avgTime: "3m 20s", satisfaction: 7.8 },
    { step: "Verification", users: 5228, dropoffRate: 12, avgTime: "1m 15s", satisfaction: 8.5 },
    { step: "Account Activation", users: 4600, dropoffRate: 8, avgTime: "45s", satisfaction: 9.1 }
  ]
}: JourneyAnalyticsProps) {
  
  const maxUsers = Math.max(...journeyData.map(step => step.users));
  
  const getDropoffColor = (rate: number) => {
    if (rate > 20) return "text-red-600 bg-red-50";
    if (rate > 10) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const getSatisfactionColor = (score: number) => {
    if (score >= 8.5) return "bg-green-500";
    if (score >= 7.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {journeyName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {journeyData.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{step.step}</h4>
                    <p className="text-sm text-gray-600">{step.users.toLocaleString()} users</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="text-gray-600">Avg Time</div>
                    <div className="font-medium">{step.avgTime}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-gray-600">Satisfaction</div>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${getSatisfactionColor(step.satisfaction)}`}></div>
                      <span className="font-medium">{step.satisfaction}</span>
                    </div>
                  </div>
                  
                  {step.dropoffRate > 0 && (
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDropoffColor(step.dropoffRate)}`}>
                      <AlertTriangle className="w-3 h-3 inline mr-1" />
                      {step.dropoffRate}% drop-off
                    </div>
                  )}
                </div>
              </div>
              
              <div className="ml-11">
                <Progress 
                  value={step.users} 
                  max={maxUsers} 
                  className="h-3"
                  color="bg-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>{maxUsers.toLocaleString()}</span>
                </div>
              </div>
              
              {index < journeyData.length - 1 && (
                <div className="flex justify-center mt-4 mb-2">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-purple-600">
                {((journeyData[journeyData.length - 1].users / journeyData[0].users) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">
                {(journeyData.reduce((sum, step) => sum + step.dropoffRate, 0) / journeyData.length).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Avg Drop-off</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {(journeyData.reduce((sum, step) => sum + step.satisfaction, 0) / journeyData.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Avg Satisfaction</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}