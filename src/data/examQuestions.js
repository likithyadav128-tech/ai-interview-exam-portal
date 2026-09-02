export const EXAM_PAPERS = {
  // ================= LAYER 1 =================
  "layer-1": {
    id: "layer-1",
    title: "Layer 1: Programming Fundamentals & Python",
    category: "4-Layer Skill Stack",
    tier: "Foundations",
    durationMinutes: 25,
    totalMarks: 25,
    passingMarks: 18,
    description: "Evaluates Python data structures, decorators, generators, OOP, virtual environments, Git branching/merge conflict handling, and scripting.",
    questions: [
      {
        id: "l1_q1",
        type: "mcq",
        question: "What is the primary difference between a Python generator function using `yield` and a regular function returning a list?",
        options: [
          "Generators execute faster for arrays with fewer than 10 elements.",
          "Generators produce items lazily on-demand using an iterator protocol, yielding O(1) memory complexity regardless of dataset size.",
          "Generators bypass the Global Interpreter Lock (GIL) and run on multiple CPU cores automatically.",
          "Generators automatically cache all computed values in a hash table for fast lookup."
        ],
        correctIndex: 1,
        explanation: "Generators use `yield` to maintain internal execution state, generating items one at a time on demand. This provides O(1) space complexity instead of building the whole list in memory (O(N)), which is critical when streaming large datasets or LLM tokens."
      },
      {
        id: "l1_q2",
        type: "code_snippet",
        question: "Examine the following Python decorator code. What will `greet()` print when executed?",
        code: `def log_call(func):
    def wrapper(*args, **kwargs):
        print("Starting call")
        result = func(*args, **kwargs)
        print("Ending call")
        return result
    return wrapper

@log_call
def greet(name):
    return f"Hello, {name}!"

msg = greet("Antigravity")
print(msg)`,
        options: [
          "Starting call -> Hello, Antigravity! -> Ending call",
          "Starting call -> Ending call -> Hello, Antigravity!",
          "Hello, Antigravity! -> Starting call -> Ending call",
          "SyntaxError: Decorator wrapper missing return value"
        ],
        correctIndex: 1,
        explanation: "When `greet('Antigravity')` runs, `wrapper` first prints 'Starting call', calls `func()` returning 'Hello, Antigravity!', then prints 'Ending call', and finally returns the string which is printed at the end."
      },
      {
        id: "l1_q3",
        type: "mcq",
        question: "You encounter a Git merge conflict in file `app.py` after running `git pull origin main`. What is the correct standard sequence to resolve it?",
        options: [
          "Run `git reset --hard` -> `git push origin main`.",
          "Edit `app.py` to remove merge markers (`<<<<<<<`, `=======`, `>>>>>>>`), choose correct code -> `git add app.py` -> `git commit -m 'resolve merge conflict'`.",
          "Delete `.git` folder and re-clone the repository.",
          "Run `git merge --abort` and ignore the incoming upstream changes."
        ],
        correctIndex: 1,
        explanation: "To resolve a Git merge conflict, you manually edit the conflicted file to reconcile changes and remove conflicting markers, stage the resolved file with `git add`, and finalize the merge with `git commit`."
      },
      {
        id: "l1_q4",
        type: "mcq",
        question: "Why should you always create and activate a Python virtual environment (`python -m venv venv`) when developing ML / AI services?",
        options: [
          "It forces Python to execute code in 64-bit multi-threaded mode.",
          "It isolates project-specific dependencies and library versions from the system Python installation, preventing dependency conflicts and version drift.",
          "It compiles Python bytecode into native C++ machine binaries for faster GPU execution.",
          "It automatically encrypts source files when pushing to public GitHub repositories."
        ],
        correctIndex: 1,
        explanation: "A virtual environment isolates packages and dependencies so that conflicting versions required by different projects (e.g. PyTorch 2.1 vs PyTorch 2.4, LangChain v0.1 vs v0.3) do not collide."
      },
      {
        id: "l1_q5",
        type: "code_snippet",
        question: "What is the output of the following mutable default argument snippet in Python?",
        code: `def append_val(item, target_list=[]):
    target_list.append(item)
    return target_list

l1 = append_val(10)
l2 = append_val(20)
print(l1, l2)`,
        options: [
          "[10] [20]",
          "[10, 20] [10, 20]",
          "[10] [10, 20]",
          "TypeError: mutable default argument not permitted"
        ],
        correctIndex: 1,
        explanation: "In Python, default arguments are evaluated only once when the function is defined, not each time it is called. Thus, `target_list` references the same persistent list object across multiple invocations."
      }
    ]
  },

  // ================= LAYER 2 =================
  "layer-2": {
    id: "layer-2",
    title: "Layer 2: ML Literacy & Applied Math",
    category: "4-Layer Skill Stack",
    tier: "ML Core",
    durationMinutes: 30,
    totalMarks: 25,
    passingMarks: 18,
    description: "Evaluates regression, classification, cross-validation, regularization (L1/L2), decision trees, neural network backprop intuition, and metric selection.",
    questions: [
      {
        id: "l2_q1",
        type: "mcq",
        question: "In an imbalanced classification problem (e.g. Fraud Detection with 99.5% legitimate transactions and 0.5% fraud), why is Accuracy a dangerous evaluation metric?",
        options: [
          "Accuracy cannot be calculated when probabilities sum to 1.0.",
          "A naive dummy model predicting 'Legitimate' 100% of the time achieves 99.5% accuracy while catching 0% of fraud cases.",
          "Accuracy only works for regression models with continuous targets.",
          "Accuracy requires double the compute time of F1-Score."
        ],
        correctIndex: 1,
        explanation: "Accuracy is skewed by majority classes in imbalanced datasets. Precision, Recall, F1-Score, or PR-AUC are far more appropriate because they measure performance specifically on the minority/positive class."
      },
      {
        id: "l2_q2",
        type: "mcq",
        question: "What is the mathematical role of L1 Regularization (Lasso) compared to L2 Regularization (Ridge) in linear models?",
        options: [
          "L1 adds the squared sum of weights, whereas L2 adds absolute values.",
          "L1 adds a penalty proportional to the absolute values of coefficients ($|\\theta|$), driving less important feature weights strictly to zero for sparse feature selection.",
          "L1 eliminates all gradient calculations during backpropagation.",
          "L2 prevents overfitting only on neural networks with convolutional layers."
        ],
        correctIndex: 1,
        explanation: "L1 regularization adds $\\lambda \\sum |w_i|$ to the loss function. Its geometric sharp diamond constraint causes non-informative weights to become exactly zero, yielding automatic feature selection."
      },
      {
        id: "l2_q3",
        type: "mcq",
        question: "What does the chain rule enable during the backpropagation algorithm in neural networks?",
        options: [
          "It calculates matrix eigenvalues for data normalization.",
          "It enables the analytical computation of the gradient of the loss function with respect to weights in intermediate layers by cascading local partial derivatives.",
          "It forces all activation functions to output values between 0 and 1.",
          "It converts categorical variables into one-hot encoded vectors."
        ],
        correctIndex: 1,
        explanation: "Backpropagation applies the calculus chain rule $\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial y} \\cdot \\frac{\\partial y}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w}$ to calculate how adjusting weights in earlier layers impacts the final loss."
      },
      {
        id: "l2_q4",
        type: "mcq",
        question: "Which of the following algorithms is an example of 'Boosting' rather than 'Bagging'?",
        options: [
          "Random Forest",
          "ExtraTreesClassifier",
          "XGBoost (Extreme Gradient Boosting)",
          "Bootstrap Aggregated Linear Regressor"
        ],
        correctIndex: 2,
        explanation: "Random Forest is Bagging (training independent decision trees in parallel on bootstrap samples). XGBoost is Boosting (training trees sequentially, where each new tree fits the residual errors of prior trees)."
      },
      {
        id: "l2_q5",
        type: "mcq",
        question: "What occurs when a model exhibits high variance (overfitting)?",
        options: [
          "Low training error, but high validation/test error; model memorizes noise in the training set.",
          "High training error, and high validation error; model is too simple to capture patterns.",
          "Model predictions are constant regardless of input features.",
          "The learning rate is too large causing loss to diverge to infinity."
        ],
        correctIndex: 0,
        explanation: "High variance means the model fits the training data too tightly (memorizing noise), resulting in low training error but failing to generalize to unseen validation/test data."
      }
    ]
  },

  // ================= LAYER 3 =================
  "layer-3": {
    id: "layer-3",
    title: "Layer 3: LLM Fluency & GenAI Architecture",
    category: "4-Layer Skill Stack",
    tier: "AI Engineering",
    durationMinutes: 30,
    totalMarks: 25,
    passingMarks: 18,
    description: "Evaluates RAG retrieval pipelines, embeddings, vector similarity, prompt engineering (CoT, few-shot), structured JSON outputs, LangGraph agents, and fine-tuning vs RAG trade-offs.",
    questions: [
      {
        id: "l3_q1",
        type: "mcq",
        question: "When should an engineering team choose RAG (Retrieval-Augmented Generation) over Fine-Tuning a model?",
        options: [
          "When the task requires changing the linguistic tone and rigid structured output format of the model.",
          "When domain data changes frequently, source attribution/citations are required, and proprietary document context must be injected dynamically without retraining.",
          "When you need to reduce per-query inference token costs to zero.",
          "When working with tiny 100M parameter models on edge devices."
        ],
        correctIndex: 1,
        explanation: "RAG keeps the model weights frozen and dynamically retrieves up-to-date chunks from private/frequently updated vector databases, providing explicit document citations and avoiding costly retraining."
      },
      {
        id: "l3_q2",
        type: "mcq",
        question: "Why is chunk overlap (e.g. 500-token chunks with 50-token overlap) critical in RAG indexing pipelines?",
        options: [
          "It compresses the vector embeddings by 50%.",
          "It prevents semantic context from being sliced mid-sentence or mid-thought at arbitrary chunk boundaries, preserving meaning across split paragraphs.",
          "It guarantees that vector databases will never encounter duplicate embeddings.",
          "It forces the LLM to output responses in JSON format."
        ],
        correctIndex: 1,
        explanation: "Chunk overlap ensures that sentences or entities spanning chunk boundaries don't lose their relational context, enabling accurate semantic embedding matching."
      },
      {
        id: "l3_q3",
        type: "mcq",
        question: "What is the defining characteristic of an 'AI Agent' compared to a single LLM API call?",
        options: [
          "An agent uses a proprietary closed-source API model only.",
          "An agent operates in an autonomous loop: it plans steps, invokes external tools (calculators, databases, APIs), inspects outputs, and recovers from errors until a goal is reached.",
          "An agent runs exclusively on mobile edge processors without network connectivity.",
          "An agent converts prompts into SQL queries without requiring embeddings."
        ],
        correctIndex: 1,
        explanation: "A simple LLM call is one-shot text-in text-out. An agent executes a stateful loop: deciding which tools to call, parsing intermediate results, handling exceptions, and deciding the next step."
      },
      {
        id: "l3_q4",
        type: "mcq",
        question: "How do modern LLM APIs enforce 'Structured Outputs' (such as JSON mode or function calling schemas)?",
        options: [
          "By asking the model nicely in the prompt and hoping it does not hallucinate extra text.",
          "By applying constrained decoding / grammar masks at the tokenizer level to ensure generated token probabilities only permit valid schema-compliant tokens.",
          "By running a regex replace on the final string after complete unconstrained generation.",
          "By training a dedicated neural network for every JSON key in the schema."
        ],
        correctIndex: 1,
        explanation: "Production structured outputs use grammar-constrained decoding (masking invalid logits at generation time) so that the LLM is mathematically incapable of emitting invalid JSON tokens."
      },
      {
        id: "l3_q5",
        type: "mcq",
        question: "Which prompt engineering technique explicitly asks an LLM to 'break the problem down step-by-step before producing the final answer'?",
        options: [
          "Zero-shot classification",
          "Chain-of-Thought (CoT) Prompting",
          "Re-ranking retrieval",
          "LoRA Low-Rank Adaptation"
        ],
        correctIndex: 1,
        explanation: "Chain-of-Thought (CoT) prompts the model to generate intermediate reasoning tokens, significantly boosting performance on multi-step logic, math, and code generation problems."
      }
    ]
  },

  // ================= LAYER 4 =================
  "layer-4": {
    id: "layer-4",
    title: "Layer 4: System Integration & Production Deployment",
    category: "4-Layer Skill Stack",
    tier: "Production Engineering",
    durationMinutes: 25,
    totalMarks: 25,
    passingMarks: 18,
    description: "Evaluates FastAPI backend architecture, Docker containerization, cloud deployment, evaluation test suites, token caching, latency, and cost modeling.",
    questions: [
      {
        id: "l4_q1",
        type: "mcq",
        question: "Why is `async def` in FastAPI particularly advantageous when handling multiple concurrent LLM API requests?",
        options: [
          "It compiles Python into machine code ahead of time.",
          "It uses non-blocking I/O, freeing the event loop while waiting for downstream network responses from LLM providers, allowing hundreds of concurrent requests per worker.",
          "It automatically pays OpenAI API bills using cloud credits.",
          "It converts all synchronous database queries into Redis cached lookups."
        ],
        correctIndex: 1,
        explanation: "LLM API calls are heavily I/O-bound (network wait times of 1-5 seconds). Async I/O allows a single process to service other incoming user requests while waiting for the LLM token response."
      },
      {
        id: "l4_q2",
        type: "mcq",
        question: "In Docker, what is the purpose of a multi-stage build when containerizing a Python FastAPI + ML application?",
        options: [
          "To train models on multiple GPUs in parallel during image build.",
          "To separate build tools/compilers from the lean runtime container, drastically reducing final image size and security attack surface.",
          "To allow containers to run without Docker daemon installed.",
          "To bypass Python's Global Interpreter Lock."
        ],
        correctIndex: 1,
        explanation: "Multi-stage builds use intermediate containers with heavy compilers (gcc, dev packages) to build wheels, then copy only necessary artifacts into a minimal slim runtime base image."
      },
      {
        id: "l4_q3",
        type: "mcq",
        question: "What is an 'LLM Regression Eval Suite' and why is it essential before updating prompts or switching models?",
        options: [
          "A tool to calculate linear regression slopes on user signups.",
          "A curated set of fixed test inputs and expected ground-truth answers used to verify that prompt modifications don't break previously working capabilities.",
          "A script that restarts the server whenever memory exceeds 80%.",
          "A Docker container that automatically formats Python code with Black."
        ],
        correctIndex: 1,
        explanation: "Even minor prompt tweaks can cause subtle degradation on edge cases. A regression eval suite runs the new prompt against a benchmark of test cases to measure pass/fail rates systematically."
      },
      {
        id: "l4_q4",
        type: "mcq",
        question: "Which caching strategy is most effective for reducing LLM API costs on identical or semantically similar user queries?",
        options: [
          "Browser LocalStorage caching only.",
          "Semantic Caching using vector similarity over previous query embeddings (e.g. GPTCache / Redis vector search) combined with exact hash matching.",
          "Hardcoding responses into the frontend Javascript bundle.",
          "Disabling system prompts for repeated calls."
        ],
        correctIndex: 1,
        explanation: "Semantic caching embeds incoming queries and checks if an existing cached query has >0.95 similarity, returning the cached response in <20ms and costing $0 in new LLM tokens."
      },
      {
        id: "l4_q5",
        type: "mcq",
        question: "If an LLM call costs ₹0.05 per 1,000 tokens and an app handles 100,000 queries per day averaging 2,000 tokens per query, what is the daily LLM API cost?",
        options: [
          "₹100",
          "₹1,000",
          "₹10,000",
          "₹100,000"
        ],
        correctIndex: 2,
        explanation: "Total daily tokens = 100,000 * 2,000 = 200,000,000 tokens. Total cost = (200,000,000 / 1,000) * ₹0.05 = 200,000 * ₹0.05 = ₹10,000/day."
      }
    ]
  },

  // ================= COMPANY EXAMS =================
  "tcs-prime": {
    id: "tcs-prime",
    title: "TCS Prime & Digital Track Assessment",
    company: "TCS",
    category: "Company Technical Round",
    tier: "IT Services AI-Tier (₹7.0 - 11.5 LPA)",
    durationMinutes: 35,
    totalMarks: 30,
    passingMarks: 22,
    description: "Replicates the TCS Prime 2026 technical screen: Advanced Python algorithms, deployed AI project validation, data engineering fundamentals, and system troubleshooting.",
    questions: [
      {
        id: "tcs_q1",
        type: "mcq",
        question: "TCS Prime Technical Round: You are asked to implement a function that finds the longest palindromic substring in O(N^2) time with O(1) extra space. Which approach should you choose?",
        options: [
          "Dynamic programming table requiring O(N^2) memory allocation.",
          "Expand around center algorithm for every 2N-1 possible centers.",
          "Recursive brute-force generating all substrings in O(N^3).",
          "Sorting the string and using two pointers."
        ],
        correctIndex: 1,
        explanation: "Expanding around center considers all single-character and double-character centers, checking outwards in O(N) per center, achieving O(N^2) total time and O(1) auxiliary memory."
      },
      {
        id: "tcs_q2",
        type: "mcq",
        question: "TCS Prime AI Screen: When asked by the interviewer, 'Why did you deploy your project with FastAPI instead of Flask or Django?', what is the strongest technical justification?",
        options: [
          "FastAPI is the oldest framework with the most legacy enterprise documentation.",
          "FastAPI natively supports asynchronous request handling (`async/await`), automatic OpenAPI/Swagger documentation, and Pydantic data validation with high throughput.",
          "Flask does not support Python 3.10+.",
          "FastAPI does not require any web server like Uvicorn."
        ],
        correctIndex: 1,
        explanation: "FastAPI is built on Starlette and Pydantic, providing native async support for I/O-heavy LLM calls, automatic schema validation, and instant interactive Swagger documentation."
      },
      {
        id: "tcs_q3",
        type: "code_snippet",
        question: "What is the time complexity of the following Python dictionary operations?",
        code: `lookup_table = {i: i**2 for i in range(100000)}
# Operation 1: key check
exists = 9999 in lookup_table
# Operation 2: value check
val_exists = 9999 in lookup_table.values()`,
        options: [
          "Op 1: O(1) average; Op 2: O(N) average",
          "Op 1: O(N) average; Op 2: O(1) average",
          "Op 1: O(1); Op 2: O(1)",
          "Op 1: O(log N); Op 2: O(log N)"
        ],
        correctIndex: 0,
        explanation: "Key lookup in a hash map is O(1) average. However, searching through `dict.values()` requires a linear scan over all values, which is O(N)."
      },
      {
        id: "tcs_q4",
        type: "mcq",
        question: "During a TCS Prime interview, the panel asks: 'How does your deployed college Q&A chatbot handle hallucination when a student asks about a non-existent fee waiver?' What is the best engineering answer?",
        options: [
          "We rely on the LLM's natural intelligence to guess accurately.",
          "We set a cosine similarity retrieval threshold (e.g. 0.72) and instruct the prompt with explicit guardrails: 'If the retrieved context does not contain the answer, reply only with: I do not have verified records for this query'.",
          "We fine-tune GPT-4 on every student query daily.",
          "We disable temperature completely to make the model answer everything."
        ],
        correctIndex: 1,
        explanation: "Combining a strict vector retrieval similarity cutoff with negative prompt constraints ('answer strictly from provided context, else state unable to find') prevents hallucinations on out-of-distribution queries."
      }
    ]
  },

  "hcltech-elite": {
    id: "hcltech-elite",
    title: "HCLTech Elite AI Program 2026 Assessment",
    company: "HCLTech",
    category: "Company Technical Round",
    tier: "Elite AI-Tier (₹18.0 - 22.0 LPA)",
    durationMinutes: 40,
    totalMarks: 35,
    passingMarks: 27,
    description: "Replicates the high-bar HCLTech 2026 Elite AI Fresher screen: Multi-agent orchestration, LangGraph state machines, advanced GenAI architecture, vector DB tuning, and production error recovery.",
    questions: [
      {
        id: "hcl_q1",
        type: "mcq",
        question: "In a multi-agent LangGraph system with 4 specialized sub-agents, how should state be managed across agent transitions?",
        options: [
          "By passing JSON strings inside an infinite while loop without type annotations.",
          "By defining a central TypedDict / Pydantic `State` object with reducer functions that append messages or update specific fields immutably.",
          "By storing state in global variables on the frontend client browser.",
          "By rebuilding the entire vector index after every sub-agent turn."
        ],
        correctIndex: 1,
        explanation: "LangGraph uses graph state schemas (TypedDict/Pydantic) with defined reducer annotations (like `add_messages`) to ensure state transitions between nodes are predictable and thread-safe."
      },
      {
        id: "hcl_q2",
        type: "mcq",
        question: "What happens when an LLM agent gets stuck in a cyclic tool-calling failure loop (e.g. repeatedly passing malformed SQL syntax)?",
        options: [
          "The server will run indefinitely until the GPU explodes.",
          "A resilient agent must implement a Maximum Recursion Limit (e.g. max_iterations=5), exponential backoff, and fallback routing to inform the user gracefully.",
          "The API provider automatically fixes the SQL query.",
          "Temperature must be increased to 2.0 to randomize tool inputs."
        ],
        correctIndex: 1,
        explanation: "Production agents must enforce circuit breakers: maximum recursion limits, backoff retry policies, and error reflection nodes that feed error traces back into the prompt."
      },
      {
        id: "hcl_q3",
        type: "mcq",
        question: "When tuning a production RAG system with 50,000 technical manuals, which re-ranking technique provides the greatest accuracy lift over naive vector search?",
        options: [
          "Alphabetical sorting by filename.",
          "Two-stage retrieval: Retrieve top-50 candidates using dense vector search + BM25 keyword search (hybrid search), then apply a Cross-Encoder Re-ranker (e.g., Cohere/BGE-Reranker) to score the top-5 chunks.",
          "Discarding vector embeddings and using `LIKE %query%` in MySQL.",
          "Increasing the chunk size from 500 tokens to 10,000 tokens."
        ],
        correctIndex: 1,
        explanation: "Hybrid search (BM25 + dense vectors) captures both exact keyword matches and semantic concepts, while a cross-encoder computes full token-level cross-attention to rank true semantic relevance."
      }
    ]
  },

  "infosys-pp": {
    id: "infosys-pp",
    title: "Infosys Power Programmer / Specialist Assessment",
    company: "Infosys",
    category: "Company Technical Round",
    tier: "IT Services AI-Tier (₹6.5 - 9.5 LPA)",
    durationMinutes: 35,
    totalMarks: 30,
    passingMarks: 22,
    description: "Replicates Infosys Power Programmer technical screening: algorithmic complexity, graph traversal, Python optimization, and practical ML pipeline architecture.",
    questions: [
      {
        id: "infy_q1",
        type: "mcq",
        question: "What is the worst-case time complexity of Dijkstra's shortest path algorithm implemented with a Min-Heap (priority queue)?",
        options: [
          "O(V^2)",
          "O((V + E) log V)",
          "O(V * E)",
          "O(E^2)"
        ],
        correctIndex: 1,
        explanation: "Using a min-heap, inserting and extracting vertices takes O(log V) time, resulting in O((V + E) log V) total running time, which is optimal for sparse graphs."
      },
      {
        id: "infy_q2",
        type: "mcq",
        question: "In an Infosys Power Programmer interview, you are asked to explain why you used LoRA (Low-Rank Adaptation) instead of full parameter fine-tuning. What is the key advantage?",
        options: [
          "LoRA trains the model on CPU without requiring any GPU memory.",
          "LoRA freezes pretrained weights and injects trainable rank-decomposition matrices into transformer layers, cutting trainable parameters by 99% and drastically lowering VRAM usage.",
          "LoRA converts the transformer into a decision tree model.",
          "LoRA eliminates the need for any training dataset."
        ],
        correctIndex: 1,
        explanation: "LoRA decomposes the weight update $\\Delta W = A \\times B$ into low-rank matrices of rank $r \\ll d$, reducing memory and compute requirements by up to 90% while maintaining near full fine-tuning performance."
      }
    ]
  },

  "deshaw-gai": {
    id: "deshaw-gai",
    title: "D. E. Shaw India GAI Tech Strike Team Exam",
    company: "D. E. Shaw India",
    category: "Top Product / Quant Round",
    tier: "Quant / High Product (₹35 - 50+ LPA)",
    durationMinutes: 45,
    totalMarks: 40,
    passingMarks: 32,
    description: "High-rigor screening for D. E. Shaw GAI team: Advanced dynamic programming, probability/Bayes theorem puzzles, gradient mathematics, and low-latency system design.",
    questions: [
      {
        id: "deshaw_q1",
        type: "mcq",
        question: "Probability Puzzle: You have 2 unbiased coins and 1 biased coin that lands on Heads with probability 0.8. You pick one coin at random and flip it 3 times; all 3 flips land on Heads. What is the probability that you picked the biased coin?",
        options: [
          "0.333",
          "0.579",
          "0.672",
          "0.804"
        ],
        correctIndex: 2,
        explanation: "By Bayes' Theorem: P(Biased) = 1/3, P(Fair) = 2/3. P(3H|Biased) = 0.8^3 = 0.512. P(3H|Fair) = 0.5^3 = 0.125. P(3H) = (1/3 * 0.512) + (2/3 * 0.125) = 0.17066 + 0.08333 = 0.254. P(Biased|3H) = 0.17066 / 0.254 ≈ 0.672 (67.2%)."
      },
      {
        id: "deshaw_q2",
        type: "mcq",
        question: "In Transformer self-attention, why is the dot product $Q K^T$ scaled by $\\frac{1}{\\sqrt{d_k}}$ before applying the softmax function?",
        options: [
          "To reduce the matrix dimension to scalar values.",
          "For large dimensions $d_k$, dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients (vanishing gradients). Scaling stabilizes gradients.",
          "To convert negative attention weights into positive values.",
          "To force self-attention to run in $O(N)$ linear time."
        ],
        correctIndex: 1,
        explanation: "Assuming $q$ and $k$ are zero-mean unit-variance variables, their dot product has variance $d_k$. Dividing by $\\sqrt{d_k}$ restores variance to 1, preventing softmax saturation and vanishing gradients."
      }
    ]
  },

  "musigma-apt": {
    id: "musigma-apt",
    title: "Mu Sigma Mu Apt & AI-Bot Case Study",
    company: "Mu Sigma",
    category: "Company Technical Round",
    tier: "Analytics & AI (₹5.5 - 8.0 LPA)",
    durationMinutes: 30,
    totalMarks: 25,
    passingMarks: 18,
    description: "Simulates the Mu Sigma 2026 assessment: Structured problem solving, decision analytics, probability, and AI agent workflow evaluation.",
    questions: [
      {
        id: "mu_q1",
        type: "mcq",
        question: "Mu Sigma Case Study: An e-commerce platform's recommendation engine shows a 15% increase in click-through rate (CTR), but overall revenue declines by 4%. What is the most plausible analytical explanation?",
        options: [
          "The algorithm was trained without cross-validation.",
          "The model is over-recommending low-priced clickbait items (high clicks, tiny basket size) at the expense of high-value purchases.",
          "Click-through rate is mathematically inversely correlated with revenue.",
          "The database indexes are fragmented."
        ],
        correctIndex: 1,
        explanation: "Optimizing purely for engagement/clicks often creates perverse incentives where algorithms surface cheap sensational items that convert with minimal cart value, hurting total revenue."
      },
      {
        id: "mu_q2",
        type: "mcq",
        question: "What is the primary role of Mu Sigma's muTalos agents and Akashic architecture?",
        options: [
          "Automating decision trees for automated supply chain and analytical insights.",
          "Replacing Python with low-code spreadsheets.",
          "Mining cryptocurrency during off-peak cloud hours.",
          "Transcribing audio interviews into text."
        ],
        correctIndex: 0,
        explanation: "Mu Sigma's muTalos agentic framework focuses on continuous decision engineering, automating complex analytics workflows and supply chain decision-making."
      }
    ]
  }
};

