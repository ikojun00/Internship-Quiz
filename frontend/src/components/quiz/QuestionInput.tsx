import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Question } from "@/types";

type QuestionInputProps = {
  question: Question;
  answer: string;
  onChange: (answer: string) => void;
};

const QuestionInput: React.FC<QuestionInputProps> = ({
  question,
  answer,
  onChange,
}) => {
  switch (question.type) {
    case "ABC":
      const options = JSON.parse(question.options);
      return (
        <div className="space-y-3">
          {options.map((option: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`option-${index}`}
                name={`question-${question.id}`}
                value={option}
                checked={answer === option}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-primary"
              />
              <Label htmlFor={`option-${index}`} className="cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </div>
      );

    case "FILL_IN":
      return (
        <Input
          type="text"
          placeholder="Type your answer here"
          value={answer}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "SLIDER":
      const sliderOptions = JSON.parse(question.options);
      return (
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>{sliderOptions.min}</span>
            <span>{sliderOptions.max}</span>
          </div>
          <input
            type="range"
            min={sliderOptions.min}
            max={sliderOptions.max}
            step={sliderOptions.step}
            value={answer || sliderOptions.min}
            onChange={(e) => onChange(e.target.value)}
            className="w-full"
          />
          <div className="text-center font-semibold">
            Selected: {answer || sliderOptions.min}
          </div>
        </div>
      );

    default:
      return <p>Unsupported question type</p>;
  }
};

export default QuestionInput;
