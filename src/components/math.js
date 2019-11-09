export const MAX = 5

export const apply = {
  Labor: (val, weight) => ((val / MAX) * weight) / MAX,
  Sustainability: (val, weight) => ((val / MAX) * weight) / MAX,
  "Age Match": (val, actual, weight) => {
    let [low, high] = val.split("-").map(str => parseInt(str.trim()))
    if (low >= actual[0] || high <= actual[1]) return (MAX * weight) / MAX
    return 0
  },
  "Local Source": (val, weight) => ((val / MAX) * weight) / MAX,
  "Recent Scandals": (val, weight) => ((val / MAX) * weight) / MAX,
  Price: (val, weight) => ((val / 3) * weight) / 3,
}
