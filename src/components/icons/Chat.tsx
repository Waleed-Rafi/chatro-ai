import { SVGProps } from 'react';

interface ChatProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const Chat = ({ size = 16, className = '', ...props }: ChatProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 18 18'
    fill='none'
    className={className}
    {...props}
  >
    <g id='vuesax/linear/message-text'>
      <g id='message-text'>
        <path
          id='Vector'
          d='M6.3789 14.249H6.0039C3.00391 14.249 1.50391 13.499 1.50391 9.74903V5.99902C1.50391 2.99902 3.00391 1.49902 6.0039 1.49902H12.0039C15.0039 1.49902 16.5039 2.99902 16.5039 5.99902V9.74903C16.5039 12.749 15.0039 14.249 12.0039 14.249H11.6289C11.3964 14.249 11.1714 14.3615 11.0289 14.549L9.9039 16.049C9.4089 16.709 8.5989 16.709 8.1039 16.049L6.9789 14.549C6.8589 14.384 6.5814 14.249 6.3789 14.249Z'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          id='Vector_2'
          d='M5.24609 5.99902H12.7461'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          id='Vector_3'
          d='M5.24609 9.75098H9.74609'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </g>
  </svg>
);
