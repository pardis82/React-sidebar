import type { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
}

export default function SimpleTooltip({ children, content }: TooltipProps) {
  return (
    <div className="relative group">
      <button className="bg-orange-600  rounded-lg p-5">Hover me</button>

      <div className="bg-gray-900 text-white text-sm absolute top-1/2 transform -translate-x-1/2 top-full mt-3 mr-2 px-3 py-2 opacity-0 shadow-lg group-hover:opacity-100 rounded-lg">
        {content}
      </div>
    </div>
  );
}
