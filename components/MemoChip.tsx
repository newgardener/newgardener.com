interface MemoChipProps {
  label: string;
}

export function MemoChip({ label }: MemoChipProps) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs transition-all"
      style={{
        backgroundColor: 'var(--folder-bg-light)',
        color: 'var(--folder-turquoise-dark)',
        border: '1px solid var(--folder-border-light)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      {label}
    </span>
  );
}
