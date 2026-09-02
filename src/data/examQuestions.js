// ================= 80 COMPREHENSIVE 2026 AI PLACEMENT EXAM QUESTIONS (20 PER LAYER) =================

export const EXAM_PAPERS = {
  // =========================================================================
  // ================= LAYER 1: PROGRAMMING FUNDAMENTALS (20 Qs) =============
  // =========================================================================
  "layer-1": {
    id: "layer-1",
    title: "Layer 1: Programming Fundamentals & Python (20 Questions)",
    category: "4-Layer Skill Stack",
    tier: "Foundations",
    durationMinutes: 40,
    totalMarks: 20,
    passingMarks: 14,
    description: "Evaluates clean Python, data structures, decorators, generators, mutable default traps, dunder methods, GIL, file I/O, Git branching/merge conflict handling, and scripting.",
    questions: [
      {
        id: "l1_q1",
        question: "What is the primary memory difference between a Python generator using 'yield' and a regular function returning a list?",
        options: [
          "Generators execute faster for arrays with fewer than 10 elements.",
          "Generators produce items lazily on-demand using an iterator protocol, maintaining O(1) space complexity regardless of sequence size.",
          "Generators bypass the Global Interpreter Lock (GIL) and run on multiple CPU cores automatically.",
          "Generators automatically cache all computed values in a hash table for fast lookup."
        ],
        correctIndex: 1,
        explanation: "Generators use `yield` to pause execution and produce items on demand. This provides O(1) memory complexity instead of allocating the entire list in memory (O(N)), which is critical when streaming large datasets or LLM tokens."
      },
      {
        id: "l1_q2",
        question: "Examine the following Python decorator code. What will greet('Antigravity') output?",
        code: `def log_call(func):
    def wrapper(*args, **kwargs):
        print("Starting")
        res = func(*args, **kwargs)
        print("Ending")
        return res
    return wrapper

@log_call
def greet(name):
    return f"Hello, {name}!"

print(greet("Antigravity"))`,
        options: [
          "Starting -> Hello, Antigravity! -> Ending",
          "Starting -> Ending -> Hello, Antigravity!",
          "Hello, Antigravity! -> Starting -> Ending",
          "SyntaxError: Decorator wrapper missing return value"
        ],
        correctIndex: 1,
        explanation: "When `greet('Antigravity')` runs, `wrapper` prints 'Starting', computes `func()` which returns 'Hello, Antigravity!', prints 'Ending', and finally returns the string to `print()`, printing 'Starting -> Ending -> Hello, Antigravity!'."
      },
      {
        id: "l1_q3",
        question: "What occurs when a mutable object (like a list or dict) is passed as a default argument in a Python function?",
        code: `def append_item(val, items=[]):
    items.append(val)
    return items

a = append_item(1)
b = append_item(2)`,
        options: [
          "a is [1] and b is [2]; each function call receives a brand new empty list.",
          "a is [1, 2] and b is [1, 2]; default arguments are evaluated only once at definition time, sharing the same list object across invocations.",
          "TypeError: Mutable default arguments are prohibited in Python 3.",
          "a is [1] and b is [1, 2]; Python copies the list shallowly."
        ],
        correctIndex: 1,
        explanation: "Default arguments in Python are evaluated once when the function definition is executed, meaning the same mutable list object is reused across all subsequent calls that omit that argument."
      },
      {
        id: "l1_q4",
        question: "You encounter a Git merge conflict in 'app.py' after running 'git pull origin main'. What is the correct standard sequence to resolve it?",
        options: [
          "Run 'git reset --hard' -> 'git push origin main'.",
          "Edit 'app.py' to resolve conflicting blocks (remove '<<<<<<<', '=======', '>>>>>>>') -> 'git add app.py' -> 'git commit -m 'resolve merge conflict''.",
          "Delete the local .git folder and re-clone the repository.",
          "Run 'git merge --abort' and ignore incoming changes from the remote."
        ],
        correctIndex: 1,
        explanation: "Resolving a Git merge conflict requires manually editing the conflicted files to remove conflict markers and reconcile logic, staging the resolved files with `git add`, and concluding the merge with `git commit`."
      },
      {
        id: "l1_q5",
        question: "Why should you always create and activate a Python virtual environment (e.g. `python -m venv venv`) when developing ML/AI systems?",
        options: [
          "It compiles Python bytecode to C++ machine instructions for 10x faster matrix operations.",
          "It isolates project-specific dependencies and package versions, preventing conflicts between differing library versions (e.g. PyTorch 2.1 vs 2.4).",
          "It automatically encrypts Python source code before pushing to GitHub.",
          "It enables automatic multi-GPU distributed data parallelism."
        ],
        correctIndex: 1,
        explanation: "Virtual environments isolate package dependencies per project so that global packages and conflicting version requirements do not break each other."
      },
      {
        id: "l1_q6",
        question: "What is the primary function of the Global Interpreter Lock (GIL) in standard CPython?",
        options: [
          "It limits memory usage of Python processes to 4 GB maximum.",
          "It is a mutex that allows only one native thread to execute Python bytecode at a time, ensuring thread-safe memory management at the cost of multi-core CPU parallelism for pure Python threads.",
          "It prevents untrusted Python code from accessing local file system APIs.",
          "It automatically optimizes recursive functions into iterative while loops."
        ],
        correctIndex: 1,
        explanation: "The GIL protects CPython's memory management (reference counting) against race conditions, ensuring that only one thread executes Python bytecode simultaneously."
      },
      {
        id: "l1_q7",
        question: "What is the output of the following list comprehension snippet?",
        code: `matrix = [[1, 2, 3], [4, 5, 6]]
flattened = [val for row in matrix for val in row if val % 2 == 0]
print(flattened)`,
        options: [
          "[1, 3, 5]",
          "[2, 4, 6]",
          "[[2], [4, 6]]",
          "[2, 6]"
        ],
        correctIndex: 1,
        explanation: "The nested comprehension iterates over each `row` in `matrix`, then each `val` in `row`, filtering for even numbers (`val % 2 == 0`), producing `[2, 4, 6]`."
      },
      {
        id: "l1_q8",
        question: "In Python OOP, what is the difference between `__str__` and `__repr__` dunder methods?",
        options: [
          "`__str__` is for encryption; `__repr__` is for serialization to JSON.",
          "`__str__` is intended to provide a readable, user-friendly string representation; `__repr__` aims to be unambiguous and ideally a valid Python expression for developers/debugging.",
          "`__str__` only works with numbers; `__repr__` only works with strings.",
          "`__repr__` is deprecated in Python 3.10+."
        ],
        correctIndex: 1,
        explanation: "`__str__` returns an informal/readable string for end-users, while `__repr__` provides an unambiguous developer-oriented representation (often matching the constructor syntax)."
      },
      {
        id: "l1_q9",
        question: "Which data structure in Python's standard library provides O(1) time complexity for appending and popping from BOTH ends?",
        options: [
          "Standard Python `list`",
          "`collections.deque` (double-ended queue)",
          "`collections.OrderedDict`",
          "`queue.PriorityQueue`"
        ],
        correctIndex: 1,
        explanation: "`collections.deque` is implemented as a doubly linked list of blocks, providing O(1) appends and pops from both ends, unlike lists which have O(N) cost for `pop(0)` or `insert(0)`."
      },
      {
        id: "l1_q10",
        question: "What does the `*args` and `**kwargs` syntax represent in a Python function definition?",
        options: [
          "`*args` passes pointers to memory; `**kwargs` passes double-precision floating point arrays.",
          "`*args` captures arbitrary positional arguments as a tuple; `**kwargs` captures arbitrary keyword arguments as a dictionary.",
          "`*args` is used for multiprocessing; `**kwargs` is used for asynchronous coroutines.",
          "`*args` forces arguments to be immutable strings."
        ],
        correctIndex: 1,
        explanation: "`*args` collects extra positional arguments into a tuple, while `**kwargs` collects extra named keyword arguments into a dictionary."
      },
      {
        id: "l1_q11",
        question: "What is the difference between `is` and `==` in Python?",
        options: [
          "`is` checks for value equality; `==` checks for reference/memory identity.",
          "`is` checks for object identity (exact same memory address `id(a) == id(b)`); `==` checks for value equality (`a.__eq__(b)`).",
          "`is` only works for boolean types `True` and `False`.",
          "`==` is strictly faster than `is` for all data types."
        ],
        correctIndex: 1,
        explanation: "`is` verifies whether two variables reference the exact same object in memory, whereas `==` evaluates whether the values of the objects are equivalent."
      },
      {
        id: "l1_q12",
        question: "How does Python handle memory management and cleanup for objects with cyclical references?",
        options: [
          "Pure reference counting instantly deletes cyclic references.",
          "Python uses Reference Counting as the primary mechanism, supplemented by a generational cyclic Garbage Collector (gc) that detects and frees unreferenced reference cycles.",
          "Cyclic references cause instant Python crash with MemoryError.",
          "Python requires manual `free()` calls like C."
        ],
        correctIndex: 1,
        explanation: "CPython combines reference counting (for immediate deallocation when ref count reaches 0) with a generational cyclic garbage collector that periodically cleans up isolated cyclic structures."
      },
      {
        id: "l1_q13",
        question: "What is the purpose of the `functools.wraps` decorator when creating custom Python decorators?",
        options: [
          "To speed up execution by compiling Python to Cython.",
          "To preserve the original function's metadata (such as `__name__`, `__doc__`, and signature) on the wrapper function.",
          "To enforce type annotations at runtime.",
          "To prevent the decorated function from throwing any exceptions."
        ],
        correctIndex: 1,
        explanation: "`@wraps(func)` copies the original function's name, docstring, and module attributes to the wrapper function, preventing debugging confusion and introspection errors."
      },
      {
        id: "l1_q14",
        question: "What is the difference between `shallow copy` and `deep copy` in Python (`copy` module)?",
        options: [
          "Shallow copy copies numbers; deep copy copies strings.",
          "Shallow copy constructs a new collection and inserts references to child objects; deep copy recursively constructs new copies of all nested child objects.",
          "Deep copy only works for dictionaries with fewer than 10 keys.",
          "Shallow copy converts mutable objects into immutable tuples."
        ],
        correctIndex: 1,
        explanation: "`copy.copy()` creates a new container but references the original nested objects. `copy.deepcopy()` recursively duplicates all nested objects, isolating the new copy completely."
      },
      {
        id: "l1_q15",
        question: "What does the `git rebase` command do compared to `git merge`?",
        options: [
          "`git rebase` deletes the target branch permanently.",
          "`git rebase` re-applies commits from the current branch onto the tip of the base branch, creating a clean linear history without merge commits.",
          "`git rebase` is identical to `git checkout -b`.",
          "`git merge` can only be run on local repositories without internet."
        ],
        correctIndex: 1,
        explanation: "Rebasing takes the commits from your branch and replays them on top of another branch, maintaining a linear commit history, whereas merging combines branches via a dedicated merge commit."
      },
      {
        id: "l1_q16",
        question: "What will the following exception block output?",
        code: `try:
    x = 10 / 0
except ZeroDivisionError:
    print("DivZero", end=" ")
else:
    print("Else", end=" ")
finally:
    print("Finally")`,
        options: [
          "DivZero Else Finally",
          "DivZero Finally",
          "Else Finally",
          "ZeroDivisionError Exception Raised"
        ],
        correctIndex: 1,
        explanation: "The `ZeroDivisionError` is caught, printing 'DivZero'. The `else` block only runs if NO exception occurs. The `finally` block ALWAYS runs, printing 'DivZero Finally'."
      },
      {
        id: "l1_q17",
        question: "What is the time complexity of checking if an element exists in a Python `set` versus a Python `list`?",
        options: [
          "Set: O(N); List: O(1)",
          "Set: O(1) average; List: O(N) average",
          "Set: O(log N); List: O(log N)",
          "Set: O(1); List: O(1)"
        ],
        correctIndex: 1,
        explanation: "Python sets are implemented as hash tables, allowing O(1) average lookup time (`val in my_set`). Lists require a linear scan across all elements, which is O(N)."
      },
      {
        id: "l1_q18",
        question: "How do you securely read an API key stored in an environment variable in Python?",
        options: [
          "`import os; key = os.environ.get('OPENAI_API_KEY')`",
          "`key = input('OPENAI_API_KEY')`",
          "`key = eval('OPENAI_API_KEY')`",
          "`import sys; key = sys.argv['OPENAI_API_KEY']`"
        ],
        correctIndex: 0,
        explanation: "`os.environ.get('KEY_NAME')` or `os.getenv('KEY_NAME')` reads environment variables securely without hardcoding sensitive API credentials in source files."
      },
      {
        id: "l1_q19",
        question: "What is the output of the following `zip()` code snippet?",
        code: `keys = ['name', 'role', 'tier']
values = ['Likith', 'AI Engineer', 'Prime']
record = dict(zip(keys, values))
print(record['role'])`,
        options: [
          "Likith",
          "AI Engineer",
          "Prime",
          "KeyError: 'role'"
        ],
        correctIndex: 1,
        explanation: "`zip(keys, values)` pairs elements from both iterables into tuples `('name', 'Likith')`, `('role', 'AI Engineer')`, etc., which `dict()` converts into a key-value mapping."
      },
      {
        id: "l1_q20",
        question: "In Python, what is the key difference between `@staticmethod` and `@classmethod`?",
        options: [
          "`@staticmethod` can only be called from outside the class.",
          "`@classmethod` receives the class itself as its first argument (`cls`), allowing factory methods; `@staticmethod` receives neither `self` nor `cls` and behaves like a plain function scoped inside the class.",
          "`@staticmethod` is deprecated in Python 3.",
          "`@classmethod` cannot be inherited by subclasses."
        ],
        correctIndex: 1,
        explanation: "A `@classmethod` receives the class object (`cls`) as its implicit first argument and can access class state. A `@staticmethod` knows nothing about the class or instance and behaves like an isolated function."
      }
    ]
  },

  // =========================================================================
  // ================= LAYER 2: ML LITERACY & APPLIED MATH (20 Qs) ===========
  // =========================================================================
  "layer-2": {
    id: "layer-2",
    title: "Layer 2: ML Literacy & Applied Math (20 Questions)",
    category: "4-Layer Skill Stack",
    tier: "ML Core",
    durationMinutes: 40,
    totalMarks: 20,
    passingMarks: 14,
    description: "Evaluates regression, classification, cross-validation, regularization (L1/L2), decision trees, neural network backprop intuition, loss functions, and metric selection.",
    questions: [
      {
        id: "l2_q1",
        question: "In an imbalanced classification problem (e.g. Fraud Detection with 99.5% legitimate transactions and 0.5% fraud), why is Accuracy a misleading evaluation metric?",
        options: [
          "Accuracy cannot be computed when probabilities sum to 1.0.",
          "A naive baseline predicting 'Legitimate' 100% of the time achieves 99.5% accuracy while catching 0% of fraud cases.",
          "Accuracy is only defined for continuous regression targets.",
          "Accuracy requires double the compute time of F1-Score."
        ],
        correctIndex: 1,
        explanation: "Accuracy is dominated by the majority class in imbalanced datasets. Metrics like Precision, Recall, F1-Score, or PR-AUC evaluate performance specifically on the minority positive class."
      },
      {
        id: "l2_q2",
        question: "What is the mathematical difference and feature selection behavior between L1 Regularization (Lasso) and L2 Regularization (Ridge)?",
        options: [
          "L1 adds squared weights; L2 adds absolute weights.",
          "L1 adds lambda * sum(|w_i|), driving non-informative feature weights strictly to zero for sparse feature selection; L2 adds lambda * sum(w_i^2), shrinking weights smoothly towards zero without eliminating features.",
          "L1 only works on decision trees; L2 only works on neural networks.",
          "L2 completely prevents vanishing gradients during backpropagation."
        ],
        correctIndex: 1,
        explanation: "L1 regularization adds an absolute value penalty whose diamond contour produces sparse solutions (exact zeros). L2 regularization adds a squared penalty whose circular contour shrinks weights smoothly."
      },
      {
        id: "l2_q3",
        question: "What does the chain rule enable during the backpropagation algorithm in neural networks?",
        options: [
          "It calculates matrix eigenvalues for data normalization.",
          "It enables the systematic analytical computation of the gradient of the loss with respect to weights in hidden layers by multiplying local partial derivatives backwards from the output.",
          "It restricts all activation functions to output values between 0 and 1.",
          "It converts categorical variables into one-hot encoded vectors."
        ],
        correctIndex: 1,
        explanation: "Backpropagation applies the calculus chain rule dL/dw = (dL/dy) * (dy/dz) * (dz/dw) to compute how tweaking each parameter impacts the final loss."
      },
      {
        id: "l2_q4",
        question: "Which of the following algorithms is an example of 'Boosting' rather than 'Bagging'?",
        options: [
          "Random Forest",
          "ExtraTreesClassifier",
          "XGBoost (Extreme Gradient Boosting)",
          "Bootstrap Aggregated Regressor"
        ],
        correctIndex: 2,
        explanation: "Random Forest is Bagging (training independent trees in parallel on bootstrap samples). XGBoost is Boosting (training trees sequentially where each tree learns from the residual errors of prior trees)."
      },
      {
        id: "l2_q5",
        question: "What characterizes a model exhibiting High Variance (Overfitting)?",
        options: [
          "Low training error, but high validation/test error; the model has memorized training set noise rather than generalizable patterns.",
          "High training error and high validation error; the model is too simple.",
          "The model predictions are constant regardless of input features.",
          "The learning rate is too small to make progress."
        ],
        correctIndex: 0,
        explanation: "High variance means the model fits the training set too closely (memorizing noise), resulting in low training error but poor generalization to unseen validation/test data."
      },
      {
        id: "l2_q6",
        question: "What is the purpose of K-Fold Cross-Validation?",
        options: [
          "To speed up gradient descent optimization by a factor of K.",
          "To evaluate model generalizability by partitioning data into K subsets, training on K-1 folds and validating on the remaining fold K times, reducing validation bias from a single train/test split.",
          "To generate synthetic training data using generative adversarial networks.",
          "To reduce the number of features in the dataset to K dimensions."
        ],
        correctIndex: 1,
        explanation: "K-fold cross-validation provides an unbiased estimate of model generalization performance across the entire dataset by averaging performance over K distinct validation iterations."
      },
      {
        id: "l2_q7",
        question: "What is the mathematical formulation and output range of the Sigmoid activation function used in Logistic Regression?",
        options: [
          "sigma(z) = max(0, z); Range: [0, infinity)",
          "sigma(z) = 1 / (1 + e^(-z)); Range: (0, 1)",
          "sigma(z) = (e^z - e^(-z)) / (e^z + e^(-z)); Range: (-1, 1)",
          "sigma(z) = e^z / sum(e^z); Range: [0, 1]"
        ],
        correctIndex: 1,
        explanation: "The sigmoid function sigma(z) = 1 / (1 + exp(-z)) maps any real-valued number into a probability between 0 and 1, making it the core mapping function for binary logistic classification."
      },
      {
        id: "l2_q8",
        question: "Why is the ReLU (Rectified Linear Unit) activation function preferred over Sigmoid in deep hidden layers of neural networks?",
        options: [
          "ReLU bounds all outputs strictly between 0 and 1.",
          "ReLU has a constant gradient of 1 for all positive activations (x > 0), mitigating the vanishing gradient problem and enabling faster convergence during backpropagation.",
          "ReLU automatically scales all weights to unit variance.",
          "ReLU is a non-differentiable step function."
        ],
        correctIndex: 1,
        explanation: "Sigmoid saturates at 0 and 1 with near-zero derivatives for large values, causing vanishing gradients in deep networks. ReLU (max(0, x)) has derivative 1 for positive inputs, maintaining gradient flow."
      },
      {
        id: "l2_q9",
        question: "In the Confusion Matrix, what is the difference between Precision and Recall?",
        options: [
          "Precision = TP / (TP + FN); Recall = TP / (TP + FP)",
          "Precision = TP / (TP + FP) (out of all positive predictions, how many were correct); Recall = TP / (TP + FN) (out of all actual positive cases, how many did we find).",
          "Precision and Recall are identical if Accuracy is above 90%.",
          "Recall measures false alarm rate; Precision measures miss rate."
        ],
        correctIndex: 1,
        explanation: "Precision measures prediction exactness (TP / Predicted Positives), while Recall (Sensitivity) measures completeness (TP / Actual Positives)."
      },
      {
        id: "l2_q10",
        question: "What does the F1-Score represent mathematically?",
        options: [
          "Arithmetic mean of Precision and Recall: (P + R) / 2",
          "Harmonic mean of Precision and Recall: 2 * (Precision * Recall) / (Precision + Recall)",
          "Geometric mean of True Positives and True Negatives",
          "The area under the ROC curve"
        ],
        correctIndex: 1,
        explanation: "F1-Score is the harmonic mean of precision and recall. The harmonic mean heavily penalizes extreme imbalances (e.g. 99% precision with 1% recall yields a low F1 score)."
      },
      {
        id: "l2_q11",
        question: "What is 'Data Leakage' in machine learning and why is it dangerous?",
        options: [
          "When training data is stolen by unauthorized network requests.",
          "When information from outside the training dataset (such as target labels or test set statistics like mean/std) unintentionally influences model training, leading to unrealistically optimistic validation metrics that fail in production.",
          "When GPU memory overflows during batch processing.",
          "When CSV files contain empty string values."
        ],
        correctIndex: 1,
        explanation: "Data leakage occurs when test/target information contaminates training (e.g. computing scaling parameters on the full dataset before splitting), giving a false impression of high accuracy."
      },
      {
        id: "l2_q12",
        question: "How does the 'Gini Impurity' metric guide decision tree splits?",
        options: [
          "It maximizes the depth of the tree to at least 100 levels.",
          "It measures the probability of misclassifying a randomly chosen element from a node; splits are chosen to maximize Gini gain (reducing impurity towards 0).",
          "It calculates matrix determinant for feature selection.",
          "It converts continuous variables into boolean values."
        ],
        correctIndex: 1,
        explanation: "Gini impurity I_G = 1 - sum(p_i^2) measures node homogeneity. A pure node with only one class has Gini impurity of 0.0."
      },
      {
        id: "l2_q13",
        question: "What is the fundamental difference between Batch Gradient Descent, Stochastic Gradient Descent (SGD), and Mini-Batch Gradient Descent?",
        options: [
          "Batch uses 1 sample; SGD uses all samples; Mini-batch uses 2 samples.",
          "Batch GD computes gradients over the entire training set per step (slow, stable); SGD updates weights per individual sample (fast, noisy); Mini-Batch GD computes gradients over small batches (e.g. 32-128 samples), balancing vectorization efficiency and convergence stability.",
          "SGD cannot be used with neural networks.",
          "Mini-batch gradient descent is only applicable to decision trees."
        ],
        correctIndex: 1,
        explanation: "Mini-batch GD leverages GPU SIMD matrix acceleration over small subsets (32-256 samples), achieving the best trade-off between the stability of full-batch GD and the speed of SGD."
      },
      {
        id: "l2_q14",
        question: "Why is Feature Scaling (e.g. StandardScaler / Min-Max Scaling) critical before training distance-based models (KNN, SVM, K-Means) and Gradient Descent models?",
        options: [
          "It eliminates all negative numbers from the dataset.",
          "Features with larger numerical scales (e.g. Salary in thousands vs Age in tens) disproportionately dominate distance metrics and create distorted, elongated loss surfaces that slow gradient descent convergence.",
          "It converts all numerical values into categorical labels.",
          "It is required by the Python compiler."
        ],
        correctIndex: 1,
        explanation: "Distance calculations (Euclidean norm) and gradient steps are heavily distorted if one feature has variance 10,000 and another has variance 0.1. Scaling standardizes feature influence."
      },
      {
        id: "l2_q15",
        question: "What is Principal Component Analysis (PCA) and what does it optimize?",
        options: [
          "A supervised classification algorithm that maximizes decision tree depth.",
          "An unsupervised linear dimensionality reduction technique that finds orthogonal axes (principal components) maximizing the variance of projected data while minimizing reconstruction error.",
          "A neural network architecture with convolutional layers.",
          "A database indexing algorithm for vector databases."
        ],
        correctIndex: 1,
        explanation: "PCA computes eigenvectors of the data covariance matrix to find directions of maximum variance, projecting high-dimensional data onto fewer orthogonal dimensions with minimal information loss."
      },
      {
        id: "l2_q16",
        question: "What is the Loss Function used for binary classification in Logistic Regression and Neural Networks?",
        options: [
          "Mean Squared Error (MSE)",
          "Binary Cross-Entropy / Log Loss: L = - (y * log(p) + (1 - y) * log(1 - p))",
          "Hinge Loss: max(0, 1 - y * f(x))",
          "Huber Loss"
        ],
        correctIndex: 1,
        explanation: "Binary Cross-Entropy (Log Loss) penalizes confident wrong predictions exponentially (log(p) approaches negative infinity as p approaches 0 for true label 1)."
      },
      {
        id: "l2_q17",
        question: "What is the 'Curse of Dimensionality' in machine learning?",
        options: [
          "When training datasets have fewer than 10 columns.",
          "As the number of features/dimensions increases, the volume of feature space grows exponentially, making data points extremely sparse and Euclidean distances equidistant and uninformative.",
          "When deep learning models exceed 100 layers.",
          "When matrix multiplication overflows CPU cache."
        ],
        correctIndex: 1,
        explanation: "In high-dimensional spaces, points become isolated and distance metrics lose discriminative power, requiring exponentially more training samples to avoid overfitting."
      },
      {
        id: "l2_q18",
        question: "What is the purpose of Early Stopping during neural network training?",
        options: [
          "To stop training when the user presses Ctrl+C.",
          "To monitor validation loss during epochs and halt training when validation error begins increasing consistently, preventing the model from overfitting to training noise.",
          "To reduce the learning rate to zero after epoch 1.",
          "To reset all weights to random initializations."
        ],
        correctIndex: 1,
        explanation: "Early stopping acts as a regularizer by terminating training at the point of minimum validation loss before the network memorizes training data quirks."
      },
      {
        id: "l2_q19",
        question: "In K-Means clustering, what is the 'Elbow Method' used for?",
        options: [
          "To find the optimal learning rate for gradient descent.",
          "To determine the optimal number of clusters K by plotting the Within-Cluster Sum of Squares (WCSS / Inertia) and locating the point where the rate of decrease bends sharply.",
          "To compute classification accuracy on unlabelled datasets.",
          "To split data into train, test, and validation sets."
        ],
        correctIndex: 1,
        explanation: "The Elbow Method plots inertia (sum of squared distances to centroids) against K. The 'elbow' represents the point where adding more clusters yields diminishing returns in variance reduction."
      },
      {
        id: "l2_q20",
        question: "What is the Receiver Operating Characteristic (ROC) curve and the Area Under Curve (ROC-AUC) metric?",
        options: [
          "A plot of training loss versus validation loss across epochs.",
          "A plot of True Positive Rate (Recall) vs False Positive Rate across all possible classification probability thresholds; ROC-AUC measures the probability that a randomly chosen positive sample ranks higher than a negative sample.",
          "A scatter plot of principal components 1 and 2.",
          "A measure of CPU and GPU utilization during model training."
        ],
        correctIndex: 1,
        explanation: "ROC-AUC evaluates classification discrimination ability across all decision thresholds, where 0.5 represents random guessing and 1.0 represents perfect ranking."
      }
    ]
  },

  // =========================================================================
  // ================= LAYER 3: LLM FLUENCY & GENAI (20 Qs) ==================
  // =========================================================================
  "layer-3": {
    id: "layer-3",
    title: "Layer 3: LLM Fluency & GenAI Architecture (20 Questions)",
    category: "4-Layer Skill Stack",
    tier: "AI Engineering",
    durationMinutes: 40,
    totalMarks: 20,
    passingMarks: 14,
    description: "Evaluates RAG pipelines, embeddings, vector databases, prompt engineering (CoT, few-shot), structured JSON outputs, LangGraph agents, and fine-tuning vs RAG trade-offs.",
    questions: [
      {
        id: "l3_q1",
        question: "When should an engineering team choose RAG (Retrieval-Augmented Generation) over Fine-Tuning a model?",
        options: [
          "When the primary goal is altering the linguistic tone, voice, and rigid output format.",
          "When private domain data changes frequently, source attribution and verifiable citations are required, and document context must be injected dynamically without expensive model retraining.",
          "When you need to reduce inference token consumption to zero.",
          "When running 100M parameter models on edge microcontrollers."
        ],
        correctIndex: 1,
        explanation: "RAG keeps base model weights frozen and retrieves up-to-date document chunks dynamically from vector databases, providing explicit citations and avoiding re-training costs."
      },
      {
        id: "l3_q2",
        question: "Why is chunk overlap (e.g. 500-token chunks with 50-token overlap) critical in RAG document ingestion?",
        options: [
          "It compresses vector embeddings by 50%.",
          "It prevents semantic context from being sliced mid-sentence or mid-clause at arbitrary chunk boundaries, preserving relational meaning across split paragraphs.",
          "It guarantees that vector databases will never encounter duplicate embeddings.",
          "It forces the LLM to output responses in JSON format."
        ],
        correctIndex: 1,
        explanation: "Chunk overlap ensures that sentences or entities spanning chunk borders maintain coherent context, enabling accurate semantic embedding matching."
      },
      {
        id: "l3_q3",
        question: "What is the defining characteristic of an 'AI Agent' compared to a single LLM API call?",
        options: [
          "An agent uses a proprietary closed-source API model only.",
          "An agent operates in an autonomous loop: it plans multi-step tasks, invokes external tools (calculators, databases, web search), inspects intermediate outputs, and recovers from errors until a goal is achieved.",
          "An agent runs exclusively on mobile edge processors without network connectivity.",
          "An agent converts prompts into SQL queries without requiring embeddings."
        ],
        correctIndex: 1,
        explanation: "A simple LLM call is one-shot text-in/text-out. An agent executes a stateful loop: selecting tools, handling API responses, catching errors, and determining subsequent steps."
      },
      {
        id: "l3_q4",
        question: "How do modern LLM APIs enforce 'Structured Outputs' (such as JSON mode or function calling schemas)?",
        options: [
          "By asking the model nicely in the prompt and hoping it does not hallucinate extra markdown.",
          "By applying constrained decoding / grammar masks at the tokenizer level to ensure generated token probabilities only permit valid schema-compliant tokens.",
          "By running a regex replace on the final string after complete unconstrained generation.",
          "By training a dedicated neural network for every JSON key in the schema."
        ],
        correctIndex: 1,
        explanation: "Production structured outputs use grammar-constrained decoding (masking invalid logits at generation time) so that the LLM is mathematically incapable of emitting schema-invalid JSON tokens."
      },
      {
        id: "l3_q5",
        question: "What is Chain-of-Thought (CoT) Prompting and why does it improve reasoning performance?",
        options: [
          "A method to chain multiple GPU servers together in a cluster.",
          "A prompt technique instructing the model to generate explicit intermediate step-by-step reasoning tokens before arriving at the final answer, allocating more compute tokens to complex logical steps.",
          "A technique to compress 10,000 word prompts into 100 tokens.",
          "A vector database indexing algorithm."
        ],
        correctIndex: 1,
        explanation: "Chain-of-Thought prompting directs the LLM to write out intermediate deduction steps, providing the self-attention mechanism with contextual tokens to solve complex logic and arithmetic problems."
      },
      {
        id: "l3_q6",
        question: "In Transformer self-attention, why is the dot product Q * K^T scaled by 1 / sqrt(d_k) before applying softmax?",
        options: [
          "To convert negative attention scores into positive values.",
          "For large dimension d_k, dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients (vanishing gradients). Scaling by 1/sqrt(d_k) stabilizes gradient variance to 1.0.",
          "To reduce matrix dimensions to scalar values.",
          "To force attention weights to sum to zero."
        ],
        correctIndex: 1,
        explanation: "Assuming Query and Key components are zero-mean unit-variance variables, their dot product has variance d_k. Dividing by sqrt(d_k) restores variance to 1, preventing softmax saturation and vanishing gradients."
      },
      {
        id: "l3_q7",
        question: "What is a 'Vector Embedding' in modern NLP?",
        options: [
          "A compressed JPEG screenshot of text.",
          "A dense numerical vector (e.g. 768 or 1536 float dimensions) that captures semantic meaning such that text with similar meanings are close together in vector space (high cosine similarity).",
          "A list of ASCII character codes for each word.",
          "A database primary key used in MySQL tables."
        ],
        correctIndex: 1,
        explanation: "An embedding maps words/sentences into a continuous vector space where semantic distance corresponds to geometric proximity (e.g. cosine similarity or dot product)."
      },
      {
        id: "l3_q8",
        question: "What is 'Two-Stage Hybrid Search' in enterprise RAG systems?",
        options: [
          "Searching on Google first and Bing second.",
          "First stage retrieves candidate documents using both Dense Vector Search (semantic similarity) and Sparse BM25 Keyword Search; second stage uses a Cross-Encoder Re-ranker model to score and select the top-k most relevant chunks.",
          "Searching in MySQL and PostgreSQL simultaneously.",
          "Translating text into French and then back to English."
        ],
        correctIndex: 1,
        explanation: "Hybrid search combines dense vectors (for concepts) with BM25 (for exact keywords/part numbers), followed by a cross-encoder re-ranker that calculates full cross-attention over query-chunk pairs."
      },
      {
        id: "l3_q9",
        question: "What is LoRA (Low-Rank Adaptation) and why is it preferred for fine-tuning LLMs?",
        options: [
          "LoRA runs LLMs on CPU without GPU memory.",
          "LoRA freezes pretrained weights (W_0) and injects trainable low-rank decomposition matrices (A and B where Delta_W = B x A, rank r << d), reducing trainable parameters by 99% and drastically lowering VRAM requirements.",
          "LoRA converts transformer neural networks into decision trees.",
          "LoRA is a prompt engineering template with 5 few-shot examples."
        ],
        correctIndex: 1,
        explanation: "LoRA decomposes the weight update matrix into two low-rank matrices of rank r (e.g. r=8 or 16), reducing trainable parameters and optimizer memory state by up to 90% while matching full fine-tuning performance."
      },
      {
        id: "l3_q10",
        question: "What is the 'Lost in the Middle' phenomenon observed in Long-Context LLMs?",
        options: [
          "When the LLM crashes halfway through generating a 500-word response.",
          "LLM retrieval and reasoning performance is highest when relevant information is at the very beginning or end of the prompt context window, but degrades significantly when key facts are buried in the middle of long contexts.",
          "When the tokenizer loses punctuation marks during string conversion.",
          "When fine-tuning weights diverge to NaN in epoch 2."
        ],
        correctIndex: 1,
        explanation: "Empirical benchmarks show that decoder-only attention models focus heavily on start tokens and recent end tokens, frequently missing critical facts placed in the middle of massive prompt contexts."
      },
      {
        id: "l3_q11",
        question: "What is the Model Context Protocol (MCP) developed in 2025 by Anthropic?",
        options: [
          "A replacement for HTTP/3 protocol on web browsers.",
          "An open standardized protocol that allows AI models and agents to securely connect to external tools, data repositories, and local development environments via a unified client-server architecture.",
          "A hardware specification for Nvidia Blackwell GPUs.",
          "A Python package for training Convolutional Neural Networks."
        ],
        correctIndex: 1,
        explanation: "MCP standardizes how AI agents discover and execute tools, read external resources, and interact with data repositories across disparate software platforms."
      },
      {
        id: "l3_q12",
        question: "How does 'Few-Shot Prompting' differ from 'Zero-Shot Prompting'?",
        options: [
          "Few-shot prompting trains a LoRA adapter; zero-shot does not.",
          "Few-shot prompting provides 2-5 explicit input-output demonstration examples directly inside the prompt context to guide the model's formatting and reasoning before presenting the actual query.",
          "Few-shot prompting only works with open-weight models.",
          "Zero-shot prompting consumes 10x more tokens."
        ],
        correctIndex: 1,
        explanation: "Few-shot conditioning provides exemplary demonstration pairs within the prompt context, demonstrating the desired format, reasoning steps, and constraints without updating model weights."
      },
      {
        id: "l3_q13",
        question: "What is an 'LLM Hallucination' and what is the most effective engineering safeguard against it in RAG systems?",
        options: [
          "A hardware failure where GPU memory overheats.",
          "When the model generates plausible-sounding but factually incorrect or ungrounded assertions; mitigated by setting cosine similarity thresholds, explicit negative prompt constraints ('answer strictly from context else state unknown'), and citation validation.",
          "When the tokenizer generates invalid Unicode characters.",
          "When the API returns HTTP 429 Rate Limit error."
        ],
        correctIndex: 1,
        explanation: "Hallucinations occur when an LLM produces unsubstantiated outputs. Grounded RAG mitigates this with strict context injection, similarity cutoff thresholds, and citation attribution."
      },
      {
        id: "l3_q14",
        question: "In LangGraph and agentic frameworks, what is the role of a 'Reducer' in state management?",
        options: [
          "To reduce the size of the Docker image.",
          "A function (like `add_messages` or list append) that defines how new outputs emitted by sub-agent nodes are merged into the central state object immutably.",
          "To delete old conversation logs from disk.",
          "To lower the temperature of the LLM dynamically."
        ],
        correctIndex: 1,
        explanation: "Reducers define state transition rules in graph-based agent loops, ensuring that node outputs (such as appended tool responses or updated variables) combine predictably into the shared graph state."
      },
      {
        id: "l3_q15",
        question: "What is the primary difference between 'Cross-Encoder' and 'Bi-Encoder' models in RAG retrieval?",
        options: [
          "Bi-encoders run on two GPUs; cross-encoders run on one GPU.",
          "Bi-encoders embed query and document independently into dense vectors for fast vector DB search (O(1) cosine lookup); Cross-encoders process query and document simultaneously through full self-attention for higher re-ranking accuracy at higher compute cost.",
          "Bi-encoders only work with English text.",
          "Cross-encoders cannot be used in Python."
        ],
        correctIndex: 1,
        explanation: "Bi-encoders produce decoupled vector embeddings suitable for sub-millisecond approximate nearest neighbor lookup. Cross-encoders compute full cross-attention over (query, document) pairs for high-precision re-ranking."
      },
      {
        id: "l3_q16",
        question: "What is 'Temperature' in LLM generation and how does setting `temperature=0.0` affect sampling?",
        options: [
          "It controls GPU cooling fan speed.",
          "It scales the logits before softmax; setting `temperature=0.0` creates greedy deterministic decoding, always selecting the highest-probability token for reproducible factual/code outputs.",
          "It limits the maximum tokens generated to 100.",
          "It enables multi-lingual translation."
        ],
        correctIndex: 1,
        explanation: "Dividing logits by temperature (z_i / T) modulates token probability distribution sharpness. T=0 collapses sampling to greedy argmax selection, producing deterministic outputs."
      },
      {
        id: "l3_q17",
        question: "What is the 'ReAct' (Reason + Act) prompting paradigm in AI Agents?",
        options: [
          "A React.js library for rendering chat UI components.",
          "A prompt architecture that interleaves Thought (reasoning trace), Action (invoking an external tool), and Observation (reading tool results) in a recurring loop until the problem is solved.",
          "A fine-tuning dataset formatted as JSON.",
          "An audio speech recognition model."
        ],
        correctIndex: 1,
        explanation: "ReAct prompts the LLM to generate a verbal thought reasoning step, invoke a concrete tool action, observe the tool return value, and iterate until the final conclusion is reached."
      },
      {
        id: "l3_q18",
        question: "What is Byte-Pair Encoding (BPE) used for in modern LLMs?",
        options: [
          "Compressing audio files for speech synthesis.",
          "Subword tokenization algorithm that iteratively merges the most frequent pairs of bytes/characters into single tokens, handling rare words and out-of-vocabulary terms efficiently without huge vocabularies.",
          "Encrypting user passwords before database storage.",
          "Validating JSON schemas in FastAPI."
        ],
        correctIndex: 1,
        explanation: "BPE builds a subword vocabulary by iteratively merging frequent character pairs, allowing LLMs to represent common words as single tokens while gracefully decomposing rare words into subword pieces."
      },
      {
        id: "l3_q19",
        question: "What is 'LLM-as-a-Judge' evaluation and what is its primary vulnerability?",
        options: [
          "Using AI to sentence criminals in legal courts.",
          "Using a capable frontier LLM (e.g. GPT-4/Claude) to score candidate responses against rubrics; vulnerable to position bias, verbosity bias (favoring longer answers), and self-enhancement bias (favoring outputs from its own model family).",
          "A Docker container that automatically formats Python code with Black.",
          "A Python script that restarts the server whenever memory exceeds 80%."
        ],
        correctIndex: 1,
        explanation: "LLM-as-judge provides scalable qualitative evaluation, but engineers must account for inherent biases like verbosity bias (rating verbose answers higher) and ordering/position bias."
      },
      {
        id: "l3_q20",
        question: "What is 'Quantization' (e.g. 4-bit / 8-bit AWQ, GGUF) for open-weight LLMs?",
        options: [
          "Deleting 50% of the transformer layers at random.",
          "Converting model weight representations from 16-bit floating point (FP16/BF16) to lower-bit integers (INT8/INT4), reducing VRAM memory footprint by up to 75% with minimal accuracy degradation.",
          "Converting Python code to assembly language.",
          "Compressing database indexes using gzip."
        ],
        correctIndex: 1,
        explanation: "Quantization maps continuous weight distributions into discrete integer buckets (like 4-bit or 8-bit), allowing a 7B parameter model to run in ~4-5 GB of VRAM instead of 14-16 GB."
      }
    ]
  },

  // =========================================================================
  // ================= LAYER 4: SYSTEM INTEGRATION (20 Qs) ===================
  // =========================================================================
  "layer-4": {
    id: "layer-4",
    title: "Layer 4: System Integration & Production (20 Questions)",
    category: "4-Layer Skill Stack",
    tier: "Production Engineering",
    durationMinutes: 40,
    totalMarks: 20,
    passingMarks: 14,
    description: "Evaluates FastAPI architecture, Docker containerization, cloud deployment, regression eval suites, token caching, latency profiling, and cost optimization.",
    questions: [
      {
        id: "l4_q1",
        question: "Why is `async def` in FastAPI particularly advantageous when handling multiple concurrent LLM API requests?",
        options: [
          "It compiles Python into native machine code ahead of time.",
          "It uses non-blocking asynchronous I/O, freeing the event loop while waiting for downstream network responses from LLM providers, allowing hundreds of concurrent requests per worker.",
          "It automatically pays OpenAI API bills using cloud credits.",
          "It converts all synchronous database queries into Redis cached lookups."
        ],
        correctIndex: 1,
        explanation: "LLM API calls are I/O-bound (network wait times of 1-5 seconds). Async I/O allows a single process to service other incoming user requests while waiting for the LLM token response."
      },
      {
        id: "l4_q2",
        question: "In Docker, what is the purpose of a Multi-Stage Build when containerizing a Python FastAPI + ML application?",
        options: [
          "To train models on multiple GPUs in parallel during image build.",
          "To separate heavy build tools/compilers (gcc, dev packages) in temporary builder stages from the lean runtime container, drastically reducing final image size and attack surface.",
          "To allow containers to run without Docker daemon installed.",
          "To bypass Python's Global Interpreter Lock."
        ],
        correctIndex: 1,
        explanation: "Multi-stage builds compile dependencies and wheels in an initial heavy build container, copying only built artifacts into a minimal, slim runtime image."
      },
      {
        id: "l4_q3",
        question: "What is an 'LLM Regression Eval Suite' and why is it essential before updating production prompts?",
        options: [
          "A tool to calculate linear regression slopes on user signups.",
          "A curated set of 20 to 100 fixed edge-case test queries and expected ground-truth answers used to verify that prompt modifications don't break previously working capabilities.",
          "A script that restarts the server whenever memory exceeds 80%.",
          "A Docker container that automatically formats Python code."
        ],
        correctIndex: 1,
        explanation: "Even minor prompt modifications can cause subtle regressions on edge cases. A regression eval suite systematically runs new prompts against fixed test benchmarks before deployment."
      },
      {
        id: "l4_q4",
        question: "Which caching strategy is most effective for reducing LLM API costs on semantically similar user queries?",
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
        question: "If an LLM call costs ₹0.05 per 1,000 tokens and an app handles 100,000 queries per day averaging 2,000 tokens per query, what is the daily LLM API cost?",
        options: [
          "₹100",
          "₹1,000",
          "₹10,000",
          "₹100,000"
        ],
        correctIndex: 2,
        explanation: "Total daily tokens = 100,000 * 2,000 = 200,000,000 tokens. Total cost = (200,000,000 / 1,000) * ₹0.05 = 200,000 * ₹0.05 = ₹10,000/day."
      },
      {
        id: "l4_q6",
        question: "What is the difference between 'Time to First Token' (TTFT) and 'Inter-Token Latency' (ITL) when streaming LLM responses?",
        options: [
          "TTFT measures token cost; ITL measures server memory usage.",
          "TTFT is the duration from sending the request until the first generated token arrives (evaluates prompt processing & queue latency); ITL is the average time between consecutive subsequent tokens (evaluates generation throughput).",
          "TTFT only applies to batch processing; ITL only applies to mobile devices.",
          "There is no difference; both measure total generation time."
        ],
        correctIndex: 1,
        explanation: "TTFT reflects prompt ingestion and server queue overhead (user perceived responsiveness), while ITL reflects model autoregressive generation speed."
      },
      {
        id: "l4_q7",
        question: "How does Server-Sent Events (SSE) enable real-time streaming of LLM tokens to web browsers compared to WebSockets?",
        options: [
          "SSE requires custom UDP network protocols.",
          "SSE operates over standard HTTP/1.1 or HTTP/2 using a persistent, unidirectional text/event-stream connection from server to client, making it simpler, firewall-friendly, and ideal for token streaming.",
          "WebSockets cannot transmit text data.",
          "SSE only works on Google Chrome."
        ],
        correctIndex: 1,
        explanation: "SSE provides a lightweight, unidirectional HTTP streaming mechanism (`text/event-stream`) with automatic reconnection, perfectly matched for LLM token streaming without full duplex WebSocket complexity."
      },
      {
        id: "l4_q8",
        question: "In Pydantic (FastAPI), what is the purpose of `BaseModel` schemas for request and response validation?",
        options: [
          "To compile Python classes into C structs.",
          "To enforce strict runtime type validation, automatic JSON serialization/deserialization, and automatic generation of interactive Swagger/OpenAPI documentation.",
          "To connect to PostgreSQL databases without SQL queries.",
          "To encrypt API responses with AES-256."
        ],
        correctIndex: 1,
        explanation: "Pydantic validates input types, parses incoming request payloads, raises informative 422 HTTP validation errors on invalid data, and documents endpoints in Swagger UI."
      },
      {
        id: "l4_q9",
        question: "What is the 'Token Bucket' algorithm used for in production API gateway rate limiters?",
        options: [
          "To allocate cryptocurrency tokens to users.",
          "To rate-limit incoming API traffic by adding tokens to a bucket at a fixed rate up to a maximum capacity; each request consumes a token, allowing controlled bursts while enforcing steady average throughput.",
          "To count the number of words in an LLM prompt.",
          "To compress database transaction logs."
        ],
        correctIndex: 1,
        explanation: "The Token Bucket algorithm smooths API traffic, permitting short bursty request spikes while enforcing a strict long-term rate limit."
      },
      {
        id: "l4_q10",
        question: "Why should you never commit `.env` files containing API keys and database credentials to public GitHub repositories?",
        options: [
          "Because `.env` files cause merge conflicts in Git.",
          "Automated public GitHub scrapers and bot crawlers detect exposed API keys within seconds, leading to unauthorized resource abuse, data breaches, and massive billing charges.",
          "Because `.env` files are not supported on Linux servers.",
          "Because Git cannot track files starting with a dot."
        ],
        correctIndex: 1,
        explanation: "Publicly exposed API keys are immediately scraped by bots for compute mining and API abuse. Use `.gitignore` and cloud secret managers (like AWS Secrets Manager or Render Environment Variables)."
      },
      {
        id: "l4_q11",
        question: "What is a 'Health Check Endpoint' (`/health` or `/healthz`) in a production FastAPI service and why is it needed?",
        options: [
          "A medical diagnostic feature for users.",
          "A lightweight HTTP endpoint used by cloud load balancers and orchestrators (Kubernetes, AWS ECS) to periodically verify that the application process is alive and ready to accept traffic.",
          "An endpoint that counts total lines of code.",
          "A script that runs unit tests on production databases."
        ],
        correctIndex: 1,
        explanation: "Cloud orchestrators ping `/health` every few seconds. If a container becomes deadlocked or crashes, the load balancer stops routing traffic and restarts the container."
      },
      {
        id: "l4_q12",
        question: "What is the difference between Gunicorn and Uvicorn in a production Python deployment?",
        options: [
          "Gunicorn only works with PHP; Uvicorn works with Python.",
          "Uvicorn is an ASGI server that handles async Python event loops; Gunicorn is a battle-tested Process Manager that manages multiple Uvicorn worker processes (`gunicorn -k uvicorn.workers.UvicornWorker`), handling worker restarts and load distribution.",
          "Gunicorn is a database driver for MySQL.",
          "Uvicorn cannot run on multi-core servers."
        ],
        correctIndex: 1,
        explanation: "Gunicorn manages worker lifecycle, restarts dead workers, and balances OS signals, while Uvicorn workers handle high-throughput async ASGI request processing."
      },
      {
        id: "l4_q13",
        question: "What is 'Database Connection Pooling' and why is it essential under high concurrent traffic?",
        options: [
          "Merging multiple separate databases into a single hard drive.",
          "Maintaining a pool of pre-established, reusable database connections to eliminate the latency and CPU overhead of opening and tearing down TCP/SSL connections on every incoming request.",
          "Backing up database tables to AWS S3 hourly.",
          "Disabling database indexes during peak hours."
        ],
        correctIndex: 1,
        explanation: "Creating new database connections is expensive (TCP handshake, SSL negotiation, authentication). Connection pooling keeps active connections ready for reuse across requests."
      },
      {
        id: "l4_q14",
        question: "What is Cross-Origin Resource Sharing (CORS) and why must it be configured in FastAPI when frontend and backend run on different domains?",
        options: [
          "A protocol for compressing images on the server.",
          "A browser security mechanism that restricts web applications from making HTTP requests to a different domain/port than the one that served the web page, unless the backend explicitly allows the origin via CORS headers (`Access-Control-Allow-Origin`).",
          "A method to share GPU compute across servers.",
          "A Git command for sharing branches between developers."
        ],
        correctIndex: 1,
        explanation: "Browsers block cross-origin requests by default. The backend must configure CORS middleware to specify which client origins (e.g. `https://my-app.vercel.app`) are authorized to make requests."
      },
      {
        id: "l4_q15",
        question: "What does an OpenTelemetry / Distributed Tracing system provide in multi-step AI Agent systems?",
        options: [
          "It tracks the physical GPS location of the server.",
          "It captures end-to-end trace spans for every request, logging latency, tool calls, LLM prompt tokens, database queries, and errors across distributed microservices for debugging.",
          "It automatically compresses video files.",
          "It pays cloud hosting bills automatically."
        ],
        correctIndex: 1,
        explanation: "Distributed tracing (e.g. Langfuse, OpenTelemetry) visualizes the exact sequence, timing, inputs, and outputs of every sub-step and tool invocation in complex agentic pipelines."
      },
      {
        id: "l4_q16",
        question: "What is 'Model Fallback Routing' in resilient LLM infrastructure?",
        options: [
          "Deleting the model when an error occurs.",
          "An architectural pattern where requests routed to a primary LLM (e.g. GPT-4) automatically failover to a secondary backup provider (e.g. Claude 3.5 or open-weight Llama) upon encountering 500 errors or rate limits.",
          "Training a model backwards from output to input.",
          "Converting a model into an Excel spreadsheet."
        ],
        correctIndex: 1,
        explanation: "Fallback routing ensures high availability by automatically retrying with secondary models or providers if the primary LLM endpoint suffers outages or quota exhaustion."
      },
      {
        id: "l4_q17",
        question: "Why should you use non-root users (`USER appuser`) in production Dockerfiles?",
        options: [
          "Non-root containers use 50% less RAM.",
          "Running as a non-root user enforces the principle of least privilege, preventing potential container breakout exploits from gaining root access to the host operating system.",
          "Docker requires non-root users to compile Python code.",
          "Non-root containers run faster on ARM processors."
        ],
        correctIndex: 1,
        explanation: "Security best practice dictates running container processes with minimal privileges (`USER nonroot`), mitigating severe damage if an attacker exploits an application vulnerability."
      },
      {
        id: "l4_q18",
        question: "What is the purpose of a 'Graceful Shutdown' handler in FastAPI / ASGI web services?",
        options: [
          "To shut down the entire datacenter at midnight.",
          "To allow currently in-flight requests to complete processing and cleanly close open database connections/file handles before the server process terminates during redeployments.",
          "To delete all user records before server exit.",
          "To clear all browser cookies."
        ],
        correctIndex: 1,
        explanation: "Graceful shutdown stops accepting new requests while allowing active in-flight requests a timeout window (e.g. 15-30s) to finish cleanly, preventing truncated 502 errors during deployments."
      },
      {
        id: "l4_q19",
        question: "What is 'Data Drift' versus 'Concept Drift' in deployed machine learning monitoring?",
        options: [
          "Data drift is a hardware error; concept drift is a software error.",
          "Data Drift occurs when the input feature distribution P(X) changes over time (e.g. user demographics change); Concept Drift occurs when the underlying statistical relationship between features and target P(Y|X) changes (e.g. consumer purchasing patterns change after inflation).",
          "There is no difference; both mean the server hard drive is full.",
          "Data drift only applies to audio models."
        ],
        correctIndex: 1,
        explanation: "Data drift represents shifts in input data distributions, whereas concept drift represents changes in the ground-truth relationship between inputs and outputs, requiring model retraining."
      },
      {
        id: "l4_q20",
        question: "What is the purpose of an Exponential Backoff with Jitter retry policy for network requests?",
        options: [
          "To increase GPU clock frequency during training.",
          "To prevent the 'Thundering Herd' problem by exponentially increasing delay between retries while adding a small randomized noise interval (jitter) so competing clients do not retry simultaneously and overwhelm recovering servers.",
          "To delete failed database rows permanently.",
          "To convert HTTP requests to HTTPS."
        ],
        correctIndex: 1,
        explanation: "Jitter randomizes retry intervals, preventing synchronized waves of retrying clients from repeatedly hammering and crashing a struggling downstream service."
      }
    ]
  },

  // =========================================================================
  // ================= COMPANY-SPECIFIC SCREENING PAPERS =====================
  // =========================================================================
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
        question: "TCS Prime Technical Round: You are asked to find the longest palindromic substring in O(N^2) time with O(1) extra space. Which approach should you choose?",
        options: [
          "Dynamic programming table requiring O(N^2) memory allocation.",
          "Expand around center algorithm for every 2N-1 possible centers.",
          "Recursive brute-force generating all substrings in O(N^3).",
          "Sorting the string and using two pointers."
        ],
        correctIndex: 1,
        explanation: "Expanding around center considers all 2N-1 centers in O(N) per center, achieving O(N^2) total time and O(1) auxiliary memory."
      },
      {
        id: "tcs_q2",
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
        question: "During a TCS Prime interview, the panel asks: 'How does your deployed college Q&A chatbot handle hallucination when a student asks about a non-existent fee waiver?' What is the best engineering answer?",
        options: [
          "We rely on the LLM's natural intelligence to guess accurately.",
          "We set a cosine similarity retrieval threshold (e.g. 0.72) and instruct the prompt with explicit guardrails: 'If the retrieved context does not contain the answer, reply only with: I do not have verified records for this query'.",
          "We fine-tune GPT-4 on every student query daily.",
          "We disable temperature completely to make the model answer everything."
        ],
        correctIndex: 1,
        explanation: "Combining a strict vector retrieval similarity cutoff with negative prompt constraints prevents hallucinations on out-of-distribution queries."
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
        question: "In a multi-agent LangGraph system with 4 specialized sub-agents, how should state be managed across agent transitions?",
        options: [
          "By passing JSON strings inside an infinite while loop without type annotations.",
          "By defining a central TypedDict / Pydantic `State` object with reducer functions that append messages or update specific fields immutably.",
          "By storing state in global variables on the frontend client browser.",
          "By rebuilding the entire vector index after every sub-agent turn."
        ],
        correctIndex: 1,
        explanation: "LangGraph uses graph state schemas with defined reducer annotations to ensure state transitions between nodes are predictable and thread-safe."
      },
      {
        id: "hcl_q2",
        question: "When tuning a production RAG system with 50,000 technical manuals, which re-ranking technique provides the greatest accuracy lift over naive vector search?",
        options: [
          "Alphabetical sorting by filename.",
          "Two-stage retrieval: Retrieve top-50 candidates using dense vector search + BM25 keyword search (hybrid search), then apply a Cross-Encoder Re-ranker to score the top-5 chunks.",
          "Discarding vector embeddings and using `LIKE %query%` in MySQL.",
          "Increasing the chunk size from 500 tokens to 10,000 tokens."
        ],
        correctIndex: 1,
        explanation: "Hybrid search captures both exact keyword matches and semantic concepts, while a cross-encoder computes full token-level cross-attention to rank true semantic relevance."
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
        question: "Probability Puzzle: You have 2 unbiased coins and 1 biased coin that lands on Heads with probability 0.8. You pick one coin at random and flip it 3 times; all 3 flips land on Heads. What is the probability that you picked the biased coin?",
        options: [
          "0.333",
          "0.579",
          "0.672",
          "0.804"
        ],
        correctIndex: 2,
        explanation: "By Bayes' Theorem: P(Biased) = 1/3, P(Fair) = 2/3. P(3H|Biased) = 0.8^3 = 0.512. P(3H|Fair) = 0.5^3 = 0.125. P(3H) = (1/3 * 0.512) + (2/3 * 0.125) = 0.254. P(Biased|3H) = 0.17066 / 0.254 ≈ 0.672 (67.2%)."
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
        question: "In an Infosys Power Programmer interview, you are asked to explain why you used LoRA (Low-Rank Adaptation) instead of full parameter fine-tuning. What is the key advantage?",
        options: [
          "LoRA trains the model on CPU without requiring any GPU memory.",
          "LoRA freezes pretrained weights and injects trainable rank-decomposition matrices into transformer layers, cutting trainable parameters by 99% and drastically lowering VRAM usage.",
          "LoRA converts the transformer into a decision tree model.",
          "LoRA eliminates the need for any training dataset."
        ],
        correctIndex: 1,
        explanation: "LoRA decomposes the weight update into low-rank matrices of rank r << d, reducing memory and compute requirements by up to 90% while maintaining near full fine-tuning performance."
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
        question: "Mu Sigma Case Study: An e-commerce recommendation engine shows a 15% increase in click-through rate (CTR), but overall revenue declines by 4%. What is the most plausible analytical explanation?",
        options: [
          "The algorithm was trained without cross-validation.",
          "The model is over-recommending low-priced clickbait items (high clicks, tiny basket size) at the expense of high-value purchases.",
          "Click-through rate is mathematically inversely correlated with revenue.",
          "The database indexes are fragmented."
        ],
        correctIndex: 1,
        explanation: "Optimizing purely for engagement/clicks often creates perverse incentives where algorithms surface cheap sensational items that convert with minimal cart value, hurting total revenue."
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

sample = "The 2026 AI Career Roadmap trains students for TCS Prime and high package AI roles."
print(chunk_text(sample, 4, 1))`,
    expectedOutput: `['The 2026 AI Career', 'Career Roadmap trains students', 'students for TCS Prime', 'Prime and high package', 'package AI roles.']`
  },
  {
    id: "code-2",
    title: "2. Vector Cosine Similarity Calculator",
    difficulty: "Easy-Medium",
    category: "ML Math & Vector Search",
    description: "Compute the cosine similarity between two numerical embedding vectors: $\\text{Sim}(u, v) = \\frac{u \\cdot v}{\\|u\\| \\|v\\|}$.",
    starterCode: `import math

def cosine_similarity(v1: list[float], v2: list[float]) -> float:
    if len(v1) != len(v2):
        raise ValueError("Vectors must have identical dimensions")
    dot_product = sum(a * b for a, b in zip(v1, v2))
    norm_v1 = math.sqrt(sum(a ** 2 for a in v1))
    norm_v2 = math.sqrt(sum(b ** 2 for b in v2))
    if norm_v1 == 0 or norm_v2 == 0:
        return 0.0
    return round(dot_product / (norm_v1 * norm_v2), 4)

emb1 = [0.12, 0.45, 0.78, 0.05]
emb2 = [0.10, 0.48, 0.75, 0.08]
print("Similarity:", cosine_similarity(emb1, emb2))`,
    expectedOutput: `Similarity: 0.9984`
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
                    time.sleep(sleep_time)
        return wrapper
    return decorator`,
    expectedOutput: `{'status': 'success', 'response': 'Generated response'}`
  }
];
