'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { summarizeContent } from '@/ai/flows/summarize-content';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, Sparkles } from 'lucide-react';

export default function SummarizePage() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter some text to summarize.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeContent({ content: inputText });
      setSummary(result.summary);
      toast({
        title: 'Summarization Successful',
        description: 'Content has been summarized.',
      });
    } catch (error) {
      console.error('Summarization error:', error);
      toast({
        title: 'Summarization Failed',
        description: 'An error occurred while summarizing the content. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-semibold text-foreground flex items-center gap-2">
          <FileText className="h-10 w-10 text-primary" /> AI Content Summarizer
        </h1>
        <p className="text-lg text-muted-foreground">Paste your content below to get a concise summary.</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Input Content</CardTitle>
          <CardDescription>Enter the text you want to summarize.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your long text, article, or document here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            className="resize-none"
            disabled={isLoading}
          />
          <Button onClick={handleSummarize} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Summarize Text
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {summary && (
        <Card className="shadow-lg animate-fadeIn">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-accent" /> Generated Summary
            </CardTitle>
            <CardDescription>Here is the AI-generated summary of your content.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert p-4 bg-muted/50 rounded-md">
              <p className="whitespace-pre-wrap font-body">{summary}</p>
            </div>
          </CardContent>
        </Card>
      )}
       <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
