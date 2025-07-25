import { SVGProps } from 'react';

interface GrokCircleProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const GrokCircle = ({
  size = 28,
  className = '',
  ...props
}: GrokCircleProps) => (
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
    <g clip-path='url(#clip0_14479_48094)'>
      <path
        d='M11.8384 16.2605L18.155 11.5713C18.4647 11.3414 18.9073 11.4311 19.0548 11.7881C19.8314 13.6713 19.4845 15.9344 17.9394 17.4882C16.3943 19.042 14.2444 19.3828 12.2794 18.6067L10.1328 19.6062C13.2117 21.7225 16.9504 21.1991 19.2867 18.848C21.1398 16.9844 21.7138 14.4441 21.1771 12.1534L21.182 12.1582C20.4037 8.793 21.3733 7.44786 23.3594 4.69728C23.4064 4.63207 23.4535 4.56685 23.5004 4.5L20.8869 7.12829V7.12014L11.8368 16.2621'
        fill='#0A0A0A'
      />
      <path
        d='M10.5345 17.4005C8.32464 15.2777 8.70564 11.9923 10.5912 10.0977C11.9855 8.69552 14.27 8.12323 16.2642 8.96454L18.4059 7.96997C18.02 7.68954 17.5255 7.38789 16.9581 7.17594C14.3932 6.11451 11.3224 6.64277 9.23744 8.73791C7.23188 10.7548 6.60121 13.8559 7.68423 16.5021C8.49327 18.4799 7.16703 19.8788 5.83109 21.2908C5.35767 21.7913 4.88263 22.2919 4.5 22.8218L10.5329 17.4022'
        fill='#0A0A0A'
      />
    </g>
    <defs>
      <clipPath id='clip0_14479_48094'>
        <rect
          width='19'
          height='19'
          fill='white'
          transform='translate(4.5 4.5)'
        />
      </clipPath>
    </defs>
  </svg>
);
