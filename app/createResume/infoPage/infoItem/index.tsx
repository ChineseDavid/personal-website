import "./index.scss";

interface InfoItemProps {
  name: string;
  children: React.ReactNode;
}

export function InfoItem({ name, children }: InfoItemProps) {
  return (
    <div className="info-item">
      <div className="item-title">{name}</div>
      {children}
    </div>
  );
}
