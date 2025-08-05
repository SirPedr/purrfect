export const Spinner = () => {
  return (
    <div className="flex items-center justify-center" data-testid="spinner">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};