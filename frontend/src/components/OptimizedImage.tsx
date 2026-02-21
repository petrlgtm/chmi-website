import { useState, useRef, useEffect } from "react";

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
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div
      className="opt-img-wrap"
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!loaded && <div className="skeleton opt-img-skeleton" />}
      <img
        ref={imgRef}
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
        {...props}
      />
    </div>
  );
}
