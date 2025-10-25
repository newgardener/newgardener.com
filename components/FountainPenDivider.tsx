export function FountainPenDivider() {
  return (
    <div className="relative w-full h-6 flex items-center justify-center my-4">
      <svg
        width="100%"
        height="24"
        viewBox="0 0 800 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-40"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 12 Q 100 8, 200 12 T 400 12 T 600 12 T 800 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          style={{ color: 'var(--folder-line)' }}
        />
        {/* Ink bleed effect - small dots along the line */}
        <circle
          cx="150"
          cy="11"
          r="0.8"
          fill="currentColor"
          style={{ color: 'var(--folder-line)', opacity: 0.3 }}
        />
        <circle
          cx="320"
          cy="13"
          r="0.6"
          fill="currentColor"
          style={{ color: 'var(--folder-line)', opacity: 0.4 }}
        />
        <circle
          cx="480"
          cy="11.5"
          r="0.7"
          fill="currentColor"
          style={{ color: 'var(--folder-line)', opacity: 0.35 }}
        />
        <circle
          cx="650"
          cy="12.5"
          r="0.5"
          fill="currentColor"
          style={{ color: 'var(--folder-line)', opacity: 0.25 }}
        />
      </svg>
    </div>
  );
}
