export const SALARY_TIERS = [
  {
    tier: "IT Services Baseline",
    roles: "TCS Ninja, Infosys SE, Wipro Standard",
    band: "₹3.5 - 4.5 LPA",
    screen: "Aptitude + basic coding; AI is bonus, not screen",
    minScore: 40,
    color: "slate"
  },
  {
    tier: "IT Services AI-Tier (High Return)",
    roles: "TCS Prime, Infosys Power Programmer, Wipro CoE",
    band: "₹6.5 - 11 LPA",
    screen: "Aptitude + 1 deployed AI project + stronger coding screen",
    minScore: 65,
    color: "orange"
  },
  {
    tier: "Mid-size IT & GCCs",
    roles: "Tech Mahindra, Mphasis, ZS Associates, GCC Analytics",
    band: "₹5 - 9 LPA",
    screen: "1 to 2 AI projects + strong Python + basic SQL",
    minScore: 60,
    color: "blue"
  },
  {
    tier: "Product Companies Entry",
    roles: "Razorpay, Freshworks, Postman, Zoho",
    band: "₹8 - 15 LPA",
    screen: "2+ deployed projects + system design basics + strong fundamentals",
    minScore: 75,
    color: "emerald"
  },
  {
    tier: "IT Services Elite AI-Tier",
    roles: "HCLTech 2026 Elite Program",
    band: "₹18 - 22 LPA",
    screen: "Strong AI / GenAI portfolio + extended technical screen",
    minScore: 85,
    color: "purple"
  },
  {
    tier: "Funded AI-First Startups",
    roles: "Series A and B Startups",
    band: "₹8 - 18 LPA",
    screen: "2+ deployed projects with non-trivial complexity + ownership",
    minScore: 80,
    color: "cyan"
  },
  {
    tier: "Top Product Companies",
    roles: "Atlassian, Adobe, PhonePe, Microsoft IDC",
    band: "₹15 - 28 LPA",
    screen: "Strong fundamentals + DSA + 2 substantial projects + system design",
    minScore: 90,
    color: "pink"
  },
  {
    tier: "FAANG-Tier",
    roles: "Google, Meta, Amazon, Microsoft Research, Anthropic, OpenAI",
    band: "₹25 - 45+ LPA",
    screen: "Top-tier college + publications or competitive programming (<200 fresher offers/year)",
    minScore: 95,
    color: "amber"
  }
];

