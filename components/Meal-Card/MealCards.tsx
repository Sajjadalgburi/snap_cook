import React, { useEffect, useState } from "react";
import { MealCardsProps } from "@/types";
import MealCardBody from "./MealCardBody";
import { LoadingCard } from "./LoadingCard";
import PlaceholderCardBody from "./PlaceholderCardBody";

// TODO: Remove this in production
const testing = false;

const MealCards: React.FC<MealCardsProps> = ({
  isMealPlanLoading = true,
  recipes,
}) => {
  const [visibleSkeletons, setVisibleSkeletons] = useState(1);

  useEffect(() => {
    if (!recipes && !isMealPlanLoading) return;

    if (isMealPlanLoading) {
      const interval = setInterval(() => {
        setVisibleSkeletons((prev) => (prev < 8 ? prev + 1 : prev));
      }, 5500);

      return () => clearInterval(interval);
    } else {
      setVisibleSkeletons(1);
    }
  }, [isMealPlanLoading, recipes]);

  return (
    <div className="gap-8 mx-auto px-4 mb-[5rem] sm:mb-0 py-6 sm:py-[5rem] flex flex-col items-center">
      {!isMealPlanLoading ? (
        <div className="w-full max-w-[80vw]">
          <h1 className="md:text-6xl text-left mb-8 font-bold text-gray-800">
            Your Personalized Meal Plan
          </h1>

          {testing ? (
            <PlaceholderCardBody />
          ) : (
            <MealCardBody recipes={recipes} />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {Array.from({ length: visibleSkeletons }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MealCards;
