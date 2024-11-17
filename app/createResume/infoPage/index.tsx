import "./index.scss";
import { InfoItem } from "./infoItem";
import IconFont from "@/components/iconFont";

import rootStore from "@/store/index";

export function InfoPage() {
  const { infoStore: { basicInfoItems } } = rootStore;
  return (
    <div className="info-page">
      <InfoItem name="基本信息">
        <div className="basic-info">
          {basicInfoItems.map(item =>
            <div className="basic-item" key={item.key}>
              <IconFont name={item.icon} className="editor-icon" />
              <input className="editor-input" placeholder={item.text} />
            </div>
          )}
          <div className="basic-blank"></div>
        </div>
      </InfoItem>
      <InfoItem name="个人优势">
        <div className="editor-textarea" contentEditable></div>
      </InfoItem>
    </div>
  );
}
