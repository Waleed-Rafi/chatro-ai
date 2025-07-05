import { SVGProps } from 'react';

interface HistoryProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const History = ({
  size = 16,
  className = '',
  ...props
}: HistoryProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 16 16'
    fill='none'
    className={className}
    {...props}
  >
    <path
      d='M2 8a6 6 0 1 0 6-6 6.5 6.5 0 0 0-4.493 1.827L2 5.333m0 0V2m0 3.333h3.333M8 4.667V8l2.667 1.333'
      stroke='currentColor'
      strokeWidth='currentStroke'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
