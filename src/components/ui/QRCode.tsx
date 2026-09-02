import { useMemo } from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

// Simple QR-like pattern generator for visual representation.
// In production, a proper QR library would be used.
export function QRCode({ value, size = 200, className = '' }: QRCodeProps) {
  const grid = useMemo(() => {
    // Simple deterministic pattern from string hash
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = ((hash << 5) - hash) + value.charCodeAt(i);
      hash |= 0;
    }
    const size = 21;
    const cells: boolean[][] = [];
    let state = Math.abs(hash) || 1;
    for (let r = 0; r < size; r++) {
      const row: boolean[] = [];
      for (let c = 0; c < size; c++) {
        state = (state * 1103515245 + 12345) & 0x7fffffff;
        row.push((state >> 16) % 3 === 0);
      }
      cells.push(row);
    }
    // Add finder patterns (corners)
    const setFinder = (sr: number, sc: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
          const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          cells[sr + r][sc + c] = isBorder || isInner;
        }
      }
    };
    setFinder(0, 0);
    setFinder(0, size - 7);
    setFinder(size - 7, 0);
    return cells;
  }, [value]);

  const cellSize = size / grid.length;

  return (
    <div className={`inline-block p-3 bg-white rounded-xl ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {grid.map((row, r) =>
          row.map((on, c) =>
            on ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#0d1656"
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}
