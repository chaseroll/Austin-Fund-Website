import type { ReactElement } from "react";

export function capitolElements(
  stroke: string,
  strokeWidth: number = 1.2,
): ReactElement[] {
  const s = stroke;
  const w = strokeWidth;

  const elements: ReactElement[] = [];
  let idx = 0;
  const k = () => String(idx++);

  const line = (x1: number, y1: number, x2: number, y2: number) =>
    elements.push(
      <line
        key={k()}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={s}
        strokeWidth={w}
        strokeLinecap="round"
      />,
    );

  const rect = (x: number, y: number, width: number, height: number) =>
    elements.push(
      <rect
        key={k()}
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={s}
        strokeWidth={w}
        fill="none"
      />,
    );

  const quad = (
    sx: number,
    sy: number,
    cx: number,
    cy: number,
    ex: number,
    ey: number,
  ) =>
    elements.push(
      <path
        key={k()}
        d={`M${sx} ${sy} Q${cx} ${cy} ${ex} ${ey}`}
        stroke={s}
        strokeWidth={w}
        strokeLinecap="round"
        fill="none"
      />,
    );

  line(250, 60, 250, 80);
  quad(254, 56, 253, 59, 250, 60);
  quad(250, 60, 247, 59, 246, 56);
  quad(246, 56, 247, 53, 250, 52);
  quad(250, 52, 253, 53, 254, 56);

  quad(200, 180, 200, 100, 250, 80);
  quad(250, 80, 300, 100, 300, 180);
  quad(210, 180, 210, 115, 250, 95);
  quad(250, 95, 290, 115, 290, 180);

  rect(190, 180, 120, 12);
  rect(185, 192, 130, 6);

  rect(195, 198, 110, 60);
  for (let i = 0; i < 8; i++) {
    const x = 205 + i * 13;
    line(x, 202, x, 255);
  }

  rect(180, 258, 140, 8);
  line(180, 270, 320, 270);
  line(175, 270, 250, 240);
  line(250, 240, 325, 270);

  for (let i = 0; i < 10; i++) {
    const x = 180 + i * 16;
    line(x, 270, x, 370);
  }

  rect(142, 370, 216, 6);
  rect(136, 376, 228, 4);
  for (let i = 0; i < 4; i++) {
    rect(126 - i * 16, 384 + i * 8, 248 + i * 32, 6);
  }

  rect(6, 300, 198, 70);
  rect(0, 296, 210, 4);
  for (let i = 0; i < 10; i++) {
    const x = 18 + i * 20;
    line(x, 304, x, 368);
  }
  quad(16, 300, 34, 276, 52, 300);
  quad(16, 298, 34, 282, 52, 298);
  line(10, 300, 58, 300);
  line(34, 276, 34, 268);

  rect(296, 300, 198, 70);
  rect(290, 296, 210, 4);
  for (let i = 0; i < 10; i++) {
    const x = 308 + i * 20;
    line(x, 304, x, 368);
  }
  quad(448, 300, 466, 276, 484, 300);
  quad(448, 298, 466, 282, 484, 298);
  line(442, 300, 490, 300);
  line(466, 276, 466, 268);

  rect(0, 370, 210, 6);
  rect(290, 370, 210, 6);

  return elements;
}
