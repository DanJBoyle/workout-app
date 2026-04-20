// context/SettingsContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type WeightUnit = "kg" | "lbs";

type SettingsContextType = {
  weightUnit: WeightUnit;
  setWeightUnit: (unit: WeightUnit) => void;
  isLoaded: boolean;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

const WEIGHT_UNIT_KEY = (userId: string) => `@settings/${userId}/weightUnit`;

export function SettingsProvider({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  const [weightUnit, setWeightUnitState] = useState<WeightUnit>("kg");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(WEIGHT_UNIT_KEY(userId)).then((stored) => {
      if (stored === "kg" || stored === "lbs") {
        setWeightUnitState(stored);
      }
      setIsLoaded(true);
    });
  }, [userId]);

  const setWeightUnit = (unit: WeightUnit) => {
    setWeightUnitState(unit);
    AsyncStorage.setItem(WEIGHT_UNIT_KEY(userId), unit);
  };

  return (
    <SettingsContext.Provider value={{ weightUnit, setWeightUnit, isLoaded }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within SettingsProvider");
  return context;
}
