declare function setTheme(newVal: string): void;
declare function getTheme(): string;
declare function setIsCustomDisplay(newVal: boolean): void;
declare function getIsCustomDisplay(): boolean;
declare function setTargetBoxSize(newVal: string): void;
declare function getTargetBoxSize(): string;
export declare function useStore(): {
    setTheme: typeof setTheme;
    getTheme: typeof getTheme;
    setIsCustomDisplay: typeof setIsCustomDisplay;
    getIsCustomDisplay: typeof getIsCustomDisplay;
    setTargetBoxSize: typeof setTargetBoxSize;
    getTargetBoxSize: typeof getTargetBoxSize;
};
export {};
