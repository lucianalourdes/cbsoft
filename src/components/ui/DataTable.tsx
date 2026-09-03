import type { CSSProperties, ReactNode } from 'react';

export interface DataColumn {
  header: string;
  align?: 'left' | 'right';
  /** Extra classes applied to every body cell in this column. */
  cellClassName?: string;
}

interface DataTableProps {
  columns: DataColumn[];
  rows: ReactNode[][];
  /** Inline style for the <thead> row (brand colour varies per table). */
  headStyle: CSSProperties;
  /** Tailwind arbitrary value, e.g. "560px". */
  minWidth: string;
  /** Rows to render in a heavier weight (the CFP "Conference" row). */
  strongRows?: boolean[];
}

/** Shared table shell for the Call for Papers and Registration sections:
 *  horizontal scroll on small screens, coloured header, zebra striping. */
export function DataTable({ columns, rows, headStyle, minWidth, strongRows }: DataTableProps) {
  return (
    <div className="overflow-x-auto border rounded-md" style={{ borderColor: 'var(--line)' }}>
      <table className="w-full text-sm" style={{ minWidth }}>
        <thead>
          <tr style={headStyle}>
            {columns.map((col, i) => (
              <th
                key={i}
                className={`font-mono font-medium uppercase tracking-wider text-xs py-3 px-4 ${
                  col.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, r) => (
            <tr
              key={r}
              className="border-t"
              style={{
                borderColor: 'var(--line)',
                background: r % 2 === 1 ? 'var(--surface-alt)' : undefined,
              }}
            >
              {cells.map((cell, c) => {
                const col = columns[c];
                return (
                  <td
                    key={c}
                    className={`py-3.5 px-4 ${col?.align === 'right' ? 'text-right' : ''} ${
                      col?.cellClassName ?? ''
                    } ${strongRows?.[r] ? 'font-semibold' : ''}`.trim()}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
