import "./index.scss";
interface iconFontProps {
  name: string;
  title?: string;
  className?: string;
  onClick?:()=>void;
}

const IconFont = function ({ name, className, title, onClick }: iconFontProps) {
  return (
    <div className={`iconfont icon-${name} ${className??''}`} title={title} onClick={onClick} ></div>
  )
};
export default IconFont;