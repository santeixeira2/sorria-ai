export type AppColors = {
  bg: string;
  bgElevated: string;
  bgMuted: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentOnPrimary: string;
  accentSoft: string;
  accentSoftStrong: string;
  shadow: string;
  shadowDeep: string;
  success: string;
  successSoft: string;
  warning: string;
  warningSoft: string;
  danger: string;
  dangerSoft: string;
  gradientStart: string;
  gradientEnd: string;
  glassFill: string;
  glassBorder: string;
  glassHighlightFrom: string;
  glassHighlightTo: string;
  divider: string;
  modalOverlay: string;
  primaryButton: string;
  ghostButton: string;
};

export const lightColors: AppColors = {
  bg: '#F5F4F1',
  bgElevated: '#FFFFFF',
  bgMuted: 'rgba(255,255,255,0.72)',
  textPrimary: '#0C0C0C',
  textSecondary: '#5C5C5C',
  textMuted: '#8E8E8E',
  accent: '#0C0C0C',
  accentOnPrimary: '#FFFFFF',
  accentSoft: 'rgba(12,12,12,0.06)',
  accentSoftStrong: 'rgba(12,12,12,0.1)',
  shadow: 'rgba(12,12,12,0.08)',
  shadowDeep: 'rgba(12,12,12,0.14)',
  success: '#15803D',
  successSoft: 'rgba(21,128,61,0.1)',
  warning: '#A16207',
  warningSoft: 'rgba(161,98,7,0.1)',
  danger: '#B91C1C',
  dangerSoft: 'rgba(185,28,28,0.08)',
  gradientStart: '#F8F7F4',
  gradientEnd: '#EBEAE6',
  glassFill: 'rgba(255,255,255,0.92)',
  glassBorder: 'rgba(12,12,12,0.06)',
  glassHighlightFrom: 'rgba(255,255,255,0.55)',
  glassHighlightTo: 'transparent',
  divider: 'rgba(12,12,12,0.06)',
  modalOverlay: 'rgba(12,12,12,0.35)',
  primaryButton: '#0C0C0C',
  ghostButton: 'rgba(12,12,12,0.06)',
};

/** Titles/body use pure white; tab bar inactive uses opacity via separate usage */
export const darkColors: AppColors = {
  bg: '#0B0B0C',
  bgElevated: '#141416',
  bgMuted: 'rgba(255,255,255,0.06)',
  textPrimary: '#FFFFFF',
  textSecondary: '#FFFFFF',
  textMuted: '#FFFFFF',
  accent: '#FFFFFF',
  /** Primary CTA: solid white pill, label + icons in near-black */
  accentOnPrimary: '#0B0B0C',
  accentSoft: 'rgba(255,255,255,0.06)',
  accentSoftStrong: 'rgba(255,255,255,0.1)',
  shadow: 'rgba(0,0,0,0.5)',
  shadowDeep: 'rgba(0,0,0,0.65)',
  success: '#6EE7B7',
  successSoft: 'rgba(110,231,183,0.12)',
  warning: '#FCD34D',
  warningSoft: 'rgba(252,211,77,0.12)',
  danger: '#FCA5A5',
  dangerSoft: 'rgba(252,165,165,0.12)',
  gradientStart: '#0B0B0C',
  gradientEnd: '#12121A',
  glassFill: 'rgba(255,255,255,0.07)',
  glassBorder: 'rgba(255,255,255,0.08)',
  glassHighlightFrom: 'rgba(255,255,255,0.12)',
  glassHighlightTo: 'transparent',
  divider: 'rgba(255,255,255,0.05)',
  modalOverlay: 'rgba(0,0,0,0.55)',
  primaryButton: '#FFFFFF',
  ghostButton: 'rgba(255,255,255,0.06)',
};
