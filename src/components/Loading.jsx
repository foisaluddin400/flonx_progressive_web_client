// components/ui/loading/PageLoader.tsx
import { Loader2 } from "lucide-react";

export const PageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <Loader2 className="w-8 h-8 animate-spin mb-3" />
      <p className="text-sm">Loading orders...</p>
    </div>
  );
};