"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LEARNING_TOPICS, LearningTopic } from '@/lib/learning-topics';
import { useUserStore } from '@/store/user-store';
import { geminiService } from '@/lib/gemini';
import { Loader2, CheckCircle, XCircle, BookOpen, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface LessonContent {
  intro: string;
  concepts: { title: string; content: string }[];
  tips: string[];
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topicId as string;
  
  const { knowledgeLevel, completeTopicMethod, updateConfidence, incrementStreak } = useUserStore();
  const [topic, setTopic] = useState<LearningTopic | null>(null);
  const [content, setContent] = useState<LessonContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<'intro' | 'concepts' | 'quiz' | 'complete'>('intro');
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const foundTopic = LEARNING_TOPICS.find(t => t.id === topicId);
    if (foundTopic) {
      setTopic(foundTopic);
    } else {
      // Handle topic not found
      router.push('/learn');
    }
  }, [topicId, router]);

  useEffect(() => {
    const loadLesson = async () => {
      if (!topic) return;
      setIsLoading(true);
      try {
        const lessonData = await geminiService.generateLessonContent(topic.title, knowledgeLevel);
        setContent(lessonData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (topic) {
      loadLesson();
    }
  }, [topic, knowledgeLevel]);

  const handleQuizSubmit = () => {
    if (!content || !topic) return;
    
    let correctCount = 0;
    content.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.correctAnswer) correctCount++;
    });
    
    setScore(correctCount);
    setQuizSubmitted(true);
    
    if (correctCount >= 2) {
      completeTopicMethod(topic.id);
      updateConfidence(Math.min(100, 50 + (correctCount * 5))); // Simple logic
      incrementStreak();
    }
  };

  if (!topic) return null;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 hover:pl-2 transition-all" 
        onClick={() => router.push('/learn')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Learning
      </Button>

      <div className="bg-card rounded-xl shadow-sm border overflow-hidden min-h-[80vh] flex flex-col">
        <div className="border-b p-6 bg-muted/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{topic.title}</h1>
              <p className="text-sm text-muted-foreground">
                {topic.duration} • {topic.difficulty}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Generating personalized lesson...</p>
            </div>
          ) : content ? (
            <div className="space-y-8 max-w-3xl mx-auto">
              {currentStep === 'intro' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <h2 className="text-2xl font-bold text-foreground">Introduction</h2>
                  <div className="prose prose-indigo max-w-none text-muted-foreground leading-relaxed">
                    <ReactMarkdown>{content.intro}</ReactMarkdown>
                  </div>
                  
                  <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mt-8">
                    <h3 className="font-semibold text-primary mb-4 text-lg">Key Takeaways</h3>
                    <ul className="space-y-2">
                      {content.concepts.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-primary">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span>{c.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {currentStep === 'concepts' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  {content.concepts.map((concept, i) => (
                    <div key={i} className="space-y-4">
                      <h2 className="text-2xl font-bold text-primary">{concept.title}</h2>
                      <div className="prose prose-indigo max-w-none text-muted-foreground leading-relaxed">
                        <ReactMarkdown>{concept.content}</ReactMarkdown>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-secondary/10 p-6 rounded-xl border border-secondary/20 mt-8">
                    <h3 className="font-semibold text-secondary-foreground mb-4 text-lg">Practical Tips</h3>
                    <ul className="space-y-3">
                      {content.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-secondary-foreground">
                          <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                          <ReactMarkdown components={{ p: 'span' }}>{tip}</ReactMarkdown>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {currentStep === 'quiz' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <h2 className="text-2xl font-bold text-foreground">Knowledge Check</h2>
                  <div className="space-y-6">
                    {content.quiz.map((q, i) => (
                      <div key={i} className="space-y-4 p-6 border rounded-xl bg-card shadow-sm">
                        <p className="font-medium text-lg">{i + 1}. {q.question}</p>
                        <div className="space-y-3">
                          {q.options.map((option, optIndex) => (
                            <div 
                              key={optIndex}
                              className={cn(
                                "p-4 rounded-lg border cursor-pointer transition-all",
                                quizSubmitted 
                                  ? optIndex === q.correctAnswer 
                                    ? "bg-secondary/10 border-secondary ring-1 ring-secondary"
                                    : quizAnswers[i] === optIndex 
                                      ? "bg-destructive/10 border-destructive ring-1 ring-destructive"
                                      : "bg-muted/20 opacity-50"
                                  : quizAnswers[i] === optIndex 
                                    ? "bg-primary/10 border-primary ring-1 ring-primary"
                                    : "hover:bg-muted/20 hover:border-muted-foreground/30"
                              )}
                              onClick={() => !quizSubmitted && setQuizAnswers(prev => {
                                const newAnswers = [...prev];
                                newAnswers[i] = optIndex;
                                return newAnswers;
                              })}
                            >
                              <div className="flex items-center justify-between">
                                <span className={cn(
                                  "font-medium",
                                  quizSubmitted && optIndex === q.correctAnswer ? "text-secondary" : 
                                  quizSubmitted && quizAnswers[i] === optIndex ? "text-destructive" : "text-muted-foreground"
                                )}>{option}</span>
                                {quizSubmitted && optIndex === q.correctAnswer && (
                                  <CheckCircle className="h-5 w-5 text-secondary" />
                                )}
                                {quizSubmitted && quizAnswers[i] === optIndex && optIndex !== q.correctAnswer && (
                                  <XCircle className="h-5 w-5 text-destructive" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 'complete' && (
                <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-in zoom-in">
                  <div className="h-24 w-24 bg-secondary/20 rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircle className="h-12 w-12 text-secondary" />
                  </div>
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-foreground">Lesson Completed!</h2>
                    <p className="text-muted-foreground max-w-md mx-auto text-lg">
                      You scored <span className="font-bold text-primary">{score}/{content.quiz.length}</span>. Great job investing in your knowledge!
                    </p>
                  </div>
                  <div className="flex gap-4 pt-6">
                    <Button size="lg" onClick={() => router.push('/learn')} className="min-w-[200px]">
                      Back to Learning
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className="border-t p-6 bg-muted/10">
          {!isLoading && content && currentStep !== 'complete' && (
            <div className="flex justify-between w-full max-w-3xl mx-auto">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  if (currentStep === 'concepts') setCurrentStep('intro');
                  else if (currentStep === 'quiz') setCurrentStep('concepts');
                }}
                disabled={currentStep === 'intro'}
              >
                Previous
              </Button>
              
              {currentStep === 'quiz' ? (
                !quizSubmitted ? (
                  <Button 
                    size="lg"
                    onClick={handleQuizSubmit}
                    disabled={quizAnswers.length < content.quiz.length || content.quiz.some((_, i) => quizAnswers[i] === undefined)}
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button size="lg" onClick={() => setCurrentStep('complete')}>
                    Finish Lesson
                  </Button>
                )
              ) : (
                <Button size="lg" onClick={() => {
                  if (currentStep === 'intro') setCurrentStep('concepts');
                  else if (currentStep === 'concepts') setCurrentStep('quiz');
                }}>
                  Next Step
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