export const COMPANIES_2026 = [
  {
    id: "tcs",
    name: "TCS",
    badge: "60% AI Freshers in 2026",
    trackName: "TCS Prime & Digital Track",
    packageRange: "₹7.0 - 11.5 LPA (Prime) / ₹3.6 LPA (Ninja)",
    whatsNew: "TCS Prime track for AI-skilled hires; 60% of new joiners now AI-skilled (CHRO Sudeep Kunnumal statement, Mar 2026).",
    whatTheyWant: "NQT pass + 1 deployed AI project + clear technical screen (DSA, OOP, SQL, basic AI).",
    interviewTips: "NQT first. Then technical. For TCS Prime / Digital, expect a deeper technical screen. Mention 1 specific deployed AI project; have your quantified resume line ready.",
    category: "IT Services AI-Tier",
    examId: "tcs-prime"
  },
  {
    id: "infosys",
    name: "Infosys",
    badge: "Differential Pay for AI",
    trackName: "Power Programmer / Specialist Programmer",
    packageRange: "₹6.5 - 9.5 LPA (Power Programmer)",
    whatsNew: "Different starting compensation for AI-attuned candidates (Q4 FY26 statement).",
    whatTheyWant: "InfyTQ + Specialist/Power Programmer track for stronger candidates.",
    interviewTips: "Specialist Programmer / Power Programmer is a harder screen. AI projects help significantly. Have your project's GitHub URL ready; interviewers sometimes inspect code live during the call.",
    category: "IT Services AI-Tier",
    examId: "infosys-pp"
  },
  {
    id: "hcltech",
    name: "HCLTech",
    badge: "₹18-22 LPA Elite Fresher Band",
    trackName: "Elite AI Fresher Program 2026",
    packageRange: "₹18 - 22 LPA (Elite) / ₹3.5 - 4.5 LPA (Standard)",
    whatsNew: "Elite ₹18-22 LPA AI program (2026); highest publicly disclosed IT-services AI premium. Also IIT Guwahati 4-year online BSc Data Science & AI partnership.",
    whatTheyWant: "Standard track stays; elite track requires a strong GenAI / agentic portfolio & deep technical screen.",
    interviewTips: "Mentioning interest in their IIT Guwahati partnership and demonstrating agentic/LLM deployment gives huge advantage.",
    category: "Elite AI-Tier",
    examId: "hcltech-elite"
  },
  {
    id: "wipro",
    name: "Wipro",
    badge: "50 University CoEs",
    trackName: "Centre of Excellence (CoE) AI Track",
    packageRange: "₹6.5 - 8.5 LPA (CoE Track)",
    whatsNew: "Cut FY26 fresher hiring to 7,500-8,000 to raise the bar on AI capability; 50 University CoE program.",
    whatTheyWant: "CoE selection + one strong AI project for the higher track.",
    interviewTips: "CoE selection is interview-heavy and AI-aware. Prepare for technical questions in data engineering, AI/ML, and error recovery.",
    category: "IT Services AI-Tier",
    examId: "layer-2"
  },
  {
    id: "accenture",
    name: "Accenture",
    badge: "Mandatory GenAI Studio",
    trackName: "GenAI Advanced Associate",
    packageRange: "₹4.5 - 7.5 LPA",
    whatsNew: "Mandatory GenAI Studio training for all freshers; AI fluency expected from day one.",
    whatTheyWant: "Standard AMCAT-style process + show high curiosity and practical experience with GenAI.",
    interviewTips: "All freshers go through GenAI Studio training in their first 6 months; showing existing AI fluency and prompt engineering in the interview puts you ahead.",
    category: "Consulting / IT Services",
    examId: "layer-3"
  },
  {
    id: "deshaw",
    name: "D. E. Shaw India",
    badge: "₹2L/mo Summer Internship",
    trackName: "GAI Tech 'Strike' Team",
    packageRange: "₹35 - 50+ LPA / ₹2,00,000/mo Internship",
    whatsNew: "GAI Tech 'Strike' team (Hyderabad/Bengaluru/Gurugram); Summer 2026 internship at ₹2L/month.",
    whatTheyWant: "Premium DSA + algorithms screen; CGPA 7.0+ CSE / 8.0+ Circuit branch.",
    interviewTips: "High rigor on data structures, algorithmic time complexity, probability/math, and scalable backend architecture.",
    category: "Top Product / Quant",
    examId: "deshaw-gai"
  },
  {
    id: "musigma",
    name: "Mu Sigma",
    badge: "AADHI & muTalos Agents",
    trackName: "Decision Scientist - AI Agents",
    packageRange: "₹5.5 - 8.0 LPA",
    whatsNew: "Akashic Architecture, muTalos agents, AADHI Center at Anna University CEG-Guindy.",
    whatTheyWant: "Mu Apt assessment + AI-bot interview + case study (2026 process).",
    interviewTips: "Be prepared for interactive case study problems, mathematical thinking, and problem structuring rather than pure syntax memorization.",
    category: "Analytics & AI",
    examId: "musigma-apt"
  },
  {
    id: "cognizant",
    name: "Cognizant",
    badge: "GenAI Foundry",
    trackName: "Synapse & GenAI Foundry Track",
    packageRange: "₹4.0 - 7.0 LPA",
    whatsNew: "Synapse program + GenAI Foundry; AI-aware fresher tier rising.",
    whatTheyWant: "Standard process + AI project visibility with live deployment.",
    interviewTips: "Be ready to discuss your AI project's deployment story: uptime, latency, token costs, and error handling.",
    category: "IT Services AI-Tier",
    examId: "layer-4"
  },
  {
    id: "techmahindra",
    name: "Tech Mahindra",
    badge: "Project Indus with NVIDIA",
    trackName: "Project Indus & AI Governance",
    packageRange: "₹4.5 - 7.5 LPA",
    whatsNew: "Project Indus with NVIDIA (Hindi-first LLM, education domain); dedicated AI Governance roles.",
    whatTheyWant: "Standard process + genuine interest in India-context AI & LLM safety.",
    interviewTips: "Mention Project Indus and understanding of multi-lingual tokenization or local LLM governance.",
    category: "IT Services AI-Tier",
    examId: "layer-3"
  },
  {
    id: "hexaware",
    name: "Hexaware",
    badge: "Agentverse (600+ Agents)",
    trackName: "Agentic Engineering Track",
    packageRange: "₹4.5 - 8.0 LPA",
    whatsNew: "Agentverse (600+ agents, Mar 2026); Zero License (Feb 2026); 95% workforce GenAI-trained.",
    whatTheyWant: "Standard process; ambitious midsize candidates with multi-agent orchestration skills fit well.",
    interviewTips: "Demonstrate knowledge of agentic loops (LangGraph, tool calling, error state recovery).",
    category: "IT Services AI-Tier",
    examId: "layer-3"
  }
];

