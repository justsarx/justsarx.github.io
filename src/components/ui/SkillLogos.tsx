import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const CppLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M117.48 40.73L67.65 11.96a7.25 7.25 0 0 0-7.29 0L10.53 40.73a7.25 7.25 0 0 0-3.65 6.29v57.55a7.25 7.25 0 0 0 3.65 6.29l49.83 28.77a7.25 7.25 0 0 0 7.29 0l49.83-28.77a7.25 7.25 0 0 0 3.65-6.29V47.02a7.25 7.25 0 0 0-3.65-6.29z" fill="#00599C"/>
    <path d="M64 20.3L22.18 44.45v48.3L64 116.9l41.82-24.15v-48.3L64 20.3z" fill="#004482"/>
    <path d="M64.08 34.02c-16.58 0-30.07 13.48-30.07 30.07s13.48 30.07 30.07 30.07c11.83 0 22.09-6.84 26.98-16.73h-14.8c-3.15 4.19-8.19 6.88-13.84 6.88-9.69 0-17.58-7.89-17.58-17.58 0-9.69 7.89-17.58 17.58-17.58 5.65 0 10.69 2.69 13.84 6.88h14.8c-4.89-9.89-15.15-16.73-26.98-16.73z" fill="#fff"/>
    <path d="M91.89 57.06h5.81v-5.81h3.87v5.81h5.81v3.87h-5.81v5.81h-3.87v-5.81h-5.81v-3.87zm16.45 13.55h5.81v-5.81h3.87v5.81h5.81v3.87h-5.81v5.81h-3.87v-5.81h-5.81v-3.87z" fill="#659AD2"/>
  </svg>
);

export const LinuxLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M64 4c-19.8 0-29.6 14.7-29.6 34.3 0 9.8 3.2 24.2 6.5 32.7-5.5 5.5-12.7 14.8-12.7 26.3 0 17 14.3 26.7 35.8 26.7s35.8-9.7 35.8-26.7c0-11.5-7.2-20.8-12.7-26.3 3.3-8.5 6.5-22.9 6.5-32.7C93.6 18.7 83.8 4 64 4z" fill="#F0C000"/>
    <path d="M64 8c-17 0-25.5 13-25.5 30.3 0 9.2 2.8 22.8 5.7 30.8-4.8 4.8-11.2 13.1-11.2 23.2 0 15 12.6 23.7 31 23.7s31-8.7 31-23.7c0-10.1-6.4-18.4-11.2-23.2 2.9-8 5.7-21.6 5.7-30.8C89.5 21 81 8 64 8z" fill="#222"/>
    <ellipse cx="53" cy="38" rx="6" ry="9" fill="#fff"/>
    <ellipse cx="75" cy="38" rx="6" ry="9" fill="#fff"/>
    <circle cx="55" cy="38" r="3.5" fill="#000"/>
    <circle cx="73" cy="38" r="3.5" fill="#000"/>
    <path d="M64 45c-6 0-11 3.5-11 7.8 0 4.3 5 11.2 11 11.2s11-6.9 11-11.2c0-4.3-5-7.8-11-7.8z" fill="#FFA500"/>
    <ellipse cx="64" cy="88" rx="20" ry="24" fill="#fff"/>
  </svg>
);

export const AndroidLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M37.5 45.8c-1.8 0-3.3-1.5-3.3-3.3v-15c0-1.8 1.5-3.3 3.3-3.3s3.3 1.5 3.3 3.3v15c0 1.8-1.5 3.3-3.3 3.3zm53 0c-1.8 0-3.3-1.5-3.3-3.3v-15c0-1.8 1.5-3.3 3.3-3.3s3.3 1.5 3.3 3.3v15c0 1.8-1.5 3.3-3.3 3.3z" fill="#3DDC84"/>
    <path d="M23.5 54.2h81a40.5 40.5 0 0 0-81 0z" fill="#3DDC84"/>
    <circle cx="45.5" cy="38.5" r="4.5" fill="#fff"/>
    <circle cx="82.5" cy="38.5" r="4.5" fill="#fff"/>
    <rect x="23.5" y="60.5" width="81" height="48" rx="8" fill="#3DDC84"/>
    <rect x="10.5" y="60.5" width="8" height="38" rx="4" fill="#3DDC84"/>
    <rect x="109.5" y="60.5" width="8" height="38" rx="4" fill="#3DDC84"/>
    <rect x="41.5" y="108.5" width="9" height="15" rx="4.5" fill="#3DDC84"/>
    <rect x="77.5" y="108.5" width="9" height="15" rx="4.5" fill="#3DDC84"/>
  </svg>
);

