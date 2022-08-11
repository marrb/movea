import { useMemo } from "react";

export const isTouchDevice = () =>
  useMemo(() => window.matchMedia("(pointer: coarse)").matches, []);
