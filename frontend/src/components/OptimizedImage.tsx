import { useState, useRef } from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: string;
}

export default function OptimizedImage({
  aspectRatio,
  className = "",
  style,
  onLoad,
  loading = "lazy",
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div
      className="opt-img-wrap"
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!loaded && !errored && <div className="skeleton opt-img-skeleton" />}
      <img
        ref={(node) => {
          (imgRef as React.MutableRefObject<HTMLImageElement | null>).current = node;
          if (node?.complete && node.naturalWidth > 0) {
            setLoaded(true);
          }
        }}
        className={className}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
          ...style,
        }}
        loading={loading}
        decoding={loading === "lazy" ? "async" : "auto"}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={() => {
          setErrored(true);
          setLoaded(true);
        }}
        {...props}
      />
    </div>
  );
}
