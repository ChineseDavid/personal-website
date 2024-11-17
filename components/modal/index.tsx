import { ReactNode } from "react";
import "./index.scss";
import classNames from "classnames";
interface iconFontProps {
  children: ReactNode;
  className?: string;
}

const Modal = function ({ children, className }: iconFontProps) {
  return (
    <div className="modal-shadow">
      <div className={classNames("modal-content", className)}>{children}</div>
    </div>
  )
};
export default Modal;