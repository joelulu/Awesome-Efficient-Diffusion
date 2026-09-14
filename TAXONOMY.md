# Taxonomy for Efficient Diffusion

This taxonomy is designed for a survey whose focus is **efficient generation/inference** rather than the entire diffusion lifecycle.

## 1. Fast Sampling & Step Reduction

**Goal:** reduce the number of denoising/model evaluations.

Subfamilies:
- deterministic/stochastic fast solvers;
- high-order ODE/SDE solvers;
- optimized timestep schedules;
- adaptive timestep or trajectory selection;
- solver/model co-design when the main gain is lower NFE.

Boundary rule: if the original model is kept and only the sampling trajectory changes, place the work here rather than under distillation.

## 2. Distillation & Few-Step Generation

**Goal:** train a generator that reaches comparable quality in much fewer steps.

Subfamilies:
- progressive distillation;
- consistency distillation / consistency models;
- latent consistency;
- distribution matching distillation;
- adversarial distillation;
- hybrid consistency + adversarial objectives;
- step-aware / phased / multi-stage distillation.

Boundary rule: training a new or modified generator for fewer inference steps belongs here even if the distillation loss also changes trajectory behavior.

## 3. Cache & Computation Reuse

**Goal:** avoid recomputing redundant representations across denoising steps, layers, frames, or autoregressive chunks.

Subfamilies:
- static block/feature cache;
- adaptive cache scheduling;
- layer-wise cache;
- token/region cache;
- predictive / extrapolative cache;
- delta / residual cache;
- subspace-aware cache;
- history / trajectory reuse in autoregressive video and world models;
- approximate KV reuse for dLLMs.

A useful evolution line is:

`static reuse → adaptive reuse → fine-grained reuse → predictive reuse → globally optimized / history-aware reuse`.

## 4. Efficient Attention & Sparse Computation

**Goal:** reduce active computation within each denoising step.

Subfamilies:
- token pruning;
- token merging / clustering;
- sparse attention;
- linear / hybrid attention;
- local/window/block attention;
- dynamic attention pattern selection;
- attention-head skipping;
- layer/block skipping;
- sparse MLP / conditional computation.

Boundary rule: a method that skips a whole feature computation because a previous timestep result is reused is primarily **Cache**. A method that reduces the active token/edge/block set within the current computation is primarily **Sparse Computation**.

## 5. Model Compression

**Goal:** reduce parameter count, memory traffic, or arithmetic cost of each model evaluation.

Subfamilies:
- post-training quantization (PTQ);
- quantization-aware training (QAT);
- weight / activation / KV quantization;
- structured / unstructured pruning;
- low-rank approximation;
- architecture slimming;
- representation/VAE compression when it directly lowers inference cost.

## 6. Systems & Parallelism

**Goal:** convert algorithmic efficiency into actual wall-clock throughput/latency improvements.

Subfamilies:
- patch / sequence parallelism;
- tensor / pipeline parallelism;
- CFG parallelism;
- communication overlap;
- distributed attention;
- custom sparse/quantized kernels;
- Flash/Sage-style attention kernels;
- CPU/GPU offload;
- compilation/operator fusion;
- serving and batching optimizations.

## Cross-cutting tag: Hybrid / Compound Acceleration

Recent methods increasingly combine multiple mechanisms. Do not force these into a seventh silo; instead assign a primary category plus secondary tags.

Examples:
- **CacheQuant:** Cache + Quantization;
- **Q&C:** Quantization + Cache + error compensation;
- **QuantSparse:** Quantization + Sparse Attention;
- **FastVideo / LightX2V:** Distillation + sparse attention + low precision + systems.

---

# Application taxonomy

## A. Image generation / editing

Includes text-to-image, image-to-image, editing, personalization and controllable image generation.

Historical bottleneck: large NFE. Newer DiT-era bottlenecks increasingly include per-step attention/MLP cost.

## B. Video generation

Includes text-to-video, image-to-video and video editing.

Key cost structure: long spatiotemporal token sequence makes attention and memory dominant after step reduction.

## C. World / action models

Includes autoregressive video world models, action-conditioned generation, interactive world generation and related rollout settings.

Distinct bottleneck: repeated long-horizon rollout introduces history/KV/cache growth and cross-segment error accumulation.

## D. Diffusion language models (dLLMs)

Includes masked/discrete diffusion language modeling.

Distinct bottleneck: repeated bidirectional full-sequence denoising. Standard autoregressive KV caching cannot be transferred directly; stable-token/approximate KV reuse and sparse attention become important.

## E. Other modalities

Audio/speech, 3D, molecules/science and robotics/policy diffusion are included selectively when a method contributes a distinct efficiency idea.

---

# Third axis: optimization requirement

Each paper should be labeled with one of the following where possible:

- **Training-free:** no parameter updates; plug-and-play inference transformation.
- **Calibration / search:** no full model training, but requires profiling/calibration/search.
- **Post-training:** compression/optimization after pretrained model completion.
- **Training-based:** requires distillation, fine-tuning, retraining or learning a new module.

This axis is an attribute, not the main taxonomy, because training requirement does not explain *where the computation is removed*.

---

# Recommended survey narrative

A useful historical story is:

1. **Reduce NFE:** DDIM → high-order solvers → optimized schedules.
2. **Learn few-step generators:** progressive distillation → consistency → distribution/adversarial matching.
3. **Reduce per-step cost:** cache → token reduction → sparse/linear attention → compression.
4. **Turn FLOPs into real speed:** parallelism, kernels, offload and serving.
5. **Application-aware acceleration:** image → video → world models / dLLMs.
6. **Compound acceleration:** multiple redundancy dimensions optimized jointly.

This narrative avoids a flat catalogue and emphasizes the changing bottleneck of diffusion inference.