// ================= INTERVIEW QUESTIONS (THE 5 UNIVERSAL QUESTIONS) =================
export const UNIVERSAL_INTERVIEW_QUESTIONS = [
  {
    id: "iq-1",
    questionNumber: 1,
    title: "Question 1: Walk me through a project you built",
    context: "The single most common opening in 2026 placement interviews. Panels want a 90-second structured walkthrough.",
    recommendedStructure: [
      "1. Problem Statement (15s): What real friction did you solve?",
      "2. Solution & Tooling (25s): What architecture and real tools did you use?",
      "3. Technical Depth & Decision (30s): One non-trivial trade-off or parameter you tuned.",
      "4. Honest Reflection (20s): One failure you encountered and how you fixed it."
    ],
    sampleGoodAnswer: "I built a RAG-based Q&A chatbot over my college's 12,000 document chunks using ChromaDB, FastAPI, and OpenAI. We had a problem where students struggled to find fee deadline and syllabus updates. The technical challenge was chunk boundary context loss; I implemented 500-token chunks with 50-token overlap and a 0.72 similarity threshold. Initially the bot hallucinated on missing data, so I added explicit negative constraints. It is now deployed on Render and used by 80+ students.",
    commonMistake: "Telling the entire story chronologically without metrics or naming real tools.",
    keywordsToInclude: ["problem", "FastAPI", "ChromaDB", "embeddings", "overlap", "threshold", "users", "metric"]
  },
  {
    id: "iq-2",
    questionNumber: 2,
    title: "Question 2: What's the difference between fine-tuning and RAG, and when would you use each?",
    context: "Screens whether you actually understand the AI engineering stack or just glued libraries together.",
    recommendedStructure: [
      "1. Fundamental Difference: Fine-tuning modifies model weights; RAG keeps weights frozen and injects context dynamically at query time.",
      "2. When to use RAG: Dynamic/frequently updated data, private document retrieval, verifiable citations.",
      "3. When to use Fine-Tuning: Consistent tone/style, domain-specific terminology, specialized formatting, or tiny models.",
      "4. Production Reality: 2026 systems often combine both (e.g. fine-tuned small model for structured extraction + RAG for knowledge)."
    ],
    sampleGoodAnswer: "Fine-tuning updates the internal parameters of the model to bake in specialized behaviors or linguistic styles. RAG keeps the model weights frozen and retrieves relevant factual context from a vector database at query time. I use RAG when the underlying data changes frequently and source attribution is required. I use fine-tuning when the data format is stable and I need strict structured adherence or latency reduction on small models.",
    commonMistake: "Saying fine-tuning is for adding new company data (which leads to hallucinations and massive re-training costs).",
    keywordsToInclude: ["weights", "frozen", "vector database", "citations", "dynamic", "retrieval", "style", "latency"]
  },
  {
    id: "iq-3",
    questionNumber: 3,
    title: "Question 3: How do you evaluate an LLM-based system?",
    context: "Many candidates fumble this by talking about training loss. Interviewers want to hear about practical system evals.",
    recommendedStructure: [
      "1. Handcrafted Benchmark: 20-100 representative edge-case test queries.",
      "2. Automated Evals: Exact match, regex, JSON schema validation, latency/cost tracking.",
      "3. Qualitative Evals: LLM-as-a-judge with calibrated rubrics, human spot-checking.",
      "4. Regression Tracking: Running evals on CI/CD before any prompt change."
    ],
    sampleGoodAnswer: "I evaluate LLMs using a multi-tier approach: First, I hand-build a regression suite of 20 to 50 golden test cases representing frequent and adversarial queries. Second, I run automated checks for JSON schema validity and latency. Third, for subjective quality, I use an LLM-as-judge with explicit rubrics, paired with manual sample reviews. I run this suite on every prompt update to prevent regressions.",
    commonMistake: "Saying 'I just looked at the responses and they looked good' or confusing training loss with system evaluation.",
    keywordsToInclude: ["benchmark", "golden test cases", "regression", "JSON schema", "LLM-as-judge", "rubric", "latency"]
  },
  {
    id: "iq-4",
    questionNumber: 4,
    title: "Question 4: What does this project of yours NOT do well?",
    context: "A classic trap question. Saying 'nothing' is a red flag. Trashing the project is a red flag.",
    recommendedStructure: [
      "1. Name 1-2 specific technical limitations honestly.",
      "2. Explain the engineering trade-off that caused it (e.g., latency vs cost, memory vs recall).",
      "3. Outline the concrete engineering step you would take next to address it."
    ],
    sampleGoodAnswer: "My document Q&A bot currently struggles with multi-hop questions where an answer spans across two completely unrelated PDF tables. I prioritized low-latency single-step similarity retrieval to keep query times under 1.5 seconds. To fix this without blowing the token budget, my next iteration will introduce a lightweight hybrid BM25 + dense re-ranking step.",
    commonMistake: "Claiming the project is 100% accurate, or saying you don't know.",
    keywordsToInclude: ["trade-off", "limitation", "latency", "re-ranking", "iteration", "engineering decision"]
  },
  {
    id: "iq-5",
    questionNumber: 5,
    title: "Question 5: Why are you applying to [our company] specifically?",
    context: "Generic answers get rejected. Panels screen for candidates who did 10 minutes of research.",
    recommendedStructure: [
      "1. Name the specific 2026 AI initiative or track of the company.",
      "2. Connect your hands-on project experience directly to that initiative.",
      "3. Highlight how you will contribute from day one."
    ],
    sampleGoodAnswer: "For TCS: 'I am specifically targeting the TCS Prime track because TCS CHRO announced that 60% of freshers will be AI-skilled. My hands-on experience building and deploying FastAPI and RAG systems matches the Prime technical criteria.' For HCLTech: 'I'm excited about HCLTech's ₹18-22 LPA Elite AI fresher program and the IIT Guwahati Data Science partnership; my work in multi-agent orchestration prepares me to contribute immediately.'",
    commonMistake: "Saying 'TCS is a big MNC with great job security' or giving a copy-pasted generic answer.",
    keywordsToInclude: ["TCS Prime", "Elite AI", "Agentverse", "Project Indus", "GenAI Foundry", "CoE", "initiative"]
  }
];

