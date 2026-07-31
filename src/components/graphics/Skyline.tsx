/**
 * Three-layer code-built skyline for the hero. Each layer is its own SVG so
 * the client Hero can parallax them independently. Windows are generated
 * deterministically (no Math.random — SSR-stable) and a subset twinkles
 * via the global `.win` CSS animation.
 */

type Building = {
  x: number;
  w: number;
  h: number;
  round?: boolean;
  crane?: boolean;
};

const BASE = 480;

const BACK: Building[] = [
  { x: 20, w: 110, h: 330 },
  { x: 170, w: 90, h: 392 },
  { x: 295, w: 130, h: 300 },
  { x: 465, w: 100, h: 360 },
  { x: 610, w: 120, h: 424 },
  { x: 775, w: 95, h: 348 },
  { x: 905, w: 140, h: 392 },
  { x: 1085, w: 100, h: 318 },
  { x: 1215, w: 120, h: 404 },
  { x: 1360, w: 80, h: 342 },
];

const MID: Building[] = [
  { x: 0, w: 100, h: 242 },
  { x: 118, w: 82, h: 290 },
  { x: 228, w: 110, h: 222 },
  { x: 358, w: 92, h: 320 },
  { x: 478, w: 130, h: 262 },
  { x: 636, w: 100, h: 302 },
  { x: 764, w: 122, h: 232 },
  { x: 914, w: 92, h: 312 },
  { x: 1034, w: 112, h: 262 },
  { x: 1174, w: 96, h: 332 },
  { x: 1296, w: 144, h: 252 },
];

const FRONT: Building[] = [
  { x: 0, w: 120, h: 200 },
  { x: 136, w: 92, h: 288 },
  { x: 244, w: 108, h: 248, round: true },
  { x: 368, w: 140, h: 336, crane: true },
  { x: 524, w: 100, h: 232 },
  { x: 640, w: 156, h: 368 },
  { x: 812, w: 118, h: 272 },
  { x: 946, w: 92, h: 320 },
  { x: 1054, w: 148, h: 244 },
  { x: 1218, w: 108, h: 352 },
  { x: 1342, w: 98, h: 216 },
];

function windows(b: Building, bIdx: number, dense: boolean) {
  const cols = Math.max(1, Math.floor((b.w - 26) / 24));
  const rows = Math.max(2, Math.floor((b.h - 34) / 36));
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // deterministic pseudo-random skip pattern
      if ((r * 7 + c * 13 + bIdx * 5) % (dense ? 4 : 3) === 0) continue;
      const lit = (r * 3 + c * 5 + bIdx) % 4 === 0;
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={b.x + 15 + c * 24}
          y={BASE - b.h + 18 + r * 36}
          width={10}
          height={6}
          rx={1}
          fill="#2DD4BF"
          opacity={0.12}
          className={lit ? "win" : undefined}
        />
      );
    }
  }
  return cells;
}

function Crane({ b }: { b: Building }) {
  return (
    <g stroke="#1a2530" strokeWidth={3} strokeLinecap="round">
      <line x1={b.x + 30} y1={BASE - b.h} x2={b.x + 30} y2={BASE - b.h - 54} />
      <line x1={b.x - 42} y1={BASE - b.h - 54} x2={b.x + 96} y2={BASE - b.h - 54} />
      <line x1={b.x - 34} y1={BASE - b.h - 54} x2={b.x - 34} y2={BASE - b.h - 30} />
    </g>
  );
}

function Silhouette({
  b,
  i,
  fill,
}: {
  b: Building;
  i: number;
  fill: string;
}) {
  return (
    <>
      {b.round ? (
        <rect
          x={b.x}
          y={BASE - b.h}
          width={b.w}
          height={b.h + 60}
          rx={b.w / 2.2}
          fill={fill}
        />
      ) : (
        <rect x={b.x} y={BASE - b.h} width={b.w} height={b.h} fill={fill} />
      )}
      {/* antenna on every 4th building */}
      {i % 4 === 1 && !b.round && (
        <line
          x1={b.x + b.w / 2}
          y1={BASE - b.h}
          x2={b.x + b.w / 2}
          y2={BASE - b.h - 26}
          stroke={fill}
          strokeWidth={2.5}
        />
      )}
      {b.crane && <Crane b={b} />}
    </>
  );
}

function Layer({
  buildings,
  fill,
  withWindows = false,
  dense = true,
  horizon = false,
  className,
}: {
  buildings: Building[];
  fill: string;
  withWindows?: boolean;
  dense?: boolean;
  horizon?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 1440 ${BASE}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
    >
      {horizon && (
        <defs>
          <linearGradient id="horizon-glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0" />
            <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {buildings.map((b, i) => (
        <g key={i}>
          <Silhouette b={b} i={i} fill={fill} />
          {withWindows && windows(b, i, dense)}
        </g>
      ))}
      {horizon && (
        <rect x="0" y={BASE - 2} width="1440" height="2" fill="url(#horizon-glow)" />
      )}
    </svg>
  );
}

export function SkylineBack({ className }: { className?: string }) {
  return <Layer buildings={BACK} fill="#0a1014" className={className} />;
}

export function SkylineMid({ className }: { className?: string }) {
  return <Layer buildings={MID} fill="#0d141a" className={className} />;
}

export function SkylineFront({
  className,
  dense = true,
}: {
  className?: string;
  dense?: boolean;
}) {
  return (
    <Layer
      buildings={FRONT}
      fill="#101820"
      withWindows
      dense={dense}
      horizon
      className={className}
    />
  );
}
