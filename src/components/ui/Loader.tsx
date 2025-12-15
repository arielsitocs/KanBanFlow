export default function Loader({ state, setState }: { state: boolean, setState: (state: boolean) => void }) {
  return state ? (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-main"></div>
    </div>
  ) : null;
}