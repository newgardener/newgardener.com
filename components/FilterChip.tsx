interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function FilterChip({ label, isSelected, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer transition-all duration-200 ${
        isSelected ? 'scale-110' : 'hover:scale-105'
      }`}
      type="button"
    >
      <span
        className="inline-block px-3 py-1 rounded-full text-xs transition-all"
        style={{
          backgroundColor: isSelected
            ? 'var(--folder-turquoise-dark)'
            : 'var(--folder-bg-light)',
          color: isSelected ? 'var(--folder-white)' : 'var(--folder-turquoise-dark)',
          border: isSelected
            ? '1px solid var(--folder-turquoise-dark)'
            : '1px solid var(--folder-border-light)',
          boxShadow: isSelected
            ? '0 2px 4px rgba(0, 0, 0, 0.15)'
            : '0 1px 2px rgba(0, 0, 0, 0.05)',
          fontWeight: isSelected ? 600 : 400,
        }}
      >
        {label}
      </span>
    </button>
  );
}
