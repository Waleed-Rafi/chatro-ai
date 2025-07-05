
import { cn } from '@/lib/utils';
import { icons, LucideProps } from 'lucide-react';
import * as React from 'react';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof icons;
  className?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, size = 16, ...props }, ref) => {
    const LucideIcon = icons[name];
    
    if (!LucideIcon) {
      console.warn(`Icon "${name}" not found`);
      return null;
    }

    return (
      <LucideIcon
        ref={ref}
        size={size}
        className={cn('shrink-0', className)}
        {...props}
      />
    );
  }
);
Icon.displayName = 'Icon';

export { Icon };
