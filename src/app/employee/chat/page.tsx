'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { answerEmployeeQuestions } from '@/ai/flows/answer-employee-questions';
import { useToast } from '@/hooks/use-toast';
import { Bot, User, Send, Loader2, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

// Mock training content. In a real app, this would be dynamically fetched or selected.
const MOCK_TRAINING_CONTENT = `
LearnScale AI - Employee Handbook Snippet:
1.  Company Mission: To revolutionize learning through AI.
2.  Work Hours: Standard work hours are 9 AM to 5 PM, Monday to Friday. Flexible arrangements may be possible with manager approval.
3.  Vacation Policy: Employees are entitled to 20 paid vacation days per year after a 3-month probation period.
4.  Tech Support: For IT issues, please contact support@learnscale.ai or call extension 123.
5.  Product Lines: Our main products are LearnBoost, SkillUp AI, and InsightLearn.
`;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + '-user',
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await answerEmployeeQuestions({
        question: userMessage.text,
        trainingContent: MOCK_TRAINING_CONTENT, // Using mock content
      });
      
      const aiMessage: Message = {
        id: Date.now().toString() + '-ai',
        sender: 'ai',
        text: result.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get response from AI. Please try again.',
        variant: 'destructive',
      });
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        sender: 'ai',
        text: "Sorry, I couldn't process your request right now.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    // Add an initial greeting message from the AI
    setMessages([
      {
        id: 'initial-greeting',
        sender: 'ai',
        text: "Hello! I'm your LearnScale AI assistant. How can I help you today regarding our training content?",
        timestamp: new Date(),
      }
    ]);
  }, []);


  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,10rem))] max-h-[calc(100vh-10rem)]"> {/* Adjust 10rem based on actual header/padding */}
      <header className="mb-4 md:mb-8">
         <h1 className="text-3xl md:text-4xl font-headline font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="h-8 w-8 md:h-10 md:w-10 text-primary" /> AI Chat Assistant
        </h1>
        <p className="text-md md:text-lg text-muted-foreground">Ask questions about your training materials.</p>
      </header>
      
      <ScrollArea className="flex-grow mb-4 p-4 border rounded-lg shadow-inner bg-card" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-3 animate-fadeIn",
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.sender === 'ai' && (
                <Avatar className="h-8 w-8 shadow-sm">
                  <AvatarFallback><Bot size={18} /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[70%] p-3 rounded-xl shadow",
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted text-muted-foreground rounded-bl-none'
                )}
              >
                <p className="text-sm whitespace-pre-wrap font-body">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1 text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {msg.sender === 'user' && (
                <Avatar className="h-8 w-8 shadow-sm">
                  <AvatarFallback><User size={18} /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-end gap-3 justify-start animate-fadeIn">
                <Avatar className="h-8 w-8 shadow-sm">
                  <AvatarFallback><Bot size={18} /></AvatarFallback>
                </Avatar>
                <div className="max-w-[70%] p-3 rounded-xl shadow bg-muted text-muted-foreground rounded-bl-none">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="flex items-center gap-2 border-t pt-4">
        <Input
          type="text"
          placeholder="Type your question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
          disabled={isLoading}
          className="flex-grow text-base"
        />
        <Button onClick={handleSendMessage} disabled={isLoading} size="icon" aria-label="Send message">
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </Button>
      </div>
       <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
