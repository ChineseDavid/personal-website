"use client";
import { getUniqueKey } from '@/common/common';
import Link from 'next/link';
import './page.scss';

interface infoItem {
  key?: string;
  text: string;
}

export default function Resume() {

  const info: infoItem[] = [
    { text: "生成属于你个人的专属简历" },
    { text: "灵活调整，简单易用" },
    { text: "一键生成pdf，发送给你的面试官" }
  ]

  info.forEach(item=>{
    item.key = getUniqueKey()
  });

  return (
    <main className="resume">
      <div className="title">简历编辑器</div>
      <div className="info">
        {info.map(item=>(<div className="info-item" key={item.key}>{item.text}</div>))}
      </div>
      <div className="start-edit">
        <div className="describe">快开始编写你的个人简历吧</div>
        <Link href='/wait' className="button">开始编辑</Link>
      </div>
    </main>
  );
}
