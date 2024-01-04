import sources from "../data/sources.json";

export default class Source {
  static getSource = (sourceName) => {
    let source = sources.find((s) => s.name === sourceName);
    return source;
  };
}
