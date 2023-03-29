// This function takes in a string as an argument and returns the same string with the first letter capitalized.
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// This function takes in a string as an argument and returns the same string with each word in capital case.
export function titleCase(str: string) {
  let words = str.split(' ');
  for (let i = 0; i < words.length; i++) words[i] = capitalize(words[i]);
  return words.join(' ');
}
