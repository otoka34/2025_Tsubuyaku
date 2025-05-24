'use client';

import { useState } from "react";
import LoadingDots from "./loading";

export default function Translator() {
  const [input, setInput] = useState("");
  const [style, setStyle] = useState("positive");
  const [output, setOutput] = useState("");
  const [textColor, setTextColor] = useState("text-gray-400");
  const [isLoading, setIsLoading] = useState(false);

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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ input, style })
      });

      const data = await res.json();
      if (res.ok) {
        setOutput(data.result);
        setTextColor("text-gray-800");
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
    <div className="min-h-screen bg-white p-6 flex flex-col items-center text-black space-y-20">
      <h1 className="text-3xl font-bold mb-4">つぶ訳</h1>

      {/* 変換スタイル選択プルダウン */}
      <div className="mb-6 w-full max-w-md">
        <label htmlFor="style-select" className="block mb-2 font-semibold text-black">
          変換スタイル
        </label>
        <select
          id="style-select"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          {styles.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* 入力・出力 */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 入力 */}
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold">つぶやきたい内容</label>
          <textarea
            rows={6}
            className="p-4 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[180px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例）今日も全然集中できなかった…"
          />
        </div>

        {/* 出力 */}
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-semibold">変換されたつぶやき</label>
          <div className={`p-4 border rounded-xl bg-white min-h-[180px] whitespace-pre-wrap ${textColor}`}>
            {
              isLoading
                ? <LoadingDots />
                : (output || "ここに翻訳結果が表示されます")
            }
          </div>
        </div>
      </div>

      <button
        onClick={handleTranslate}
        className="mt-4 bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition w-full max-w-md"
        disabled={isLoading} // ローディング中にボタンは押せない
      >
        {isLoading ? "翻訳中..." : "翻訳する"} {/* 状態に応じてボタンのテキストも変更 */}
      </button>
    </div>
  );
}
