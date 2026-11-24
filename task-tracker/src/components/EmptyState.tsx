interface EmptyStateProps {
  title: string;
  hint?: string;
}

export default function EmptyState({
  title,
  hint,
}: EmptyStateProps) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px",
      }}
    >
      <h2>{title}</h2>

      {hint && (
        <p
          style={{
            marginTop: 10,
            color: "#666",
          }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}