export const FOUR_LAYERS = [
  {
    layer: 1,
    title: "Layer 1: Programming Fundamentals",
    subtitle: "Python + Git + Scripting",
    timeBudget: "Months 1-2 (~80 hours)",
    description: "The absolute baseline. Writing clean Python with decorators, classes, virtual environments, understanding Git workflows, and file I/O.",
    skillsNeeded: ["Clean Python (functions, classes, decorators, generators, venv)", "Git (clone, branch, commit, push, pull, merge conflict)", "Reading other people's code", "Basic machine scripting (file I/O, CLI args, env vars)"],
    skillsNotNeeded: ["Deep computer architecture", "Advanced competitive programming beyond standard DSA", "Cloud certifications"],
    milestoneTest: "Clone a small open-source ML project from GitHub, set up a venv, install dependencies, run their eval script, modify one parameter, push your fork, and explain it in under 3 hours."
  },
  {
    layer: 2,
    title: "Layer 2: ML Literacy",
    subtitle: "Regression, Classification, Math & Evaluation",
    timeBudget: "Months 3-4 (~80 hours)",
    description: "Mathematical foundations and classical ML models that power data understanding and intuition.",
    skillsNeeded: ["Linear & Logistic Regression from scratch", "Train/Validation/Test split & Cross-Validation", "Overfitting, Bias-Variance tradeoff & L1/L2 Regularization", "Neural networks & Backprop intuition", "Decision Trees, Random Forest, XGBoost", "Evaluation metrics: Accuracy, Precision, Recall, F1, ROC-AUC"],
    skillsNotNeeded: ["Real analysis or Measure theory", "Deriving backprop matrix calculus from memory (conceptual understanding is enough)"],
    milestoneTest: "Take a Kaggle dataset (e.g. Titanic/House Prices), build a model that beats the median public submission, and document the cross-validation strategy on GitHub."
  },
  {
    layer: 3,
    title: "Layer 3: LLM Fluency",
    subtitle: "Transformers, RAG, Agents & Structured Outputs",
    timeBudget: "Months 5-6 (~80 hours)",
    description: "What modern 2026 'AI Engineer' job descriptions actually screen for. Working with LLM APIs, vector retrieval, structured outputs, and agents.",
    skillsNeeded: ["LLM API orchestration (OpenAI, Anthropic, Hugging Face)", "Prompt Engineering (System prompts, Few-shot, Chain-of-Thought)", "RAG Architecture (Embeddings, Vector DBs, Chunker, Context Injection)", "Structured Outputs & JSON Mode / Function Calling", "Basic AI Agents (tool calling loops & failure recovery)", "Fine-Tuning vs RAG trade-offs", "LLM limitations (Hallucination, Cost, Latency)"],
    skillsNotNeeded: ["Building LLMs from scratch in C++", "Pre-training 70B parameter models"],
    milestoneTest: "Build a document Q&A bot over a custom PDF collection, wire real vector retrieval, and deploy it live. If the bot answers from pre-trained memory instead of retrieved chunks, it fails."
  },
  {
    layer: 4,
    title: "Layer 4: System Integration",
    subtitle: "FastAPI, Docker, Deployment, Evals, Latency & Cost",
    timeBudget: "Months 7-8 (~80 hours)",
    description: "Taking an AI script and turning it into a resilient, production-ready, hosted service that recruiters can click and test.",
    skillsNeeded: ["FastAPI async endpoints & schema validation", "Docker (Dockerfile, containerization, local execution)", "Cloud deployment (Vercel, Render, Hugging Face Spaces, AWS)", "Handcrafted evaluation suites (20+ regression test cases)", "Latency & Cost accounting (token costs, caching, model sizing)"],
    skillsNotNeeded: ["Production-grade Kubernetes clusters", "Multi-region enterprise CI/CD"],
    milestoneTest: "The AI project is live at a public URL with a 20-case eval regression suite, and you can explain what runs where, why, and what it costs per month."
  }
];

