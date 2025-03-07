import { useMemo } from "react";

export const TAG_COLORS: Record<string, string> = {
  personal: "bg-violet-200",
  work: "bg-amber-200",
  important: "bg-red-200",
  idea: "bg-emerald-200",
  study: "bg-indigo-200",
};

const useTagColor = (tag: string) => {
  return useMemo(() => TAG_COLORS[tag] || "", [tag]);
};

export default useTagColor;
