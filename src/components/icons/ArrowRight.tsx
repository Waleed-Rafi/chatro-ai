import { SVGProps } from 'react';

interface ArrowRightProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const ArrowRight = ({
  size = 16,
  className = '',
  ...props
}: ArrowRightProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
    {...props}
  >
    <path
      d='M3 5v14m18-7H7m14 0-6 6m6-6-6-6'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
