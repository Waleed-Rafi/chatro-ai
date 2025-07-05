import { SVGProps } from 'react';

interface SupportProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const Support = ({
  size = 16,
  className = '',
  ...props
}: SupportProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 18 18'
    fill='none'
    className={className}
    {...props}
  >
    <g id='message-circle'>
      <path
        id='Vector'
        d='M2.25 15.7497L3.675 11.4747C2.99785 10.1208 2.82459 8.57009 3.18623 7.10011C3.54787 5.63013 4.4208 4.33681 5.64882 3.4516C6.87683 2.56639 8.37978 2.14706 9.8887 2.26865C11.3976 2.39025 12.814 3.04483 13.8844 4.11525C14.9549 5.18568 15.6095 6.60208 15.731 8.111C15.8526 9.61992 15.4333 11.1229 14.5481 12.3509C13.6629 13.5789 12.3696 14.4518 10.8996 14.8135C9.42961 15.1751 7.87891 15.0019 6.525 14.3247L2.25 15.7497Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  </svg>
);
