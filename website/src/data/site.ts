// All copy lives here. Zero hard-coded strings in components.
// Content is populated by the content-writer agent from initial-business-data.md
// and market-intelligence.md. Do not copy from prior builds.

export const siteConfig = {
  name: "Collaborative Insights",
  domain: "lesleycollaborativeinsights.com",
  tagline: "Grounded Spiritual Guidance for People Navigating Awakening", // H1 — brand identity statement
  description:
    "Collaborative Insights offers 1:1 spiritual consulting for people experiencing awakening. Led by Lesley R. Ledbetter, a Vietnam veteran and certified ascension guide with 6+ years of study. Book your free discovery call today.", // Meta description
  location: "Texas",
  phone: "", // Pending from client
  email: "lrledbetter50@gmail.com",
  schema: {
    type: "ProfessionalService" as const,
    name: "Collaborative Insights",
    url: "https://lesleycollaborativeinsights.com",
    areaServed: "Worldwide",
    serviceType: "Spiritual Consulting",
  },
};

export const hero = {
  eyebrow: "You're not losing your mind. You're waking up.", // [DEMO COPY — pending client review]
  subheadline:
    "If you're seeing signs you can't explain, feeling energy you can't shut off, or wondering why no one around you understands what's happening... you're in the right place. I've been where you are. Let me help you make sense of it.", // [DEMO COPY — pending client review]
  ctaPrimary: "Book a Free Discovery Call",
  ctaSecondary: "Take the Quiz",
  trustMicrocopy:
    "Vietnam Veteran · 8.5 Years Military Intelligence · 6 Years Spiritual Study · 18+ Courses Completed",
};

export const services: {
  title: string;
  slug: string;
  emoji: string;
  shortDescription: string;
  price: string;
  features: string[];
}[] = [
  // [DEMO COPY — pending client review]
  {
    title: "Free Discovery Call",
    slug: "discovery-call",
    emoji: "📞",
    shortDescription:
      "A relaxed 15-minute conversation so we can meet, hear what you're going through, and figure out if working together feels right. No pressure, no pitch. Just a real conversation.",
    price: "Free · 15 minutes",
    features: [
      "✅ Share what you're experiencing in a safe, private space",
      "✅ Get an honest sense of whether this work fits your situation",
      "✅ Ask any questions about the process, the sessions, or my background",
      "✅ Walk away with at least one useful insight, even if you never book again",
    ],
  },
  {
    title: "60-Minute Spiritual Consult",
    slug: "spiritual-consult",
    emoji: "🔮",
    shortDescription:
      "A deep, focused session where we explore what's happening in your awakening, identify the spiritual abilities opening up in you, and give you clear next steps you can actually use.",
    price: "$100 · 60 minutes via Zoom",
    features: [
      "✅ Identify the core spiritual abilities emerging in your life",
      "✅ Get clear, plain-spoken language for what you're experiencing",
      "✅ Receive grounding practices tailored to your specific situation",
      "✅ Leave with a concrete next step, not vague encouragement",
      "✅ Mediumship, ancestral work, or energy healing as your session requires",
    ],
  },
  {
    title: "Awakening Path",
    slug: "awakening-path",
    emoji: "🌱",
    shortDescription:
      "For people who want steady, ongoing guidance as they navigate their awakening. Two sessions per month plus email support between calls, so you're never left spinning alone.",
    price: "$297/month",
    features: [
      "✅ Two 60-minute sessions per month (bi-weekly rhythm)",
      "✅ Email support between sessions for questions that can't wait",
      "✅ Personalized practices and exercises after each session",
      "✅ Priority scheduling so you always get the time that works for you",
      "✅ Month-to-month, cancel anytime",
    ],
  },
  {
    title: "Accelerator",
    slug: "accelerator",
    emoji: "⚡",
    shortDescription:
      "For people in the thick of rapid transformation who need more support and faster access. Four sessions per month plus direct messaging access to Lesley between calls.",
    price: "$497/month",
    features: [
      "✅ Four 60-minute sessions per month (weekly rhythm)",
      "✅ Direct messaging access between sessions for real-time guidance",
      "✅ Custom meditations and grounding practices built for your path",
      "✅ Emergency session availability when things get intense",
      "✅ Priority scheduling and flexible rescheduling",
      "✅ Month-to-month, cancel anytime",
    ],
  },
];

