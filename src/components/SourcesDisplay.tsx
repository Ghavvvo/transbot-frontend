import { ChatSource } from '@/types/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

interface SourcesDisplayProps {
  sources: ChatSource[];
  confidence: number;
}

const SourcesDisplay = ({ sources, confidence }: SourcesDisplayProps) => {
  if (!sources || sources.length === 0) return null;

  const getRelevanceBadgeColor = (relevance: string) => {
    switch (relevance) {
      case 'Alta':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Media':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Baja':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return 'text-green-600';
    if (conf >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            Fuentes consultadas ({sources.length})
          </span>
        </div>
        <Badge variant="outline" className={`text-xs ${getConfidenceColor(confidence)}`}>
          Confianza: {Math.round(confidence * 100)}%
        </Badge>
      </div>

      <div className="space-y-2">
        {sources.slice(0, 3).map((source, index) => (
          <Card key={source.id} className="p-3 bg-muted/30 border border-border/50">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">
                Fuente #{index + 1}
              </span>
              <Badge
                variant="outline"
                className={`text-xs ${getRelevanceBadgeColor(source.relevance)}`}
              >
                {source.relevance}
              </Badge>
            </div>
            <p className="text-sm text-foreground leading-relaxed line-clamp-3">
              {source.contenido}
            </p>
            <div className="mt-2 text-xs text-muted-foreground">
              Similitud: {Math.round(source.similarity_score * 100)}%
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SourcesDisplay;
