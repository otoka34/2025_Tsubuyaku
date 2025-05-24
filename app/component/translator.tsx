'use client';

import { useState } from "react";
import TweetComposer from './twitter';
import LoadingDots from "./loading";

export default function Translator({
  style,
  setStyle,
}: {
  style: string;
  setStyle: (value: string) => void;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [textColor, setTextColor] = useState("text-gray-400");
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // 翻訳候補のインデックス, 初期値0

  const styles = [
    { value: "positive", label: "ポジティブ表現" },
    { value: "science", label: "理系っぽい表現" },
    { value: "movie", label: "洋画っぽい表現" },
  ];

  const handleTranslate = async () => {
    if (input === "") {
      setOutput("");
      setTextColor("text-gray-400");
      return;
    }

    setIsLoading(true);
    setOutput("");

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
        setCurrentIndex(0); // 翻訳結果のインデックスをリセット
      } else {
        setOutput("翻訳に失敗しました。");
        setTextColor("text-red-500");
      }
    } catch (error) {
      console.error("Error:", error);
      setOutput("エラーが発生しました。");
      setTextColor("text-red-500");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-6 flex flex-col items-center text-black space-y-20">
      <img
        src="/title.svg" // 画像ファイルのパスを指定
        alt="つぶ訳"
        className="w-48 h-auto mb-4" // 必要に応じてサイズを調整
      />

      {/* スタイル選択 */}
      <div className="mb-6 w-full max-w-md">
        <label htmlFor="style-select" className="block mb-2 font-semibold text-black">
          変換スタイル
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
            className="p-4 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[180px] bg-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例）今日も全然集中できなかった…"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold">変換されたつぶやき</label>
          <div className={`p-4 border rounded-xl bg-white min-h-[180px] whitespace-pre-wrap ${textColor}`}>
            {isLoading ? <LoadingDots /> : (output[currentIndex] || "ここに翻訳結果が表示されます")}
          </div>
          {/* 翻訳候補のナビゲーション */}
          {output.length > 1 && (
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                disabled={currentIndex === 0}
              >
                前へ
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev < output.length - 1 ? prev + 1 : prev))}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                disabled={currentIndex === output.length - 1}
              >
                次へ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ボタン・ツイート */}
      <div className="flex items-center gap-4 mt-9 flex-wrap justify-center w-full max-w-md">
        <button
          onClick={handleTranslate}
          className="mt-4 bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition w-full max-w-md font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "翻訳中..." : "翻訳する"}
        </button>

        <TweetComposer textToTweet={output[currentIndex] || ""} />
      </div>
    </div>
  );
}
