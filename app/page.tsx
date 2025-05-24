"use client";

import { useState } from "react";
import Translator from "./component/translator";
import Background from "./component/slider";

export default function Home() {
  const [style, setStyle] = useState("positive");

  // style に応じた背景画像の URL を設定
  const backgroundImageMap: { [key: string]: string } = {
    positive: "/back_positive.svg",
    science: "/back_science.svg",
    movie: "/back_movie_2.svg",
  };

  const backgroundImage = backgroundImageMap[style] || "/back_positive.svg";

  return (
    <>
      {/* 背景コンポーネントに動的な背景画像を渡す */}
      <div
        style={{
          "--background-image": `url(${backgroundImage})`,
        } as React.CSSProperties}
        className="diagonal-background"
      ></div>

      <div className="pt-20 pb-20">
        {/* Translator に style 状態と setter を渡す */}
        <Translator style={style} setStyle={setStyle} />
      </div>
    </>
  );
}
