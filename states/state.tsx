import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * 全局語言類型：中文、英文、日文
 */
export type LangType = "zh" | "en" | "ja";

export interface LangStore {
    curLang: LangType;
    setLang: (lang: LangType) => void;
}

const langSlice: StateCreator<LangStore, [["zustand/persist", unknown]]> = (set) => ({
    curLang: "zh",
    setLang: (lang: LangType) => set({ curLang: lang }),
});

export const useLangStore = create<LangStore>()(
    persist(langSlice, {
        name: "curLang",
        storage: createJSONStorage(() => localStorage),
    })
);
