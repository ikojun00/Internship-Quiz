import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question, Quiz } from "@/types";

interface QuestionFormProps {
  formData: Question;
  onChange: (name: string, value: string | number) => void;
  quizzes: Quiz[];
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  formData,
  onChange,
  quizzes,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, parseInt(value) || 0);
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "type") {
      onChange(name, value);

      if (value === "FILL_IN") {
        onChange("options", "");
      }
    } else if (name === "quizId") {
      onChange(name, parseInt(value));
    } else {
      onChange(name, value);
    }
  };

  const getOptionPlaceholder = () => {
    switch (formData.type) {
      case "ABC":
        return '["Option A", "Option B", "Option C"]';
      case "SLIDER":
        return '{"min": 1, "max": 100, "step": 1}';
      default:
        return "Enter options";
    }
  };

  const getAnswerPlaceholder = () => {
    switch (formData.type) {
      case "ABC":
        return "Enter the correct option index (0, 1, 2, etc.)";
      case "SLIDER":
        return "Enter the correct value";
      default:
        return "Enter correct answer";
    }
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="quizId" className="text-right">
          Quiz
        </Label>
        <Select
          value={formData.quizId.toString()}
          onValueChange={(value) => handleSelectChange("quizId", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a quiz" />
          </SelectTrigger>
          <SelectContent>
            {quizzes.map((quiz) => (
              <SelectItem key={quiz.id} value={quiz.id?.toString() || ""}>
                {quiz.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="text" className="text-right">
          Question Text
        </Label>
        <Input
          id="text"
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="type">
          Question Type
        </Label>
        <Select
          value={formData.type}
          onValueChange={(value) => handleSelectChange("type", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select question type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"ABC"}>Multiple Choice</SelectItem>
            <SelectItem value={"FILL_IN"}>Fill in the Blank</SelectItem>
            <SelectItem value={"SLIDER"}>Slider</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.type !== "FILL_IN" && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="options">
            Options
          </Label>
          <Input
            id="options"
            name="options"
            value={formData.options}
            onChange={handleInputChange}
            className="col-span-3"
            placeholder={getOptionPlaceholder()}
          />
        </div>
      )}

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="correctAnswer">
          Correct Answer
        </Label>
        <Input
          id="correctAnswer"
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleInputChange}
          className="col-span-3"
          placeholder={getAnswerPlaceholder()}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="points" className="text-right">
          Points
        </Label>
        <Input
          id="points"
          name="points"
          type="number"
          min="1"
          value={formData.points}
          onChange={handleNumberInputChange}
          className="col-span-3"
        />
      </div>
    </div>
  );
};

export default QuestionForm;
