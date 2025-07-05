import { SVGProps } from 'react';

interface ArrowLeftProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const ArrowLeft = ({
  size = 16,
  className = '',
  ...props
}: ArrowLeftProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 18 18'
    fill='none'
    className={className}
    {...props}
  >
    <path
      d='M2.25 14.25V3.75m7.5.75L5.25 9m0 0 4.5 4.5M5.25 9h10.5'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
