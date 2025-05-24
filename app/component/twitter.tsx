"use client";

import React, { useState } from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";

interface TweetComposerProps {
  textToTweet: string; // 親から渡されるツイート用テキスト
}

const TweetComposer = ({ textToTweet }: TweetComposerProps) => {
  const [text, setText] = useState<string>(""); // 入力されたテキストをstateで管理
  const truncatedText =
    textToTweet.length > 140
      ? textToTweet.slice(0, 137) + "…" // 全体で140文字以内にするんかな？
      : textToTweet;

  // 入力テキストをURLエンコード
  const encodedText = encodeURIComponent(truncatedText);

  // Twitter投稿用のURLを作成（intent/tweet を使う）
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;

  return (
    <div
  style={{
    maxWidth: "600px",
    margin: "0 auto",
    padding: "1rem",
    display: "flex",          // 横並びにする
    gap: "1rem",              // ボタン間の間隔（任意）
    justifyContent: "center", // 中央揃え（任意）
  }}
>
  {/* 投稿ボタン1 */}
  <a href={tweetUrl} target="_blank" rel="noopener noreferrer">
    <FaSquareXTwitter className="text-black w-10 h-10 transition-transform duration-300 hover:scale-110" />
  </a>

  {/* 投稿ボタン2 */}
  <a href={tweetUrl} target="_blank" rel="noopener noreferrer">
    <FaTwitter className="text-blue-400 w-10 h-10 transition-transform duration-300 hover:scale-110" />
  </a>
</div>

  );
};

export default TweetComposer;

