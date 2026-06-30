import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface PlacedBet {
  id: string;
  question: string;
  category: string;
  choice: "YES" | "NO";
  amount: number;
  resolved: boolean;
  won: boolean;
  payout: number;
}

interface BetsContextType {
  bets: PlacedBet[];
  addBet: (bet: PlacedBet) => void;
}

const BetsContext = createContext<BetsContextType | null>(null);

export function BetsProvider({ children }: { children: ReactNode }) {
  const [bets, setBets] = useState<PlacedBet[]>([]);

  function addBet(bet: PlacedBet) {
    setBets((prev) => {
      // avoid duplicates if user clicks twice
      if (prev.find((b) => b.id === bet.id)) return prev;
      return [bet, ...prev];
    });
  }

  return (
    <BetsContext.Provider value={{ bets, addBet }}>
      {children}
    </BetsContext.Provider>
  );
}

export function useBets() {
  const ctx = useContext(BetsContext);
  if (!ctx) throw new Error("useBets must be used inside BetsProvider");
  return ctx;
}