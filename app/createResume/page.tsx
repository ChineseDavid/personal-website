"use client"; 
import { useState } from "react";
import { StepBar, StepItem } from "./stepBar";
import { getUniqueKey } from "@/common/common";
import { InfoPage } from "./infoPage"
import "./page.scss"; 

const StepBarData: StepItem[] = [
  {name: "完善信息"},
  {name: "调整内容"},
  {name: "生成简历"}
]
StepBarData.forEach(item => item.key = getUniqueKey());

export default function CreateResume() {

  const [barIndex, setBarIndex] = useState(0);

  return (
    <div className="create-page">
      <StepBar data={StepBarData} index={barIndex}/>
      <div className="page-body">
        {barIndex === 0 && <InfoPage />}
      </div>
    </div>
  );
}