export const FIVE_PROJECTS = [
  {
    id: "proj-1",
    title: "1. Document Q&A Bot for Your College",
    techStack: ["RAG", "ChromaDB / Pinecone", "OpenAI API / Llama 3", "FastAPI", "Vercel / Render"],
    description: "A RAG-powered chatbot that accurately answers student questions over college documents (syllabus PDFs, timetables, placement guidelines, fee rules).",
    whyRecruitersClick: "It's specific (named college, real documents), demonstrates the entire RAG pipeline, and solves a genuine real-world problem.",
    weeks: [
      { week: 1, title: "Data Collection & Chunking", task: "Collect 20-50 PDFs. Clean text, chunk intelligently (500 tokens with overlap), generate embeddings, and load into ChromaDB." },
      { week: 2, title: "Retrieval & Ranking", task: "Wire top-k similarity retrieval. Test chunk precision and prevent hallucination with similarity thresholds." },
      { week: 3, title: "LLM Orchestration & Web UI", task: "Add prompt context injection with explicit source citations. Build FastAPI backend + responsive web UI." },
      { week: 4, title: "Deployment & User Testing", task: "Deploy to Render/Vercel. Test with 10+ college students, fix retrieval blind spots." }
    ],
    resumeLine: "Built and deployed a RAG-based chatbot over [College Name]'s academic and placement documents (12,000+ chunks, ChromaDB, OpenAI API, FastAPI backend, Vercel deploy). Used by 80+ students for fee, syllabus, and placement queries."
  },
  {
    id: "proj-2",
    title: "2. Resume Parser & Job Description Matcher",
    techStack: ["Structured Outputs", "JSON Schema", "FastAPI", "PyPDF2", "Tailwind CSS"],
    description: "Takes a job description and candidate resume PDF, extracts 17 structured dimensions, computes candidate fit score, and generates actionable gap feedback.",
    whyRecruitersClick: "It tackles a problem recruiters live with every day, and proves you master Structured Outputs / JSON mode (a standard 2026 enterprise pattern).",
    weeks: [
      { week: 1, title: "PDF Extraction & Schema Design", task: "Extract clean text from multi-column PDFs. Define Pydantic / JSON schema for 17 resume dimensions." },
      { week: 2, title: "LLM Structured Extraction", task: "Implement JSON Mode / Function Calling. Validate output stability across 10 hand-labeled resumes." },
      { week: 3, title: "Scoring & Gap Analysis Logic", task: "Write matching algorithms for hard skills, years of experience, and project tooling. Add explanation generator." },
      { week: 4, title: "UI & Deployment", task: "Build drag-and-drop resume upload UI. Deploy publicly. Test with 20 peers." }
    ],
    resumeLine: "Built a resume-to-JD matching tool using LLM-based parsing and structured outputs. Matches across 17 dimensions (skills, experience, education, projects). Deployed at [URL]; processes ~200 resumes/week from college users."
  },
  {
    id: "proj-3",
    title: "3. Multi-Step AI Agent (LangGraph)",
    techStack: ["LangGraph", "Tool Calling", "External APIs", "Error Recovery Loop", "FastAPI"],
    description: "An autonomous agent that executes multi-step workflows (e.g. smart calendar scheduling, spending analyzer from bank alerts, or code review bot) with error recovery.",
    whyRecruitersClick: "Agentic AI is the top buzzword of 2026. A working agent proves you understand execution loops, tool calling, and failure state handling without hand-waving.",
    weeks: [
      { week: 1, title: "Task & Tool Definitions", task: "Choose one specific domain. Implement 3-4 distinct API tool definitions with rigorous input validation." },
      { week: 2, title: "Planning & Execution Loop", task: "Implement LangGraph state machine for planning, tool execution, and state transitions." },
      { week: 3, title: "Failure Recovery & Guardrails", task: "Handle 3 core failure modes: API timeouts, invalid tool arguments, and rate limits." },
      { week: 4, title: "Telemetry & Deployment", task: "Add step-by-step decision logging for debugging. Deploy and run 20 live integration tests." }
    ],
    resumeLine: "Built a multi-step AI agent for [task] using LangGraph; handles tool use across 4 APIs (Calendar, Email, Notion, Slack); recovers from API failures and logs decisions for debugging."
  },
  {
    id: "proj-4",
    title: "4. Fine-Tuned Model for Niche Domain",
    techStack: ["Hugging Face", "LoRA / PEFT", "Google Colab GPU", "Gradio / HF Spaces"],
    description: "Fine-tuning a lightweight open-weight model (1B to 7B parameters) on a specialized dataset where general LLMs struggle (regional languages, legal clauses, domain code).",
    whyRecruitersClick: "Fine-tuning separates 'AI consumers' from 'AI engineers'. A clean 300-example dataset with quantified benchmark improvements proves real technical depth.",
    weeks: [
      { week: 1, title: "Dataset Curation & Cleaning", task: "Build and format a high-quality dataset of 200-500 curated examples with prompt-response pairs." },
      { week: 2, title: "Training Pipeline (LoRA)", task: "Set up Google Colab notebook with Hugging Face `peft` & `transformers`. Run training with loss tracking." },
      { week: 3, title: "Quantitative Evaluation", task: "Evaluate base model vs fine-tuned model on held-out test set. Calculate accuracy/BLEU/ROUGE improvements." },
      { week: 4, title: "Model Card & Hugging Face Space", task: "Push model weights to Hugging Face Hub. Publish detailed model card and interactive Gradio demo." }
    ],
    resumeLine: "Fine-tuned a 1B-parameter open-weight model on a custom 1,800-example dataset for [task]. Improved accuracy from 41% (base model) to 79% (fine-tuned). Public model and dataset on Hugging Face; weights downloaded 200+ times."
  },
  {
    id: "proj-5",
    title: "5. Placement Prep AI Exam & Interview Tool",
    techStack: ["FastAPI", "Structured Feedback Rubric", "LLM-as-Judge", "React", "Render"],
    description: "An AI mock exam and technical interview roleplayer calibrated directly to TCS Prime, Infosys Power Programmer, and Wipro CoE interview patterns.",
    whyRecruitersClick: "Shows immense industry self-awareness: building tools for the very hiring system you are navigating makes for an unforgettable interview discussion.",
    weeks: [
      { week: 1, title: "Interview Rubric Design", task: "Formulate prompt blueprints calibrated to IT-services AI evaluation criteria (technical depth, clarity, metric usage)." },
      { week: 2, title: "Interactive Exam Engine", task: "Build dynamic questioning loop with structured JSON evaluations and instant score reports." },
      { week: 3, title: "Feedback & Rating Loop", task: "Allow candidates to rate feedback quality; log transcripts to improve prompts across iterations." },
      { week: 4, title: "Campus Testing & Launch", task: "Host mock interview sessions for 30+ batchmates. Tweak evaluation prompts based on actual feedback." }
    ],
    resumeLine: "Built an AI mock-interview tool calibrated to Indian IT-services hiring (TCS, Infosys, Wipro). Used by 60+ students from 4 colleges for 200+ practice rounds. Iterated on prompt design across 8 versions based on user feedback."
  }
];

