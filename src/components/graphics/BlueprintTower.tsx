/**
 * Blueprint high-rise for the stats scene. Everything is 1.5px strokes on a
 * faint drafting grid; the GSAP scene draws each `.bp` stroke, sweeps the
 * `.bp-scan` line up the tower, then pops the `.bp-win` window lights.
 */
export function BlueprintTower({ className }: { className?: string }) {
  const floors = Array.from({ length: 11 }, (_, i) => 208 + i * 28);
  const upperFloors = [128, 156];
  const winRows = [236, 292, 348, 404, 460];
  const winCols = [120, 160, 200, 240];

  return (
    <svg viewBox="0 0 360 560" className={className} aria-hidden>
      <defs>
        <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#2DD4BF"
            strokeOpacity="0.05"
            strokeWidth="1"
          />
        </pattern>
        <linearGradient id="bp-scan-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0" />
          <stop offset="50%" stopColor="#34D399" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="bp-base-glow" cx="0.5" cy="1" r="0.7">
          <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="360" height="560" fill="url(#bp-grid)" />

      <g
        fill="none"
        stroke="#2DD4BF"
        strokeOpacity="0.65"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        {/* ground */}
        <path className="bp" d="M 40 520 H 320" strokeWidth="2" />
        {/* base tower outline */}
        <path className="bp" d="M 100 520 V 180 H 260 V 520" />
        {/* upper setback */}
        <path className="bp" d="M 130 180 V 100 H 230 V 180" />
        {/* antenna */}
        <path className="bp" d="M 180 100 V 56" />
        <path className="bp" d="M 172 72 H 188" />
        {/* crane */}
        <path className="bp" d="M 140 100 V 66 M 92 74 H 214 M 102 74 V 96 M 102 96 h 8" />
        {/* floor plates, bottom-to-top draw order */}
        {[...floors].reverse().map((y) => (
          <path key={y} className="bp bp-floor" d={`M 100 ${y} H 260`} strokeOpacity="0.35" />
        ))}
        {upperFloors.map((y) => (
          <path key={y} className="bp bp-floor" d={`M 130 ${y} H 230`} strokeOpacity="0.35" />
        ))}
        {/* mullions */}
        <path
          className="bp"
          d="M 140 208 V 520 M 180 180 V 520 M 220 208 V 520"
          strokeOpacity="0.25"
        />
        <path className="bp" d="M 180 100 V 180" strokeOpacity="0.25" />
        {/* entrance */}
        <path className="bp" d="M 164 520 V 488 H 196 V 520" />
      </g>

      {/* window lights — popped in by GSAP */}
      <g className="bp-wins">
        {winRows.map((y) =>
          winCols.map((x) => (
            <circle
              key={`${x}-${y}`}
              className="bp-win"
              cx={x}
              cy={y}
              r="2.4"
              fill="#34D399"
              opacity="0"
            />
          ))
        )}
        <circle className="bp-win" cx={160} cy={140} r="2.4" fill="#34D399" opacity="0" />
        <circle className="bp-win" cx={200} cy={140} r="2.4" fill="#34D399" opacity="0" />
      </g>

      {/* scan line, swept up the tower by the scene */}
      <rect
        className="bp-scan"
        x="88"
        y="514"
        width="184"
        height="3"
        fill="url(#bp-scan-grad)"
        opacity="0"
      />

      {/* base glow bloom, final beat of the timeline */}
      <ellipse
        className="bp-glow"
        cx="180"
        cy="522"
        rx="150"
        ry="34"
        fill="url(#bp-base-glow)"
        opacity="0"
      />
    </svg>
  );
}