export const GitLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M123.67 55.43L72.57 4.33a12.06 12.06 0 0 0-17.06 0l-10.4 10.4 21.6 21.6a14.33 14.33 0 0 1 18.17 18.23l20.82 20.82a14.34 14.34 0 0 1 17.97 17.15 14.33 14.33 0 0 1-17.15-17.97L86.13 54.19v31.42a14.33 14.33 0 1 1-8.59-3.05V51.71a14.31 14.31 0 0 1-7.85-18.82L48.25 11.45 4.33 55.37a12.06 12.06 0 0 0 0 17.06l51.1 51.1a12.06 12.06 0 0 0 17.06 0l51.18-51.04a12.06 12.06 0 0 0 0-17.06z" fill="#F05032"/>
  </svg>
);

export const PythonLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M63.59 4c-16.14 0-29.07 2.1-29.07 14.54v11.1h29.58v4.18H20.73C8.28 33.82 0 43.7 0 60.15c0 16.46 8.94 25.33 21.39 25.33h7.24v-12.8c0-12.44 11.55-21.72 24-21.72h29.55V33.82H63.6v-2.09c0-8.28 6.72-15 15-15h20.69C99.29 7.74 86.86 4 63.59 4zm-11.1 9.42a4.18 4.18 0 1 1 0 8.36 4.18 4.18 0 0 1 0-8.36z" fill="#3776AB"/>
    <path d="M64.41 124c16.14 0 29.07-2.1 29.07-14.54V98.36H63.9v-4.18h43.37c12.45 0 20.73-9.88 20.73-26.33 0-16.46-8.94-25.33-21.39-25.33h-7.24v12.8c0 12.44-11.55 21.72-24 21.72H45.82v17.14h38.38v2.09c0 8.28-6.72 15-15 15H48.51c0 8.99 12.43 12.73 35.7 12.73zm11.1-9.42a4.18 4.18 0 1 1 0-8.36 4.18 4.18 0 0 1 0 8.36z" fill="#FFD43B"/>
  </svg>
);

export const DjangoLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="28" fill="#092E20"/>
    <path d="M59.3 22h14.8v56.7c-4.4 1-8.4 1.5-12 1.5-16.7 0-25.4-8.5-25.4-23.7 0-16 9.8-25.5 25.3-25.5 3 0 5.6.3 7.3 1V22zm0 21.4c-1.5-.5-3.3-.8-5.3-.8-8.7 0-13.8 5-13.8 14.5 0 8.8 4.7 13.9 12.8 13.9 2.2 0 4.3-.4 6.3-1.1V43.4zm23.2-14.7h14.8v57.8c-3.8 5.6-7.8 8.8-12.8 10.9-4.8 2-11.2 3.1-18.7 3.1-4.8 0-9.8-.7-14.5-2.2v-11.4c3.8 1.4 8.5 2.1 12.9 2.1 6.5 0 11.2-1.7 14.3-5.2 2.3-2.6 3.7-6.7 4-13.4V28.7z" fill="#fff"/>
  </svg>
);

