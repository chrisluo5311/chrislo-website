# RNN language model

### **A. Input: One-hot Vectors and Word Embeddings**

- $x^{(t)}$ At each time step t, the current word is represented as a one-hot vector of size `|V|` (vocabulary size).

- $e^{(t)} = E x^{(t)}$ This one-hot vector is multiplied by an embedding matrix `E` to produce a dense word embedding for the current word.

   - **E** is the embedding matrix (`[vocab_size, embedding_dim]`), same as before.

   - These embeddings are trainable (or can use pre-trained ones like **GloVe**).

### **B. RNN Hidden States**

- $h^{(t)}$ The “hidden state” at time t is a vector that summarizes the sequence up to this word. It’s calculated as:
$$
h^{(t)} = σ(Wh * h^{(t-1)} + We * e^{(t)} + b1)
$$

   - `σ` is a non-linear activation function (often tanh or ReLU).

   - $W_h$ is a weight matrix for the previous hidden state (shape: \[k, k\]).

      - $W_h h^{(0)}$: shape is \[k,1\]

   - $W_e$ is a weight matrix for the current word embedding (shape: \[k, p\]).

      - $W_e e^{(t)}$: shape is \[k,1\]

   - `b1` is a bias vector. (shape: \[k,1\])

   - $h^{(0)}$ is usually initialized as zeros (the initial hidden state).

   - The hidden state at each step is influenced both by the *current* word and the *previous* context.

      - $h^{(t)}$: shape is \[k,1\]

### **C. Output Layer**

- $ŷ^{(t)} = softmax(U h^{(t)} + b2)$

   - At each step, the hidden state is fed into a softmax layer to predict the probability distribution over all possible next words.

   - `U` is a weight matrix mapping the hidden state to vocabulary size.

   - The output is a vector with probabilities for all words in the vocabulary.


## **Step-by-Step Walkthrough of the Figure**

- The words **“the students opened their”** are fed into the model one at a time.

- Each word is embedded and processed sequentially.

- At each time step, the hidden state summarizes everything seen so far.

   - **Early words** (leftmost) have smaller influence on later predictions.

   - **Later words** (rightmost) have more direct influence on the prediction (see red notes).

- The output at the final step gives a probability distribution for what the next word should be (e.g., “books”, “laptops”, etc.).


## **Key Differences From Fixed-Window Models**

- **Handles arbitrary sequence lengths**: Not limited by a window size.

- **Sequential context**: Each hidden state accumulates context from all previous words.

- **Sensitivity to word order**: RNNs process the sequence in order, so “the students opened their” ≠ “students the opened their”.

---

## **Cons**:

- Recurrent computation is slow

   - Can’t parellelize because it’s sequential

- Difficult to acces information from steps back
