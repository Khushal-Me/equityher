"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { useChatStore } from '@/store/chat-store';
import { geminiService } from '@/lib/gemini';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

export function ChatInterface() {
  const { messages, isLoading, addMessage, setLoading, clearMessages } = useChatStore();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && messages.length === 0) {
      hasInitialized.current = true;
      addMessage({
        id: uuidv4(),
        role: 'assistant',
        content: "Hi! I'm EquityHer, your personal investment mentor. I'm here to help you understand investing, build confidence, and grow your wealth. What would you like to learn about today?",
        timestamp: Date.now(),
      });
    }
  }, [addMessage, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      // Small timeout to ensure DOM is ready
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: uuidv4(),
      role: 'user' as const,
      content: input.trim(),
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      const response = await geminiService.sendMessage(userMessage.content);
      
      addMessage({
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      });
    } catch {
      toast.error("Failed to get response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      clearMessages();
      // Re-add welcome message
      setTimeout(() => {
        addMessage({
          id: uuidv4(),
          role: 'assistant',
          content: "Hi! I'm EquityHer, your personal investment mentor. I'm here to help you understand investing, build confidence, and grow your wealth. What would you like to learn about today?",
          timestamp: Date.now(),
        });
      }, 100);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="p-3 border-b border-border flex justify-between items-center bg-muted/30">
        <div className="flex items-center gap-2">
           <Sparkles className="h-4 w-4 text-primary" />
           <h2 className="font-semibold text-sm">EquityHer AI Mentor</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleClearChat} 
          className="text-muted-foreground hover:text-destructive h-8 px-2"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Chat
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
        <div className="space-y-8 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-[85%]",
                message.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <Avatar className={cn("h-8 w-8 flex items-center justify-center shrink-0", message.role === 'assistant' ? "bg-primary/10" : "bg-[#B76E79]/20")}>
                {message.role === 'assistant' ? (
                  <Sparkles className="h-5 w-5 text-primary" />
                ) : (
                  <User className="h-5 w-5 text-[#B76E79]" />
                )}
              </Avatar>
              <div
                className={cn(
                  "rounded-lg p-4 text-sm shadow-sm break-words overflow-hidden",
                  message.role === 'user'
                    ? "bg-[#B76E79] text-white"
                    : "bg-white text-foreground border border-border"
                )}
              >
                <ReactMarkdown 
                  components={{
                    p: ({...props}) => <p className="mb-3 last:mb-0 leading-relaxed" {...props} />,
                    ul: ({...props}) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                    li: ({...props}) => <li className="mb-1" {...props} />,
                    strong: ({...props}) => <span className="font-bold" {...props} />,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 mr-auto max-w-[85%]">
              <Avatar className="h-8 w-8 bg-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </Avatar>
              <div className="bg-white rounded-lg p-4 flex items-center border border-border shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-border bg-muted/30 rounded-b-lg">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about investing, stocks, or financial concepts..."
            className="min-h-[50px] max-h-[150px] resize-none bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            className="h-auto px-4 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground/80 font-medium mt-2 text-center">
          EquityHer is an AI mentor. Information provided is for educational purposes only, not financial advice.
        </p>
      </div>
    </div>
  );
}