export const TypeScriptLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="20" fill="#3178C6"/>
    <path d="M72.2 81.3c2.7 4.7 7.2 7.7 13.6 7.7 5.7 0 9.7-2.6 9.7-6.6 0-4.3-3.6-5.9-10.4-8.7-10.8-4.4-15.6-9.8-15.6-18.7 0-11 9.4-18.9 23.5-18.9 9.8 0 17 3.8 21.7 11.5l-9.1 5.8c-2.3-4.1-5.7-6.2-11.4-6.2-5.4 0-8.8 2.6-8.8 5.8 0 3.7 2.8 5.1 9.3 7.7 12 4.9 16.7 10.2 16.7 19.8 0 12.7-10.3 19.8-24.8 19.8-12.7 0-21.7-5.1-26.6-13.7l12.2-5.3zM20 46h39.7v10.8H45.7v49.8H34V56.8H20V46z" fill="#fff"/>
  </svg>
);

export const ReactLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="11" fill="#61DAFB"/>
    <ellipse cx="64" cy="64" rx="48" ry="18" stroke="#61DAFB" strokeWidth="5" transform="rotate(30 64 64)"/>
    <ellipse cx="64" cy="64" rx="48" ry="18" stroke="#61DAFB" strokeWidth="5" transform="rotate(90 64 64)"/>
    <ellipse cx="64" cy="64" rx="48" ry="18" stroke="#61DAFB" strokeWidth="5" transform="rotate(150 64 64)"/>
  </svg>
);

export const WebGPULogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="24" fill="#1C1F26"/>
    <path d="M64 20L102.97 42.5V87.5L64 110L25.03 87.5V42.5L64 20Z" stroke="#00E599" strokeWidth="6" strokeLinejoin="round"/>
    <path d="M64 42L83.49 53.25V75.75L64 87L44.51 75.75V53.25L64 42Z" fill="#00E599" fillOpacity="0.25" stroke="#00E599" strokeWidth="4"/>
    <circle cx="64" cy="64.5" r="8" fill="#00E599"/>
  </svg>
);

export const DockerLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M120.2 56.4c-2.4-.8-9.8-1.5-14.8 2.2-3.8-3.4-9.3-4.2-14.7-2.6l-.7-2.2H76.7v10.5h16.2c.4 1.5 1.1 2.8 2.2 3.9 3.5 3.5 9.4 3.7 13.2 3.4 8.7-.7 13.9-6.3 14.8-7.3 1.1-1.3 3.6-5.5-2.9-7.9zM22.9 66.8h11.9v10.5H22.9V66.8zm14.7 0h11.9v10.5H37.6V66.8zm14.7 0h11.9v10.5H52.3V66.8zm14.7 0h11.9v10.5H67V66.8zm-29.4-13h11.9v10.5H37.6V53.8zm14.7 0h11.9v10.5H52.3V53.8zm14.7 0h11.9v10.5H67V53.8zm-14.7-13h11.9v10.5H52.3V40.8z" fill="#2496ED"/>
    <path d="M117.8 69.3c-2.8 11.2-12.7 19.3-25.5 22.3-20.9 4.9-46.3 4.2-64.8-8.2-7.8-5.2-13.4-13.1-14.4-22.6-1.5 0-3.3.4-4.8 1.1-2.9 1.4-4.7 3.9-5.3 7 1.5 14.8 13.5 26.6 28.5 28.5 24.3 3.1 50.8.6 71.4-13.7 6.7-4.7 12.3-10.9 14.9-14.4z" fill="#2496ED"/>
  </svg>
);

export const MySqlLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M64.7 20c-18.7 0-34.9 10.8-43.1 26.6 9.4-4.7 20.3-7.5 31.8-7.5 32 0 58.7 21 66.8 50 1.2-4.8 1.8-9.8 1.8-15 0-30-25.6-54.1-57.3-54.1z" fill="#00758F"/>
    <path d="M21.6 46.6C12.7 54.3 7 65.5 7 78.1c0 23.3 19.3 42.6 44.5 45.4-8.8-11.2-14.2-25.4-14.2-40.8 0-13 3.8-25.1 10.3-35.3-8.8-.7-17.7-.8-26-.8z" fill="#F29111"/>
  </svg>
);

