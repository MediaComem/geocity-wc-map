declare function setTheme(newVal: string): void;
declare function getTheme(): string;
declare function setCustomDisplay(newVal: boolean): void;
declare function isCustomDisplay(): boolean;
declare function setTargetBoxSize(newVal: string): void;
declare function getTargetBoxSize(): string;
export declare function useStore(): {
    setTheme: typeof setTheme;
    getTheme: typeof getTheme;
    setCustomDisplay: typeof setCustomDisplay;
    isCustomDisplay: typeof isCustomDisplay;
    setTargetBoxSize: typeof setTargetBoxSize;
    getTargetBoxSize: typeof getTargetBoxSize;
};
export {};
