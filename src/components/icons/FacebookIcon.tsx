import { SVGProps } from 'react';

interface FacebookIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const FacebookIcon = ({
  size = 18,
  className = '',
  ...props
}: FacebookIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 320 512'
    className={className}
    {...props}
  >
    <path
      fill='currentColor'
      d='M248 0h-88c-83.8 0-152 68.2-152 152v72H0v96h40v224h120V320h88l24-96h-112v-64c0-23.6 19.4-43 43-43h69V0z'
    />
  </svg>
);
