// components/mdx-components.tsx
import React from "react";
import LiteVideo from "@/components/LiteVideo";

export const mdxComponents = {
  Video: ({ src, title }: any) => <LiteVideo src={src} title={title} />,
  a: (props: any) => <a {...props} target="_blank" rel="noopener noreferrer" className="underline text-cyan-400" />,
};
