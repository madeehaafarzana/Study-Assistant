export const STANDARDS = ["1st PUC (11th Std)", "2nd PUC (12th Std)"] as const;

export type Standard = (typeof STANDARDS)[number];

export const CHAPTERS: Record<Standard, string[]> = {
  "1st PUC (11th Std)": [
    "Computer System",
    "Encoding Schemes and Number System",
    "Emerging Trends",
    "Introduction to Problem Solving",
    "Getting Started with Python",
    "Flow of Control",
    "Functions",
    "Strings",
    "Lists",
    "Tuples and Dictionaries",
    "Societal Impact"
  ],
  "2nd PUC (12th Std)": [
    "Exception Handling in Python",
    "File Handling in Python",
    "Stack",
    "Queue",
    "Sorting",
    "Searching",
    "Understanding Data",
    "Database Concepts",
    "Structured Query Language (SQL)",
    "Computer Networks",
    "Data Communication",
    "Security Aspects",
    "Project Based Learning",
  ],
};
