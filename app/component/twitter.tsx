"use client";

import React from "react";
import { RiTwitterXLine } from "react-icons/ri";

interface TweetComposerProps {
  textToTweet: string; // 親から渡されるツイート用テキスト
}

const TweetComposer = ({ textToTweet }: TweetComposerProps) => {
  const text = textToTweet || ""; // undefined対策
  const truncatedText = text.length > 140 ? text.slice(0, 137) + "…" : text;

  // 入力テキストをURLエンコード
  const encodedText = encodeURIComponent(truncatedText);

  // Twitter投稿用のURLを作成（intent/tweet を使う）
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;

  return (

  <div className="flex items-center mt-2 flex-wrap justify-center w-full max-w-md">
    
    {/* 投稿ボタン3 */}
    <button
      onClick={() => window.open(tweetUrl)}
      className="cursor-pointer bg-white text-black px-4 py-2 rounded-full border border-black transition-transform duration-300 hover:scale-105 text-sm flex items-center justify-center gap-2"
    >
  <RiTwitterXLine className="text-xl bg-white text-black" />
  つぶやく
</button>

  </div>
  );
};

export default TweetComposer;

