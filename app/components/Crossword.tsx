// components/Crossword.js
"use client";

import React, { useEffect, useState } from "react";
import { generateCrossword } from "../utils/GenerateGrid";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const Crossword = ({ words }) => {
  const [grid, setGrid] = useState([]);
  const [text, setText] = useState("");
  const [colors, setColors] = useState([]);
  const [randomWords, setRandomWords] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const [meaning, setMeaning] = useState([]);

  useEffect(() => {
    const newGrid = generateCrossword(words);
    setGrid(newGrid);
    setColors(
      Array.from({ length: newGrid.length }, () =>
        Array(newGrid[0].length).fill(false)
      )
    );
  }, [words]);

  const change = (rowIndex, cellIndex) => {
    setText((prev) => prev + grid[rowIndex][cellIndex]);
    setColors((prevColors) => {
      const newColors = prevColors.map((row) => [...row]);
      newColors[rowIndex][cellIndex] = !newColors[rowIndex][cellIndex];
      return newColors;
    });
  };


  const clearText = () => {
    const newGrid = generateCrossword(words);
    setText("");
    setColors(
      Array.from({ length: newGrid.length }, () =>
        Array(newGrid[0].length).fill(false)
      )) 
  };

  const Generate = async () => {
    setisLoading(true)
    try {
      const response = await axios.get(
        "https://random-word-api.herokuapp.com/word?number=5"
      );

      // const meaning = response.data.map(async word => {
      //   const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      // })
      
      setRandomWords(response.data);
      setisLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const confirm = async (word: any) => {
    let temp;
    for (let i = 0; i < randomWords.length; i++) {
      if(randomWords[i] === word)
      {
        temp = randomWords[i]
      }
    }

    if(temp){
      const mean = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${temp}`);
      console.log(mean.data[0].meaning[0].definitions);
      
    }

  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
      <div className="crossword-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="crossword-row">
            {row.map((cell, cellIndex) => (
              <button
                value={cell}
                key={cellIndex}
                className={`crossword-cell  ${
                  colors[rowIndex][cellIndex] ? "bg-white text-black" : "text-white"
                }`}
                onMouseDown={() => change(rowIndex, cellIndex)}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
        {isLoading && (<h1 className="text-8xl font-bold text-white absolute top-20 left-[27%]">Loading</h1>)}
      <div className="relative border p-10">
        <span className={` p-2 ${text ? "bg-white" : ""} text-black`}>
          {text ? text : ""}
        </span>

        <div className="flex p-2 flex-wrap items-center space-x-3">
          <Accordion type="single" collapsible className="w-full">
          {randomWords.map((word) => (
      <AccordionItem value="item-1" key={word}>
        <AccordionTrigger className="text-white">{word}</AccordionTrigger>
        <AccordionContent className="text-white">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
          ))}
          </Accordion>
        </div>

        <div className="flex absolute bottom-4 right-4 gap-5">
          <button
            onClick={clearText}
            className="px-5 py-1 mt-5 bg-white rounded text-black"
          >
            clear
          </button>
          <button
            onClick={() => confirm(text)}
            className="px-5 py-1 mt-5 bg-white rounded text-black"
          >
            check
          </button>
          <button
            onClick={Generate}
            className="px-5 py-1 mt-5 bg-white rounded text-black"
          >
            Generate randow words
          </button>
        </div>
      </div>
    </div>
  );
};

export default Crossword;
