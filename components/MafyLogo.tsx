export function MafyLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer atom glow ring */}
      <circle cx="22" cy="22" r="21" stroke="#4361ee" strokeWidth="0.5" opacity="0.4" />
      {/* Atom orbits */}
      <ellipse cx="22" cy="22" rx="19" ry="7" stroke="#00c2ff" strokeWidth="1.2" opacity="0.7" />
      <ellipse cx="22" cy="22" rx="19" ry="7" stroke="#4361ee" strokeWidth="1.2" opacity="0.7" transform="rotate(60 22 22)" />
      <ellipse cx="22" cy="22" rx="19" ry="7" stroke="#4361ee" strokeWidth="1.2" opacity="0.7" transform="rotate(120 22 22)" />
      {/* Nucleus */}
      <circle cx="22" cy="22" r="4" fill="#00c2ff" opacity="0.9" />
      <circle cx="22" cy="22" r="6" fill="#00c2ff" opacity="0.2" />
      {/* Electrons */}
      <circle cx="41" cy="22" r="2.5" fill="white" />
      <circle cx="12" cy="28" r="2.5" fill="white" />
      <circle cx="32" cy="10" r="2.5" fill="white" />
    </svg>
  );
}
