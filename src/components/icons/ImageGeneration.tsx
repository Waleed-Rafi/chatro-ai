import { SVGProps } from 'react';

interface ImageGenerationProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const ImageGeneration = ({
  size = 16,
  className = '',
  ...props
}: ImageGenerationProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 18 18'
    fill='none'
    className={className}
    {...props}
  >
    <g id='image'>
      <path
        id='Vector'
        d='M15.75 11.25L13.4355 8.93546C13.1542 8.65425 12.7727 8.49628 12.375 8.49628C11.9773 8.49628 11.5958 8.65425 11.3145 8.93546L4.5 15.75M3.75 2.25H14.25C15.0784 2.25 15.75 2.92157 15.75 3.75V14.25C15.75 15.0784 15.0784 15.75 14.25 15.75H3.75C2.92157 15.75 2.25 15.0784 2.25 14.25V3.75C2.25 2.92157 2.92157 2.25 3.75 2.25ZM8.25 6.75C8.25 7.57843 7.57843 8.25 6.75 8.25C5.92157 8.25 5.25 7.57843 5.25 6.75C5.25 5.92157 5.92157 5.25 6.75 5.25C7.57843 5.25 8.25 5.92157 8.25 6.75Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  </svg>
);
