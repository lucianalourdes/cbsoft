/** One requirement of a call, with optional nested details. */
export interface SubmissionItem {
  text: string;
  sub?: string[];
}

/** Bulleted list with optional nested items, as in the official call. */
export function SubmissionItemList({ items }: { items: SubmissionItem[] }) {
  return (
    <ul className="wcall-list">
      {items.map((item) => (
        <li key={item.text}>
          {item.text}
          {item.sub && (
            <ul className="wcall-list wcall-list--sub">
              {item.sub.map((subItem) => (
                <li key={subItem}>{subItem}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
