export function getColor(score) {
  return score > 80 ? "#16a34a" :
         score > 60 ? "#84cc16" :
         score > 40 ? "#facc15" :
         score > 20 ? "#f97316" :
                      "#dc2626";
}