// ================= BUSINESS OUTCOME TRANSLATOR =================
export const BUSINESS_TRANSLATOR_CHALLENGES = [
  {
    id: "trans-1",
    techJargon: "I used LangChain to orchestrate a multi-step retrieval pipeline with re-ranking and FAISS vector indices.",
    badAnswer: "I wrote 400 lines of LangChain code and installed FAISS on my laptop to do embedding math.",
    goodBusinessAnswer: "I built a document search tool for my college. It handles 12,000 documents, responds in 1.5 seconds per query, and is actively used by 80 students to find fee and exam schedules. The hardest engineering challenge was tuning retrieval accuracy so students never get misleading data.",
    keyLesson: "Translate raw libraries into business speed, document scale, user count, and data accuracy."
  },
  {
    id: "trans-2",
    techJargon: "I fine-tuned a 1B Llama model using LoRA with rank 8 and alpha 16 on Google Colab T4 GPU.",
    badAnswer: "I trained a machine learning model on Colab using PyTorch peft library.",
    goodBusinessAnswer: "I adapted a lightweight AI model to classify regional customer inquiries. It boosted categorization accuracy from 41% to 79% while keeping compute costs low enough to run on a free server instance.",
    keyLesson: "Quantify the accuracy delta (41% -> 79%) and highlight cost efficiency."
  },
  {
    id: "trans-3",
    techJargon: "I built a LangGraph state machine with 3 cyclical tool nodes and exception handling.",
    badAnswer: "I created an agent with tool nodes in LangGraph.",
    goodBusinessAnswer: "I developed an automated workflow agent that coordinates between email, calendar, and task tracking. It autonomously recovers from API timeouts and reduced manual scheduling effort by 85% across 20 test users.",
    keyLesson: "Focus on automated workflow recovery and user time savings."
  }
];

