"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUserStore } from '@/store/user-store';
import { LEARNING_TOPICS } from '@/lib/learning-topics';
import { Trophy, Flame, BookOpen, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LearningTopic } from '@/lib/learning-topics';
import { cn } from '@/lib/utils';

export function ProgressDashboard() {
  const { completedTopics, confidenceScore, streak } = useUserStore();
  const router = useRouter();

  const progress = (completedTopics.length / LEARNING_TOPICS.length) * 100;

  const handleTopicClick = (topic: LearningTopic) => {
    router.push(`/learn/${topic.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(progress)}%</div>
            <Progress value={progress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedTopics.length} of {LEARNING_TOPICS.length} topics completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confidence Score</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confidenceScore}/100</div>
            <Progress value={confidenceScore} className="mt-2 bg-yellow-100" indicatorClassName="bg-yellow-500" />
            <p className="text-xs text-muted-foreground mt-2">
              Based on quiz performance
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Day Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak} Days</div>
            <p className="text-xs text-muted-foreground mt-2">
              Keep learning daily!
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {LEARNING_TOPICS.map((topic, index) => {
          const isCompleted = completedTopics.includes(topic.id);
          // Unlock if previous topic is completed or it's the first one
          const isLocked = index > 0 && !completedTopics.includes(LEARNING_TOPICS[index - 1].id);

          return (
            <Card 
              key={topic.id} 
              className={cn(
                "relative overflow-hidden transition-all hover:shadow-md",
                isLocked ? "opacity-75 bg-muted" : "cursor-pointer hover:border-primary"
              )}
              onClick={() => !isLocked && handleTopicClick(topic)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{topic.title}</CardTitle>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : isLocked ? (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {topic.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="capitalize px-2 py-1 bg-muted rounded-full">
                    {topic.difficulty}
                  </span>
                  <span>{topic.duration}</span>
                </div>
                {!isLocked && !isCompleted && (
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">
                    Start Lesson
                  </Button>
                )}
                {isCompleted && (
                  <Button className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/80" variant="outline" size="sm">
                    Review
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
