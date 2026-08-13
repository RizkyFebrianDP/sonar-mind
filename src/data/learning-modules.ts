export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: "Cognitive" | "Ethical" | "Behavioral";
  duration: string;
  actionUrl: string;
  iconId: string;
  content?: string;
}

export const learningModules: LearningModule[] = [
  {
    id: "fundamentals",
    title: "AI Fundamentals",
    description: "Basic understanding of what AI is and how Large Language Models work under the hood.",
    category: "Cognitive",
    duration: "10 mins",
    actionUrl: "/learning/fundamentals",
    iconId: "85501",
    content: "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. Large Language Models (LLMs) like GPT are a type of AI called 'generative AI'. They work by predicting the next word in a sequence based on vast amounts of text data they were trained on. \n\nUnderstanding that AI is probabilistic (guessing the next word) rather than deterministic (knowing the absolute truth) is the first step in AI Literacy. AI does not 'think' or 'know' facts; it calculates the statistical likelihood of words following one another."
  },
  {
    id: "bias",
    title: "Uncovering AI Bias",
    description: "Learn to identify and mitigate biases in AI recruitment systems.",
    category: "Ethical",
    duration: "15 mins",
    actionUrl: "/learning/bias",
    iconId: "93125",
    content: "AI Bias occurs when an algorithm produces results that are systemically prejudiced due to erroneous assumptions in the machine learning process. \n\nFor example, if an AI recruitment tool is trained mostly on resumes from male candidates, it might learn to prefer male applicants over female applicants. To mitigate this, developers must ensure training data is diverse and representative. As an AI user, you must always evaluate AI outputs for potential bias, especially when the AI is making decisions that impact human lives."
  },
  {
    id: "hallucination",
    title: "Detecting Hallucinations",
    description: "Practice fact-checking and cross-referencing AI outputs against trusted sources.",
    category: "Behavioral",
    duration: "15 mins",
    actionUrl: "/learning/hallucination",
    iconId: "86958",
    content: "An AI 'hallucination' is when a model confidently generates false, inaccurate, or entirely fabricated information. Because LLMs are designed to generate plausible-sounding text, they will often make up facts if they don't have the information.\n\nBest Practices:\n1. Never trust AI for critical facts without verifying.\n2. Cross-reference AI outputs with primary sources.\n3. Ask the AI to provide citations (but remember, it can hallucinate citations too!)."
  },
  {
    id: "ethical-dilemmas",
    title: "Resolving Ethical Dilemmas",
    description: "Navigate complex moral trade-offs when deploying autonomous AI systems.",
    category: "Ethical",
    duration: "20 mins",
    actionUrl: "/learning/ethical-dilemmas",
    iconId: "101166",
    content: "Ethical dilemmas in AI involve situations where there is no clear right or wrong answer, but rather a trade-off between competing moral values. \n\nFor example, balancing privacy (not training on personal user data) versus performance (needing vast amounts of data to make the AI smart). Another example is the 'Trolley Problem' for autonomous vehicles: how should an AI prioritize lives in an unavoidable crash? Resolving these requires a multidisciplinary approach involving ethicists, developers, and society."
  }
];
