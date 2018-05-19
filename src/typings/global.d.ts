declare interface Window {
  ILib: lp.ILib;
  ISocket: any;
  IMint: lp.IMint;
  IClipboard: (method: string, content: string) => void;
}