export const FREE_RESOURCES = [
  {
    layer: "Layer 1 (Programming)",
    name: "University of Helsinki MOOC.fi Python",
    url: "https://programming-25.mooc.fi",
    cost: "Free",
    notes: "7-week course, superb pacing, auto-graded exercises."
  },
  {
    layer: "Layer 1 (Git)",
    name: "Pro Git Book (Chapters 1-3)",
    url: "https://git-scm.com/book/en/v2",
    cost: "Free",
    notes: "Comprehensive. Covers branching, commits, and merge conflicts."
  },
  {
    layer: "Math Foundations",
    name: "3Blue1Brown: Essence of Linear Algebra",
    url: "https://www.3blue1brown.com/topics/linear-algebra",
    cost: "Free",
    notes: "4 hours of visual intuition for vectors, matrices, and transformations."
  },
  {
    layer: "Math Foundations",
    name: "Khan Academy Statistics & Probability",
    url: "https://www.khanacademy.org/math/statistics-probability",
    cost: "Free",
    notes: "Complete coverage of probability, distributions, and Bayes rule."
  },
  {
    layer: "Layer 2 (ML)",
    name: "Andrew Ng: Machine Learning Specialization (Coursera)",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    cost: "Audit Free",
    notes: "2022 modernized version. 3 courses, ~60 hours of focused work."
  },
  {
    layer: "Layer 2 (ML)",
    name: "Andrej Karpathy: A Recipe for Training Neural Networks",
    url: "http://karpathy.github.io/2019/04/25/recipe/",
    cost: "Free",
    notes: "Read twice. Best practical guide on debugging failing models."
  },
  {
    layer: "Layer 3 (Deep Learning & LLMs)",
    name: "fast.ai Practical Deep Learning for Coders",
    url: "https://course.fast.ai",
    cost: "Free",
    notes: "9 lessons, top-down code-first. Replaces expensive ₹50,000 bootcamps."
  },
  {
    layer: "Layer 3 (Deep Learning & LLMs)",
    name: "Andrej Karpathy: Neural Networks Zero to Hero",
    url: "https://karpathy.ai/zero-to-hero.html",
    cost: "Free",
    notes: "6 videos. Builds micrograd, makemore, and GPT from scratch in code."
  },
  {
    layer: "Layer 3 (LLMs & RAG)",
    name: "The Hugging Face Course",
    url: "https://huggingface.co/course",
    cost: "Free",
    notes: "Covers Transformers, fine-tuning, datasets, and modern NLP pipelines."
  },
  {
    layer: "Layer 3 (Prompting & RAG)",
    name: "Anthropic Prompt Engineering Docs & OpenAI Cookbook",
    url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
    cost: "Free",
    notes: "Clean, practical, production patterns with system prompts & structured outputs."
  },
  {
    layer: "Layer 4 (Deployment)",
    name: "FastAPI Official Tutorial",
    url: "https://fastapi.tiangolo.com/tutorial/",
    cost: "Free",
    notes: "Production Python backend framework of choice for 2026."
  }
];

