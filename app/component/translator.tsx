"use client";

import { useState } from "react";
import TweetComposer from "./twitter";
import LoadingDots from "./loading";
import LoadingDots2 from "./loading2";

export default function Translator({
  style,
  setStyle,
}: {
  style: string;
  setStyle: (value: string) => void;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [textColor, setTextColor] = useState("text-gray-400");
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const styles = [
    { value: "positive", label: "ポジティブ表現" },
    { value: "science", label: "理系っぽい表現" },
    { value: "movie", label: "洋画っぽい表現" },
    { value: "hackathon", label: "ギークっぽい表現" },
  ];

  const handleTranslate = async () => {
    if (input === "") {
      setOutput([]);
      setTextColor("text-gray-400");
      return;
    }

    setIsLoading(true);
    setOutput([]);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input, style }),
      });

      const data = await res.json();

      if (res.ok) {
        setOutput(data.result);
        setTextColor("text-gray-800");
        setCurrentIndex(0);
      } else {
        setOutput(["翻訳に失敗しました。"]);
        setTextColor("text-red-500");
      }
    } catch (error) {
      console.error("Error:", error);
      setOutput(["エラーが発生しました。"]);
      setTextColor("text-red-500");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-6 flex flex-col items-center text-black space-y-20">
      <img src="/title.svg" alt="つぶ訳" className="w-48 h-auto mb-4" />

      {/* スタイル選択 */}
      <div className="mb-6 w-full max-w-md">
        <label
          htmlFor="style-select"
          className="block mb-2 font-semibold text-black"
        >
          翻訳スタイル
        </label>
        <select
          id="style-select"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={style}
          onChange={(e) => setStyle(e.target.value)} // 親の setStyle を呼び出す
        >
          {styles.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* 入力・出力エリア */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold">つぶやきたい内容</label>
          <textarea
            rows={6}
            className="py-4 px-10 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[180px] bg-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例）今日も全然集中できなかった…"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold">
            翻訳されたつぶやき
          </label>
          <div className="relative p-4 pb-5 pr-10 border rounded-xl bg-white h-[180px] flex flex-col justify-between">
            {/* スクロール可能な領域 */}
            <div className="overflow-y-scroll whitespace-pre-wrap px-10 pb-4">
              <div className={`${textColor}`}>
                {isLoading ? (
                  <LoadingDots />
                ) : (
                  output[currentIndex] || "ここに翻訳結果が表示されます"
                )}
              </div>
            </div>

            {/* ページインジケーター */}
            {output.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {output.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex
                        ? "bg-gray-800"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* 左ボタン */}
            <button
              className={`absolute bottom-0 left-0 h-full w-8 flex items-center justify-center ${
                currentIndex > 0 ? "bg-gray-200" : "bg-white cursor-default"
              } text-lg font-bold rounded-l-xl`}
              onClick={() =>
                currentIndex > 0 && setCurrentIndex(currentIndex - 1)
              }
              disabled={currentIndex === 0}
            >
              {currentIndex > 0 ? "＜" : ""}
            </button>

            {/* 右ボタン */}
            <button
              className={`absolute bottom-0 right-0 h-full w-8 flex items-center justify-center ${
                currentIndex < output.length - 1
                  ? "bg-gray-200"
                  : "bg-white cursor-default"
              } text-lg font-bold rounded-r-xl`}
              onClick={() =>
                currentIndex < output.length - 1 &&
                setCurrentIndex(currentIndex + 1)
              }
              disabled={currentIndex === output.length - 1}
            >
              {currentIndex < output.length - 1 && output.length > 0
                ? "＞"
                : ""}
            </button>
          </div>
        </div>
      </div>

      {/* ボタン・ツイート */}
      <div className="flex items-center gap-4 mt-9 flex-wrap justify-center w-full max-w-md">
      {isLoading ? <LoadingDots2 /> :
        <button
          onClick={handleTranslate}
          className="cursor-pointer mt-4 bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition w-full max-w-md font-semibold"
          disabled={isLoading}
        >
           翻訳する
        </button>
      }

        <TweetComposer textToTweet={output[currentIndex] || ""} />
      </div>
    </div>
  );
}
