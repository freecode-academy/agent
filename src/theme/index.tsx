const breakpoints = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1920,
}

const colors = {
  // Primary accent (AI / action)
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  primarySoft: 'rgba(37, 99, 235, 0.08)',

  // Secondary accent (lab / R&D)
  violet: '#7C3AED',
  violetSoft: 'rgba(124, 58, 237, 0.08)',

  // Legacy compatibility
  secondary: '#475569',
  foreground: '#0F172A',
  background: '#FFFFFF',
  muted: '#94A3B8',

  // States
  success: '#10B981',
  successBg: 'rgba(16, 185, 129, 0.1)',
  error: '#EF4444',
  errorBg: 'rgba(239, 68, 68, 0.1)',
  warning: '#F59E0B',
  warningBg: 'rgba(245, 158, 11, 0.1)',
  info: '#2563EB',
  infoBg: 'rgba(37, 99, 235, 0.08)',

  // Text
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    muted: '#94A3B8',
    disabled: '#CBD5E1',
    light: '#ffffff',
  },
  textMuted: '#94A3B8',

  // Borders and dividers
  divider: '#E2E8F0',
  border: '#E2E8F0',
  borderHover: '#CBD5E1',

  // Special
  star: '#F59E0B',
  starEmpty: '#E2E8F0',

  // Gray scale (light theme)
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
} as const

const backgrounds = {
  page: '#FFFFFF',
  surface: '#F8FAFC',
  paper: '#FFFFFF',
  elevated: '#FFFFFF',
  overlay: 'rgba(15, 23, 42, 0.5)',
}

const gradients = {
  ai: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
  aiSubtle:
    'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
  text: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
  hero: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
}

const fonts = {
  heading:
    "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
}

const typography = {
  h1: {
    fontSize: '56px',
    fontSizeMobile: '36px',
    fontWeight: 600,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: '40px',
    fontSizeMobile: '28px',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: '24px',
    fontSizeMobile: '20px',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  body: {
    fontSize: '16px',
    lineHeight: 1.6,
  },
  bodyLarge: {
    fontSize: '18px',
    lineHeight: 1.6,
  },
  small: {
    fontSize: '14px',
    lineHeight: 1.5,
  },
}

export const theme = {
  colors,
  backgrounds,
  gradients,
  fonts,
  typography,
  breakpoints,

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },

  radii: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 40px rgba(0, 0, 0, 0.1)',
    focus: '0 0 0 3px rgba(37, 99, 235, 0.15)',
    card: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    cardHover: '0 10px 40px rgba(0, 0, 0, 0.12)',
    button: '0 4px 14px rgba(37, 99, 235, 0.25)',
    buttonHover: '0 6px 20px rgba(37, 99, 235, 0.35)',
  },

  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
  },

  zIndex: {
    dropdown: 100,
    sticky: 200,
    header: 300,
    overlay: 400,
    modal: 1000,
    popover: 1100,
    tooltip: 1200,
  },

  // Custom
  bg: '#FBFAF6',
  surface: '#FFFFFF',
  ink: '#0E0F12',
  ink2: '#3B3D44',
  muted: '#6B6F78',
  line: '#E8E5DC',
  accent: '#1F2937',
  brand: '#FF5B2E',
  brandSoft: '#FFE4D6',
  blue: '#3D6BFF',
  green: '#2EAE6B',
  amber: '#E8A53A',
  cream: '#F4EFE3',
  radius: '18px',
  maxw: '1200px',
  font: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`,
  serif: `"Fraunces", "Times New Roman", Georgia, serif`,
} as const

export type Theme = typeof theme

export type ThemeProps = { theme?: Theme }
