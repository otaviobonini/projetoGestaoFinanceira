export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md ${className}`}
    ></div>
  );
}
