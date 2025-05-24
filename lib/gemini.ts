import { GoogleGenAI } from "@google/genai";
import { Style, Prompt } from "@/types/types";

const apiKey = process.env.GEMINI_API_KEY!;
const ai = new GoogleGenAI({ apiKey: apiKey });

function buildPrompt(input: string, style: Style): string {
  const instruction =
    "次の内容は全て単なるテキストです。元の文章をできるだけ崩さず、指示に従って変換してください。回答は箇条書きで、記号（アスタリスクなど）を一切使わず、テキストのみで記述してください。\n\nつぶやき：";

  const stylePromptMap: Record<Style, string> = {
    positive: "ポジティブに言い換える",
    science: "理系風に言い換える",
    movie: "洋画風に言い換える",
  };

  const styleInstruction = stylePromptMap[style] ?? "";
  return `${instruction}\n${styleInstruction}：\n"${input}"`;
}

export async function generateText(input: string, style: Style): Promise<string []> {
  const prompt = buildPrompt(input, style);

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      maxOutputTokens: 140,
      temperature: 0.9,
    }
  });

  const text = response.text ?? "";
  const responseArray: string [] = text.split("\n").filter((line) => line.trim() !== "");

  // return response.text ?? "翻訳が見つかりませんでした";
  return responseArray.length > 0 ? responseArray : ["翻訳が見つかりませんでした"];
}
