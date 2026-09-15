"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Volume2,
  Star,
  Coffee,
  Music,
  Globe2,
  ArrowLeft,
  RotateCcw,
  Home,
  MessageCircle,
  Sparkles,
  ChevronRight,
  Mic,
  Plus,
  X,
  Loader2,
  Briefcase,
  Heart,
  Plane,
  MessagesSquare,
  LifeBuoy,
} from "lucide-react";

/* ---------------------------------- DATA ---------------------------------- */

const SCENARIOS = [
  {
    id: "icebreak",
    category: "基礎",
    title: "初次見面破冰",
    subtitle: "派對或咖啡廳，第一次自我介紹",
    icon: Coffee,
    accent: "bg-sky-400",
    accentSoft: "bg-sky-50",
    accentText: "text-sky-600",
    partner: "Alex",
    turns: [
      {
        npc: "Hey! I'm Alex. Nice to meet you! What's your name?",
        options: [
          {
            style: "authentic",
            text: "Hi Alex! I'm Penny, great to finally put a face to a name!",
            feedback: "太棒了！輕鬆帶點玩笑的說法，讓 Alex 覺得你很自然、很好聊 😄",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Hello, my name is Penny. Nice to meet you too.",
            feedback: "禮貌得體，但稍嫌正式，像教科書對話。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Hi.",
            feedback: "太簡短了！Alex 可能會覺得你不太想聊天，容易讓對話瞬間句點。",
            delta: -5,
          },
        ],
      },
      {
        npc: "So Penny, what do you like to do in your free time?",
        options: [
          {
            style: "authentic",
            text: "Oh, I'm kind of obsessed with baking lately — I burned a cake last week though!",
            feedback: "分享一點小糗事超加分！幽默又真實，讓人想繼續聊下去 🔥",
            delta: 25,
          },
          {
            style: "neutral",
            text: "I like reading books and watching movies.",
            feedback: "標準答案，安全但沒有記憶點。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Nothing special.",
            feedback: "這句話會讓對話很難接下去，試著加一個具體的興趣吧。",
            delta: -5,
          },
        ],
      },
      {
        npc: "That sounds fun! Do you come to these parties often?",
        options: [
          {
            style: "authentic",
            text: "Actually this is my first time — a friend dragged me here, haha!",
            feedback: "誠實又帶點自嘲，非常有親和力！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "No, not really. This is my second time.",
            feedback: "回答清楚，但可以再多補充一點。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "No.",
            feedback: "單字回答容易讓對方不知道怎麼接話。",
            delta: -5,
          },
        ],
      },
      {
        npc: "Well, I'm really glad you came! Maybe we could grab coffee sometime?",
        options: [
          {
            style: "authentic",
            text: "I'd love that! I actually know a great little café nearby.",
            feedback: "主動延續邀約，展現你也想繼續認識對方，完美收尾！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Sure, that would be nice.",
            feedback: "禮貌接受，但缺乏主動性。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Maybe.",
            feedback: "模稜兩可的回答，可能讓對方覺得你沒興趣。",
            delta: -5,
          },
        ],
      },
    ,
      {
        npc: "So, what's the story behind that jacket? It looks great on you.",
        options: [
          {
            style: "authentic",
            text: "Oh, this old thing? I actually got it at a night market back home — total bargain!",
            feedback: "分享一個小故事，讓稱讚變成聊天的橋樑，超自然！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Thanks, I got it a while ago.",
            feedback: "有回應但沒有延續話題的空間。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Thanks.",
            feedback: "單字回應會讓稱讚變成句點，試著加一句故事吧。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Well, it was really nice talking to you. Are you on Instagram? We should keep in touch.",
        options: [
          {
            style: "authentic",
            text: "For sure! Let's swap — I'll show you the café I was talking about earlier.",
            feedback: "主動連結先前聊過的話題，讓交換聯絡方式變得很自然！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Sure, that sounds good.",
            feedback: "禮貌接受，但可以更主動一點。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Okay, sure.",
            feedback: "太平淡的結尾，錯過留下深刻印象的機會。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "hobbies",
    category: "基礎",
    title: "分享週末與興趣",
    subtitle: "聊聊上週末做了什麼、互相推薦愛好",
    icon: Music,
    accent: "bg-lime-500",
    accentSoft: "bg-lime-50",
    accentText: "text-lime-600",
    partner: "Jamie",
    turns: [
      {
        npc: "Hey! How was your weekend?",
        options: [
          {
            style: "authentic",
            text: "Pretty great actually — I finally binge-watched that show everyone's been talking about!",
            feedback: "用『binge-watched』這種道地說法，對話立刻活起來！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "It was good. I stayed home and relaxed.",
            feedback: "平穩但普通，可以加點細節。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "It was okay.",
            feedback: "太籠統，對方不知道怎麼接下去。",
            delta: -5,
          },
        ],
      },
      {
        npc: "Nice! Have you seen any good movies or shows lately that you'd recommend?",
        options: [
          {
            style: "authentic",
            text: "Definitely — you have to watch it, the ending will blow your mind!",
            feedback: "熱情推薦、用了『blow your mind』這種道地說法，超有感染力！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yes, I watched a movie recently. It was good.",
            feedback: "太籠統，沒說片名容易冷場。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Not really.",
            feedback: "直接關閉話題，可惜了這個分享興趣的好機會。",
            delta: -5,
          },
        ],
      },
      {
        npc: "Cool! I love Taiwanese food by the way, any recommendations?",
        options: [
          {
            style: "authentic",
            text: "You have to try beef noodle soup — it's basically a national obsession here!",
            feedback: "分享在地知識又幽默，外國朋友超愛這種介紹方式。",
            delta: 25,
          },
          {
            style: "neutral",
            text: "You can try some Taiwanese snacks.",
            feedback: "有回答，但不夠具體。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't know.",
            feedback: "台灣人的美食百科被浪費了，試著推薦一道菜吧！",
            delta: -5,
          },
        ],
      },
      {
        npc: "That sounds amazing, I'll add it to my list! What music do you usually listen to?",
        options: [
          {
            style: "authentic",
            text: "Mostly City Pop and indie stuff — I'll send you a playlist if you want!",
            feedback: "主動提議分享歌單，互動感滿分！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "I listen to pop music sometimes.",
            feedback: "簡單但可以再展開一點。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Anything.",
            feedback: "太籠統，音樂話題就這樣結束了。",
            delta: -5,
          },
        ],
      },
    ,
      {
        npc: "Do you play any instruments or do anything creative on the side?",
        options: [
          {
            style: "authentic",
            text: "I've been teaching myself guitar — I'm terrible, but it's weirdly relaxing.",
            feedback: "自嘲式的誠實分享超可愛，讓對方也想聊聊自己笨拙的嘗試！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Not really, I'm not very artistic.",
            feedback: "誠實但有點消極，稍微可惜了延伸話題的機會。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "No.",
            feedback: "太簡短了，對方會不知道怎麼接。",
            delta: -5,
          }
        ],
      },
      {
        npc: "This has been such a fun conversation. We should hang out sometime!",
        options: [
          {
            style: "authentic",
            text: "Definitely — how about that café I mentioned, this weekend?",
            feedback: "主動提出具體時間地點，把話題轉成真正的邀約，滿分收尾！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yeah, that would be nice.",
            feedback: "有回應但沒有推進到具體行動。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Maybe sometime.",
            feedback: "太模糊，對方可能覺得你只是在客套。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "culture",
    category: "基礎",
    title: "聊日常與文化差異",
    subtitle: "分享家鄉美食、台灣夜市，交換文化",
    icon: Globe2,
    accent: "bg-orange-400",
    accentSoft: "bg-orange-50",
    accentText: "text-orange-600",
    partner: "Sam",
    turns: [
      {
        npc: "So, where are you from originally?",
        options: [
          {
            style: "authentic",
            text: "I'm from Taiwan! Have you ever tried bubble tea? I promise it's life-changing.",
            feedback: "自信介紹家鄉特色，還帶邀請語氣，超吸引人！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "I'm from Taiwan.",
            feedback: "簡單明瞭，可以多補充一句。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Taiwan.",
            feedback: "單字回答顯得不太想深聊。",
            delta: -5,
          },
        ],
      },
      {
        npc: "I've heard of it! What's it actually like there?",
        options: [
          {
            style: "authentic",
            text: "Honestly, the night markets are the best part — amazing street food every night!",
            feedback: "生動描述、畫面感十足，讓對方很想追問更多。",
            delta: 25,
          },
          {
            style: "neutral",
            text: "It's a small island with a lot of good food.",
            feedback: "資訊正確但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "It's fine.",
            feedback: "太模糊，對方無法想像畫面。",
            delta: -5,
          },
        ],
      },
      {
        npc: "That sounds incredible! Is there a food you think everyone should try?",
        options: [
          {
            style: "authentic",
            text: "Stinky tofu — I know it sounds weird, but trust me, it's worth it!",
            feedback: "用『trust me』製造懸念又幽默，這正是道地聊天的精髓。",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Maybe some dumplings.",
            feedback: "安全牌回答，稍嫌保守。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't know, lots of things.",
            feedback: "太籠統，錯過分享文化亮點的機會。",
            delta: -5,
          },
        ],
      },
      {
        npc: "Now I really want to visit! What's your hometown famous for, culturally?",
        options: [
          {
            style: "authentic",
            text: "We celebrate Lunar New Year pretty big — think fireworks, red envelopes, and way too much food.",
            feedback: "具體又生動的文化分享，外國朋友會覺得跟你聊天很長知識！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "We have some traditional festivals.",
            feedback: "正確但不夠具體。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Not sure.",
            feedback: "文化交流的好機會，別讓它句點收場。",
            delta: -5,
          },
        ],
      },
    ,
      {
        npc: "What's something about your culture that foreigners usually get wrong?",
        options: [
          {
            style: "authentic",
            text: "People think all our food is spicy, but honestly a lot of it is pretty mild and sweet!",
            feedback: "糾正常見迷思又帶點幽默，會讓對方覺得跟你聊天長知識又有趣。",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Some things, I guess. It's hard to explain.",
            feedback: "有點模糊，錯過了分享具體文化細節的機會。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't know.",
            feedback: "這是展現文化驕傲的好機會，別讓它句點收場。",
            delta: -5,
          }
        ],
      },
      {
        npc: "I'd love to visit Taiwan one day. Any tips for a first-timer?",
        options: [
          {
            style: "authentic",
            text: "Come hungry, and bring an empty suitcase — you'll want to bring food home!",
            feedback: "幽默又實用的建議，讓對方超有畫面感，很想立刻訂機票！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Just try the local food and visit some temples.",
            feedback: "建議正確但比較制式，可以再更個人化一點。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I'm not sure, just look it up online.",
            feedback: "把話題推回去給對方，錯過展現在地知識的機會。",
            delta: -5,
          }
        ],
      }
    ],
  },
    {
    id: "work-meeting",
    category: "職場",
    title: "會議前閒聊暖場",
    subtitle: "跟外國同事在會議開始前輕鬆聊兩句",
    icon: Briefcase,
    accent: "bg-indigo-500",
    accentSoft: "bg-indigo-50",
    accentText: "text-indigo-600",
    partner: "Mike",
    turns: [
      {
        npc: "Hey, we've got a few minutes before the meeting starts. How's your week going?",
        options: [
          {
            style: "authentic",
            text: "Pretty hectic, but in a good way — we finally shipped that feature I mentioned last week!",
            feedback: "分享具體進度又帶點成就感，是很自然的職場開場方式。",
            delta: 25,
          },
          {
            style: "neutral",
            text: "It's fine, pretty busy.",
            feedback: "安全的回答，但沒有給對方可以接話的細節。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Busy.",
            feedback: "太簡短，職場閒聊也需要一點細節才不會冷場。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Nice, congrats! Are you dialing in from the office today or from home?",
        options: [
          {
            style: "authentic",
            text: "Home today — my cat keeps trying to join the call though, fair warning!",
            feedback: "幽默的小細節讓對話更輕鬆，也很適合破冰。",
            delta: 25,
          },
          {
            style: "neutral",
            text: "From home today.",
            feedback: "回答正確但稍嫌平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Home.",
            feedback: "單字回應讓職場閒聊顯得生硬。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Ha, noted! By the way, did you get a chance to look at the proposal I sent over?",
        options: [
          {
            style: "authentic",
            text: "Yes, I read through it this morning — I actually have a couple of questions for later.",
            feedback: "具體又主動，展現你有認真準備，職場信任感直接加分！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yes, I saw it.",
            feedback: "確認收到了，但沒有展現出投入感。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Not yet.",
            feedback: "誠實但缺乏後續，可以補一句什麼時候會看。",
            delta: -5,
          }
        ],
      },
      {
        npc: "No worries, we can go through it together. Ready to hop on the call?",
        options: [
          {
            style: "authentic",
            text: "Ready when you are — thanks for looping me in early!",
            feedback: "正面又感謝對方，替會議開了一個好的開始。",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Sure, let's go.",
            feedback: "簡潔但少了一點溫度。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Okay.",
            feedback: "太平淡，職場互動也可以有點人情味。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "By the way, are you free for a quick sync after this to go over the timeline?",
        options: [
          {
            style: "authentic",
            text: "Sure am, I actually blocked out time right after just in case!",
            feedback: "展現超前部署又主動配合，讓同事覺得你很好合作！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Sure, I should be free.",
            feedback: "回答正確但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Maybe, I'll check.",
            feedback: "顯得不太確定，可以更明確一點。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Perfect, I'll send an invite. Thanks for being so easy to work with!",
        options: [
          {
            style: "authentic",
            text: "Anytime — honestly this is one of the smoothest projects I've worked on so far.",
            feedback: "真誠稱讚合作過程，讓職場關係更加分，完美收尾！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "No problem, thanks.",
            feedback: "禮貌但比較公式化。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Okay.",
            feedback: "太簡短，職場互動值得多一點溫度。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "work-lunch",
    category: "職場",
    title: "邀約同事午餐",
    subtitle: "主動邀請新同事一起吃午餐、拉近關係",
    icon: Briefcase,
    accent: "bg-indigo-500",
    accentSoft: "bg-indigo-50",
    accentText: "text-indigo-600",
    partner: "Nora",
    turns: [
      {
        npc: "Hey, I don't think we've officially met — I just joined the design team.",
        options: [
          {
            style: "authentic",
            text: "Welcome aboard! I'm Penny from production planning — a few of us usually grab lunch around noon, want to join?",
            feedback: "熱情歡迎又直接發出邀約，是拉近新同事關係最自然的方式！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Nice to meet you. Welcome to the company.",
            feedback: "禮貌但比較被動，沒有主動延伸互動。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Hi.",
            feedback: "太簡短，新同事可能會覺得不太受歡迎。",
            delta: -5,
          }
        ],
      },
      {
        npc: "That would be great, thanks! Any recommendations nearby?",
        options: [
          {
            style: "authentic",
            text: "There's a noodle place two blocks away that's basically our team's second office.",
            feedback: "用幽默的方式介紹地點，讓對方馬上有畫面又想去！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "There are a few places nearby, I can show you.",
            feedback: "有幫助但可以更具體一點。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't really know, sorry.",
            feedback: "錯過展現在地熟悉度、建立信任感的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Sounds perfect. So how long have you been with the company?",
        options: [
          {
            style: "authentic",
            text: "Almost 20 years now — I've basically seen this place grow up!",
            feedback: "分享年資又帶點自豪感，很自然地讓對方對你產生興趣。",
            delta: 25,
          },
          {
            style: "neutral",
            text: "A pretty long time.",
            feedback: "回答模糊，錯過分享故事的機會。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "A while.",
            feedback: "太籠統，新同事會不知道怎麼繼續問。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Wow, that's impressive! You must have seen a lot of changes here.",
        options: [
          {
            style: "authentic",
            text: "Definitely — remind me to tell you about the systems we used to use, you won't believe it!",
            feedback: "留下懸念、邀請對方繼續聊，完美延續話題！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yeah, quite a few changes.",
            feedback: "有回應但沒有延續下去的鉤子。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Yeah.",
            feedback: "太簡短，容易讓對話突然停住。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "This noodle place is amazing, thanks for bringing me here!",
        options: [
          {
            style: "authentic",
            text: "Right?! I basically converted half the team into regulars here.",
            feedback: "幽默又展現你的社交影響力，讓新同事覺得你很有趣！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Glad you like it.",
            feedback: "回應簡短，可以再多分享一點。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Yeah, it's fine.",
            feedback: "反應平淡，容易讓氣氛冷下來。",
            delta: -5,
          }
        ],
      },
      {
        npc: "I really appreciate you showing me around today. It means a lot as the new person.",
        options: [
          {
            style: "authentic",
            text: "Of course, we've all been the new person before — just ask me anything anytime!",
            feedback: "展現同理心又給予開放邀請，是建立信任最好的方式！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "No problem, happy to help.",
            feedback: "禮貌但比較公式化。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Sure, no big deal.",
            feedback: "顯得有點輕描淡寫，錯過建立更深連結的機會。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "work-newhire",
    category: "職場",
    title: "新同事自我介紹",
    subtitle: "你是新人，第一天跟外國主管與同事介紹自己",
    icon: Briefcase,
    accent: "bg-indigo-500",
    accentSoft: "bg-indigo-50",
    accentText: "text-indigo-600",
    partner: "Chris",
    turns: [
      {
        npc: "Welcome to the team! Why don't you tell us a bit about yourself?",
        options: [
          {
            style: "authentic",
            text: "Thanks for having me! I've been in production planning for almost 20 years, and I'm excited to bring that experience here.",
            feedback: "簡潔有力又展現價值，是自我介紹的完美開場！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Hi, I'm Penny. I work in production planning.",
            feedback: "資訊正確但比較制式，可以再加一點個人色彩。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Hi, nice to meet you all.",
            feedback: "太籠統，錯過了讓大家記住你的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "That's great experience! What are you most looking forward to in this role?",
        options: [
          {
            style: "authentic",
            text: "Honestly, I'm excited to learn how things are done differently here — I love comparing notes.",
            feedback: "展現學習心態又謙虛，讓團隊覺得你很好合作！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "I'm looking forward to learning more about the job.",
            feedback: "安全的答案，但缺乏個人特色。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Not sure yet.",
            feedback: "顯得沒有準備，可以再多想一句話回應。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Love that attitude. If you ever have questions, my door's always open.",
        options: [
          {
            style: "authentic",
            text: "I really appreciate that — I'll probably take you up on it more than you expect!",
            feedback: "幽默又真誠地回應，讓主管覺得你很好相處。",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Thank you, I appreciate it.",
            feedback: "禮貌但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Okay, thanks.",
            feedback: "太簡短，錯過建立好印象的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "No problem at all. Anything you'd like to know about the team before we wrap up?",
        options: [
          {
            style: "authentic",
            text: "Actually yes — what does a typical week usually look like for this team?",
            feedback: "主動提問展現積極度，是留下好印象的完美收尾！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Not really, I think I'm good for now.",
            feedback: "禮貌但錯過了展現好奇心的機會。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "No.",
            feedback: "太簡短，容易讓主管覺得你不夠投入。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "Great question — usually it's a mix of planning meetings and hands-on problem solving.",
        options: [
          {
            style: "authentic",
            text: "That sounds like a good balance, I'm looking forward to jumping in.",
            feedback: "正面又展現準備好投入的態度，讓團隊對你更有信心！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Okay, sounds good.",
            feedback: "回應安全但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Okay.",
            feedback: "太簡短，第一天留下的印象很重要。",
            delta: -5,
          }
        ],
      },
      {
        npc: "We're glad to have you. Welcome to the team, officially!",
        options: [
          {
            style: "authentic",
            text: "Thank you, I'm really glad to be here — let's make this a great year!",
            feedback: "熱情又正面的回應，是新人第一天最好的結尾！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Thanks, looking forward to it.",
            feedback: "禮貌但比較普通。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Thanks.",
            feedback: "太簡短，第一天的好印象值得更多溫度。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "dating-match",
    category: "交友",
    title: "滑到心動對象",
    subtitle: "配對成功後，如何開啟第一句話不尷尬",
    icon: Heart,
    accent: "bg-rose-400",
    accentSoft: "bg-rose-50",
    accentText: "text-rose-600",
    partner: "Ryan",
    turns: [
      {
        npc: "Hey! Love your profile — that hiking photo looks amazing. Where was that taken?",
        options: [
          {
            style: "authentic",
            text: "Thanks! That's actually near where I live — I go almost every weekend, it's basically my therapy.",
            feedback: "分享個人習慣又幽默，讓對話立刻有話題可以延伸！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Thanks, it was somewhere near my hometown.",
            feedback: "有回應但比較模糊，少了個人色彩。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Thanks.",
            feedback: "太簡短，配對後的第一句話很重要，別浪費機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Nice, I love hiking too! Do you have a favorite trail?",
        options: [
          {
            style: "authentic",
            text: "There's one with a waterfall halfway up — perfect excuse for a snack break, honestly.",
            feedback: "生動又幽默的描述，讓對方很想繼續問下去！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "A few, I don't really have a favorite.",
            feedback: "回答安全但缺乏記憶點。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Not really.",
            feedback: "容易讓對話冷掉，可以補一句別的興趣。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Snack breaks are the best part of hiking, honestly. So what do you do for work?",
        options: [
          {
            style: "authentic",
            text: "I work in production planning — basically I make sure factories don't run out of parts, very glamorous!",
            feedback: "用幽默自嘲介紹工作，讓職業聽起來也很有趣！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "I work in manufacturing, production planning.",
            feedback: "資訊正確但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Just a regular office job.",
            feedback: "太模糊，容易讓對方失去繼續聊下去的興趣。",
            delta: -5,
          }
        ],
      },
      {
        npc: "That actually sounds really interesting! Would you want to grab coffee sometime and tell me more?",
        options: [
          {
            style: "authentic",
            text: "I'd love that — I know a great little place, I'll send you the name!",
            feedback: "主動且具體地推進約會，展現你也很有興趣！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Sure, that sounds nice.",
            feedback: "禮貌接受，但比較被動。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Maybe, we'll see.",
            feedback: "模稜兩可的回答可能讓對方覺得你沒那麼感興趣。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "By the way, I have to ask — coffee or tea person?",
        options: [
          {
            style: "authentic",
            text: "Coffee, no question — I've tried to quit twice and failed both times, haha.",
            feedback: "幽默自嘲又真實，讓對話輕鬆又有記憶點！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Coffee, I guess.",
            feedback: "回應正確但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Doesn't matter to me.",
            feedback: "太隨意，錯過展現個性的小機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Ha, I respect the honesty! Okay, I'm really looking forward to that coffee then.",
        options: [
          {
            style: "authentic",
            text: "Me too, honestly — this has been one of my favorite conversations in a while.",
            feedback: "真誠又溫暖的回應，讓對方對這次約會更加期待！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Me too, see you soon.",
            feedback: "禮貌但比較普通。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Yeah, sure, bye.",
            feedback: "顯得有點冷淡，錯過留下好印象的機會。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "dating-interest",
    category: "交友",
    title: "從共同興趣聊起",
    subtitle: "發現彼此都喜歡同一部電影或音樂，順勢延續話題",
    icon: Heart,
    accent: "bg-rose-400",
    accentSoft: "bg-rose-50",
    accentText: "text-rose-600",
    partner: "Emma",
    turns: [
      {
        npc: "Wait, you like that band too?! I thought I was the only one who knew them.",
        options: [
          {
            style: "authentic",
            text: "No way, we're basically the same person! Have you seen them live yet?",
            feedback: "興奮又延續話題的提問，讓對話馬上有能量！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yeah, I like a few of their songs.",
            feedback: "回應正確但比較保守，少了熱情感。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Yeah, they're okay I guess.",
            feedback: "語氣冷淡，容易讓對方誤會你興趣不大。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Not yet, but it's on my bucket list. Any album you'd recommend to start with?",
        options: [
          {
            style: "authentic",
            text: "Definitely start with their early stuff — it's rawer, and honestly it's my go-to when I need to think.",
            feedback: "具體推薦又分享個人習慣，展現真誠的興趣分享！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Maybe just look up their greatest hits.",
            feedback: "有幫助但比較公式化。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't really know, just pick anything.",
            feedback: "把問題丟回去，錯過展現熱情的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "I'll check that out tonight! What else are you into besides music?",
        options: [
          {
            style: "authentic",
            text: "I'm honestly a bit of a foodie — always hunting for the next hidden gem restaurant.",
            feedback: "自然轉換話題又展現個性，讓對話更立體！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "I like watching movies sometimes.",
            feedback: "安全的回答，但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Not much else really.",
            feedback: "太籠統，容易讓對話停在原地。",
            delta: -5,
          }
        ],
      },
      {
        npc: "A foodie! Okay now I really want to know your favorite spot.",
        options: [
          {
            style: "authentic",
            text: "There's this tiny dumpling place that doesn't even have a sign — I'll take you there sometime!",
            feedback: "神秘又吸引人的描述，順勢帶出約會邀約，超自然！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "There are a few good places, hard to pick one.",
            feedback: "有回應但沒有明確方向，稍嫌可惜。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't remember the name.",
            feedback: "錯過把話題推向約會的好機會。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "Okay be honest, do you have a guilty pleasure song you'd never admit to liking?",
        options: [
          {
            style: "authentic",
            text: "Oh absolutely, there's a boy band song I still know every word to — don't judge me.",
            feedback: "誠實又幽默，讓對話瞬間變得親密又有趣！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Not really, I like most music.",
            feedback: "回答安全但少了個人色彩。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "No, not really.",
            feedback: "太保守，錯過展現真實個性的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Ha, no judgment here, promise! This has been such a fun chat.",
        options: [
          {
            style: "authentic",
            text: "Same here — I feel like I could talk to you for hours, honestly.",
            feedback: "真誠表達好感又不會太用力，完美的對話節奏！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yeah, it's been nice talking.",
            feedback: "禮貌但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Yeah, I guess.",
            feedback: "顯得沒那麼投入，容易讓對方失去興致。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "dating-firstmeet",
    category: "交友",
    title: "第一次約出來見面",
    subtitle: "線上聊得不錯，準備約時間地點碰面",
    icon: Heart,
    accent: "bg-rose-400",
    accentSoft: "bg-rose-50",
    accentText: "text-rose-600",
    partner: "Leo",
    turns: [
      {
        npc: "I feel like we've been chatting for a while now — want to meet up sometime?",
        options: [
          {
            style: "authentic",
            text: "I was actually about to suggest the same thing! How does this weekend work for you?",
            feedback: "主動又同步對方的心意，展現自信又不做作！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Sure, that could be nice.",
            feedback: "禮貌但被動，沒有主動推進。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Maybe, I'm pretty busy.",
            feedback: "顯得猶豫，容易讓對方覺得你興趣不高。",
            delta: -5,
          }
        ],
      },
      {
        npc: "This weekend works! Any place you'd like to go, or should I pick?",
        options: [
          {
            style: "authentic",
            text: "I know a cozy café with great coffee and even better people-watching — sound good?",
            feedback: "具體又有畫面感的建議，讓約會計畫立刻成形！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Wherever you like, I'm easy.",
            feedback: "禮貌但少了個人主見，稍嫌普通。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't really mind.",
            feedback: "太被動，錯過展現個性的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Sounds perfect. I'm a little nervous, not going to lie!",
        options: [
          {
            style: "authentic",
            text: "Same here, honestly — but I think that just means we both actually care, right?",
            feedback: "誠實又貼心的回應，瞬間拉近彼此距離！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Don't worry, it'll be fine.",
            feedback: "安慰但有點制式，少了共鳴感。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Why would you be nervous?",
            feedback: "顯得不太理解對方感受，容易讓氣氛尷尬。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Ha, that's a good way to put it. Okay, see you Saturday then?",
        options: [
          {
            style: "authentic",
            text: "Can't wait — I'll text you when I'm on my way!",
            feedback: "熱情又具體的收尾，讓對方感受到你真的很期待！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Okay, see you then.",
            feedback: "禮貌但稍嫌平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Okay.",
            feedback: "太簡短，約會前的最後一句話值得更多溫度。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "Quick question, is there anything you don't eat? Just so I can pick somewhere good.",
        options: [
          {
            style: "authentic",
            text: "Pretty much open to anything, but I have a weak spot for anything with cheese.",
            feedback: "具體又幽默，讓對方更容易挑到讓你驚喜的地方！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Not really, I eat most things.",
            feedback: "回答安全但比較普通。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't know, you choose.",
            feedback: "把選擇權完全丟出去，錯過展現個性的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Noted, cheese it is then! I'll message you the address closer to the time.",
        options: [
          {
            style: "authentic",
            text: "Perfect, I'm already looking forward to it — see you Saturday!",
            feedback: "熱情期待又明確回應，完美收尾整段約會前的鋪陳！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Okay, sounds good, see you then.",
            feedback: "禮貌但稍嫌平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Okay, whatever works.",
            feedback: "顯得不太投入，容易讓對方降低期待。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "travel-airport",
    category: "旅遊",
    title: "機場問路搭車",
    subtitle: "抵達陌生城市機場，跟服務人員問路搭車",
    icon: Plane,
    accent: "bg-teal-500",
    accentSoft: "bg-teal-50",
    accentText: "text-teal-600",
    partner: "Grace",
    turns: [
      {
        npc: "Hi there, can I help you find something?",
        options: [
          {
            style: "authentic",
            text: "Yes please, I just landed and I'm a bit lost — where's the best way to get downtown?",
            feedback: "誠實又具體地說明狀況，讓對方能精準幫忙，超實用！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yes, I need to go downtown.",
            feedback: "有說清楚需求，但可以再多一點禮貌開場。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Downtown, how?",
            feedback: "太直接，缺少禮貌開場容易顯得唐突。",
            delta: -5,
          }
        ],
      },
      {
        npc: "No problem! You can take the airport train, it's the fastest option. Do you have a map?",
        options: [
          {
            style: "authentic",
            text: "I don't, actually — could you point me toward where I'd buy a ticket?",
            feedback: "誠實又進一步詢問，展現你真的想解決問題！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "No, but I'll figure it out.",
            feedback: "禮貌但可能讓自己更難找到方向。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "No.",
            feedback: "太簡短，錯過取得更多幫助的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Sure, it's just down this hall, past the coffee shop. Is this your first time here?",
        options: [
          {
            style: "authentic",
            text: "It is! I've heard so many good things about this city, I can't wait to explore.",
            feedback: "熱情又正面，讓當地人也感染你的興奮感！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yes, first time.",
            feedback: "回答正確但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Yeah.",
            feedback: "太簡短，可以順勢多聊兩句展現親和力。",
            delta: -5,
          }
        ],
      },
      {
        npc: "You'll love it! Anything in particular you're excited to see?",
        options: [
          {
            style: "authentic",
            text: "Honestly, mostly the food — I've already made a list of places to try!",
            feedback: "具體又生動，讓對方更容易給你在地建議！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Just sightseeing, I guess.",
            feedback: "回答籠統，少了讓對方能延伸建議的細節。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Not sure yet.",
            feedback: "錯過取得在地人推薦的好機會。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "Well, enjoy your stay! The ticket machines are right around the corner.",
        options: [
          {
            style: "authentic",
            text: "Thank you so much, you've been incredibly helpful — I hope the rest of your day goes well too!",
            feedback: "真誠道謝又回饋善意，讓互動留下溫暖的印象！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Thanks a lot.",
            feedback: "禮貌但比較簡短。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Thanks.",
            feedback: "太簡短，可以再多表達一點感謝。",
            delta: -5,
          }
        ],
      },
      {
        npc: "No problem at all, safe travels!",
        options: [
          {
            style: "authentic",
            text: "Thanks again, this was such a great first impression of the city already!",
            feedback: "正面又真誠地總結這段互動，是很棒的旅遊開場！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Thanks, bye.",
            feedback: "禮貌但比較公式化。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Bye.",
            feedback: "太簡短，錯過留下溫暖印象的機會。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "travel-restaurant",
    category: "旅遊",
    title: "餐廳點餐與推薦",
    subtitle: "在異國餐廳點餐，跟服務生互動並詢問推薦",
    icon: Plane,
    accent: "bg-teal-500",
    accentSoft: "bg-teal-50",
    accentText: "text-teal-600",
    partner: "Daniel",
    turns: [
      {
        npc: "Welcome! First time here, or do you already know what you're craving?",
        options: [
          {
            style: "authentic",
            text: "First time actually — what would you recommend for someone who loves spicy food?",
            feedback: "誠實又具體提問，讓服務生能精準推薦，展現互動感！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "First time. What's good here?",
            feedback: "有問但稍嫌簡短，可以更具體一點。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't know, surprise me.",
            feedback: "太隨性，服務生可能不知道怎麼幫你。",
            delta: -5,
          }
        ],
      },
      {
        npc: "In that case, you have to try our house special curry. Any dietary restrictions?",
        options: [
          {
            style: "authentic",
            text: "None at all, I'll try anything once — that curry sounds perfect!",
            feedback: "熱情回應又展現開放態度，讓互動更愉快！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "No restrictions, that sounds fine.",
            feedback: "回答正確但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "No.",
            feedback: "太簡短，錯過表現熱情的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Great choice, coming right up! Anything to drink with that?",
        options: [
          {
            style: "authentic",
            text: "What do you usually recommend to go with something spicy?",
            feedback: "順勢延續互動、請對方推薦，讓服務生更樂意幫忙！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Just water, thanks.",
            feedback: "簡單明確，但錯過多聊一句的機會。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Whatever.",
            feedback: "顯得漫不經心，容易讓互動變冷淡。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Good call, our iced tea pairs really well with it. Anything else I can grab you?",
        options: [
          {
            style: "authentic",
            text: "That's perfect, thank you so much for the recommendations — really appreciate it!",
            feedback: "真誠道謝，讓整個互動留下溫暖的印象！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "No, that's all, thanks.",
            feedback: "禮貌但比較公式化。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "No.",
            feedback: "太簡短，容易顯得不太有禮貌。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "Here you go, one spicy curry! Let me know if it's too much for you.",
        options: [
          {
            style: "authentic",
            text: "Thank you, it smells incredible already — I'm sure it'll be perfect!",
            feedback: "熱情又真誠的反應，讓服務生也感受到你的好心情！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Thanks, looks good.",
            feedback: "禮貌但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Okay.",
            feedback: "太簡短，用餐互動也可以多一點溫度。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Enjoy your meal! Let me know if you'd like anything else.",
        options: [
          {
            style: "authentic",
            text: "Will do, thank you so much for all the great recommendations tonight!",
            feedback: "真誠道謝又總結整段互動，留下美好的用餐體驗！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Thanks, will do.",
            feedback: "禮貌但比較公式化。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Okay, thanks.",
            feedback: "太簡短，可以再多表達一點感謝。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "travel-host",
    category: "旅遊",
    title: "跟民宿主人聊天",
    subtitle: "入住民宿，跟主人閒聊當地生活與旅遊建議",
    icon: Plane,
    accent: "bg-teal-500",
    accentSoft: "bg-teal-50",
    accentText: "text-teal-600",
    partner: "Sophie",
    turns: [
      {
        npc: "Welcome, come on in! How was your trip getting here?",
        options: [
          {
            style: "authentic",
            text: "Long but smooth, thanks! I'm just excited to finally be here after months of planning.",
            feedback: "誠實分享又展現期待感，讓主人立刻感受到你的熱情！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "It was okay, a bit tiring.",
            feedback: "誠實但稍嫌平淡，可以再補一句期待感。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Fine.",
            feedback: "太簡短，入住第一句話值得多一點溫度。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Glad you made it! Is this your first time visiting the area?",
        options: [
          {
            style: "authentic",
            text: "It is! I've wanted to come here for years, so I've got a long list of places to check out.",
            feedback: "熱情又具體，讓主人更願意給你在地建議！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yes, first time here.",
            feedback: "回答正確但比較簡單。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Yeah.",
            feedback: "太簡短，錯過取得旅遊建議的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "You picked a great time to visit. Anything I can recommend nearby?",
        options: [
          {
            style: "authentic",
            text: "Actually yes — where do locals go that tourists usually miss?",
            feedback: "問出很聰明的問題，讓你得到真正在地的建議！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Just the usual tourist spots, I guess.",
            feedback: "回答平淡，錯過取得獨家建議的機會。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Not really, I'll just look it up.",
            feedback: "婉拒了主人的好意，容易顯得有點冷淡。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Good question! There's a small market two streets over that most tourists never find.",
        options: [
          {
            style: "authentic",
            text: "That sounds perfect, exactly the kind of place I was hoping to discover!",
            feedback: "真誠又熱情的回應，讓主人覺得推薦值得，互動更溫暖！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Okay, I'll check it out.",
            feedback: "禮貌但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Okay, maybe.",
            feedback: "顯得沒興趣，容易讓主人不想繼續推薦。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "There's also a great little bakery right next to it, if you're an early riser.",
        options: [
          {
            style: "authentic",
            text: "I love that, I'll definitely make it part of my morning routine while I'm here!",
            feedback: "熱情回應又展現你會善用建議，讓主人更樂意繼續分享！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Okay, I'll check it out.",
            feedback: "禮貌但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Maybe, we'll see.",
            feedback: "顯得不太積極，容易讓主人少了分享的動力。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Well, I'll let you get settled in. Let me know if you need anything at all!",
        options: [
          {
            style: "authentic",
            text: "Thank you so much, this already feels like the perfect start to the trip!",
            feedback: "真誠又溫暖的道謝，為整趟旅程開了一個好的開始！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Thanks, I will.",
            feedback: "禮貌但比較公式化。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Okay, thanks.",
            feedback: "太簡短，錯過表達感謝的機會。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "deep-worklife",
    category: "深聊",
    title: "聊工作壓力與生活平衡",
    subtitle: "跟朋友聊聊最近的工作壓力，交換調適方式",
    icon: MessagesSquare,
    accent: "bg-fuchsia-500",
    accentSoft: "bg-fuchsia-50",
    accentText: "text-fuchsia-600",
    partner: "Olivia",
    turns: [
      {
        npc: "You seem a little tired lately, is everything okay at work?",
        options: [
          {
            style: "authentic",
            text: "Yeah, honestly it's just been a busy season — I'm trying to remember to actually take breaks!",
            feedback: "誠實分享又帶點自我覺察，讓對方感受到真誠而不是抱怨。",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Work's been busy, I'm just tired.",
            feedback: "誠實但比較簡短，可以再多分享一點。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "It's fine, don't worry about it.",
            feedback: "把話題擋回去，容易讓真正關心你的朋友覺得被推開。",
            delta: -5,
          }
        ],
      },
      {
        npc: "I get that. Do you have anything that helps you unwind after a long day?",
        options: [
          {
            style: "authentic",
            text: "Honestly, just a walk without my phone does wonders — sounds simple but it really works.",
            feedback: "分享具體又實用的方法，讓對話變得真誠又有幫助！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Not really, I just try to rest.",
            feedback: "回答誠實但比較籠統。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Not really, I just power through it.",
            feedback: "顯得有點忽略自己的感受，可惜錯過交流調適方式的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "That sounds nice, I should try that too. How do you know when it's time to actually slow down?",
        options: [
          {
            style: "authentic",
            text: "Usually when I start snapping at little things — that's my sign I need a proper break.",
            feedback: "誠實又有自我覺察的回答，讓對話更深入也更真誠。",
            delta: 25,
          },
          {
            style: "neutral",
            text: "I guess when I feel really tired.",
            feedback: "回答安全但比較表面。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't really think about it.",
            feedback: "錯過深入交流的機會，讓對話停在表面。",
            delta: -5,
          }
        ],
      },
      {
        npc: "That's a good sign to watch for. Thanks for being open about it, by the way.",
        options: [
          {
            style: "authentic",
            text: "Of course — it's nice to actually talk about this stuff instead of just pretending everything's fine.",
            feedback: "真誠回應，讓這段對話有了溫度與信任感，完美收尾！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "No problem, thanks for listening.",
            feedback: "禮貌但比較公式化。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Yeah, sure.",
            feedback: "太簡短，讓這段真誠的對話顯得有點冷淡收尾。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "I think a lot of people forget that rest is productive too, honestly.",
        options: [
          {
            style: "authentic",
            text: "Exactly, I used to feel guilty resting, but I'm slowly getting better about it.",
            feedback: "誠實分享自己的轉變過程，讓對話更真摯也更有共鳴！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yeah, that's probably true.",
            feedback: "同意但比較表面，少了個人連結。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I guess so.",
            feedback: "回應平淡，錯過深入交流的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "That's real growth, honestly. I'm proud of you for noticing that about yourself.",
        options: [
          {
            style: "authentic",
            text: "Thank you, that actually means more than you know — I needed to hear that today.",
            feedback: "真誠又脆弱地接受對方的關心，讓友誼變得更深厚！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Thanks, that's nice of you to say.",
            feedback: "禮貌但比較公式化。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Thanks I guess.",
            feedback: "顯得有點冷淡，錯過真誠接受關心的機會。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "deep-future",
    category: "深聊",
    title: "聊未來規劃與夢想",
    subtitle: "跟朋友聊聊各自對未來的想像與計畫",
    icon: MessagesSquare,
    accent: "bg-fuchsia-500",
    accentSoft: "bg-fuchsia-50",
    accentText: "text-fuchsia-600",
    partner: "Ethan",
    turns: [
      {
        npc: "Can I ask you something? Where do you see yourself in like five years?",
        options: [
          {
            style: "authentic",
            text: "Honestly, still figuring it out — but I'd love to be doing something that actually lets me travel more.",
            feedback: "誠實又帶點憧憬，讓對話有真實感也容易引起共鳴。",
            delta: 25,
          },
          {
            style: "neutral",
            text: "I'm not sure, probably just working like now.",
            feedback: "誠實但比較消極，可以再補一點期待。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't really think about it.",
            feedback: "顯得有點迴避，錯過分享自己想法的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "That's a great goal. What's stopping you from starting on that now?",
        options: [
          {
            style: "authentic",
            text: "Mostly just being honest with myself about what I actually want, if I'm being real.",
            feedback: "誠實又有深度的回答，讓對話變得真摯而不是空泛。",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Just time and money, I guess.",
            feedback: "回答合理但比較表面。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Nothing really, I just haven't gotten around to it.",
            feedback: "顯得有點敷衍，錯過真誠交流的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "That's really honest of you to admit. Is there anything small you could do this year?",
        options: [
          {
            style: "authentic",
            text: "Actually yes — I've been thinking about picking up freelance work on the side to test the waters.",
            feedback: "具體又有行動力的回答，讓對話從空想變成真正的計畫！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Maybe, I haven't really planned anything.",
            feedback: "回答誠實但缺乏方向。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Not really.",
            feedback: "太簡短，錯過把夢想具體化的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "I love that plan. Whatever happens, I think you'll figure it out.",
        options: [
          {
            style: "authentic",
            text: "Thanks, that actually means a lot — it helps just saying it out loud to someone.",
            feedback: "真誠道謝又展現脆弱面，讓友誼更深厚，完美收尾！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Thanks, I hope so.",
            feedback: "禮貌但稍嫌平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Yeah, we'll see.",
            feedback: "顯得有點冷淡，錯過表達感謝的機會。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "I think testing the waters like that is such a smart move.",
        options: [
          {
            style: "authentic",
            text: "Thanks, I'm a little scared but also kind of excited to actually try it.",
            feedback: "誠實又展現雙面情緒，讓對話更真實也更打動人心！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yeah, hopefully it works out.",
            feedback: "回應合理但比較保守。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "We'll see, I guess.",
            feedback: "顯得有點消極，錯過展現真實情緒的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "It will, I really believe that. You've clearly thought this through.",
        options: [
          {
            style: "authentic",
            text: "That really means a lot coming from you, thank you for always believing in me.",
            feedback: "真誠表達感謝，讓這段關於未來的對話有了溫暖的收尾！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Thanks, I appreciate that.",
            feedback: "禮貌但比較公式化。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Thanks I guess.",
            feedback: "顯得有點冷淡，錯過表達真誠感謝的機會。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "deep-values",
    category: "深聊",
    title: "聊感情觀與價值觀",
    subtitle: "跟朋友聊聊對感情與人生價值觀的想法",
    icon: MessagesSquare,
    accent: "bg-fuchsia-500",
    accentSoft: "bg-fuchsia-50",
    accentText: "text-fuchsia-600",
    partner: "Mia",
    turns: [
      {
        npc: "Can I ask, what matters most to you in a relationship?",
        options: [
          {
            style: "authentic",
            text: "Honestly, just feeling like I can be completely myself without being judged for it.",
            feedback: "誠實又有深度的回答，讓對話立刻變得真摯！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "I guess just trust and communication.",
            feedback: "回答正確但比較教科書式。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I haven't really thought about it.",
            feedback: "顯得迴避，錯過深入交流的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "That's beautiful. Has that always been important to you, or did something change your view?",
        options: [
          {
            style: "authentic",
            text: "It really changed after a past relationship where I felt like I had to hide parts of myself.",
            feedback: "誠實分享過去經驗，讓對話更有故事性也更有共鳴！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "I guess I've always felt that way.",
            feedback: "回答安全但缺乏故事性。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Not really, I don't like talking about the past.",
            feedback: "設下界線是可以的，但也錯過了深化這段對話的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "That makes total sense. What do you think makes a friendship or relationship last?",
        options: [
          {
            style: "authentic",
            text: "Probably just showing up for each other, even when it's inconvenient.",
            feedback: "簡短卻有力的回答，展現你對關係的真實理解！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Just being kind to each other, I think.",
            feedback: "回答正確但比較普通。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't know, luck maybe.",
            feedback: "顯得有點消極，錯過分享真實想法的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "I really like that answer. Thanks for sharing all this with me, by the way.",
        options: [
          {
            style: "authentic",
            text: "Of course — conversations like this are honestly my favorite kind.",
            feedback: "真誠又溫暖的回應，讓這段深聊留下美好的句點！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "No problem, thanks for asking.",
            feedback: "禮貌但比較公式化。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Sure.",
            feedback: "太簡短，讓一段真誠的對話顯得草草收尾。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "I think showing up consistently is so underrated, honestly.",
        options: [
          {
            style: "authentic",
            text: "Totally agree, the small everyday things matter way more than grand gestures, I think.",
            feedback: "延伸對方的想法並補充自己的觀點，讓深聊更有層次！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yeah, that makes sense.",
            feedback: "同意但比較表面。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I guess so.",
            feedback: "回應平淡，錯過深化這段對話的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "I'm really glad we can talk about stuff like this so openly.",
        options: [
          {
            style: "authentic",
            text: "Me too, honestly, it's rare to find someone you can be this real with.",
            feedback: "真誠又溫暖的回應，為這段深聊留下美好的句點！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yeah, me too.",
            feedback: "禮貌但比較簡短。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Yeah, sure.",
            feedback: "太簡短，讓真誠的對話顯得有點冷淡收尾。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "rescue-silence",
    category: "救場",
    title: "話題突然冷場怎麼接",
    subtitle: "聊天中突然出現尷尬沉默，練習怎麼自然接話",
    icon: LifeBuoy,
    accent: "bg-amber-400",
    accentSoft: "bg-amber-50",
    accentText: "text-amber-600",
    partner: "Ben",
    turns: [
      {
        npc: "...",
        options: [
          {
            style: "authentic",
            text: "Okay, random thought — have you ever had one of those days where everything just feels a bit off?",
            feedback: "主動丟出一個開放式話題，成功打破沉默，超實用的救場技巧！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "So... anyway.",
            feedback: "有試著開口，但沒有給對方明確的話題可以接。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "(says nothing)",
            feedback: "沉默不打破的話，尷尬只會持續累積。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Ha, actually yeah, today's been one of those days. What's on your mind?",
        options: [
          {
            style: "authentic",
            text: "Honestly nothing serious, I just realized I've been rambling about my week this whole time!",
            feedback: "自嘲式的幽默化解尷尬，讓氣氛瞬間輕鬆起來！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Just work stuff, nothing important.",
            feedback: "有回應但沒有真的延續對話。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Nothing.",
            feedback: "太簡短，容易讓沉默再次出現。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Ha, no worries, I don't mind listening! Want to talk about something completely different instead?",
        options: [
          {
            style: "authentic",
            text: "Sure, let's do it — tell me something completely random about yourself.",
            feedback: "主動邀請對方開新話題，展現你很享受這段對話！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Sure, whatever you want.",
            feedback: "禮貌但比較被動。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't know, you pick.",
            feedback: "把選擇權完全丟回去，容易讓氣氛再次卡住。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Okay here's one: I once got lost in my own neighborhood for two hours. True story.",
        options: [
          {
            style: "authentic",
            text: "Okay that's amazing, I need the full story right now!",
            feedback: "熱情回應又要求細節，讓話題重新活起來，完美救場！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Haha, that's funny.",
            feedback: "有笑但沒有延續，話題可能又會冷下來。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Oh, okay.",
            feedback: "反應平淡，容易讓對方覺得分享沒被接住。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "Okay your turn, tell me something completely random about yourself too.",
        options: [
          {
            style: "authentic",
            text: "Alright, fair's fair — I once accidentally joined a conga line at a stranger's wedding.",
            feedback: "用同樣有趣的故事回應，讓氣氛徹底變得輕鬆又有趣！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "I don't really have a story like that.",
            feedback: "誠實但錯過延續輕鬆氣氛的機會。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I can't think of anything.",
            feedback: "容易讓話題再次卡住，氣氛回到尷尬。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Wait, a stranger's wedding?! Okay now I need the full story.",
        options: [
          {
            style: "authentic",
            text: "Long story short, wrong venue, right time, and nobody stopped me — best mistake ever.",
            feedback: "幽默又戲劇化的收尾，把整段對話從尷尬變成超有趣的回憶！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Haha, it's a long story.",
            feedback: "有笑點但沒有真的說完故事，稍嫌可惜。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "It's not that interesting really.",
            feedback: "自我貶低會讓氣氛又冷下來，錯過完美收尾的機會。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "rescue-topic",
    category: "救場",
    title: "聊錯話題想轉彎",
    subtitle: "不小心聊到尷尬或敏感話題，練習優雅轉移",
    icon: LifeBuoy,
    accent: "bg-amber-400",
    accentSoft: "bg-amber-50",
    accentText: "text-amber-600",
    partner: "Chloe",
    turns: [
      {
        npc: "Oh... I'd actually rather not talk about that, if that's okay.",
        options: [
          {
            style: "authentic",
            text: "Totally fair, sorry about that! Let's talk about something lighter — favorite comfort food?",
            feedback: "立刻尊重對方界線又順勢轉移話題，展現高情商！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Oh, okay, sorry.",
            feedback: "有道歉但沒有提供新話題，可能讓氣氛還是尷尬。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Oh. Okay.",
            feedback: "太簡短，尷尬會繼續懸在空氣中。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Ha, comfort food, I like that question! Mine's definitely instant noodles, no shame.",
        options: [
          {
            style: "authentic",
            text: "No shame at all, mine's basically anything with cheese on it, honestly.",
            feedback: "輕鬆延續話題又帶點幽默，成功把氣氛拉回輕鬆！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Mine's just regular food I guess.",
            feedback: "回應平淡，話題可能又會停滯。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't really have one.",
            feedback: "缺乏延續性，容易讓話題再次卡住。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Ha, fair enough! I feel like we got off to a rocky start, but this is much better.",
        options: [
          {
            style: "authentic",
            text: "Agreed, honestly it happens — I'd rather have an honest conversation than a perfect one.",
            feedback: "誠實又成熟的回應，讓對方對你的印象大加分！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yeah, it's better now.",
            feedback: "回應簡單，但可以更真誠一點。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Yeah, I guess.",
            feedback: "顯得敷衍，錯過修復關係的好機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "I appreciate that. So, tell me something that always makes you laugh?",
        options: [
          {
            style: "authentic",
            text: "Honestly, my own jokes — nobody else laughs at them but me, and I'm okay with that.",
            feedback: "自嘲又幽默，完美地把尷尬完全轉化成輕鬆的氣氛！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Just funny videos online, I guess.",
            feedback: "回答安全但比較普通。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't know, nothing really.",
            feedback: "回答太保守，錯過展現個性的機會。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "Cheese on everything, respect. Okay, favorite way to spend a lazy Sunday?",
        options: [
          {
            style: "authentic",
            text: "Honestly, doing absolutely nothing productive and loving every second of it.",
            feedback: "誠實又幽默，讓輕鬆的氣氛繼續延續下去！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Just relaxing at home I guess.",
            feedback: "回答安全但比較普通。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "I don't really have lazy Sundays.",
            feedback: "顯得有點防備，錯過延續輕鬆話題的機會。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Honestly, same. This turned into a really nice conversation.",
        options: [
          {
            style: "authentic",
            text: "It really did — I'm glad we just rolled with it instead of staying stuck.",
            feedback: "回顧整段對話又肯定彼此的努力，完美收尾這場救場練習！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yeah, it was nice.",
            feedback: "禮貌但比較平淡。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Yeah, I guess so.",
            feedback: "顯得有點冷淡，錯過肯定這段互動的機會。",
            delta: -5,
          }
        ],
      }
    ],
  },
  {
    id: "rescue-textback",
    category: "救場",
    title: "被已讀不回怎麼重新開口",
    subtitle: "傳訊息後對方已讀很久沒回，練習怎麼自然再開口",
    icon: LifeBuoy,
    accent: "bg-amber-400",
    accentSoft: "bg-amber-50",
    accentText: "text-amber-600",
    partner: "Jake",
    turns: [
      {
        npc: "(read, no reply for two days)",
        options: [
          {
            style: "authentic",
            text: "Hey! No worries if you've been busy — just wanted to say hi and see how you've been.",
            feedback: "低壓力又體貼的開場，不會讓對方感到被追問，超高情商！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Hey, did you see my last message?",
            feedback: "有點像在追問，可能會讓對方感到壓力。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Hello???",
            feedback: "帶著情緒的訊息容易讓對方更不想回覆。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Oh hey! Sorry, work's been insane. How have you been?",
        options: [
          {
            style: "authentic",
            text: "No worries at all! I've been good, actually just tried that restaurant we talked about.",
            feedback: "完全不放在心上又主動分享近況，讓對話自然重新開始！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "I've been fine, just been waiting to hear back.",
            feedback: "暗示了一點不滿，可能讓對方感到不自在。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Fine, whatever.",
            feedback: "帶著情緒的回應容易讓對話再次冷掉。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Oh nice, how was it? I've been wanting to try that place!",
        options: [
          {
            style: "authentic",
            text: "Honestly really good, you have to try their dumplings — I'll send you a photo!",
            feedback: "熱情分享又主動延續互動，讓對話重新變得有活力！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "It was okay, nothing special.",
            feedback: "回應平淡，錯過重新炒熱話題的機會。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "It was fine I guess.",
            feedback: "太籠統，話題可能又會停在這裡。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Now I definitely have to go! We should grab a table together sometime.",
        options: [
          {
            style: "authentic",
            text: "I'd love that — let me know when you're free and I'll book us a spot!",
            feedback: "主動又具體地推進計畫，把已讀不回的尷尬完全轉化成新的約會！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Sure, sounds good.",
            feedback: "禮貌接受但比較被動。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Maybe sometime.",
            feedback: "太模糊，容易讓對方覺得你沒有很想約。",
            delta: -5,
          }
        ],
      }
,
      {
        npc: "You always find the best places. Okay, I'm free this weekend if you are!",
        options: [
          {
            style: "authentic",
            text: "Perfect, I'll book us a table for Saturday — can't wait!",
            feedback: "主動又具體地推進計畫，完美把已讀不回的尷尬轉化成期待！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Sure, I'll check my schedule.",
            feedback: "禮貌但比較被動。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Maybe, I'll let you know.",
            feedback: "顯得猶豫，容易讓對方覺得你沒那麼有興趣。",
            delta: -5,
          }
        ],
      },
      {
        npc: "Sounds great, looking forward to it! Glad we're back on track.",
        options: [
          {
            style: "authentic",
            text: "Me too, honestly — I'm really glad you reached back out.",
            feedback: "真誠又溫暖的回應，讓整段修復關係的過程完美收尾！",
            delta: 25,
          },
          {
            style: "neutral",
            text: "Yeah, me too, see you Saturday.",
            feedback: "禮貌但比較公式化。",
            delta: 10,
          },
          {
            style: "awkward",
            text: "Yeah, okay, bye.",
            feedback: "太簡短，錯過表達真誠感受的機會。",
            delta: -5,
          }
        ],
      }
    ],
  },
];

const ICEBREAKERS = [
  "Hey, I don't think we've met — I'm [name]!",
  "This is a great party, right?",
  "I love your [jacket/shoes/bag] — where did you get it?",
  "What brings you here today?",
  "So, what do you do for fun?",
  "Have you tried the food here? It's amazing.",
  "I feel like I've seen you somewhere before!",
  "Mind if I join you?",
  "What's the best part of your day so far?",
  "I'm terrible at small talk, haha — how's it going?",
];

const TRANSITIONS = [
  "By the way, ...",
  "Speaking of which, ...",
  "That reminds me, ...",
  "Anyway, ...",
  "Oh, that's interesting! Actually, ...",
];

const STYLE_LABEL = {
  authentic: "幽默道地",
  neutral: "中規中矩",
  awkward: "容易句點",
};

/* ------------------------------- SPEECH HELPER ------------------------------ */

function speak(text) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.95;
  window.speechSynthesis.speak(utter);
}

function SpeakButton({ text, className = "" }) {
  const [supported] = useState(
    typeof window !== "undefined" && !!window.speechSynthesis
  );
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      disabled={!supported}
      aria-label="朗讀英文"
      className={
        "shrink-0 rounded-full p-1.5 transition active:scale-90 " +
        (supported
          ? "text-slate-400 hover:text-sky-500 hover:bg-sky-50"
          : "text-slate-200 cursor-not-allowed") +
        " " +
        className
      }
    >
      <Volume2 size={16} strokeWidth={2.2} />
    </button>
  );
}

/* --------------------------- PRONUNCIATION PRACTICE --------------------------- */

function scoreSimilarity(target, spoken) {
  const norm = (s) =>
    s
      .toLowerCase()
      .replace(/[^\w\s']/g, "")
      .split(/\s+/)
      .filter(Boolean);
  const t = norm(target);
  const s = norm(spoken);
  const freq = {};
  t.forEach((w) => (freq[w] = (freq[w] || 0) + 1));
  let match = 0;
  s.forEach((w) => {
    if (freq[w] > 0) {
      match++;
      freq[w]--;
    }
  });
  const precision = s.length ? match / s.length : 0;
  const recall = t.length ? match / t.length : 0;
  const f1 = precision + recall ? (2 * precision * recall) / (precision + recall) : 0;
  return Math.round(f1 * 100);
}

function MicPractice({ target }: { target: string }) {
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState<{ transcript: string; score: number | null } | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const forceStopRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recRef = useRef<any>(null);
  const settledRef = useRef(true);
  const lastTranscriptRef = useRef("");
  const win = typeof window !== "undefined" ? (window as any) : null;
  const supported = !!(win && (win.SpeechRecognition || win.webkitSpeechRecognition));

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (forceStopRef.current) clearTimeout(forceStopRef.current);
      if (recRef.current) {
        try {
          recRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  const clearTimers = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (forceStopRef.current) {
      clearTimeout(forceStopRef.current);
      forceStopRef.current = null;
    }
  };

  // Single source of truth for ending a recording attempt, no matter
  // which path triggers it (final result, error, browser's own onend,
  // or our own forced timeout). Guarded so it only ever runs once per
  // attempt, however many of those paths happen to fire.
  const finalize = () => {
    if (settledRef.current) return;
    settledRef.current = true;
    clearTimers();
    setListening(false);
    recRef.current = null;
    const transcript = lastTranscriptRef.current;
    setResult(
      transcript ? { transcript, score: scoreSimilarity(target, transcript) } : { transcript: "", score: null }
    );
  };

  const start = () => {
    if (!supported || listening) return;
    const SR = win.SpeechRecognition || win.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.continuous = false;
    settledRef.current = false;
    lastTranscriptRef.current = "";
    rec.onresult = (e: any) => {
      const last = e.results[e.results.length - 1];
      lastTranscriptRef.current = last[0].transcript;
      if (last.isFinal) finalize();
    };
    rec.onerror = finalize;
    rec.onend = finalize;
    setResult(null);
    setListening(true);
    recRef.current = rec;
    // Ultimate safety net: if the recognizer never even calls back at
    // all (permission silently blocked, browser bug), don't leave the
    // button locked forever.
    timeoutRef.current = setTimeout(finalize, 15000);
    try {
      rec.start();
    } catch (err) {
      // start() can throw synchronously (e.g. "already started" on some
      // mobile browsers) — reset immediately instead of leaving the
      // button locked.
      finalize();
    }
  };

  const stopManually = () => {
    // Don't wait for the browser's own silence-detection — end the
    // recording the moment the person taps again, which is far more
    // reliable and faster than automatic cutoff on mobile browsers.
    if (recRef.current) {
      try {
        recRef.current.stop();
      } catch (e) {
        finalize();
      }
    } else {
      finalize();
    }
    // Some mobile browsers silently swallow stop() and never fire
    // onend/onerror afterward. Force the UI to resolve within ~2s of
    // the tap regardless, using whatever transcript we already have.
    forceStopRef.current = setTimeout(finalize, 2000);
  };

  if (!supported) return null;

  return (
    <div className="mt-1.5 w-full max-w-[85%]">
      <button
        onClick={listening ? stopManually : start}
        className={
          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition active:scale-95 " +
          (listening
            ? "bg-rose-100 text-rose-500"
            : "bg-violet-100 text-violet-600 hover:bg-violet-200")
        }
      >
        <Mic size={13} className={listening ? "animate-pulse" : ""} />
        {listening ? "念完了？點一下結束" : "念念看，讓 AI 幫你打分"}
      </button>
      {result && (
        <div className="mt-1.5 rounded-xl bg-violet-50 px-3 py-2 text-xs leading-relaxed text-violet-700">
          {result.score === null ? (
            <p>沒有聽到聲音，請確認麥克風權限，再點一次試試看！</p>
          ) : (
            <>
              你說的：「{result.transcript}」
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-violet-100">
                  <div
                    className="h-full rounded-full bg-violet-500 transition-all"
                    style={{ width: `${result.score}%` }}
                  />
                </div>
                <span className="shrink-0 font-semibold">{result.score}%</span>
              </div>
              <p className="mt-1 text-violet-500">
                {result.score >= 80
                  ? "發音很準確，太棒了！"
                  : result.score >= 50
                  ? "不錯，再多念幾次會更流暢。"
                  : "再試一次，注意每個單字的發音。"}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* --------------------------------- SCORE MAP --------------------------------- */

function computeCompat(totalDelta, turnCount) {
  const min = turnCount * -5;
  const max = turnCount * 25;
  const pct = Math.round(((totalDelta - min) / (max - min)) * 100);
  return Math.max(0, Math.min(100, pct));
}

function compatTip(score) {
  if (score >= 80)
    return "超強社交力！你的回話自然又幽默，外國朋友一定很想跟你當朋友。下次見面試著再多問對方一個問題，讓對話來回更久。";
  if (score >= 50)
    return "不錯的開始！試著多分享一些個人故事和小細節，讓對話更生動、更有記憶點。";
  return "別緊張，多練習幾次就會抓到感覺。試著用開放式的方式回答，避免一個字或一句話就結束對話。";
}

/* ---------------------------------- APP ---------------------------------- */

export default function App() {
  const [view, setView] = useState("home"); // home | roleplay | result
  const [activeScenario, setActiveScenario] = useState<any>(null);
  const [turnIndex, setTurnIndex] = useState(0);
  const [messages, setMessages] = useState<any[]>([]); // {who:'npc'|'user', text, feedback?}
  const [selected, setSelected] = useState<any>(null);
  const [totalDelta, setTotalDelta] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [customScenarios, setCustomScenarios] = useState<any[]>([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customTopic, setCustomTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");
  const scrollRef = useRef(null);
  const allScenarios = useMemo(
    () => [...SCENARIOS, ...customScenarios],
    [customScenarios]
  );
  const categories = useMemo(() => {
    const order = ["基礎", "職場", "交友", "旅遊", "深聊", "救場", "自訂"];
    const present = new Set(allScenarios.map((s) => s.category));
    return ["全部", ...order.filter((c) => present.has(c))];
  }, [allScenarios]);
  const visibleScenarios = useMemo(
    () =>
      activeCategory === "全部"
        ? allScenarios
        : allScenarios.filter((s) => s.category === activeCategory),
    [allScenarios, activeCategory]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleFavorite = (sentence) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(sentence)) next.delete(sentence);
      else next.add(sentence);
      return next;
    });
  };

  const startScenario = (scenario) => {
    setActiveScenario(scenario);
    setTurnIndex(0);
    setTotalDelta(0);
    setSelected(null);
    setMessages([{ who: "npc", text: scenario.turns[0].npc }]);
    setView("roleplay");
  };

  const chooseOption = (option) => {
    if (selected) return;
    setSelected(option);
    setTotalDelta((d) => d + option.delta);
    setMessages((m) => [
      ...m,
      { who: "user", text: option.text, feedback: option.feedback, style: option.style },
    ]);
  };

  const nextTurn = () => {
    const next = turnIndex + 1;
    if (next >= activeScenario.turns.length) {
      setView("result");
      return;
    }
    setTurnIndex(next);
    setSelected(null);
    setMessages((m) => [...m, { who: "npc", text: activeScenario.turns[next].npc }]);
  };

  const generateCustomScenario = async () => {
    if (!customTopic.trim() || generating) return;
    setGenerating(true);
    setGenError("");
    try {
      const res = await fetch("/api/generate-scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: customTopic }),
      });
      const parsed = await res.json();
      if (!res.ok || parsed.error) {
        throw new Error(parsed.error || "generation failed");
      }
      if (!Array.isArray(parsed.turns) || parsed.turns.length !== 4) {
        throw new Error("bad shape");
      }
      const scenario = {
        id: "custom-" + Date.now(),
        title: parsed.title || customTopic,
        subtitle: parsed.subtitle || "自訂情境",
        icon: Sparkles,
        accent: "bg-violet-500",
        accentSoft: "bg-violet-50",
        accentText: "text-violet-600",
        partner: parsed.partner || "Jordan",
        category: "自訂",
        turns: parsed.turns,
      };
      setCustomScenarios((c) => [...c, scenario]);
      setCustomTopic("");
      setShowCustomForm(false);
    } catch (e) {
      setGenError("生成失敗了，換個主題描述再試一次吧！");
    } finally {
      setGenerating(false);
    }
  };

  const compat = useMemo(
    () => computeCompat(totalDelta, activeScenario ? activeScenario.turns.length : 4),
    [totalDelta, activeScenario]
  );
  const ringOffset = useMemo(() => {
    const circumference = 2 * Math.PI * 54;
    return circumference - (compat / 100) * circumference;
  }, [compat]);

  /* ------------------------------ HOME VIEW ------------------------------ */

  if (view === "home") {
    return (
      <div className="min-h-screen bg-[#FBF4E8] pb-10">
        <header className="px-5 pt-8 pb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-500 text-white shadow-sm">
              <MessageCircle size={20} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">ChatBuddy</h1>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            用真實情境練習，勇敢和外國朋友開口聊天吧！
          </p>
        </header>

        <section className="px-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-600">
            選一個情境開始練習
          </h2>
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={
                  "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition active:scale-95 " +
                  (activeCategory === c
                    ? "bg-slate-800 text-white"
                    : "bg-white text-slate-500 ring-1 ring-black/5")
                }
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {visibleScenarios.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => startScenario(s)}
                  className="flex items-center gap-4 rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 transition active:scale-[0.98]"
                >
                  <div
                    className={
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white " +
                      s.accent
                    }
                  >
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-800">{s.title}</p>
                    <p className="truncate text-xs text-slate-500">{s.subtitle}</p>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-slate-300" />
                </button>
              );
            })}
          </div>

          {!showCustomForm ? (
            <button
              onClick={() => setShowCustomForm(true)}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-3xl border-2 border-dashed border-violet-200 bg-violet-50/60 py-3.5 text-sm font-semibold text-violet-500 transition active:scale-[0.98]"
            >
              <Plus size={16} />
              自訂你的情境
            </button>
          ) : (
            <div className="mt-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <div className="mb-2 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <Sparkles size={15} className="text-violet-400" />
                  想練習什麼話題？
                </p>
                <button
                  onClick={() => {
                    setShowCustomForm(false);
                    setGenError("");
                  }}
                  className="rounded-full p-1 text-slate-400 active:scale-90"
                >
                  <X size={16} />
                </button>
              </div>
              <input
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="例如：邀請外國同事一起看球賽"
                className="w-full rounded-2xl bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none ring-1 ring-slate-100 focus:ring-violet-300"
              />
              {genError && (
                <p className="mt-2 text-xs text-rose-500">{genError}</p>
              )}
              <button
                onClick={generateCustomScenario}
                disabled={generating || !customTopic.trim()}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-violet-500 py-2.5 text-sm font-semibold text-white transition active:scale-[0.98] disabled:opacity-40"
              >
                {generating ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    正在幫你生成情境…
                  </>
                ) : (
                  <>
                    <Sparkles size={15} />
                    生成專屬情境
                  </>
                )}
              </button>
            </div>
          )}
        </section>

        <section className="mt-8 px-5">
          <div className="mb-3 flex items-center gap-1.5">
            <Sparkles size={16} className="text-orange-400" />
            <h2 className="text-sm font-semibold text-slate-600">
              社交小抄：破冰萬用句
            </h2>
          </div>
          <div className="rounded-3xl bg-white p-2 shadow-sm ring-1 ring-black/5">
            {ICEBREAKERS.map((line, i) => (
              <div
                key={line}
                className={
                  "flex items-center gap-2 px-3 py-2.5" +
                  (i !== ICEBREAKERS.length - 1 ? " border-b border-slate-50" : "")
                }
              >
                <span className="flex-1 text-sm text-slate-700">{line}</span>
                <SpeakButton text={line} />
                <button
                  onClick={() => toggleFavorite(line)}
                  aria-label="收藏"
                  className="shrink-0 rounded-full p-1.5 active:scale-90"
                >
                  <Star
                    size={16}
                    className={
                      favorites.has(line)
                        ? "fill-orange-400 text-orange-400"
                        : "text-slate-300"
                    }
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 px-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-600">
            轉折詞：自然切換話題
          </h2>
          <div className="rounded-3xl bg-white p-2 shadow-sm ring-1 ring-black/5">
            {TRANSITIONS.map((line, i) => (
              <div
                key={line}
                className={
                  "flex items-center gap-2 px-3 py-2.5" +
                  (i !== TRANSITIONS.length - 1 ? " border-b border-slate-50" : "")
                }
              >
                <span className="flex-1 text-sm text-slate-700">{line}</span>
                <SpeakButton text={line} />
                <button
                  onClick={() => toggleFavorite(line)}
                  aria-label="收藏"
                  className="shrink-0 rounded-full p-1.5 active:scale-90"
                >
                  <Star
                    size={16}
                    className={
                      favorites.has(line)
                        ? "fill-orange-400 text-orange-400"
                        : "text-slate-300"
                    }
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {favorites.size > 0 && (
          <section className="mt-6 px-5">
            <div className="mb-3 flex items-center gap-1.5">
              <Star size={16} className="fill-orange-400 text-orange-400" />
              <h2 className="text-sm font-semibold text-slate-600">
                我的收藏夾（{favorites.size}）
              </h2>
            </div>
            <div className="rounded-3xl bg-orange-50 p-2 ring-1 ring-orange-100">
              {Array.from(favorites).map((line, i, arr) => (
                <div
                  key={line}
                  className={
                    "flex items-center gap-2 px-3 py-2.5" +
                    (i !== arr.length - 1 ? " border-b border-orange-100" : "")
                  }
                >
                  <span className="flex-1 text-sm text-slate-700">{line}</span>
                  <SpeakButton text={line} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  /* ---------------------------- ROLEPLAY VIEW ---------------------------- */

  if (view === "roleplay") {
    const progressPct = ((turnIndex + (selected ? 1 : 0)) / activeScenario.turns.length) * 100;
    return (
      <div className="flex min-h-screen flex-col bg-[#FBF4E8]">
        <header className="sticky top-0 z-10 bg-[#FBF4E8]/90 px-4 pb-3 pt-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("home")}
              aria-label="返回"
              className="rounded-full p-1.5 text-slate-500 active:scale-90"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {activeScenario.title}
              </p>
              <p className="text-xs text-slate-400">
                與 {activeScenario.partner} 對話中 · 第 {Math.min(turnIndex + 1, activeScenario.turns.length)}/
                {activeScenario.turns.length} 輪
              </p>
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white">
            <div
              className={"h-full rounded-full transition-all duration-500 " + activeScenario.accent}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((m, i) =>
            m.who === "npc" ? (
              <div key={i} className="flex items-end gap-2">
                <div
                  className={
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white " +
                    activeScenario.accent
                  }
                >
                  {activeScenario.partner[0]}
                </div>
                <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 shadow-sm ring-1 ring-black/5">
                  <div className="flex items-start gap-2">
                    <p className="text-sm leading-relaxed text-slate-700">{m.text}</p>
                    <SpeakButton text={m.text} className="mt-0.5" />
                  </div>
                </div>
              </div>
            ) : (
              <div key={i} className="flex flex-col items-end gap-1.5">
                <div className="flex items-end gap-2">
                  <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-sky-400 px-4 py-2.5 text-white shadow-sm">
                    <p className="text-sm leading-relaxed">{m.text}</p>
                  </div>
                </div>
                {m.feedback && (
                  <div
                    className={
                      "max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed " +
                      (m.style === "authentic"
                        ? "bg-lime-50 text-lime-700"
                        : m.style === "neutral"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-rose-50 text-rose-600")
                    }
                  >
                    {m.feedback}
                  </div>
                )}
                <MicPractice target={m.text} />
              </div>
            )
          )}
        </div>

        <div className="border-t border-black/5 bg-[#FBF4E8] px-4 pb-6 pt-3">
          {!selected ? (
            <div className="flex flex-col gap-2">
              {activeScenario.turns[turnIndex].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => chooseOption(opt)}
                  className="rounded-2xl bg-white px-4 py-3 text-left text-sm text-slate-700 shadow-sm ring-1 ring-black/5 transition active:scale-[0.98]"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={nextTurn}
              className={
                "flex w-full items-center justify-center gap-1.5 rounded-2xl py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] " +
                activeScenario.accent
              }
            >
              {turnIndex + 1 >= activeScenario.turns.length ? "查看結果" : "繼續對話"}
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ------------------------------ RESULT VIEW ------------------------------ */

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#FBF4E8] px-6 pb-10 pt-10">
      <p className="text-sm font-medium text-slate-500">
        與 {activeScenario.partner} 的對話結束
      </p>
      <h1 className="mt-1 text-xl font-bold text-slate-800">交友契合度指數</h1>

      <div className="relative mt-8 flex h-40 w-40 items-center justify-center">
        <svg viewBox="0 0 120 120" className="h-40 w-40 -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#F1EADB" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={compat >= 80 ? "#84cc16" : compat >= 50 ? "#38bdf8" : "#fb923c"}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 54}
            strokeDashoffset={ringOffset}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-bold text-slate-800">{compat}</span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
      </div>

      <div className="mt-8 w-full rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <div className="mb-2 flex items-center gap-1.5">
          <Sparkles size={16} className="text-orange-400" />
          <p className="text-sm font-semibold text-slate-700">實用社交建議</p>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">{compatTip(compat)}</p>
      </div>

      <div className="mt-8 flex w-full gap-3">
        <button
          onClick={() => startScenario(activeScenario)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-black/5 active:scale-[0.98]"
        >
          <RotateCcw size={16} />
          再玩一次
        </button>
        <button
          onClick={() => setView("home")}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-lime-500 py-3 text-sm font-semibold text-white shadow-sm active:scale-[0.98]"
        >
          <Home size={16} />
          返回首頁
        </button>
      </div>
    </div>
  );
}
