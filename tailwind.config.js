/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-focus": "var(--color-primary-focus)",
        "primary-on-dark": "var(--color-primary-on-dark)",
        ink: "var(--color-ink)",
        "ink-muted": "var(--color-ink-muted)",
        "ink-muted-48": "var(--color-ink-muted-48)",
        body: "var(--color-body)",
        "body-on-dark": "var(--color-body-on-dark)",
        "body-muted": "var(--color-body-muted)",
        hairline: "var(--color-hairline)",
        "divider-soft": "var(--color-divider-soft)",
        canvas: "var(--color-canvas)",
        parchment: "var(--color-canvas-parchment)",
        pearl: "var(--color-surface-pearl)",
        "tile-1": "var(--color-surface-tile-1)",
        "tile-2": "var(--color-surface-tile-2)",
        "tile-3": "var(--color-surface-tile-3)",
        black: "var(--color-surface-black)",
        "chip-translucent": "var(--color-surface-chip-translucent)",
      },
      fontFamily: {
        display: ["SF Pro Display", "system-ui", "-apple-system", "sans-serif"],
        text: ["SF Pro Text", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
        xs: "5px",
        sm: "8px",
        md: "11px",
        lg: "18px",
        pill: "9999px",
        full: "9999px",
      },
      boxShadow: {
        product: "0 5px 30px 3px rgba(0, 0, 0, 0.22)",
        hairline: "0 0 0 1px rgba(0, 0, 0, 0.08)",
      },
      letterSpacing: {
        tightish: "-0.012em",
      },
    },
  },
  plugins: [],
};
