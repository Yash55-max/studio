"use client";

import { Copy, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { LucideIcon } from "lucide-react";

interface SuggestionCardProps {
  title: string;
  Icon: LucideIcon;
  content: string | null;
  isLoading: boolean;
  onGenerate: () => void;
  showGenerateButton: boolean;
}

export function SuggestionCard({
  title,
  Icon,
  content,
  isLoading,
  onGenerate,
  showGenerateButton,
}: SuggestionCardProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      toast({
        title: "Copied to clipboard!",
        description: `Your ${title.toLowerCase()} has been copied.`,
      });
    }
  };

  return (
    <Card className="flex flex-col h-full shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        {content && !isLoading && (
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy {title}</span>
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center min-h-[100px]">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : content ? (
          <p className="text-sm text-foreground">{content}</p>
        ) : showGenerateButton ? (
          <div className="text-center text-muted-foreground">
            <p>Click the button below to generate a {title.toLowerCase()}.</p>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>Upload an image to get started.</p>
          </div>
        )}
      </CardContent>
      {showGenerateButton && (
        <div className="p-4 border-t mt-auto">
          <Button
            onClick={onGenerate}
            disabled={isLoading}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate {title}
          </Button>
        </div>
      )}
    </Card>
  );
}
