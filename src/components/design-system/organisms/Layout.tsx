
import { cn } from '@/lib/utils';
import * as React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className, sidebar, header, footer }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('min-h-screen bg-background text-foreground', className)}
      >
        {header && (
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {header}
          </header>
        )}
        
        <div className="flex flex-1">
          {sidebar && (
            <aside className="w-64 border-r bg-muted/10">
              {sidebar}
            </aside>
          )}
          
          <main className="flex-1">
            {children}
          </main>
        </div>
        
        {footer && (
          <footer className="border-t bg-muted/10">
            {footer}
          </footer>
        )}
      </div>
    );
  }
);
Layout.displayName = 'Layout';

export { Layout };