export const LeetCodeLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M85.3 93.8c-2.4 2.4-5.6 3.7-8.9 3.7H38.7c-7 0-12.6-5.6-12.6-12.6V43.1c0-7 5.6-12.6 12.6-12.6h37.7c3.4 0 6.5 1.3 8.9 3.7 4.9 4.9 4.9 12.9 0 17.8L61.6 75.7c-4.9 4.9-4.9 12.9 0 17.8 4.9 5 12.9 5 17.8 0l5.9-5.9c3.3-3.3 8.6-3.3 11.9 0 3.3 3.3 3.3 8.6 0 11.9l-11.9 11.9-0.001-7.6z" fill="#FFA116"/>
    <path d="M96.7 64c0-4.6-3.8-8.4-8.4-8.4H47.1c-4.6 0-8.4 3.8-8.4 8.4s3.8 8.4 8.4 8.4h41.2c4.6 0 8.4-3.8 8.4-8.4z" fill="#B3B3B3"/>
  </svg>
);

export const CodeChefLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="28" fill="#5B4638"/>
    <path d="M64 24c-16.6 0-30 13.4-30 30 0 5.2 1.3 10.1 3.6 14.4-6.8 4.6-11.6 12.3-11.6 21.6 0 14.4 11.6 26 26 26h24c14.4 0 26-11.6 26-26 0-9.3-4.8-17-11.6-21.6 2.3-4.3 3.6-9.2 3.6-14.4 0-16.6-13.4-30-30-30z" fill="#fff"/>
    <circle cx="50" cy="56" r="6" fill="#5B4638"/>
    <circle cx="78" cy="56" r="6" fill="#5B4638"/>
    <path d="M50 76c4 4 24 4 28 0" stroke="#5B4638" strokeWidth="5" strokeLinecap="round"/>
  </svg>
);

export const AtCoderLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="28" fill="#231815"/>
    <path d="M64 22L100 43V85L64 106L28 85V43L64 22Z" stroke="#00AEF0" strokeWidth="8" strokeLinejoin="round"/>
    <path d="M64 42L82 52.5V73.5L64 84L46 73.5V52.5L64 42Z" fill="#00AEF0"/>
  </svg>
);

export const LinkedInLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="28" fill="#0A66C2"/>
    <path d="M37.5 48.5H23.5V99.5H37.5V48.5ZM30.5 28.5C26 28.5 22.5 32 22.5 36.5C22.5 41 26 44.5 30.5 44.5C35 44.5 38.5 41 38.5 36.5C38.5 32 35 28.5 30.5 28.5ZM104.5 73C104.5 60 97.5 53.5 87.5 53.5C79.5 53.5 76 58 74 61V48.5H60V99.5H74V74.5C74 68 75.5 61.5 83.5 61.5C91.5 61.5 91.5 69 91.5 75V99.5H105.5L104.5 73Z" fill="#fff"/>
  </svg>
);

export const GitHubLogo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M64 8C33.1 8 8 33.1 8 64c0 24.7 16 45.7 38.2 53.1 2.8.5 3.8-1.2 3.8-2.7 0-1.3-.1-5.7-.1-10.4-15.6 3.4-18.9-6.6-18.9-6.6-2.5-6.5-6.2-8.2-6.2-8.2-5.1-3.5.4-3.4.4-3.4 5.6.4 8.6 5.8 8.6 5.8 5 8.6 13.1 6.1 16.3 4.7.5-3.6 2-6.1 3.6-7.5-12.4-1.4-25.5-6.2-25.5-27.7 0-6.1 2.2-11.1 5.7-15-0.6-1.4-2.5-7.1.5-14.8 0 0 4.7-1.5 15.4 5.7 4.5-1.3 9.3-1.9 14.1-1.9 4.8 0 9.6.6 14.1 1.9 10.7-7.3 15.4-5.7 15.4-5.7 3 7.7 1.1 13.4.6 14.8 3.6 3.9 5.7 8.9 5.7 15 0 21.6-13.1 26.3-25.6 27.6 2 1.7 3.9 5.2 3.9 10.5 0 7.6-.1 13.7-.1 15.6 0 1.5 1 3.3 3.9 2.7C104 109.7 120 88.7 120 64c0-30.9-25.1-56-56-56z" fill="currentColor"/>
  </svg>
);
