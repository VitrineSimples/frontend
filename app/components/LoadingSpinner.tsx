export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full w-full py-20">
      <div className="w-4 h-4 border-4 border-brand-100 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
