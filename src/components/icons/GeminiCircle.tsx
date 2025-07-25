import { SVGProps } from 'react';

interface GeminiCircleProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const GeminiCircle = ({
  size = 28,
  className = '',
  ...props
}: GeminiCircleProps) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    <rect width={size} height={size} rx='14' fill='white' />
    <path
      d='M23 14.018C20.6647 14.1613 18.4624 15.1536 16.808 16.808C15.1536 18.4624 14.1613 20.6647 14.018 23H13.982C13.8389 20.6646 12.8467 18.4622 11.1922 16.8078C9.53778 15.1533 7.33537 14.1611 5 14.018L5 13.982C7.33537 13.8389 9.53778 12.8467 11.1922 11.1922C12.8467 9.53778 13.8389 7.33537 13.982 5L14.018 5C14.1613 7.33528 15.1536 9.53756 16.808 11.192C18.4624 12.8464 20.6647 13.8387 23 13.982V14.018Z'
      fill='url(#paint0_radial_12736_256071)'
    />
    <defs>
      <radialGradient
        id='paint0_radial_12736_256071'
        cx='0'
        cy='0'
        r='1'
        gradientUnits='userSpaceOnUse'
        gradientTransform='translate(6.7865 12.3159) rotate(18.6832) scale(19.1588 153.474)'
      >
        <stop offset='0.067' stop-color='#9168C0' />
        <stop offset='0.343' stop-color='#5684D1' />
        <stop offset='0.672' stop-color='#1BA1E3' />
      </radialGradient>
    </defs>
  </svg>
);