export const painPoints: {
  emoji: string;
  title: string;
  description: string;
}[] = [
  // [DEMO COPY — pending client review]
  {
    emoji: "😵‍💫",
    title: "You feel like you're losing your grip",
    description:
      "Vivid dreams, sudden mood swings, anxiety with no clear cause. You've been to the doctor and nothing's wrong. But something is definitely happening, and nobody in your life gets it.",
  },
  {
    emoji: "🔢",
    title: "You keep seeing repeating numbers and signs",
    description:
      "11:11, 222, 333. Songs with messages that feel personal. Coincidences that are too specific to be random. You're noticing patterns everywhere and it's both exciting and unsettling.",
  },
  {
    emoji: "😔",
    title: "You feel completely alone in this",
    description:
      "Your therapist nods but doesn't really understand the spiritual part. Your family thinks you've lost it. Your friends don't know what to say. You just want one person who actually gets it.",
  },
  {
    emoji: "🌊",
    title: "Other people's emotions hit you like waves",
    description:
      "You walk into a room and absorb everyone's energy. Crowds exhaust you. You feel things that aren't yours and you don't know how to turn it off or protect yourself.",
  },
  {
    emoji: "💭",
    title: "You're getting messages or visions you can't explain",
    description:
      "You're hearing things, sensing things, or knowing things before they happen. It started small but it's getting stronger, and you don't know if you should lean in or shut it down.",
  },
  {
    emoji: "🌑",
    title: "Everything that used to matter feels meaningless",
    description:
      "Your career, your social circle, the life you built... it all feels hollow now. You're questioning everything. People call it a midlife crisis, but you know it's something deeper.",
  },
];

export const processSteps: {
  emoji: string;
  title: string;
  description: string;
}[] = [
  // [DEMO COPY — pending client review]
  {
    emoji: "📅",
    title: "Book your free discovery call",
    description:
      "Pick a time that works for you. It's a relaxed 15-minute video call on Zoom. No preparation needed. Just show up as you are.",
  },
  {
    emoji: "🤝",
    title: "We talk, and I listen",
    description:
      "Tell me what's been happening. I'll ask a few questions, share what I'm picking up, and we'll figure out together whether a full session makes sense for you.",
  },
  {
    emoji: "📝",
    title: "Before your session, write down what matters most",
    description:
      "I'll ask you to jot down what you want to explore. This isn't homework. It just helps your mind focus so we can go deeper, faster.",
  },
  {
    emoji: "🔮",
    title: "Your session: we follow the energy",
    description:
      "We start with what's on your mind. Then I follow what comes through... whether that's mediumship, ancestral healing, energy work, or simply a conversation you needed to have. Every session is different because every person is.",
  },
  {
    emoji: "🧭",
    title: "You leave with clarity, not confusion",
    description:
      "No vague platitudes. You'll walk away with plain-language understanding of what's happening in your awakening, grounding practices you can start using today, and a clear next step for your path.",
  },
];

export const stats: {
  emoji: string;
  value: number;
  suffix: string;
  label: string;
}[] = [
  // [DEMO COPY — pending client review]
  {
    emoji: "🎖️",
    value: 8,
    suffix: "+",
    label: "Years of Military Service (Intelligence)",
  },
  {
    emoji: "📚",
    value: 18,
    suffix: "+",
    label: "Courses Completed in Spiritual Healing",
  },
  {
    emoji: "🕰️",
    value: 6,
    suffix: "+",
    label: "Years Studying Spiritual Development",
  },
  {
    emoji: "🎓",
    value: 2,
    suffix: "",
    label: "Certifications via Julie Ryan (AAT + Angels & Enlightenment)",
  },
];

