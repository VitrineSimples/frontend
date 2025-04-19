import ConfigFlipWords from "./ConfigFlipWords";

interface iFlipWords {
  words: string[];
  text: string;
  textAfter: string;
}

export default function FlipWords({ words, text, textAfter }: iFlipWords) {
  return (
    <div className="flex justify-center items-center px-4">
      <div className="xl:text-4xl lg:text-3xl md:text-2xl text-xl mx-auto font-normal text-gray-800 dark:text-gray-400 flex flex-col items-center justify-center text-center">
        <p>{text}</p>
        <ConfigFlipWords words={words} />
        <p>{textAfter}</p>
      </div>
    </div>
  );
}
