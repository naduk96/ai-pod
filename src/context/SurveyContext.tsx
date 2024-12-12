import React, { createContext, useState, useContext } from "react";

type SurveyContextType = {
  currentQuestion: number;
  setCurrentQuestion: (index: number) => void;
  responses: Record<number, string | string[]>;
  setResponse: (index: number, answer: string | string[]) => void;
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, string | string[]>>({});

  const setResponse = (index: number, answer: string | string[]) => {
    setResponses((prev) => ({ ...prev, [index]: answer }));
  };

  return (
    <SurveyContext.Provider
      value={{ currentQuestion, setCurrentQuestion, responses, setResponse }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
};