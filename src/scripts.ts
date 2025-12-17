export function getStars(num: number) {
  let out = "";
  for (let index = 0; index < 2 * num; ) {
    if (num - index >= 2) {
      out += ""; //full star
      index += 2;
      continue;
    } else if (num - index == 1) {
      out += "⯨"; //half star
      index += 1;
      continue;
    }
    break;
  }
}