export const testimonials: {
  name: string;
  location: string;
  service: string;
  text: string;
  featured: boolean;
}[] = [
  // [DEMO COPY — pending client review]
  // All 36 testimonials below are demo placeholders written for presentation purposes.
  // Real testimonials must be collected from actual clients before public launch.

  // --- FEATURED (4) ---
  {
    name: "Jessica M.",
    location: "Austin, TX",
    service: "60-Minute Spiritual Consult",
    text: "I thought I was having a breakdown. My therapist couldn't explain the energy surges or why I kept waking up at 3 AM. Lesley looked at me on that Zoom call and said, 'You're not broken. Let me show you what's actually happening.' By the end of the session I was crying, but for the first time it was relief, not fear.",
    featured: true,
  },
  {
    name: "Marcus T.",
    location: "San Antonio, TX",
    service: "Awakening Path",
    text: "I'm a retired firefighter. I don't do crystals and I don't burn sage. But I started having experiences I couldn't explain and none of the guys would understand. Lesley's a veteran. He gets the mindset. Two months into the Awakening Path and I finally feel like I have solid ground under my feet again.",
    featured: true,
  },
  {
    name: "Diana R.",
    location: "Denver, CO",
    service: "60-Minute Spiritual Consult",
    text: "He connected with my grandmother in the first ten minutes. Described her kitchen, the way she hummed while she cooked, details nobody could Google. I came in skeptical and left knowing this man has a real gift. That one session changed how I see everything.",
    featured: true,
  },
  {
    name: "Angela P.",
    location: "Nashville, TN",
    service: "Accelerator",
    text: "After my divorce I started seeing 11:11 everywhere and having dreams that would come true the next day. I was terrified. I found Lesley and he didn't make me feel weird or broken. He explained it like a teacher, not a guru. The Accelerator program gave me weekly support during the hardest and most beautiful transition of my life.",
    featured: true,
  },

  // --- 60-Minute Spiritual Consult (12 more) ---
  {
    name: "Rachel K.",
    location: "Portland, OR",
    service: "60-Minute Spiritual Consult",
    text: "I went in shaking and came out calm. He gave me three grounding exercises and I've used them every single day since. Simple stuff that actually works.",
    featured: false,
  },
  {
    name: "Tom W.",
    location: "Chicago, IL",
    service: "60-Minute Spiritual Consult",
    text: "Straight talk. No fluff. He told me exactly what he was picking up and let me decide what resonated. Felt like talking to a wise uncle, not a psychic hotline.",
    featured: false,
  },
  {
    name: "Sandra L.",
    location: "Houston, TX",
    service: "60-Minute Spiritual Consult",
    text: "I'd been to two other spiritual coaches before Lesley. Both of them talked in circles and tried to upsell me into $3,000 programs. Lesley gave me more in 60 minutes than they did in weeks. And for $100.",
    featured: false,
  },
  {
    name: "Kevin J.",
    location: "Phoenix, AZ",
    service: "60-Minute Spiritual Consult",
    text: "I'm an engineer. I was not going to be easy to convince. But he described things about my father's passing that I never told anyone. That got my attention. Then the energy work actually helped my chronic shoulder pain. I don't have an explanation for it but I don't need one.",
    featured: false,
  },
  {
    name: "Maria G.",
    location: "Miami, FL",
    service: "60-Minute Spiritual Consult",
    text: "My mother passed two years ago and I couldn't stop grieving. Lesley helped me understand she's still present and showed me how to feel that connection on my own. I sleep through the night now for the first time since she died.",
    featured: false,
  },
  {
    name: "Brian H.",
    location: "Dallas, TX",
    service: "60-Minute Spiritual Consult",
    text: "He didn't just tell me what was happening. He taught me why. He explained the energy stuff in a way that made sense to my logical brain. That's rare in this space.",
    featured: false,
  },
  {
    name: "Priya S.",
    location: "Atlanta, GA",
    service: "60-Minute Spiritual Consult",
    text: "I come from a Hindu family but I wasn't looking for religion. I was looking for someone who could explain why I suddenly feel everyone's emotions when I walk into a room. Lesley helped me understand I'm an empath and gave me tools to manage it. Life changing.",
    featured: false,
  },
  {
    name: "Donna F.",
    location: "Sacramento, CA",
    service: "60-Minute Spiritual Consult",
    text: "Booked the session on impulse at 2 AM after Googling 'am I having a spiritual awakening.' Best impulse decision I've ever made. He was patient, clear, and kind.",
    featured: false,
  },
  {
    name: "James C.",
    location: "Tampa, FL",
    service: "60-Minute Spiritual Consult",
    text: "Twenty years in the Army. I don't trust easily. But Lesley's a vet too, and that matters. He doesn't talk down to you. He speaks from experience, not a script.",
    featured: false,
  },
  {
    name: "Lisa N.",
    location: "Minneapolis, MN",
    service: "60-Minute Spiritual Consult",
    text: "I cried for the first 15 minutes and he just held space. Didn't rush me, didn't try to fix it. When I was ready, we went deep. I've never felt that safe with someone I just met.",
    featured: false,
  },
  {
    name: "Robert M.",
    location: "Boise, ID",
    service: "60-Minute Spiritual Consult",
    text: "I only booked one session because I was skeptical. That was three months ago. I've booked four more since. The man knows what he's doing.",
    featured: false,
  },
  {
    name: "Cheryl A.",
    location: "Charlotte, NC",
    service: "60-Minute Spiritual Consult",
    text: "He told me things about my ancestral line that my own family had kept secret for decades. I called my aunt after the session and she confirmed every detail. I still get chills thinking about it.",
    featured: false,
  },

  // --- Free Discovery Call (6) ---
  {
    name: "Natalie V.",
    location: "Seattle, WA",
    service: "Free Discovery Call",
    text: "I almost didn't book because I thought 'free' meant a sales pitch. It wasn't. He listened, asked a couple questions, and told me honestly what he thought he could help with. No pressure at all.",
    featured: false,
  },
  {
    name: "Derek P.",
    location: "Fort Worth, TX",
    service: "Free Discovery Call",
    text: "Fifteen minutes. That's all it took for me to know this was the real deal. He picked up on something about my mom without me saying a word. I booked a full session before the call even ended.",
    featured: false,
  },
  {
    name: "Samantha B.",
    location: "Raleigh, NC",
    service: "Free Discovery Call",
    text: "I was so nervous I almost canceled three times. He made me feel comfortable in the first two minutes. Genuinely kind man. I'm glad I showed up.",
    featured: false,
  },
  {
    name: "Carlos D.",
    location: "El Paso, TX",
    service: "Free Discovery Call",
    text: "I had a million questions and he answered every single one without making me feel stupid. That's when I knew I could trust him with the real stuff.",
    featured: false,
  },
  {
    name: "Megan O.",
    location: "Tulsa, OK",
    service: "Free Discovery Call",
    text: "He told me upfront that he might not be the right fit and that was okay. That honesty is what made me decide to book. Anyone willing to turn away business is confident in what they do.",
    featured: false,
  },
  {
    name: "Paul E.",
    location: "Columbus, OH",
    service: "Free Discovery Call",
    text: "I just needed to hear someone say 'you're not crazy' and mean it. He did. That was enough to get me started.",
    featured: false,
  },

  // --- Awakening Path (8) ---
  {
    name: "Jennifer W.",
    location: "Scottsdale, AZ",
    service: "Awakening Path",
    text: "The bi-weekly sessions gave me a rhythm. I'd have a wild experience, write it down, and know that in a few days I'd get to process it with someone who understands. That consistency was everything for me.",
    featured: false,
  },
  {
    name: "David L.",
    location: "Richmond, VA",
    service: "Awakening Path",
    text: "Month one I was a mess. Month three I was sleeping well, meditating daily, and actually enjoying the process. The email support between sessions was clutch. Whenever I spiraled, he'd respond within a day with something grounding.",
    featured: false,
  },
  {
    name: "Tanya R.",
    location: "Albuquerque, NM",
    service: "Awakening Path",
    text: "I was spending $200 a week on random healers, psychics, and courses trying to figure this out. The Awakening Path replaced all of it. One person, consistent guidance, half the cost. I wish I'd found him sooner.",
    featured: false,
  },
  {
    name: "Michael S.",
    location: "Kansas City, MO",
    service: "Awakening Path",
    text: "As a veteran myself, having Lesley as a guide made all the difference. He doesn't sugarcoat things. He gives it to you straight but with compassion. The monthly structure kept me accountable.",
    featured: false,
  },
  {
    name: "Stephanie H.",
    location: "San Diego, CA",
    service: "Awakening Path",
    text: "Three months in and my anxiety is down by about 80%. I'm not exaggerating. The practices he gave me between sessions are things I use every single morning. Simple, practical, effective.",
    featured: false,
  },
  {
    name: "Chris B.",
    location: "Omaha, NE",
    service: "Awakening Path",
    text: "I signed up because the single session blew me away. Staying for the Path was the best decision. Each session builds on the last. It's not random, it's structured growth.",
    featured: false,
  },
  {
    name: "Linda T.",
    location: "Memphis, TN",
    service: "Awakening Path",
    text: "He helped me realize the intense empathy I've had my whole life isn't a flaw. It's a gift. But I needed someone to teach me how to manage it so it stopped draining me. That's exactly what the Awakening Path did.",
    featured: false,
  },
  {
    name: "Ray J.",
    location: "Oklahoma City, OK",
    service: "Awakening Path",
    text: "My wife thought I was losing it. Two months into the Awakening Path, she told me I seemed more like myself than I had in years. That's when I knew the work was real.",
    featured: false,
  },

  // --- Accelerator (6) ---
  {
    name: "Catherine M.",
    location: "Las Vegas, NV",
    service: "Accelerator",
    text: "The weekly sessions are intense in the best way. I was going through a full kundalini opening and having Lesley on speed dial kept me grounded. The messaging access alone is worth the investment. When things got scary at 11 PM, I could reach out and hear back by morning.",
    featured: false,
  },
  {
    name: "Andre W.",
    location: "Baltimore, MD",
    service: "Accelerator",
    text: "I went through a dark night of the soul that lasted months. Everything felt meaningless. The Accelerator gave me four sessions a month and direct access when I needed it. Lesley walked me through the darkest stretch and I came out the other side different. Stronger. Clearer.",
    featured: false,
  },
  {
    name: "Monica K.",
    location: "Louisville, KY",
    service: "Accelerator",
    text: "The custom meditations he built for me are unlike anything on YouTube or any app. They're made for MY energy, MY situation. I still use them daily even after finishing the program.",
    featured: false,
  },
  {
    name: "Steven R.",
    location: "Tucson, AZ",
    service: "Accelerator",
    text: "Four sessions a month sounds like a lot but honestly I needed every one. My abilities were opening fast and I needed a steady hand guiding me through it. Worth every penny.",
    featured: false,
  },
  {
    name: "Felicia D.",
    location: "Orlando, FL",
    service: "Accelerator",
    text: "I tried doing this on my own for a year. YouTube videos, Reddit forums, random TikTok healers. I made zero progress. Two months in the Accelerator and I understand more about myself than I learned in that entire year of wandering.",
    featured: false,
  },
  {
    name: "Troy N.",
    location: "Spokane, WA",
    service: "Accelerator",
    text: "Lesley pushed me in ways I didn't expect. Not in a guru way. In a 'I see more in you than you see in yourself right now' way. The man doesn't just guide. He teaches you to guide yourself.",
    featured: false,
  },
];

