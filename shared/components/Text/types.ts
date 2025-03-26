export type TextVariant =
  | "h1xl"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "md"
  | "sm"
  | "xs";

export interface VariantTextStyle {
  fontSize: string | number;
  fontWeight: string | number;
}

export const VARIANT_STYLES: Record<TextVariant, VariantTextStyle> = {
  h1xl: {
    fontSize: "6.25rem", // 100px
    fontWeight: 700,
  },
  h1: {
    fontSize: "2.25rem", // 36px
    fontWeight: 700,
  },
  h2: {
    fontSize: "2rem", // 32px
    fontWeight: 500,
  },
  h3: {
    fontSize: "1.75rem", // 28px
    fontWeight: 700,
  },
  h4: {
    fontSize: "1.5rem", // 24px
    fontWeight: 700,
  },
  h5: {
    fontSize: "1.375rem", // 22px
    fontWeight: 500,
  },
  md: {
    fontSize: "1rem", // 16px
    fontWeight: 400,
  },
  sm: {
    fontSize: "0.875rem", // 14px
    fontWeight: 400,
  },
  xs: {
    fontSize: "0.75rem", // 12px
    fontWeight: 400,
  },
};

export interface TextProps {
  $v?: TextVariant;
  $color?: string;
  $fw?: string | number;
  $ta?: "left" | "center" | "right" | "justify";
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
