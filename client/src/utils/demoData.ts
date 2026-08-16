import { ResumeData } from "../types/resume";

export const demoResumeData: ResumeData = {
  personal: {
    fullName: "Dev Kumar",
    title: "Computer Science Student",
    email: "dev.kumar@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    linkedin: "https://linkedin.com/in/devkumar",
    github: "https://github.com/devkumar",
    portfolio: "",
  },
  education: [
    {
      id: "edu-1",
      institution: "PES University",
      degree: "B.Tech",
      fieldOfStudy: "Computer Science",
      startYear: "2022",
      endYear: "2026",
      score: "8.7 CGPA",
      description: "Relevant coursework: Data Structures, Algorithms, Databases, Web Development",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "BrightPath Analytics",
      position: "Software Engineering Intern",
      location: "Bengaluru, India",
      startDate: "May 2025",
      endDate: "Jul 2025",
      currentlyWorking: false,
      responsibilities: [
        "Built REST APIs in Node.js used by the internal reporting dashboard",
        "Fixed 15+ bugs reported by QA before the quarterly release",
        "Collaborated with a team of 4 engineers using Git and Agile sprints",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "College Marketplace",
      description:
        "A campus marketplace web app where students can list and buy used textbooks and gear. Built full-stack with authentication, search, and messaging between buyers and sellers.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      githubUrl: "https://github.com/devkumar/college-marketplace",
      liveUrl: "",
    },
    {
      id: "proj-2",
      name: "Habit Tracker CLI",
      description:
        "A command-line habit tracker that stores daily check-ins locally and generates streak statistics.",
      technologies: ["Python", "SQLite"],
      githubUrl: "https://github.com/devkumar/habit-tracker-cli",
      liveUrl: "",
    },
  ],
  skills: {
    programmingLanguages: ["C++", "JavaScript", "Python", "TypeScript"],
    frameworks: ["React", "Node.js", "Express"],
    databases: ["MongoDB", "SQLite"],
    tools: ["Git", "Docker", "Postman"],
    softSkills: ["Communication", "Teamwork", "Problem Solving"],
    other: [],
  },
  achievements: [
    {
      id: "ach-1",
      title: "Winner, Smart India Hackathon (College Round)",
      date: "2025",
      description: "Led a team of 4 to build a working prototype in 24 hours.",
      category: "hackathon",
    },
    {
      id: "ach-2",
      title: "AWS Cloud Practitioner",
      date: "2025",
      description: "",
      category: "certification",
    },
  ],
  jobDescription: "",
};
