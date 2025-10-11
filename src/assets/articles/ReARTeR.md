# **ReARTeR: Retrieval-Augmented Reasoning through Trustworthy Process Rewarding**

From: https://arxiv.org/abs/2501.07861

## 1. Motivation

> RAG (Retrieval-Augmented Generation) systems help LLMs access external knowledge, but they still lack **multi-step reasoning** capabilities.

**Main challenges:**

1.  Current Process Reward Models (PRMs) produce unreliable scores:
    *   Scores are not interpretable.
    *   Training data is biased.
    *   Early-step evaluation is inaccurate (early-step bias).

2.  There is no unified method that combines **post-training** and **test-time** reasoning optimization.

---

## 2. Contributions

ReARTeR proposes a new framework:

> **Retrieval-Augmented Reasoning through Trustworthy Process Rewarding**

**Main contributions:**

1.  Combines **post-training scaling** and **test-time scaling** to jointly enhance reasoning ability.

2.  Introduces **Trustworthy Process Rewarding (TPR)**, which includes:
    *   **PRM (Process Reward Model):** precisely evaluates each reasoning step.
    *   **PEM (Process Explanation Model):** generates natural-language explanations for PRM scores to guide model self-correction.

3.  Aligns PRM and PEM through **off-policy preference learning**, ensuring consistent scoring and explanations.

4.  Resolves three reliability issues:
    *   Misalignment between PRM and PEM → fixed via preference learning.
    *   Data bias in PRM → mitigated with balanced annotations and strong-model labeling.
    *   Early-step bias → corrected through **TD-based Lookahead Search**.

---

## 3. Framework Overview

ReARTeR consists of two major stages:

### **A. Test-Time Scaling (Reasoning Stage)**

**Goal:** Enable the model to dynamically correct reasoning errors during inference.

**Process:**
1️⃣ PRM scores the current reasoning step.  
2️⃣ If the score is low, PEM generates an explanation identifying the error.  
3️⃣ The model revises the reasoning step based on the explanation.  
4️⃣ PRM re-scores — a higher score indicates successful correction.

This feedback loop is called the **“Trustworthy Process Rewarding Loop.”**

---

### **B. Post-Training Scaling (Training Stage)**

**Goal:** Improve the model’s reasoning ability so it can autonomously produce higher-quality reasoning steps.  
This stage includes two phases:

#### (1) Warm-Up Stage
*   A “strong model” (e.g., GPT-4o) generates high-quality reasoning samples.
*   A “weak model” (e.g., LLaMA-3) learns to imitate the strong model’s reasoning.
*   Retrieved document content is masked out (since it’s not model-generated).

#### (2) Step-Level Offline Reinforcement Stage
*   **MCTS (Monte Carlo Tree Search)** gathers step-level preference data.
*   The model is trained using **KTO Loss** to prefer higher-scoring reasoning steps.
*   Through iterative updates, the model’s reasoning quality improves progressively.

---

## 4. Trustworthy Process Rewarding — Detailed Mechanisms

| Problem | Solution | Method/Model |
| -------- | -------- | ------------ |
| PRM and PEM misalignment | Use PRM scores as supervision to train PEM to produce explanations that increase PRM scores | Off-policy Preference Learning |
| Biased PRM data | Balance positive/negative samples and use strong-model labeling for hard cases | OmegaPRM + Balanced Annotation |
| Early-step bias | Simulate future reasoning steps and backpropagate feedback | TD-based Lookahead Search |

---

## 5. Loss Functions

*   **PRM:** Cross-Entropy Loss (classifying reasoning steps as correct/incorrect)  
*   **PEM:** KTO Loss (preference learning with weighted samples)  

    *Dynamic penalty coefficient:*

    $$
    \lambda_U = \lambda_0 \cdot \exp(r_1 - r_2)
    $$

    → The greater the error, the stronger the penalty.

*   **Post-Training:** Repeatedly update weak model policy $\pi_\theta^w$ using KTO Loss.

---

## 6. Experiments

### **Datasets**

*   HotpotQA  
*   2WikiMultiHopQA  
*   Musique  
*   Bamboogle  
*   StrategyQA  

### **Metrics**

*   **ACCᴿ:** whether the answer contains the correct text string  
*   **ACCᴸ:** semantic correctness judged by GPT-4o (“LLM-as-Judge”)  

---

### **RQ1: Overall Performance**

*   ReARTeR significantly outperforms CR-Planner, IRCoT, and Self-Ask across all five datasets.  
*   The LLaMA-3 version even surpasses open-source reasoning models like Marco-o1 and Skywork-o1.  
✅ Demonstrates broad improvement in multi-step reasoning ability.

---

### **RQ2: Ablation Study**

Removing any module (Refinement, PEM, TD-Lookahead, PRM data) reduces performance.  
✅ Confirms that every module is essential to the overall effectiveness.

---

### **RQ3: Post-Training Iteration**

After three iterations, performance steadily increases (+0.05–0.08 ACCᴸ).  
✅ Step-Level Offline Reinforcement continually enhances reasoning precision.

---

### **RQ4: PEM–PRM Alignment**

*   After alignment, the improvement rate rises to ~70% (vs. 50% before alignment).  
*   Overall ACCᴸ improves by ~5–8 percentage points.  
✅ Stronger PEM–PRM alignment leads to better reasoning correction and final accuracy.

---

## 7. Conclusion

> ReARTeR combines **Trustworthy Process Rewarding (TPR)** and **Step-Level Offline Reinforcement Learning**  
> to significantly enhance multi-step reasoning ability and interpretability in RAG systems.

**Key features:**

*   Improves reasoning during both training and inference.  
*   Provides language-based “explanatory feedback.”  
*   Mitigates early-step bias, data bias, and alignment issues.  
*   Compatible with any LLM or RAG architecture.

---

## 8. Visual Summary

```
[Question]
   ↓
 [RAG generates step e_t]
   ↓
 [PRM scores r_t]
   ↓ (if low)
 [PEM generates explanation c_t → model revises]
   ↓
 [PRM re-scores r_t']
   ↓
 [PEM learns to generate explanations that increase r_t] ← Off-policy Preference Learning
   ↓
 [Multi-step Rollout + MCTS collect preferences]
   ↓
 [KTO Loss Offline Reinforcement Learning]
   ↓
 ReARTeR: Trustworthy + Reasoning-Enhanced RAG
```

---

## One-Sentence Summary

> **ReARTeR = RAG + Reasoning + Trustworthy Feedback**  
> Enables models not only to retrieve information but also to **understand processes, correct logic, and self-improve.**
