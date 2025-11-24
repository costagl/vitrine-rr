// src/types/global.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
      vw?: string;
      'vw-access-button'?: string;
      'vw-plugin-wrapper'?: string;
    };
  }
}
