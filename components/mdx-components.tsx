// components/mdx-components.tsx
import React from "react";
import LiteVideo from "@/components/LiteVideo";

type VideoProps = {
  src: string;
  title?: string;
};

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const mdxComponents = {
  Video: ({ src, title }: VideoProps) => <LiteVideo src={src} title={title} />,
  a: (props: AnchorProps) => <a {...props} target="_blank" rel="noopener noreferrer" className="underline text-cyan-400" />,
};