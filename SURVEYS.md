# Related Surveys and Positioning

This file records the main survey baselines and the gap targeted by **Awesome Efficient Diffusion**.

## A. Cache-focused survey

### A Survey on Cache Methods in Diffusion Models: Toward Efficient Multi-Modal Generation
- Paper: https://arxiv.org/abs/2510.19755
- Focus: diffusion caching across modalities.
- Strength: detailed cache taxonomy and broad multimodal applications.
- Main conceptual line: static reuse → adaptive cache → predictive/dynamic cache.
- Limitation for our purpose: cache is only one family of efficient diffusion; it does not provide a unified view of solver, distillation, sparse attention, compression and systems.

**Implication:** a new cache-only survey would need strong 2025–2026 incremental coverage and a distinct organizing principle to avoid substantial overlap.

---

## B. Broad efficient diffusion surveys

### Efficient Diffusion Models: A Comprehensive Survey from Principles to Practices
- Paper: https://arxiv.org/abs/2410.11795
- Focus: broad efficiency throughout the diffusion lifecycle.
- Covers architecture design, training, inference and deployment.
- Strength: comprehensive lifecycle view.
- Limitation for our purpose: the scope is so broad that inference/generation acceleration is not always the central organizing question.

### Efficient Diffusion Models: A Survey
- Paper: https://arxiv.org/abs/2502.06805
- Focus: algorithm / system / framework-level efficiency.
- Strength: useful bridge between algorithms and system implementations.
- Limitation for our purpose: rapid developments in 2025–2026 — particularly video DiTs, cache prediction, sparse attention, joint quantization/cache, dLLMs and world models — require substantial updating.

**Implication:** rather than another lifecycle survey, our scope should be narrower and deeper: **efficient generation/inference**.

---

## C. Video-focused survey

### Efficient Video Diffusion Models: Advancements and Challenges
- Paper: https://arxiv.org/abs/2604.15911
- Focus: video diffusion acceleration.
- Particularly useful taxonomy: **step distillation, efficient attention, model compression, cache/trajectory optimization**.
- Strength: closely matches the current bottlenecks of large video DiTs.
- Limitation for our purpose: video-specific; fast solvers and broader system/application transitions are less central than in a general Efficient Diffusion survey.

**Implication:** this paper provides an excellent *video subdomain template*, but the general survey should add explicit **fast sampling** and **systems/parallelism** categories and extend the application axis to image, world models and dLLMs.

---

# Proposed gap for a new survey

The intended survey should answer two orthogonal questions:

## Axis 1 — How is diffusion accelerated?

1. Fast Sampling & Step Reduction
2. Distillation & Few-Step Generation
3. Cache & Computation Reuse
4. Efficient Attention & Sparse Computation
5. Model Compression
6. Systems & Parallelism

Training-free vs training-based is recorded as an attribute rather than the primary split.

## Axis 2 — Where is it accelerated?

1. Image generation/editing
2. Video generation
3. World / action models
4. Diffusion language models
5. Other modalities

This two-axis organization makes it possible to explain **bottleneck migration**:

- Image diffusion: historically dominated by high NFE.
- Video diffusion: after step reduction, spatiotemporal attention and memory dominate.
- World models: repeated rollout introduces temporal/history cache and error accumulation.
- dLLMs: repeated bidirectional full-sequence denoising creates a different KV/sparse-attention problem.

---

# Candidate survey contribution

A future paper built from this repository can claim contribution along four dimensions:

1. **Updated coverage through 2026**, including current cache prediction, sparse attention, compression, systems and dLLM/world-model work.
2. **Unified cost decomposition:** NFE reduction vs per-step reduction vs runtime/system optimization.
3. **Method × Application matrix:** explains why techniques transfer differently across image, video, world and language diffusion.
4. **Transition to compound acceleration:** recent methods increasingly combine cache, sparsity, quantization, distillation and systems rather than optimize a single redundancy source.

The goal is not to maximize paper count. The survey should select foundational, representative and frontier methods that explain each transition clearly.
