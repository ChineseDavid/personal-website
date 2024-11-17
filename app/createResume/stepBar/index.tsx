"use client";
import { useEffect } from "react";
import "./index.scss";
import { getUniqueKey } from "@/common/common";

export interface StepItem {
  key?: string;
  name: string;
}

interface StepBarProps {
  data: StepItem[];
  index: number;
  className?: string;
}

export function StepBar({ data, index, className }: StepBarProps) {

  useEffect(() => {
    data.forEach(item => {
      if (!item.key) item.key = getUniqueKey();
    })
  }, [data])

  return (
    <div className={`bar-body ${className}`}>
      {data.map((item, i) => <div key={item.key} className={`step-body ${i <= index && 'active'}`}>{item.name}</div>)}
    </div>
  );
}