export const faq: {
  question: string;
  answer: string;
}[] = [
  // [DEMO COPY — pending client review]
  {
    question: "Do I need to know anything about spirituality before booking?",
    answer:
      "Not at all. Most people who come to me are at the very beginning, confused about what's happening and unsure of the language to describe it. That's exactly where I can help. You don't need to study anything first. Just show up honestly.",
  },
  {
    question: "Is this a religious practice?",
    answer:
      "No. I don't follow or teach any specific religion. My work honors all spiritual paths and none in particular. If you come from a Christian background, a Hindu background, no background, or somewhere in between, you're welcome here. I meet you where you are.",
  },
  {
    question: "How is this different from therapy or counseling?",
    answer:
      "Therapy focuses on mental health, behavioral patterns, and emotional processing through clinical frameworks. What I do is different. I work with spiritual energy, intuition, ancestral connections, and the specific experiences that come with awakening, things most therapists aren't trained in. That said, I fully support therapy and will never discourage you from working with a mental health professional alongside our work together.",
  },
  {
    question: "What actually happens during a session?",
    answer:
      "We meet on Zoom for 60 minutes. I'll start by asking what's on your mind or what you've been experiencing. From there, I follow the energy. That might mean mediumship (connecting with people who have passed), ancestral trauma work, energy healing, or simply a conversation where I help you understand what your spiritual abilities are and how to work with them. Every session is different because every person is different.",
  },
  {
    question: "What if I'm skeptical?",
    answer:
      "Good. Healthy skepticism means you're thinking clearly. I was skeptical once too. I don't ask you to believe anything upfront. I ask you to show up, be honest about what you're experiencing, and see what happens. Most skeptics who book a session leave with something they can't easily explain away, and that's a good starting point.",
  },
  {
    question: "Can you really talk to dead people?",
    answer:
      "I understand why that sounds strange. Yes, mediumship is part of my work. During sessions, I sometimes receive information from people who have passed. I share what comes through and let you decide what resonates. I don't perform it on command and I don't guarantee specific contacts. But when it happens, it tends to be the most impactful part of the session for people.",
  },
  {
    question: "Is the free discovery call really free? No catch?",
    answer:
      "Completely free, no catch. It's a 15-minute Zoom call where we meet, you tell me a bit about what's going on, and we figure out together if working with me makes sense. If it doesn't, I'll tell you honestly and point you somewhere that might be a better fit. I'd rather turn someone away than take money I didn't earn.",
  },
  {
    question: "Do I have to be on camera for the Zoom session?",
    answer:
      "Camera on is strongly preferred because it helps me read your energy and connect more effectively. But if being on camera creates too much anxiety for your first session, we can work with audio only. Most people end up turning the camera on once they get comfortable.",
  },
  {
    question: "What's the difference between the Awakening Path and the Accelerator?",
    answer:
      "The Awakening Path gives you two sessions per month plus email support. It's ideal if you want steady, consistent guidance at a sustainable pace. The Accelerator gives you four sessions per month plus direct messaging access and custom practices. It's for people in the middle of intense, rapid change who need more frequent support and faster communication. Both are month-to-month with no long-term commitment.",
  },
  {
    question: "Can you help with physical pain or illness?",
    answer:
      "I work with energy, which sometimes affects physical symptoms. Some clients have reported relief from chronic pain, better sleep, and reduced anxiety after sessions. But I am not a doctor and I do not diagnose or treat medical conditions. If you're dealing with a health issue, please continue working with your medical provider. What I offer works alongside conventional care, never instead of it.",
  },
  {
    question: "What if I cry during the session?",
    answer:
      "That happens often and it's completely okay. Awakening stirs up deep emotions. Grief, relief, confusion, joy, sometimes all at once. I've held space for people through a lot of tears. There's no judgment here. Crying usually means something important is moving through you.",
  },
  {
    question: "How do I know you're legitimate and not a scam?",
    answer:
      "I understand that concern completely. This industry has earned its reputation for scams. Here's what I can offer: I'm a Vietnam veteran with 8.5 years of military service in intelligence. I spent 30+ years in HVAC serving homeowners before this work. I've completed 18+ courses and two formal certifications through Julie Ryan. I show my pricing upfront, I offer a free discovery call with no obligation, and I will never pressure you into buying something. My background is verifiable and my work speaks for itself.",
  },
];

