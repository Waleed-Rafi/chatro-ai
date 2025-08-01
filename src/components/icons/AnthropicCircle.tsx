import { SVGProps } from 'react';

interface AnthropicCircleProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const AnthropicCircle = ({
  size = 28,
  className = '',
  ...props
}: AnthropicCircleProps) => (
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
      d='M17.5992 7.5H14.9244L19.7939 20.4998L22.4688 20.5L17.5992 7.5ZM9.86952 7.5L5 20.5H7.72951L8.71215 17.7701L13.8218 17.7699L14.8153 20.5H17.5448L12.6645 7.5H9.86952ZM9.60733 15.3541L11.2671 10.7826L12.9374 15.3541H9.60733Z'
      fill='#934B35'
    />
  </svg>
);
