"use client";
import './page.scss';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  const routers = [
    { name: '简历编辑器', href: '/resume' },
    { name: '抽奖', href: '/lottery' },
  ]
  return <main className="home">
    <div className="main-box">
      <div className="title">杨大卫的个人网站</div>
      <div className="describe">{"Yang DaWei's Personal Website"}</div>
      <div className="item-box">
        <div className="item-title">小工具</div>
        <div className="item-list">
          {routers.map(item => <div className="item" key={item.name} onClick={() => router.push(item.href)}>{item.name}</div>)}
        </div>
      </div>
    </div>
  </main>
}