export const about = {
  headline: "From Military Intelligence to Spiritual Intelligence", // [DEMO COPY — pending client review]
  story: `I started this path the same way most people do. I was born with a sensitivity I couldn't explain, and the world taught me to shut it down. So I did. I joined the military at 18 and served 8.5 years in radio intercept and intelligence during Vietnam and the Cold War. After that, I spent over 30 years in residential HVAC and refrigeration, fixing problems for homeowners across Texas.

Then my wife got sick.

She was bedridden for two years with cardiovascular complications and kidney failure. Dialysis three times a week. Constant pain. I visited her every night after work, and every night I went home and researched. I was desperate to find something, anything, that could help her. I found spiritual healing, energy work, and the world I'd suppressed since childhood came flooding back.

I found it too late to save her. But I didn't find it too late to help her. I was able to help her transition peacefully, with clarity and with love. She wasn't afraid. That experience was one of the most painful and most sacred gifts of my life.

After she passed, I couldn't stop learning. Six years of study. Eighteen courses from The Frequencies. Angelic Attendant Training and Angels and Enlightenment Training through Julie Ryan. Every course I took answered old questions and opened new ones.

Now I guide people who are going through what I went through. Not the grief, necessarily, but the awakening. The confusion. The feeling that something enormous is happening inside you and nobody around you understands. I've been there. I know how lonely it is. And I know what it feels like when someone finally tells you, "You're not crazy. Let me help you make sense of this."

That's what I do.`, // [DEMO COPY — pending client review]
  beliefs: [
    // [DEMO COPY — pending client review]
    {
      emoji: "🧭",
      text: "Everyone has spiritual abilities. Most people were just taught to ignore them.",
    },
    {
      emoji: "🤝",
      text: "My job isn't to tell you what to believe. It's to help you recognize what's already true in you.",
    },
    {
      emoji: "📖",
      text: "A good session should teach you something, not just tell you something. You don't just get a reading. You get a skill.",
    },
    {
      emoji: "🌿",
      text: "Healing doesn't require you to abandon your religion, your logic, or your common sense.",
    },
    {
      emoji: "🛡️",
      text: "Your path is yours. I'm a guide, not a guru. I'll walk beside you, never in front of you.",
    },
    {
      emoji: "💡",
      text: "Plain language matters. If I can't explain it simply, I don't understand it well enough to teach it.",
    },
  ],
  credentials: [
    // [DEMO COPY — pending client review]
    "Vietnam and Cold War Veteran, 8.5 years military service (radio intercept / intelligence)",
    "Certified in Angelic Attendant Training (AAT) via Julie Ryan",
    "Certified in Angels and Enlightenment Training via Julie Ryan",
    "18+ courses completed through The Frequencies (ongoing enrollment)",
    "6+ years of dedicated spiritual study and practice",
    "30+ years professional experience in residential HVAC and refrigeration",
  ],
  photo: "/images/leslie-headshot.png",
};

