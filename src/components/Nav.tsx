import { FC, useEffect, useState } from "react";
import "./Nav.scss";
type Props = {
  className?: string;
};

export const Nav: FC<Props> = (props: Props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleShow = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleShow);
    // なぜreturnでも実行
    return () => {
      window.addEventListener("scroll", handleShow);
    };
  }, []);
  return (
    // stateであるshowがtrueならスタイルを変更
    <div className={`Nav ${show && "Nav-black"}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
        className="Nav-logo"
      />
      <img
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="Avatar"
        className="Nav-avater"
      />
    </div>
  );
};
