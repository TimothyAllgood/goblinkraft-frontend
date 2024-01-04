export default class Parse {
  static parseAction = (string) => {
    // Sample input string
    const inputString = string;

    // Define a regular expression pattern to match text within brackets
    const bracketPattern = /\[(\*\*[^\[\]]*\*\*)\s([^\[\]]*)\]/g;

    // Find all text within brackets
    const bracketMatches = inputString.match(bracketPattern);

    // Initialize an array to hold the processed attacks
    const processedAttacks = [];

    // Process the bracket matches
    if (bracketMatches) {
      for (const bracketMatch of bracketMatches) {
        // Remove the brackets and split the text into bold and regular parts
        const matchGroups = /\[(\*\*[^\[\]]*\*\*)\s([^\[\]]*)\]/.exec(
          bracketMatch
        );

        if (matchGroups && matchGroups.length === 3) {
          const boldText = matchGroups[1].replace(/\*\*/g, ""); // Extract bold text including **
          const regularText = matchGroups[2];

          processedAttacks.push({ bold: boldText, regular: regularText });
        }
      }
    }

    // Print the processed attacks
    if (processedAttacks.length < 1) return string;
    return processedAttacks;
  };
}
