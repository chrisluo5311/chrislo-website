# What is **Hierarchical Softmax**?

### 🔍 Definition:

**Hierarchical Softmax** is an efficient alternative to the **standard softmax function** used in neural network output layers, especially when dealing with **very large vocabularies** (e.g., hundreds of thousands to millions of words).

Instead of computing the probability distribution over all vocabulary words directly, hierarchical softmax organizes words into a **binary tree structure** (often a Huffman tree), and computes the probability of a word by **traversing the tree from root to leaf**.

---

### ⚙️ How It Works:

- Each word is a **leaf node** in the binary tree.

- To compute the probability of a word www, you compute the **probability of making a series of binary decisions** (left/right or 0/1) from the **root** to the **word’s leaf**.

- The number of operations is $O(log_2(V))$, where $V$ is vocabulary size — much faster than $O(V)$ of normal softmax.

#### ✅ Example:

Suppose we want the probability of the word `"cat"`, which is located at the end of a path: root → left → right → left → `"cat"`.

The final probability P("cat") is:

$$
P("cat")=P(left at node 1)×P(right at node 2)×P(left at node 3)
$$

Each decision is a binary logistic regression (sigmoid).

---

### 🧠 Why Use It?

- **Faster** for large vocabularies.

- **Memory-efficient**: Only need to store log-sized paths for each word.

- Frequently used in **Word2Vec**’s **Skip-gram** and **CBOW** models (as in Mikolov et al., 2013).