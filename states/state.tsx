import create from "zustand";

/**
 * 全局顯示/隱藏警告條
 */
type Micros = {
    warningBannerOpacity: "100" | "0",
};

type MicrosActions = {
    hideWarningBanner: () => void;
    showWarningBanner: () => void;
};

export const useMicroStore = create<Micros & MicrosActions>((set) => ({
    warningBannerOpacity: "100",
    hideWarningBanner: () => set((state) => ({ warningBannerOpacity: "0" })),
    showWarningBanner: () => set((state) => ({ warningBannerOpacity: "100" })),
}));


/**
 * 測試中：登錄狀態存儲
 */
type LoginStates = {
    // token: string,
    club_num: string,
};

type LoginActions = {
    set_public: (club_num: LoginStates['club_num']) => void;
    remove_club_num: () => void;
}

export const useAuthStore = create<LoginStates & LoginActions>((set) => ({
    // token: '',
    club_num: '',
    set_public: (club_num) => set((state) => ({ club_num: club_num })),
    remove_club_num: () => set((state) => ({ club_num: '' })),
}));