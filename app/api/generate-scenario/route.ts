import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "伺服器尚未設定 ANTHROPIC_API_KEY，請參考 README 設定環境變數。" },
      { status: 500 }
    );
  }

  const { topic } = await req.json();
  if (!topic || typeof topic !== "string") {
    return NextResponse.json({ error: "缺少主題" }, { status: 400 });
  }

  const prompt = `Create a 4-turn English roleplay dialogue for a Taiwanese English learner practicing casual conversation with a foreign friend, on this topic: "${topic}".
Respond ONLY with valid JSON, no markdown code fences, no preamble, in exactly this shape:
{
  "title": "8 Traditional Chinese characters or fewer, a title for the scenario",
  "subtitle": "a short one-line Traditional Chinese description",
  "partner": "a short Western first name for the conversation partner",
  "turns": [
    {
      "npc": "an English sentence the partner says",
      "options": [
        {"style":"authentic","text":"a natural, idiomatic English reply under 20 words","feedback":"Traditional Chinese feedback praising the natural, idiomatic style","delta":25},
        {"style":"neutral","text":"a plain, correct but generic English reply under 20 words","feedback":"Traditional Chinese feedback noting it's correct but plain","delta":10},
        {"style":"awkward","text":"a very short reply (1-3 words) that kills the conversation","feedback":"Traditional Chinese feedback explaining how to improve it","delta":-5}
      ]
    }
  ]
}
The "turns" array must contain exactly 4 items, forming a natural, flowing 4-turn conversation about the topic.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1800,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: "Anthropic API 呼叫失敗", detail: errText },
        { status: 502 }
      );
    }

    const data = await res.json();
    const textBlock = (data.content || []).find((b: any) => b.type === "text");
    if (!textBlock) {
      return NextResponse.json({ error: "回應中沒有文字內容" }, { status: 502 });
    }

    const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed.turns) || parsed.turns.length !== 4) {
      return NextResponse.json({ error: "生成內容格式不正確" }, { status: 502 });
    }

    return NextResponse.json(parsed);
  } catch (e: any) {
    return NextResponse.json(
      { error: "生成情境時發生錯誤", detail: String(e) },
      { status: 500 }
    );
  }
}