// ================= STAGE SPECIFIC WORKFLOWS & FEATURES (PART 7 OF PDF) =================
export const STAGE_CONFIGS = {
  sem5: {
    id: "sem5",
    label: "Sem ≤ 5 (Foundations)",
    title: "Semester ≤ 5: Foundation & Runway Track",
    runway: "12 to 18 Months",
    weeklyHours: "10 Hours / Week (4h weekend + 6h weekdays)",
    primaryGoal: "Master Layer 1 & 2 without rushing; build GitHub daily commit habit & Kaggle notebooks.",
    targetCTC: "₹7.0 - 22.0 LPA (Prime & Elite Runway)",
    tagline: "You have the most runway, and most students waste it. Build rock-solid foundations before touching LLMs.",
    priorityExams: [
      { id: "layer-1", name: "Layer 1: Python & Git (20 Qs)", badge: "Critical" },
      { id: "layer-2", name: "Layer 2: ML Math & Algorithms (20 Qs)", badge: "Core" },
      { id: "deshaw-gai", name: "D. E. Shaw Summer Intern Math Screen", badge: "Aspirational" }
    ],
    targetCompanies: ["D. E. Shaw Summer 2026 Internship (₹2L/month)", "TCS Prime Campus Drives", "HCLTech TechBee / Elite Program", "Early Hackathons"],
    mustDoList: [
      "Set up GitHub profile and push your first clean Python repository (daily commit habit).",
      "Complete University of Helsinki MOOC.fi Python (7 weeks free, auto-graded exercises).",
      "Read Pro Git Book Chapters 1 to 3 (branching, commits, merge conflicts).",
      "Watch 3Blue1Brown Essence of Linear Algebra (4h visual intuition) + Khan Academy Probability.",
      "Complete Andrew Ng Machine Learning Specialization (2022 Coursera, audit free).",
      "Build a model on Kaggle Titanic placing in top 50% of public submissions with clean notebook."
    ],
    mustSkipList: [
      "DO NOT jump to LLM tutorials or LangChain before Python & Git comfort.",
      "DO NOT spend ₹40,000 on paid bootcamps (the free curriculum is identical).",
      "DO NOT setup Kubernetes or complex multi-region enterprise DevOps yet."
    ],
    failureTrap: "Spending Months 1-2 watching YouTube tutorials without writing your own code. Tutorial code on GitHub does not count; build personal scripts.",
    targetOutput: "A GitHub profile with 3 clean Python tools (scraper, CLI tool, CSV analyzer) + 2 Kaggle notebooks with clear markdown explanations.",
    recommendedProjects: ["proj-1", "proj-2"],
    color: "purple"
  },

  sem7: {
    id: "sem7",
    label: "Sem 7 (Final-Year)",
    title: "Semester 7: Placement Crunch & Fast-Track Execution",
    runway: "0 to 6 Months (Placements Live)",
    weeklyHours: "10-12 Hours / Week (Parallel Track)",
    primaryGoal: "Deploy 1 solid AI project this month to unlock ₹6.5-11 LPA IT-Services AI-Tier; rehearse the 5 interview questions out loud daily.",
    targetCTC: "₹6.5 - 11.5 LPA (TCS Prime / Infosys PP) & ₹18-22 LPA (HCLTech Elite)",
    tagline: "Less runway, parallel track! A single deployed AI project moves you from TCS Ninja (₹3.5 LPA) to TCS Prime (₹7+ LPA).",
    priorityExams: [
      { id: "tcs-prime", name: "TCS Prime AI Track Screening", badge: "Highest ROI" },
      { id: "hcltech-elite", name: "HCLTech Elite ₹18-22 LPA AI Exam", badge: "Elite Band" },
      { id: "infosys-pp", name: "Infosys Power Programmer / Specialist", badge: "AI Track" },
      { id: "layer-3", name: "Layer 3: LLM Fluency & RAG (20 Qs)", badge: "Core Screen" }
    ],
    targetCompanies: ["TCS Prime (₹7.0 - 11.5 LPA)", "HCLTech Elite (₹18 - 22 LPA)", "Infosys Power Programmer (₹6.5 - 9.5 LPA)", "Wipro CoE", "Accenture GenAI Studio"],
    mustDoList: [
      "Honest State Audit: If Python is comfortable, pick 1 project from Part 4 immediately.",
      "Block 4 weekends for Project 1 (Document Q&A Bot) or Project 2 (Resume Matcher).",
      "Deploy your AI project to a public URL (Render / Vercel) with 20 hand-written test cases.",
      "Rehearse the 5 Universal 2026 Interview Questions out loud (record yourself and iterate).",
      "Use Business Outcome Translator: Translate LangChain/LoRA into latency, users, and cost metrics for Java-background panels.",
      "Apply Rule 4.6 on your resume: Ensure every project line ends with a verified number."
    ],
    mustSkipList: [
      "DO NOT spend 3 months starting Python from zero; jump directly into project build if foundations are 60%+.",
      "DO NOT put homework-grade generic sentiment analysis models on your resume (recruiters skip in 4s).",
      "DO NOT give generic answers to 'Why our company?' (mention TCS Prime, GenAI Foundry, etc.)."
    ],
    failureTrap: "Trying to build something too ambitious. The right size is 1.5x harder than feels comfortable. If 4 weeks in and not deployed, cut scope and ship.",
    targetOutput: "1 substantial project deployed live with a 90-second video walkthrough, clean README, 10+ real student users, and polished resume lines.",
    recommendedProjects: ["proj-1", "proj-2", "proj-5"],
    color: "orange"
  },

  graduate: {
    id: "graduate",
    label: "Graduate (Fast-Track)",
    title: "Graduated: 6-Month Accelerated Sprint & User Traction",
    runway: "Full-Time 6-12 Month Window",
    weeklyHours: "16 Hours / Week (Full-Time Sprint)",
    primaryGoal: "Compress 9-month roadmap to 6 months; recruit beta users from Day 1; apply in parallel to 30-50 roles starting Month 4.",
    targetCTC: "₹8.0 - 18.0 LPA (Funded AI Startups & GCCs) & ₹18-22 LPA (HCLTech Elite)",
    tagline: "Full days, no semester exam distractions. Recruit beta users immediately to create massive resume credibility.",
    priorityExams: [
      { id: "layer-3", name: "Layer 3: LLM Fluency & GenAI (20 Qs)", badge: "Core" },
      { id: "layer-4", name: "Layer 4: System Integration & Production (20 Qs)", badge: "Production" },
      { id: "hcltech-elite", name: "HCLTech Elite ₹18-22 LPA Screen", badge: "Elite Track" },
      { id: "deshaw-gai", name: "DE Shaw India GAI Strike Team", badge: "Quant / Top Tier" }
    ],
    targetCompanies: ["Funded AI Startups (Series A/B ₹8-18 LPA)", "Product Companies (Razorpay, Zoho, Postman ₹8-15 LPA)", "GCC Analytics Hubs", "Tier-1 IT AI-Tiers"],
    mustDoList: [
      "Set a strict 6-month calendar working 16 hours/week. Block specific weeks for each layer.",
      "Recruit beta users from Month 1 (college juniors, family, peers) for live testing.",
      "Start parallel applications from Month 4 (30 to 50 calibrated roles tracked in a spreadsheet).",
      "Master multi-agent LangGraph workflows, failure state handling, and Docker deployment.",
      "Fine-tune a small open-weight model (1B-7B) on a niche dataset and publish on Hugging Face Hub."
    ],
    mustSkipList: [
      "DO NOT wait until Month 9 to begin applying; start sending applications from Month 4 as soon as Project 1 is live.",
      "DO NOT build in isolation without external users (external user proof is your #1 credibility lift).",
      "DO NOT apply without customized company-specific research."
    ],
    failureTrap: "Drifting without fixed weekly deadlines or waiting for a 'perfect' portfolio before sending job applications.",
    targetOutput: "A live portfolio site, 2 deployed AI applications with 50+ real users, 30+ submitted applications, and advanced interview pipeline.",
    recommendedProjects: ["proj-3", "proj-4", "proj-2"],
    color: "emerald"
  }
};

export const STAGE_ACTIONS = {
  sem5: {
    ...STAGE_CONFIGS.sem5,
    actions: STAGE_CONFIGS.sem5.mustDoList.map((item, idx) => ({ step: idx + 1, title: item.split(':')[0] || `Step ${idx+1}`, desc: item }))
  },
  sem7: {
    ...STAGE_CONFIGS.sem7,
    actions: STAGE_CONFIGS.sem7.mustDoList.map((item, idx) => ({ step: idx + 1, title: item.split(':')[0] || `Step ${idx+1}`, desc: item }))
  },
  graduate: {
    ...STAGE_CONFIGS.graduate,
    actions: STAGE_CONFIGS.graduate.mustDoList.map((item, idx) => ({ step: idx + 1, title: item.split(':')[0] || `Step ${idx+1}`, desc: item }))
  }
};