export const quiz = {
  // [DEMO COPY — pending client review]
  headline: "What Type of Spiritual Awakening Are You Experiencing?",
  subheadline:
    "Answer 8 quick questions. Find out which awakening pattern matches your experience and get a personalized recommendation for your next step.",
  steps: [
    {
      question: "When you walk into a crowded room, what happens first?",
      options: [
        {
          emoji: "😰",
          label: "I feel overwhelmed by everyone's energy and emotions",
          type: "empath",
        },
        {
          emoji: "💡",
          label: "I get flashes of insight about specific people",
          type: "intuitive",
        },
        {
          emoji: "🤲",
          label: "I feel drawn to whoever in the room is hurting",
          type: "healer",
        },
        {
          emoji: "🤔",
          label: "I feel detached, like I'm watching from the outside",
          type: "seeker",
        },
      ],
    },
    {
      question: "What's been keeping you up at night lately?",
      options: [
        {
          emoji: "🌊",
          label:
            "Absorbing stress or sadness that doesn't feel like mine",
          type: "empath",
        },
        {
          emoji: "👁️",
          label:
            "Vivid dreams, visions, or hearing things I can't explain",
          type: "intuitive",
        },
        {
          emoji: "🔥",
          label:
            "A burning feeling that I'm supposed to be helping people somehow",
          type: "healer",
        },
        {
          emoji: "🌑",
          label:
            "Deep questions about who I am and what any of this means",
          type: "seeker",
        },
      ],
    },
    {
      question: "Which sentence hits closest to home?",
      options: [
        {
          emoji: "🧽",
          label:
            "I feel like an emotional sponge and I can't wring myself out",
          type: "empath",
        },
        {
          emoji: "📡",
          label:
            "I'm receiving information I shouldn't logically have access to",
          type: "intuitive",
        },
        {
          emoji: "✋",
          label:
            "My hands tingle or get warm when I'm near someone in pain",
          type: "healer",
        },
        {
          emoji: "🔍",
          label:
            "I feel like the life I built isn't the life I was meant to live",
          type: "seeker",
        },
      ],
    },
    {
      question: "When someone you love is going through something hard, you tend to...",
      options: [
        {
          emoji: "😢",
          label:
            "Feel their pain in my own body, sometimes for days",
          type: "empath",
        },
        {
          emoji: "🔮",
          label:
            "Know what's going to happen before they tell me",
          type: "intuitive",
        },
        {
          emoji: "💚",
          label:
            "Feel a strong pull to lay my hands on them or send them energy",
          type: "healer",
        },
        {
          emoji: "📚",
          label:
            "Start researching everything I can to understand why this is happening",
          type: "seeker",
        },
      ],
    },
    {
      question: "What scares you most about what you're experiencing?",
      options: [
        {
          emoji: "😵",
          label: "That I'll never be able to shut it off",
          type: "empath",
        },
        {
          emoji: "🫣",
          label: "That people will think I'm crazy if I talk about it",
          type: "intuitive",
        },
        {
          emoji: "⚖️",
          label:
            "That I'm supposed to change my entire life to follow this calling",
          type: "healer",
        },
        {
          emoji: "🕳️",
          label:
            "That the emptiness I feel might never go away",
          type: "seeker",
        },
      ],
    },
    {
      question: "Which of these has happened to you recently?",
      options: [
        {
          emoji: "🏪",
          label:
            "I had to leave a store or event because the energy was too much",
          type: "empath",
        },
        {
          emoji: "🔢",
          label:
            "I keep seeing 11:11, 333, or other repeating numbers daily",
          type: "intuitive",
        },
        {
          emoji: "🤒",
          label:
            "Someone near me was in pain and I felt it leave them when I touched their arm",
          type: "healer",
        },
        {
          emoji: "💔",
          label:
            "I ended a relationship, quit a job, or walked away from something that used to define me",
          type: "seeker",
        },
      ],
    },
    {
      question: "If you could get one thing from a spiritual guide right now, what would it be?",
      options: [
        {
          emoji: "🛡️",
          label: "How to protect my energy so I stop absorbing everything around me",
          type: "empath",
        },
        {
          emoji: "🗝️",
          label: "Help understanding what these visions, messages, or feelings mean",
          type: "intuitive",
        },
        {
          emoji: "🧭",
          label:
            "Clarity on whether I'm meant to do healing work and how to start",
          type: "healer",
        },
        {
          emoji: "🌅",
          label:
            "Someone to tell me this dark night of the soul actually ends",
          type: "seeker",
        },
      ],
    },
    {
      question: "How do you feel about the word 'spiritual'?",
      options: [
        {
          emoji: "😌",
          label:
            "It fits, but I need practical tools, not just concepts",
          type: "empath",
        },
        {
          emoji: "🤷",
          label:
            "I don't care what we call it. I just need someone to explain what's happening to me",
          type: "intuitive",
        },
        {
          emoji: "🙏",
          label:
            "It resonates deeply. I feel called to this path",
          type: "healer",
        },
        {
          emoji: "😬",
          label:
            "Honestly, it makes me a little uncomfortable. But here I am",
          type: "seeker",
        },
      ],
    },
  ],
  results: {
    empath: {
      name: "The Awakening Empath",
      tagline: "You feel everything. And it's not your imagination.",
      body: [
        "You've always been the sensitive one. The person who walks into a room and immediately knows who's angry, who's grieving, who's hiding something. But lately it's gotten stronger. Maybe unbearably so.",
        "You're absorbing other people's emotions, physical sensations, and energy without knowing how to stop it. Crowds drain you. Conflict wrecks you. You might even feel physical symptoms that belong to someone else.",
        "This isn't a disorder. It's an ability. But without guidance, it can feel like a curse. The good news is that empathic sensitivity can be managed, directed, and even used as a gift once you learn how to set boundaries with energy the same way you set boundaries with people.",
        "You don't need to shut it down. You need to learn how to turn the volume dial instead of just having it stuck on full blast.",
      ],
      recommendedProgram: {
        name: "Awakening Path",
        href: "/services#awakening-path",
        reason:
          "Empathic awakening requires consistent, ongoing support. The bi-weekly sessions give you time to practice new energy protection techniques between calls, with email access for the moments when you absorb something intense and need grounding guidance fast.",
      },
    },
    intuitive: {
      name: "The Intuitive Channel",
      tagline: "The messages are real. You're not making them up.",
      body: [
        "You're seeing things. Knowing things. Maybe hearing things. Repeating numbers, vivid prophetic dreams, sudden downloads of information about people you barely know. You might be sensing the presence of someone who has passed.",
        "Part of you knows this is real. Another part of you is terrified that you're losing your mind. You've probably Googled 'am I psychic or schizophrenic' at least once.",
        "What you're experiencing is a psychic and intuitive opening. It's one of the most common and most misunderstood forms of spiritual awakening. The abilities you're developing, clairvoyance, clairsentience, clairaudience, mediumship, are real, documented, and can be developed with practice.",
        "The key is learning to discern what's a genuine message from what's anxiety, fear, or mental chatter. That discernment doesn't come from books. It comes from working with someone who has walked this path and can help you calibrate your own inner compass.",
      ],
      recommendedProgram: {
        name: "60-Minute Spiritual Consult",
        href: "/services#spiritual-consult",
        reason:
          "A single session can help you identify exactly which intuitive abilities are opening, validate what you're experiencing, and give you immediate tools to start working with these gifts instead of being overwhelmed by them.",
      },
    },
    healer: {
      name: "The Emerging Healer",
      tagline: "That pull you feel to help others isn't random. It's a calling.",
      body: [
        "You've noticed something happening with your hands. Warmth, tingling, a pull toward people who are in pain. Friends tell you they feel better after being around you. Strangers open up to you within minutes of meeting you.",
        "You're starting to wonder if you're supposed to be doing something with this. Healing work, energy work, something. But the idea of changing your entire career or life direction is overwhelming, and you're not sure if you're 'qualified' or just imagining things.",
        "You're not imagining things. What you're feeling is a genuine healing gift activating. Many healers describe this exact experience, the warmth in the hands, the intuitive pull toward suffering, the sense that you're 'supposed to be doing something more.'",
        "The path from where you are now to confidently practicing as a healer isn't a leap. It's a series of steps. And it starts with understanding your own energy, developing your abilities in a structured way, and having a mentor who has walked this road before you.",
      ],
      recommendedProgram: {
        name: "Accelerator",
        href: "/services#accelerator",
        reason:
          "Emerging healers benefit most from intensive, weekly guidance. The Accelerator's four sessions per month let you develop your abilities in a structured way, with direct messaging access so you can process experiences in real time as your gifts accelerate.",
      },
    },
    seeker: {
      name: "The Spiritual Seeker",
      tagline: "The old life doesn't fit anymore. That's not a crisis. It's a beginning.",
      body: [
        "Everything you built, your career, your relationships, your identity, suddenly feels hollow. You're questioning the meaning of everything. The things that used to motivate you don't anymore. You might have left a marriage, quit a job, or walked away from a friend group that no longer resonates.",
        "People around you think you're going through a midlife crisis. But you know it's deeper than that. Something fundamental has shifted inside you and you can't go back to pretending it hasn't.",
        "What you're experiencing is often called the 'dark night of the soul.' It's one of the most disorienting phases of spiritual awakening, and it's also one of the most transformative. The emptiness you feel isn't a sign that something is wrong. It's the old version of your life making room for something more aligned.",
        "The dark night doesn't last forever. But navigating it alone, without someone who understands the terrain, can make it feel endless. Having a guide who has passed through his own dark night and come out the other side can shorten the journey and help you find meaning in the middle of it.",
      ],
      recommendedProgram: {
        name: "Free Discovery Call",
        href: "/services#discovery-call",
        reason:
          "When you're in the middle of existential questioning, the last thing you need is pressure to commit. Start with a free 15-minute call. Share what's going on. Get a sense of whether this work resonates. You'll know after one conversation if this is the right next step.",
      },
    },
  },
};

export const contact = {
  headline: "Let's Talk", // [DEMO COPY — pending client review]
  subheadline:
    "Whether you have a question, want to learn more about how I work, or you're ready to book, I'd be glad to hear from you. Fill out the form below and I'll respond within 24 hours.", // [DEMO COPY — pending client review]
  formFields: ["name", "email", "phone", "message"] as const,
};

export const footer = {
  tagline:
    "Grounded spiritual guidance for people navigating awakening. Led by Lesley R. Ledbetter, Vietnam veteran and certified ascension guide.", // [DEMO COPY — pending client review]
  links: {
    company: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    resources: [
      { label: "Take the Quiz", href: "/quiz" },
      { label: "Book a Session", href: "/booking" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  social: [] as { platform: string; url: string }[], // None — client has no social accounts
  copyright: `\u00A9 ${new Date().getFullYear()} Collaborative Insights. All rights reserved.`,
};
