const jokes: string[] = [
  "Why did the resume go to therapy? Too many gaps to work through.",
  "I put 'attention to detail' on my resume, then sent it with two typos.",
  "Unemployment isn't a gap in your resume — it's a strategic career pause.",
  "Filled out the 'desired salary' field with 'yes.'",
  "My last job ended due to downsizing. My cat calls it 'napping full-time.'",
  "Interviewer: Where do you see yourself in five years? Me: Anywhere with WiFi and snacks.",
  "Currently between jobs, like a very long commercial break.",
  "Told my resume to speak for itself. It's been unemployed too.",
  "Rejection emails make surprisingly good kindling.",
  "Put 'team player' instead of 'agreed with everyone to avoid conflict.'",
];

export function getRandomJoke(): string {
  return jokes[Math.floor(Math.random() * jokes.length)];
}
