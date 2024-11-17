"use client";
import { useEffect, useRef, useState } from "react";
import { Color } from "@/common/common";
import classNames from "classnames";
import { deepCopy, getUniqueKey, getNextColor } from "@/common/common";
import "./page.scss";
import Modal from "@/components/modal";
import IconFont from "@/components/iconFont";

interface LotteryItem {
  name: string;
  id: string;
  chance?: string;
}

const InitLotteryData: LotteryItem[] = [
  { name: '一等奖', id: '1' },
  { name: '二等奖', id: '2' },
  { name: '三等奖', id: '3' },
  { name: '四等奖', id: '4' },
  { name: '五等奖', id: '5' },
  { name: '六等奖', id: '6' },
  { name: '七等奖', id: '7' },
  { name: '八等奖', id: '8' }
];

const InitNameData: LotteryItem[] = [
  { name: '张三', id: '11' }
]

const getAddDeg = (current: number, goal: number) => {
  if (goal - current > 3000) return 100;
  if (goal - current > 2000) return Math.round((goal - current) / 20);
  // 速度越来越慢
  const speed = Math.round((goal - current) / 20);
  return speed > 1 ? speed : 1;
}

export default function Lottery() {
  const [title, setTitle] = useState<string>('');
  const tableRef = useRef(null);
  const [lotteryData, setLotteryData] = useState<LotteryItem[]>(deepCopy(InitLotteryData));
  const [optionData, setOptionData] = useState<LotteryItem[]>([]);
  const [isByName, setIsByName] = useState<boolean>(false);
  const [dataByName, setDataByName] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [rotateDeg, setRotateDeg] = useState<number>(0);
  const lotteryCanvas = useRef(null);
  useEffect(() => {
    const _title = localStorage.getItem('lotteryTitle');
    const _isByName = localStorage.getItem('isByName');
    const _lotteryData = localStorage.getItem('lotteryData');
    setTitle(_title || "抽奖大转盘");
    _isByName && setIsByName(_isByName === 'true');
    _lotteryData && setLotteryData(JSON.parse(_lotteryData));
    console.log(_title, _lotteryData, _isByName, 'ydw');
  }, [])
  useEffect(() => {
    if (lotteryCanvas.current) {
      console.log('refresh', lotteryData);
      // 获取canvas元素及其上下文
      const canvas = lotteryCanvas.current as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 抽奖区域的半径
      const radius = Math.min(canvas.width, canvas.height) / 2;

      // 抽奖区域的中心坐标
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 绘制抽奖转盘
      // 绘制背景圆
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#f0f0f0';
      ctx.fill();

      // 绘制每个奖项区域
      let angle = 0;
      let chanceData = lotteryData.filter(data => data.chance);
      const residual = chanceData.length ? 100 - chanceData.reduce((a, b) => a + Number(b.chance), 0) : 100;
      const otherDataChance = residual / (lotteryData.length - chanceData.length) / 100 * 360;
      for (let i = 0; i < lotteryData.length; i++) {
        const award = lotteryData[i];
        const angleStartRad = angle * Math.PI / 180;
        angle += lotteryData[i].chance ? Number(lotteryData[i].chance) / 100 * 360 : otherDataChance;
        const angleEndRad = angle * Math.PI / 180;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angleStartRad, angleEndRad);
        ctx.closePath();

        // 设置奖项区域的颜色（可根据需求自定义）
        ctx.fillStyle = getNextColor();
        ctx.fill();

        // 在奖项区域中间绘制奖项名称（可根据需求调整位置和样式）
        const textX = centerX + (radius / 2) * Math.cos((angleStartRad + angleEndRad) / 2);
        const textY = centerY + (radius / 2) * Math.sin((angleStartRad + angleEndRad) / 2);
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.fillText(award.name, textX, textY);
      }

      ctx.closePath();

      // 绘制指针（这里简单绘制一个三角形指针）
      // ctx.beginPath();
      // ctx.moveTo(centerX, centerY - radius / 2);
      // ctx.lineTo(centerX - radius / 20, centerY + radius / 6);
      // ctx.lineTo(centerX + radius / 20, centerY + radius / 6);
      // ctx.closePath();
      // ctx.fillStyle = '#ffff00';
      // ctx.fill();
    }
  }, [lotteryCanvas, lotteryData]);

  useEffect(() => {
    setOptionData(deepCopy(
      isByName ?
        dataByName ? lotteryData : InitNameData :
        dataByName ? InitLotteryData : lotteryData
    ))
  }, [isByName, dataByName, lotteryData])

  const getResult = (goal: number) => {
    let chanceData = lotteryData.filter(data => data.chance);
    const residual = chanceData.length ? 100 - chanceData.reduce((a, b) => a + Number(b.chance), 0) : 100;
    const otherDataChance = residual / (lotteryData.length - chanceData.length);
    const numberGoal = (goal % 360) * 100 / 360;
    let addChance = 0;
    for (let i = 0; i < lotteryData.length; i++) {
      addChance += lotteryData[i].chance !== undefined ? Number(lotteryData[i].chance) : otherDataChance;
      if (numberGoal < addChance) {
        return lotteryData[i].name;
      }
    };
    return '空奖';
  }
  const rotateHandle = () => {
    const goalDeg = rotateDeg + 7200 + Math.floor(360 * Math.random());
    const newTimer = () => {
      setTimeout(() => {
        setRotateDeg(deg => {
          const addDeg = getAddDeg(deg, goalDeg);
          const nextDeg = deg + addDeg;
          if (nextDeg < goalDeg) {
            newTimer();
            return nextDeg;
          } else {
            setTimeout(() => {
              alert(`${title}\n${getResult(goalDeg - 90)}`)
            }, 500)
            return goalDeg;
          }
        });
      }, 30)
    }
    newTimer();
  }
  const handleOptionDataChange = (index: number, key: string, value: string) => {
    const copyData: LotteryItem[] = [...optionData];
    if (key === 'name') {
      copyData[index].name = value;
    } else if (key === 'chance') {
      copyData[index].chance = value;
    }
    setOptionData(copyData);
  }
  return (
    <div className="lottery-page">
      <div className="title">
        <input defaultValue={title} onChange={({ target: { value } }) => {
          setTitle(value);
          localStorage.setItem('lotteryTitle',value);
        }} />
        <div className="setting-icon" title="设置" onClick={() => {
          setOptionData(deepCopy(lotteryData));
          setIsByName(dataByName);
          setIsVisible(true);
        }}><IconFont name="setting" /></div>
      </div>
      <div className="lottery-canvas">
        <canvas width={300} height={300} ref={lotteryCanvas}></canvas>
        <div className="pointer" style={{ transform: `translate(-50%,-50%)rotate(${rotateDeg}deg)` }}>
          <div className="long-pointer"></div>
          <div className="short-pointer"></div>
          <div className="center-pointer"></div>
        </div>
      </div>
      <div className="lottery-button">
        <div className="button" onClick={rotateHandle}>开始抽奖</div>
      </div>
      {isVisible && <Modal className="lottery-option">
        <div className="option-select">
          <div className={classNames("select-item", { active: !isByName })} onClick={() => setIsByName(false)}>按奖项抽</div>
          <div className={classNames("select-item", { active: isByName })} onClick={() => setIsByName(true)}>按姓名抽</div>
        </div>
        <div className={classNames("lottery-table", {
          'is-by-name': isByName
        })}>
          <table>
            <thead>
              <tr>
                <th className="option-index option-title">序号</th>
                <th className="option-name option-title">{isByName ? "姓名" : "奖项名称"}</th>
                <th className="option-chance option-title">{"概率(%)"}</th>
                <th className="option-delete option-title"><IconFont name="add" title="新增一行" onClick={() => {
                  const copyData = [...optionData];
                  copyData.push({ name: '', id: getUniqueKey() })
                  setOptionData(copyData);
                }} /></th>
              </tr>
            </thead>
            <tbody ref={tableRef}>
              {optionData.map((data, index) => <tr key={data.id}>
                <td className="option-index">{index + 1}</td>
                <td className="option-name"><input type="text" defaultValue={data.name} onChange={({ target: { value } }) => {
                  handleOptionDataChange(index, 'name', value);
                }} onKeyDown={({ code }) => {
                  if (code === "Enter") {
                    const copyData = [...optionData];
                    copyData.push({ name: '', id: getUniqueKey() })
                    setOptionData(copyData);
                    setTimeout(() => {
                      if (tableRef.current) {
                        const ele = tableRef.current as HTMLDivElement;
                        const inputs = ele.querySelectorAll('.option-name input');
                        const lastInput = inputs[inputs.length - 1] as HTMLInputElement;
                        lastInput.focus();
                      }
                    }, 0)
                  }
                }} /></td>
                <td className="option-chance"><input type="text" defaultValue={data.chance || ''} placeholder="均等" onChange={({ target: { value } }) => {
                  handleOptionDataChange(index, 'chance', value);
                }} /></td>
                <td className="option-delete"><IconFont name="delete" title="删除" onClick={() => {
                  const copyData = [...optionData];
                  copyData.splice(index, 1);
                  setOptionData(copyData);
                }} /></td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <div className="option-buttons">
          <div className="button" onClick={() => {
            setLotteryData(deepCopy(optionData));
            setDataByName(isByName);
            setIsVisible(false);
            localStorage.setItem('lotteryData', JSON.stringify(optionData));
            localStorage.setItem('isByName', JSON.stringify(isByName));
          }}>应用</div>
          <div className="button" onClick={() => setIsVisible(false)}>取消</div>
        </div>
      </Modal>}
    </div>
  );
}
