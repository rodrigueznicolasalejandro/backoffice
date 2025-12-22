type GridProps = {
  cols?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  gap?: string;
};
function Grid({
  cols = 12,
  children,
  style,
  gap = '1rem',
}: GridProps): React.JSX.Element {
  return (
    <div
      className={`grid w-full`} // Tailwind grid
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

type GridItemProps = {
  span?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};
function GridItem({
  span = 12,
  children,
  style,
}: GridItemProps): React.JSX.Element {
  return (
    <div
      style={{
        gridColumn: `span ${span}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export { Grid, GridItem };
