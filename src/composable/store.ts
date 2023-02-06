let theme: string = '';
let customDisplay: boolean = false;
let targetBoxSize: string = '';

function setTheme(newVal: string) {
  theme = newVal;
}

function getTheme() {
  return theme;
}

function setCustomDisplay(newVal: boolean) {
  customDisplay = newVal;
}

function isCustomDisplay() {
  return customDisplay;
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
    setCustomDisplay,
    isCustomDisplay,
    setTargetBoxSize,
    getTargetBoxSize,
  };
}
