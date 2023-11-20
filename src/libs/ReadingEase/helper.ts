import silabaJS from "./silaba";

export function getWords(text: string) {
  const words = text.replace(/\n\r,!?;/g, " ").split(" ");

  for (let i = 0; i < words.length; i++) {
    if (words[i] === "") {
      words.splice(i, 1);
      i--;
    }
  }

  return words;
}

export function countSyllables(words: string[]) {
  let totalSyllables = 0;

  for (const word of words) {
    const silabas = (silabaJS.getSilabas(word) as any).numeroSilaba;
    totalSyllables += silabas;
  }

  return totalSyllables;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculate the Flesch Ease score for a given text
 * @param words - number of words in the text
 * @param sentences - number of sentences in the text
 * @param syllables - number of syllables in the text
 * @return Flesch Ease score
 */
export function calculateFleschEase(
  words: number,
  sentences: number,
  syllables: number,
) {
  const ease =
    248.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return clamp(ease, 0, 100);
}

/**
 * Calculate the Flesch Reading score for a given text
 * @param Flesch Reading score
 */
export function calculateResult(fleschEase: number) {
  if (fleschEase === 0) return 0;

  const min = Math.min(fleschEase, 100);
  return Math.max(min, 0);
}

export function splitPhrases(text: string) {
  const regex = /(?<=[.?!])\s/g;
  const tokens = text.split(regex);
  return tokens.filter((phrase) => phrase.length > 0);
}
