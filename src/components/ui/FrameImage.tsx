import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

type FrameImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

export function FrameImage({ src, alt = "", className = "", onLoad, onError, ...rest }: FrameImageProps) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) {
      if (img.naturalWidth > 0) {
        setReady(true);
        setFailed(false);
      } else {
        setFailed(true);
      }
      return;
    }
    setReady(false);
    setFailed(false);
  }, [src]);

  return (
    <span className={`frame-image ${ready ? "is-ready" : ""} ${failed ? "is-failed" : ""} ${className}`.trim()}>
      <span className="skeleton-shine" aria-hidden />
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        {...rest}
        onLoad={(event) => {
          setReady(true);
          setFailed(false);
          onLoad?.(event);
        }}
        onError={(event) => {
          setFailed(true);
          onError?.(event);
        }}
      />
    </span>
  );
}
