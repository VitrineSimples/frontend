"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Image, { StaticImageData } from "next/image";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  button: string;
  src: StaticImageData;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
}

const Slide = ({ slide, index, current }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title } = slide;

  return (
    <li
      ref={slideRef}
      className="flex flex-1 flex-col shrink-0 group items-center relative justify-center text-center text-white opacity-100 transition-all duration-300 ease-in-out h-[60vmin] z-10"
      style={{
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        transformOrigin: "bottom",
      }}
    >
      <Image
        className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-600 ease-in-out"
        fill
        alt={title}
        src={src}
        onLoad={imageLoaded}
        loading="eager"
        decoding="sync"
      />
      <div className="absolute inset-0 bg-black/20 transition-all duration-1000 group-hover:bg-black/50" />
      <article
        className={`relative p-[4vmin] transition-all duration-300 ease-in-out ${
          current === index ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold relative transition-all duration-300 text-gray-300 group-hover:text-gray-100">
          {title}
        </h2>
        <div className="flex justify-center">
          <button className="cursor-pointer hover:bg-white/80 mt-6 px-3 md:px-4 md:py-2 w-fit mx-auto sm:text-sm text-black bg-white group-hover:opacity-100 opacity-70 h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-300 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            {button}
          </button>
        </div>
      </article>
    </li>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`md:w-10 md:h-10 cursor-pointer flex items-center mx-2 justify-center bg-gray-100 border-3 border-transparent rounded-full hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-contrast" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export default function CarouselConfig({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = current + 1;
      setCurrent(next === slides.length ? 0 : next);
    }, 10000);

    return () => clearTimeout(timer);
  }, [current, slides.length]);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const id = useId();

  return (
    <div
      className="relative h-[60vmin]"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex transition-transform duration-[1.5s] ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
          width: `calc(100%*${slides.length})`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide key={index} slide={slide} index={index} current={current} />
        ))}
      </ul>
      <div className="absolute flex justify-center w-full bottom-4 z-40">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
