import { getColor } from "../utils/colorScale";

export default function Legend() {
  const grades = [0, 20, 40, 60, 80];

  return (
    <div className="absolute bottom-4 right-4 bg-white p-3 shadow-md rounded">
      <h4 className="font-bold mb-2">Score Legend</h4>

      {grades.map((g, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div
            style={{
              width: 12,
              height: 12,
              background: getColor(g + 1)
            }}
          />
          <span>{g}+</span>
        </div>
      ))}
    </div>
  );
}