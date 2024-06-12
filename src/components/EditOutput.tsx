"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Skeleton from "./skeleton";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false, loading: () => <Skeleton /> }
);

interface EditorOutputProps {
  content: any;
}
const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      style={style}
      className="text-sm"
      renderers={renderers}
      data={content}
    />
  );
};

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[200px] my-3 flex justify-center items-center">
      <Image
        alt="image"
        className="object-cover rounded-md"
        src={src}
        width={600}
        height={300}
      />
    </div>
  );
}

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className="bg-gray-800 rounded-md p-4">
      <code className="text-gray-100 text-sm">{data.code}</code>
    </pre>
  );
}

export default EditorOutput;
