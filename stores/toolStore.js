import create from "zustand";

export const useToolStore = create((set) => ({
  selectedTool: "pan",
  setSelectedTool: (toolId) => set((state) => ({ selectedTool: toolId })),
}));
