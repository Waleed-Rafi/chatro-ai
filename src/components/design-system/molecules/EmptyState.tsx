
import { Typography } from '../atoms/Typography';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, description, icon, action, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center py-12 text-center',
          className
        )}
      >
        {icon && (
          <div className="mb-4 text-muted-foreground opacity-50">
            {icon}
          </div>
        )}
        <Typography variant="h3" className="mb-2">
          {title}
        </Typography>
        {description && (
          <Typography variant="muted" className="mb-6 max-w-md">
            {description}
          </Typography>
        )}
        {action && (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
    );
  }
);
EmptyState.displayName = 'EmptyState';

export { EmptyState };
