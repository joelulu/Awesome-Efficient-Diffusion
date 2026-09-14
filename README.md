# Awesome Efficient Diffusion

A curated research map of **efficient diffusion / flow generation**, covering representative foundations and recent frontier work across **image generation, video generation, world models, and diffusion language models (dLLMs)**.

> **Scope.** We focus on methods whose primary goal is to reduce diffusion/flow **generation or inference cost**: number of denoising steps (NFE), per-step computation, model/memory cost, or runtime/system overhead. Training is allowed when it is used to obtain a faster generator (e.g. distillation, trainable sparse attention, pruning/quantization).
>
> **Last literature sweep:** 2026-09-14. The first version emphasizes representative papers and 2025–2026 frontier work rather than exhaustive coverage.

## Research positioning

Useful existing views include:

- **Cache-only:** [A Survey on Cache Methods in Diffusion Models: Toward Efficient Multi-Modal Generation](https://arxiv.org/abs/2510.19755)
- **Broad efficient diffusion:** [Efficient Diffusion Models: A Comprehensive Survey from Principles to Practices](https://arxiv.org/abs/2410.11795) and [Efficient Diffusion Models: A Survey](https://arxiv.org/abs/2502.06805)
- **Video-focused acceleration:** [Efficient Video Diffusion Models: Advancements and Challenges](https://arxiv.org/abs/2604.15911)

This repository uses a **two-axis view**:

1. **Method axis — How is generation accelerated?**
2. **Application axis — Where does the bottleneck appear?** Image → Video → World Models / dLLMs.

A third attribute records whether a method is **training-based, post-training/calibration-based, or training-free**.

---

## Method taxonomy

A useful decomposition is

`generation cost ≈ number of denoising steps × per-step cost + runtime/system overhead`.

| Category | What it reduces | Typical techniques | Representative starting points |
|---|---|---|---|
| **1. Fast Sampling & Step Reduction** | Number of model evaluations / NFE | ODE/SDE solvers, timestep scheduling, trajectory optimization | [DDIM](https://arxiv.org/abs/2010.02502), [DPM-Solver](https://arxiv.org/abs/2206.00927), [UniPC](https://arxiv.org/abs/2302.04867), [Align Your Steps](https://arxiv.org/abs/2404.14507) |
| **2. Distillation & Few-Step Generation** | NFE via training a faster generator | progressive/consistency/distribution/adversarial distillation | [Progressive Distillation](https://arxiv.org/abs/2202.00512), [Consistency Models](https://arxiv.org/abs/2303.01469), [LCM](https://arxiv.org/abs/2310.04378), [DMD](https://arxiv.org/abs/2311.18828), [DMD2](https://arxiv.org/abs/2405.14867) |
| **3. Cache & Computation Reuse** | Repeated computation across denoising steps / segments | block/feature/token cache, adaptive cache, predictive cache, trajectory reuse | [DeepCache](https://arxiv.org/abs/2312.00858), [Learning-to-Cache](https://arxiv.org/abs/2406.01733), [FORA](https://arxiv.org/abs/2407.01425), [TeaCache](https://arxiv.org/abs/2411.19108), [TaylorSeer](https://arxiv.org/abs/2503.06923) |
| **4. Efficient Attention & Sparse Computation** | Active tokens / attention edges / blocks per step | token pruning/merging, sparse attention, linear attention, head/block skipping | [ToMeSD](https://arxiv.org/abs/2303.17604), [DiTFastAttn](https://arxiv.org/abs/2406.08552), [SiTo](https://ojs.aaai.org/index.php/AAAI/article/view/33071) |
| **5. Model Compression** | Parameter, memory, arithmetic precision | quantization, pruning, low-rank/structured compression | [Diff-Pruning](https://arxiv.org/abs/2305.10924), [Q-Diffusion](https://arxiv.org/abs/2302.04304), [LD-Pruner](https://arxiv.org/abs/2404.11936) |
| **6. Systems & Parallelism** | Runtime latency / communication / memory overhead | patch/sequence/CFG/pipeline parallelism, kernels, offload, serving | [StreamDiffusion](https://arxiv.org/abs/2312.12491), [DistriFusion](https://arxiv.org/abs/2402.19481), [xDiT](https://arxiv.org/abs/2411.01738), [FastVideo](https://github.com/hao-ai-lab/FastVideo), [LightX2V](https://github.com/ModelTC/LightX2V) |

**Hybrid / Compound Acceleration** is a cross-cutting tag rather than a seventh category. Recent work increasingly combines multiple axes, e.g. cache + quantization, quantization + sparse attention, and few-step distillation + sparse attention + low precision.

See [TAXONOMY.md](TAXONOMY.md) for definitions and cross-category rules.

---

## Application axis

| Application | Main bottleneck shift | Particularly important methods |
|---|---|---|
| **Image generation / editing** | iterative denoising + large DiT/U-Net | solvers, few-step distillation, cache, quantization |
| **Video generation** | `steps × long spatiotemporal sequence × attention` | distillation, cache, sparse attention, token reduction, quantization, parallelism |
| **World / action models** | video cost + long-horizon rollout + historical state | temporal cache, history reuse, sparse attention, autoregressive/streaming acceleration |
| **Diffusion language models** | repeated full-sequence bidirectional denoising | step/token scheduling, approximate KV cache, sparse attention, parallel decoding |
| **Other modalities** | task-specific | audio, 3D, science, robotics/policy diffusion tracked selectively |

---

## Core reading map

⭐ = key turning point; 🆕 = recent frontier.

| Year | Work | Category | Application | Why it matters |
|---|---|---|---|---|
| 2020 | [DDIM](https://arxiv.org/abs/2010.02502) | Sampling | Image | Foundational non-Markovian fast sampling path |
| 2022 | ⭐ [DPM-Solver](https://arxiv.org/abs/2206.00927) | Sampling | General | High-order solver view; strong low-NFE baseline |
| 2022 | ⭐ [Progressive Distillation](https://arxiv.org/abs/2202.00512) | Distillation | Image | Canonical iterative step-halving distillation |
| 2023 | [UniPC](https://arxiv.org/abs/2302.04867) | Sampling | General | Unified predictor-corrector fast sampler |
| 2023 | ⭐ [Consistency Models](https://arxiv.org/abs/2303.01469) | Distillation | General | Major one/few-step generation paradigm |
| 2023 | ⭐ [LCM](https://arxiv.org/abs/2310.04378) | Distillation | Image | Brings consistency distillation to latent T2I |
| 2023 | ⭐ [DMD](https://arxiv.org/abs/2311.18828) | Distillation | Image | Distribution-level one-step distillation |
| 2023 | [Token Merging for Fast Stable Diffusion](https://arxiv.org/abs/2303.17604) | Sparse/Token | Image | Training-free token redundancy reduction |
| 2023 | [Diff-Pruning](https://arxiv.org/abs/2305.10924) | Compression | Image | Structural pruning tailored to diffusion |
| 2023 | [StreamDiffusion](https://arxiv.org/abs/2312.12491) | Systems | Interactive Image | Streaming pipeline + CFG optimization |
| 2024 | ⭐ [DMD2](https://arxiv.org/abs/2405.14867) | Distillation | Image | Strengthens DMD and supports multi-step generation |
| 2024 | [SDXL-Lightning](https://arxiv.org/abs/2402.13929) | Distillation | Image | Progressive + adversarial distillation for 1–4 steps |
| 2024 | [Align Your Steps](https://arxiv.org/abs/2404.14507) | Sampling | Image | Optimizes timestep schedules without replacing the model |
| 2024 | ⭐ [DeepCache](https://arxiv.org/abs/2312.00858) | Cache | Image | Foundational training-free feature reuse for U-Nets |
| 2024 | [Learning-to-Cache](https://arxiv.org/abs/2406.01733) | Cache | Image | Layer-level learned caching for DiTs |
| 2024 | [FORA](https://arxiv.org/abs/2407.01425) | Cache | Image/Video | Fast-forward attention/MLP caching in DiTs |
| 2024 | [DiTFastAttn](https://arxiv.org/abs/2406.08552) | Sparse/Cache | Image/Video | Spatial + temporal + CFG attention redundancy |
| 2024 | ⭐ [DistriFusion](https://arxiv.org/abs/2402.19481) | Systems | Image | Distributed patch parallelism with cross-step reuse |
| 2024 | ⭐ [xDiT](https://arxiv.org/abs/2411.01738) | Systems | Image/Video | Hybrid sequence, PipeFusion and CFG parallelism |
| 2024/25 | ⭐ [TeaCache](https://arxiv.org/abs/2411.19108) | Cache | Video | Timestep-embedding-aware adaptive cache |
| 2025 | ⭐ [TaylorSeer](https://arxiv.org/abs/2503.06923) | Cache | Image/Video | Moves cache from reuse toward feature forecasting |
| 2025 | [SiTo](https://ojs.aaai.org/index.php/AAAI/article/view/33071) | Sparse/Token | Image | Training-free hardware-friendly token pruning |
| 2025 | [SANA-Sprint](https://openaccess.thecvf.com/content/ICCV2025/html/Chen_SANA-Sprint_One-Step_Diffusion_with_Continuous-Time_Consistency_Distillation_ICCV_2025_paper.html) | Distillation | Image | 1–4 step hybrid consistency/adversarial distillation |
| 2025 | [CacheQuant](https://openaccess.thecvf.com/content/CVPR2025/html/Liu_CacheQuant_Comprehensively_Accelerated_Diffusion_Models_CVPR_2025_paper.html) | Hybrid | Image | Joint cache + quantization |
| 2025 | [FastVideo](https://github.com/hao-ai-lab/FastVideo) | Framework/Hybrid | Video | DMD2, sparse attention and optimized inference in one framework |
| 2026 | 🆕⭐ [SVD-Cache](https://openaccess.thecvf.com/content/CVPR2026/html/Chen_Forecast_the_Principal_Stabilize_the_Residual_Subspace-Aware_Feature_Caching_for_CVPR_2026_paper.html) | Cache | Image/Video | Predict principal subspace, reuse residual subspace |
| 2026 | 🆕 [DPCache](https://openaccess.thecvf.com/content/CVPR2026/html/Cui_Denoising_as_Path_Planning_Training-Free_Acceleration_of_Diffusion_Models_with_CVPR_2026_paper.html) | Cache | Image/Video | Global cache scheduling as path planning |
| 2026 | 🆕 [D2Cache](https://openaccess.thecvf.com/content/CVPR2026/html/Liu_D2Cache_Second-Order_Delta_Caching_for_Higher_Video_Diffusion_Acceleration_CVPR_2026_paper.html) | Cache | Video | Second-order delta prediction for high-ratio caching |
| 2026 | 🆕⭐ [ARCache](https://openaccess.thecvf.com/content/CVPR2026/html/Nan_Accelerating_Autoregressive_Video_Diffusion_via_History-Guided_Cache_and_Residual_Correction_CVPR_2026_paper.html) | Cache | Video/World | Cache designed for autoregressive video diffusion |
| 2026 | 🆕⭐ [WorldCache](https://arxiv.org/abs/2603.06331) | Cache | World Model | Heterogeneous token caching for long-horizon world generation |
| 2026 | 🆕 [Trainable Log-linear Sparse Attention](https://openaccess.thecvf.com/content/CVPR2026/html/Zhou_Trainable_Log-linear_Sparse_Attention_for_Efficient_Diffusion_Transformers_CVPR_2026_paper.html) | Sparse Attention | Image | Hierarchical log-linear sparse attention |
| 2026 | 🆕 [Attention Surgery](https://openaccess.thecvf.com/content/CVPR2026/html/Ghafoorian_Attention_Surgery_An_Efficient_Recipe_to_Linearize_Your_Video_Diffusion_CVPR_2026_paper.html) | Efficient Attention | Video | Converts pretrained video DiTs toward linear/hybrid attention |
| 2026 | 🆕 [DVD-Quant](https://proceedings.iclr.cc/paper_files/paper/2026/hash/3bd28dd5cc4e15f9e019da13cc0c4844-Abstract-Conference.html) | Quantization | Video | Data-free W4A4 PTQ for video DiTs |
| 2026 | 🆕⭐ [QuantSparse](https://proceedings.iclr.cc/paper_files/paper/2026/hash/94359ca6e248af69b8b6854668ae9782-Abstract-Conference.html) | Hybrid | Video | Quantization + attention sparsification |
| 2026 | 🆕⭐ [Q&C](https://proceedings.iclr.cc/paper_files/paper/2026/hash/999fcab97007ebef0cda9949550b4a9e-Abstract-Conference.html) | Hybrid | General | Joint quantization + cache and error compensation |
| 2026 | 🆕 [SparseD](https://proceedings.iclr.cc/paper_files/paper/2026/hash/a1598ba0aa7bd7bdf18e0ad04d993edc-Abstract-Conference.html) | Sparse Attention | dLLM | Reuses head-specific sparse patterns across denoising steps |
| 2026 | 🆕 [LightX2V](https://github.com/ModelTC/LightX2V) | Framework/Hybrid | Image/Video/World | Distillation + quantization + sparse attention + cache + offload |

Full working list: [PAPERS.md](PAPERS.md). Prioritized close-reading list: [READING_QUEUE.md](READING_QUEUE.md).

---

## Emerging trends

1. **Reuse → prediction.** Cache is moving from zero-order reuse toward Taylor/delta forecasting, subspace-aware prediction, learned predictors, and globally optimized cache paths.
2. **Single trick → compound acceleration.** CacheQuant, Q&C, QuantSparse, FastVideo and LightX2V show that aggressive speedups increasingly require co-design.
3. **Video changes the bottleneck.** Once NFE is reduced, long spatiotemporal attention dominates; sparse/linear attention, token reduction and parallel attention become first-class methods.
4. **World models add long-horizon state.** History-aware cache and memory management become necessary; image-style cache schedules are insufficient.
5. **dLLMs create a parallel efficiency problem.** Bidirectional full-sequence denoising prevents directly applying standard AR KV caching, motivating approximate KV reuse, sparse attention and adaptive token updating.

---

## Repository structure

- [`TAXONOMY.md`](TAXONOMY.md) — detailed taxonomy and inclusion rules.
- [`SURVEYS.md`](SURVEYS.md) — comparison with existing surveys and the intended gap.
- [`PAPERS.md`](PAPERS.md) — curated literature master list.
- [`READING_QUEUE.md`](READING_QUEUE.md) — prioritized papers for later close reading.
- [`data/categories.json`](data/categories.json) — machine-readable taxonomy.
- [`data/papers.json`](data/papers.json) — structured seed paper records for future website/timeline generation.

### Status legend

- **Foundation** — historically important starting point.
- **Representative** — useful exemplar for a method family.
- **Frontier** — recent 2025–2026 work that changes the efficiency frontier or taxonomy.
- **Hybrid** — explicitly combines multiple acceleration mechanisms.

This list prioritizes **verified, technically relevant papers** over raw volume. New entries should identify the bottleneck, acceleration mechanism, application domain, training requirement, actual efficiency target, and official paper/code source when available.
