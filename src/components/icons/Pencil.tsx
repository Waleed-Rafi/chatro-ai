import { SVGProps } from 'react';

interface PencilProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const Pencil = ({
  size = 16,
  className = '',
  ...props
}: PencilProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 29 29'
    fill='none'
    className={className}
    {...props}
  >
    <path
      d='m13.9 20.786 7.396-7.396a10.289 10.289 0 0 1-3.326-2.234 10.29 10.29 0 0 1-2.235-3.327l-7.396 7.396c-.577.577-.866.866-1.114 1.184a6.556 6.556 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56.43-.205.836-.456 1.211-.749.318-.248.607-.537 1.184-1.114Zm9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887.038.111a8.753 8.753 0 0 0 2.092 3.32 8.753 8.753 0 0 0 3.431 2.13l.887-.887Z'
      fill='#C56363'
    />
  </svg>
);
