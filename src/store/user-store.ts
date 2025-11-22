import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  name: string;
  knowledgeLevel: 'beginner' | 'intermediate' | 'advanced';
  completedTopics: string[];
  confidenceScore: number;
  streak: number;
  updateName: (name: string) => void;
  completeTopicMethod: (topicId: string) => void;
  updateConfidence: (score: number) => void;
  incrementStreak: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: 'Guest',
      knowledgeLevel: 'beginner',
      completedTopics: [],
      confidenceScore: 50,
      streak: 0,
      updateName: (name) => set({ name }),
      completeTopicMethod: (topicId) => 
        set((state) => ({ 
          completedTopics: state.completedTopics.includes(topicId) 
            ? state.completedTopics 
            : [...state.completedTopics, topicId] 
        })),
      updateConfidence: (score) => set({ confidenceScore: score }),
      incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
    }),
    {
      name: 'user-storage',
    }
  )
);
