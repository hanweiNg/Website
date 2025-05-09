import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="150"
      height="37.5"
      aria-label="VR Performance Dashboard Logo"
      {...props}
    >
      <rect width="200" height="50" fill="transparent" />
      <path d="M10 15 Q15 5, 20 15 T30 15 L30 35 L25 35 L25 20 L20 20 L20 35 L15 35 L15 20 L10 20 L10 35 L5 35 L5 15 Z" fill="currentColor" />
      <path d="M35 15 L35 35 L40 35 L40 25 L47 35 L52 35 L45 25 L52 15 L47 15 L42.5 22 L38 15 Z" fill="currentColor" />
      
      <text x="60" y="33" fontFamily="var(--font-geist-sans), Arial, sans-serif" fontSize="20" fontWeight="bold" fill="currentColor">
        Performance
      </text>
      <rect x="58" y="38" width="118" height="2" fill="hsl(var(--accent))" />
    </svg>
  );
}
