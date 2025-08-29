// Typography definitions
export const typography = {
  // Font Families
  fontFamily: {
    regular: 'System',
    bold: 'System',
    light: 'System',
  },
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  // Font Weights
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

export type Typography = typeof typography;