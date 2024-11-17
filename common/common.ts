export function getUniqueKey() {
  let timestamp = Date.now().toString(36);
  let random = Math.random().toString(36).substring(2);
  let uniqueKey = timestamp + random;
  return uniqueKey;
}

export interface ObjectType {
  [key: string]: any;
}

export const deepCopy = (obj: ObjectType) => JSON.parse(JSON.stringify(obj));

export const Color = [
  "#5470C6",
  "#91CC75",
  "#EE6666",
  "#73C0DE",
  "#3BA272",
  "#FC8452",
  "#9A60B4",
  "#ff6343",
];
let i = 0
export const getNextColor = () => {
  return Color[(i++) % Color.length];

}