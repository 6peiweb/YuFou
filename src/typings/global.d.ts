declare interface Window {
  ILib: lp.ILib;
  IMint: lp.IMint;
  IClipboard: (method: string, content: string) => void;
}
