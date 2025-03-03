import { useTheme, useMediaQuery } from "@mui/material";

const MOBILEBREAKPOINT = "sm";

export function useIsMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(MOBILEBREAKPOINT));
}
