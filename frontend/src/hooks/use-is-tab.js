import { useTheme, useMediaQuery } from "@mui/material";

const MOBILEBREAKPOINT = "md";

export function useIsTab() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(MOBILEBREAKPOINT));
}
