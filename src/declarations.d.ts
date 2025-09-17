// src/declarations.d.ts

declare module "modern-normalize";
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.css' {
  const content: { [className: string]: string };
  export default content;
}

// declarations.d.ts
interface ImportMetaEnv {
  readonly VITE_TMDB_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}