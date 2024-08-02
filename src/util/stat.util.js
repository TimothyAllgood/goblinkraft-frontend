export default class Stat {
  static getStatAbbreviation = (string) => {
    return string.trim().substring(0, 3).toUpperCase();
  };

  static getModifier = (number) => {
    return Math.floor((number - 10) / 2);
  };
}
