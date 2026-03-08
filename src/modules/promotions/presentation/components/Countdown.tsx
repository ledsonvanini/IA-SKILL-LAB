"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui";

interface CountdownProps {
  endDate: string;
}

export function Countdown({ endDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const end = new Date(endDate).getTime();
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Encerrada");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setIsUrgent(days === 0);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold ${
        isUrgent ? "text-amber-500" : "text-[var(--muted)]"
      }`}
    >
      <Clock size={11} />
      {timeLeft}
      {isUrgent && (
        <Badge variant="lastChance" className="text-[8px] px-1.5 py-0">
          Última chance!
        </Badge>
      )}
    </span>
  );
}
