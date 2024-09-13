interface ImageProp {
  img: string;
  className?: string;
}

export default function Image({ img, className }: ImageProp) {
  return <img src={img} className={`w-full ${className || ''}`} />;
}
