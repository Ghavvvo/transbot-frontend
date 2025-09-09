import { useState } from 'react';
import { ChatSource } from '@/types/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

interface SourcesDisplayProps {
  sources: ChatSource[];
  confidence?: number; // kept optional for compatibility, not displayed
}

const SourcesDisplay = ({ sources }: SourcesDisplayProps) => {
  if (!sources || sources.length === 0) return null;

  const [showSources, setShowSources] = useState(false);

  const getArticleNumber = (id: unknown) => {
    if (id === null || id === undefined) return null;
    try {
      const idStr = typeof id === 'string' ? id : String(id);
      const match = idStr.match(/\d+/);
      return match ? match[0] : null;
    } catch {
      return null;
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            Artículos relacionados ({sources.length})
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSources((prev) => !prev)}
          className="text-primary"
        >
          {showSources ? 'Ocultar' : 'Ver'}
        </Button>
      </div>

      {showSources && (
        <div className="space-y-2">
          {sources.slice(0, 3).map((source) => {
            const artNum = getArticleNumber(source.id);
            return (
              <Card key={source.id} className="p-3 bg-muted/30 border border-border/50">
                {artNum && (
                  <div className="mb-2 text-xs font-medium text-muted-foreground">
                    Artículo {artNum}
                  </div>
                )}
                <p className="text-sm text-foreground leading-relaxed">
                  {source.contenido}
                </p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SourcesDisplay;
