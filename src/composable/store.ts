let theme: string = '';
let isCustomDisplay: boolean = false;
let targetBoxSize: string = '';

function setTheme(newVal: string) {
  theme = newVal;
}

function getTheme() {
  return theme;
}

function setIsCustomDisplay(newVal: boolean) {
  isCustomDisplay = newVal;
}

function getIsCustomDisplay() {
  return isCustomDisplay;
}

function setTargetBoxSize(newVal: string) {
  targetBoxSize = newVal;
}

function getTargetBoxSize() {
  return targetBoxSize;
}

export function useStore() {
  return {
    setTheme,
    getTheme,
    setIsCustomDisplay,
    getIsCustomDisplay,
    setTargetBoxSize,
    getTargetBoxSize,
  };
}
