import { SVGProps } from 'react';

interface CrownProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const Crown = ({ size = 16, className = '', ...props }: CrownProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 18 16'
    fill='none'
    className={className}
    {...props}
  >
    <path
      d='m17.98 6.51-1.7 7.51a.69.69 0 0 1-.69.546H2.35a.69.69 0 0 1-.69-.546L.015 6.51a.69.69 0 0 1 .981-.767l4.035 1.955 3.344-5.914a.69.69 0 0 1 1.203 0l3.344 5.921 4.062-1.969a.691.691 0 0 1 .995.774Z'
      fill='currentColor'
    />
  </svg>
);
