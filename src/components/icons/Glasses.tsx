import { SVGProps } from 'react';

interface GlassesProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const Glasses = ({
  size = 16,
  className = '',
  ...props
}: GlassesProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 29 29'
    fill='none'
    className={className}
    {...props}
  >
    <path
      d='M12.167 14.085a4.675 4.675 0 0 1 4.666 0M10.8 11.328a4.667 4.667 0 1 1-6.6 6.6 4.667 4.667 0 0 1 6.6-6.6Zm14 0a4.667 4.667 0 1 1-6.6 6.6 4.667 4.667 0 0 1 6.6-6.6Z'
      stroke='#9841F5'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
