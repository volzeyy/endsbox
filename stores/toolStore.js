import create from "zustand";

export const useToolStore = create((set) => ({
  selectedTool: null,
  setSelectedTool: (toolId) => set((state) => ({ selectedTool: toolId })),
}));
