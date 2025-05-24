"use client";

import React, { useState } from "react";
import { FaSquareXTwitter } from "react-icons/fa6";

interface TweetComposerProps {
  textToTweet: string; // 親から渡されるツイート用テキスト
}

const TweetComposer = ({ textToTweet }: TweetComposerProps) => {
  const [text, setText] = useState<string>(""); // 入力されたテキストをstateで管理

  // 入力テキストをURLエンコード
  const encodedText = encodeURIComponent(textToTweet);

  // Twitter投稿用のURLを作成（intent/tweet を使う）
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>

      {/* 投稿ボタン */}
      <a href={tweetUrl} target="_blank" rel="noopener noreferrer">
        <FaSquareXTwitter className="text-black w-40 h-12 transition-transform duration-300 hover:scale-110" />
        </a>
    </div>
  );
};

export default TweetComposer;