// ================= CODING CHALLENGES =================
export const CODING_CHALLENGES = [
  {
    id: "code-1",
    title: "1. Implement a Custom Text Chunker with Overlap",
    difficulty: "Medium",
    category: "RAG & LLM Pipeline",
    description: "Write a function `chunk_text(text, chunk_size, overlap)` that splits a continuous string into word chunks of length `chunk_size` with `overlap` words shared between consecutive chunks.",
    starterCode: `def chunk_text(text: str, chunk_size: int, overlap: int) -> list[str]:
    """
    Splits input text into word chunks with specified overlap.
    Example:
    text = "one two three four five six seven"
    chunk_size = 3, overlap = 1
    Output: ["one two three", "three four five", "five six seven"]
    """
    words = text.split()
    if not words:
        return []
    
    chunks = []
    step = chunk_size - overlap
    if step <= 0:
        raise ValueError("chunk_size must be strictly greater than overlap")
        
    for i in range(0, len(words), step):
        chunk_words = words[i:i + chunk_size]
        chunks.append(" ".join(chunk_words))
        if i + chunk_size >= len(words):
            break
            
    return chunks

# Test your code
sample = "The 2026 AI Career Roadmap trains students for TCS Prime and high package AI roles."
print(chunk_text(sample, 4, 1))`,
    expectedOutput: `['The 2026 AI Career', 'Career Roadmap trains students', 'students for TCS Prime', 'Prime and high package', 'package AI roles.']`,
    testCases: [
      { input: "A B C D E F", args: [3, 1], expected: ["A B C", "C D E", "E F"] },
      { input: "Hello world", args: [2, 0], expected: ["Hello world"] }
    ]
  },
  {
    id: "code-2",
    title: "2. Vector Cosine Similarity Calculator",
    difficulty: "Easy-Medium",
    category: "ML Math & Vector Search",
    description: "Compute the cosine similarity between two numerical embedding vectors: $\\text{Sim}(u, v) = \\frac{u \\cdot v}{\\|u\\| \\|v\\|}$.",
    starterCode: `import math

def cosine_similarity(v1: list[float], v2: list[float]) -> float:
    """
    Computes cosine similarity between two float vectors without external libraries.
    Returns a float between -1.0 and 1.0.
    """
    if len(v1) != len(v2):
        raise ValueError("Vectors must have identical dimensions")
        
    dot_product = sum(a * b for a, b in zip(v1, v2))
    norm_v1 = math.sqrt(sum(a ** 2 for a in v1))
    norm_v2 = math.sqrt(sum(b ** 2 for b in v2))
    
    if norm_v1 == 0 or norm_v2 == 0:
        return 0.0
        
    return round(dot_product / (norm_v1 * norm_v2), 4)

# Test your code
emb1 = [0.12, 0.45, 0.78, 0.05]
emb2 = [0.10, 0.48, 0.75, 0.08]
print("Similarity:", cosine_similarity(emb1, emb2))`,
    expectedOutput: `Similarity: 0.9984`,
    testCases: [
      { v1: [1.0, 0.0], v2: [0.0, 1.0], expected: 0.0 },
      { v1: [1.0, 1.0], v2: [2.0, 2.0], expected: 1.0 }
    ]
  },
  {
    id: "code-3",
    title: "3. API Retry Decorator with Exponential Backoff",
    difficulty: "Medium-Hard",
    category: "Python & System Resilience",
    description: "Write a decorator `@retry_with_backoff(max_retries=3, base_delay=1.0)` that automatically retries a failing function when an exception occurs.",
    starterCode: `import time
from functools import wraps

def retry_with_backoff(max_retries=3, base_delay=0.1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            attempts = 0
            while attempts < max_retries:
                try:
                    return func(*args, **kwargs)
                except Exception as err:
                    attempts += 1
                    if attempts >= max_retries:
                        raise err
                    sleep_time = base_delay * (2 ** (attempts - 1))
                    print(f"Attempt {attempts} failed: {err}. Retrying in {sleep_time:.2f}s...")
                    time.sleep(sleep_time)
        return wrapper
    return decorator

# Test your code
call_count = 0
@retry_with_backoff(max_retries=3, base_delay=0.05)
def unstable_llm_call():
    global call_count
    call_count += 1
    if call_count < 3:
        raise ConnectionError("LLM API 503 Overloaded")
    return {"status": "success", "response": "Generated response"}

print(unstable_llm_call())`,
    expectedOutput: `{'status': 'success', 'response': 'Generated response'}`
  }
];
