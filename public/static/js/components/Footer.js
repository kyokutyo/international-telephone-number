import React, { useState } from "react";

export const Footer = () => {
  const [whatsThisVisible, setWhatsThisVisible] = useState(false);
  let whatsThisContent;
  if (whatsThisVisible) {
    whatsThisContent = (
      <div className="whats-this-content">
        <p>
          その国際電話番号がどこの国のものなのか調べることができます。 Wikipedia
          の
          <a
            href="http://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E9%9B%BB%E8%A9%B1%E7%95%AA%E5%8F%B7%E3%81%AE%E4%B8%80%E8%A6%A7"
            target="_blank"
            rel="noopener noreferrer"
          >
            国際電話番号の一覧
          </a>
          からデータを取得しています。
          (データはリアルタイムで同期されているわけではありません)
        </p>
      </div>
    );
  }
  const onClickHandler = e => {
    e.stopPropagation();
    e.preventDefault();
    setWhatsThisVisible(true)
  }
  return (
    <footer>
      {whatsThisContent}
      <a className="whats-this-link" onClick={onClickHandler} href="#">
        What&apos;s this?
      </a>
      <p className="copyright">
        &copy; kyokutyo (
        <a
          href="https://twitter.com/kyokutyo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        )
      </p>
    </footer>
  )
}
