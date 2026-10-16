export const birthday = { recipient: "Rasmalai", date: "October 17" };
export const chapters = ["Birthday universe", "Musical love letter", "Our little galaxy"];
export const palette = { blush: "#FFE6E6", dustyPink: "#E1AFD1", lavender: "#AD88C6", periwinkle: "#7469C6" };
export const starMessages = [
  { title: "The first little star", message: "Happy birthday, mera khuchupuch! Love you the mosttt ❤️" },
  { title: "The second little star", message: "Thank you for making me part of you. 🥹❤️" },
  { title: "The third little star", message: "Have a great, happy, and healthy year ahead, my love. ❤️" },
];
export const loveLetter = { title: "A little letter, just for you", message: `My pyaari Rasmalai, 🎀❤️

Happy Birthday to my favourite person. 🥹💗

Thank you for making me a part of your life. Aapko toh pata hi hoga
ki aapse kitna genuine wala, dil se pyaar hai mujhe. 🫶🏻❤️

Pichhle ek mahine mein itni saari nayi-nayi feelings experience
karwane ke liye aapka bahut bahut dhanyawaad ji. 🥹💗
Aapke saath itna kuch feel karna, itni saari chhoti-chhoti
khushiyan experience karna is genuinely special for me.

Zyada lamba-lamba letter nahi likhunga ji, short mein hi
nipta rahe hain. 🤭💌

I LOVE YOUUU THE MOSTTT, MERI RASMALAI! 😚❤️🫂

— Aapka Bilota 🐱💗`, song: { title: "Mi Amor", src: "/audio/mi-amor.mp3" } };
export const proposalMemory = { src: "/images/proposal-place.jpg", caption: "" };
export type PhotoStar = {
  id: string;
  src: string;
  description: string;
  caption?: string;
  color: keyof typeof palette;
  position: { x: number; y: number };
  size?: number;
  drift?: { x: number; y: number; duration: number; delay?: number };
};
export const memories = {
  song: { title: "Dilawara - The PropheC", src: "/audio/dilawara-the-prophec.mp3" },
  photos: [
    { id: "memory-01", src: "/images/memories/memory-01.jpg", description: "Photograph 1", color: "blush", position: { x: 18, y: 27 } },
    { id: "memory-02", src: "/images/memories/memory-02.jpg", description: "Photograph 2", color: "lavender", position: { x: 43, y: 17 } },
    { id: "memory-03", src: "/images/memories/memory-03.jpg", description: "Photograph 3", color: "periwinkle", position: { x: 77, y: 31 } },
    { id: "memory-04", src: "/images/memories/memory-04.jpg", description: "Photograph 4", color: "dustyPink", position: { x: 24, y: 71 } },
    { id: "memory-05", src: "/images/memories/memory-05.jpg", description: "Photograph 5", color: "blush", position: { x: 54, y: 78 } },
    { id: "memory-06", src: "/images/memories/memory-06.jpg", description: "Photograph 6", color: "lavender", position: { x: 83, y: 68 } },
  ] as PhotoStar[],
};
