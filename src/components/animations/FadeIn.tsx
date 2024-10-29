const FadeIn = ({
  children,
  duration = 210,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={`animate-fade animate-duration-${duration} animate-delay-${delay}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default FadeIn;
