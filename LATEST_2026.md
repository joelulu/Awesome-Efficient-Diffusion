# 2026 Frontier Tracker

This file tracks recent work that is especially useful for extending older Efficient Diffusion surveys. It is intentionally more dynamic than the main taxonomy.

## Compound / framework-level acceleration

### TurboDiffusion — Accelerating Video Diffusion Models by 100–200×
- Paper: https://arxiv.org/abs/2512.16093
- Code: https://github.com/thu-ml/TurboDiffusion
- Primary tags: `distillation`, `efficient-attention`, `quantization`, `systems`, `hybrid`
- Key idea: combines low-bit SageAttention, trainable Sparse-Linear Attention (SLA), rCM step distillation, W8A8 quantization and engineering optimizations.
- Why important: a strong example of the field moving from isolated acceleration tricks to **compound acceleration stacks**.

### LightX2V
- Code: https://github.com/ModelTC/LightX2V
- Primary tags: `framework`, `video`, `world-model`, `quantization`, `sparse-attention`, `cache`, `offload`, `parallelism`
- Why important: deployment-oriented integration layer for many modern video/world-model acceleration methods.

---

## Autoregressive video / world-model acceleration

### FAST-AR — Fast Autoregressive Video Diffusion and World Models with Temporal Cache Compression and Sparse Attention
- Paper: https://arxiv.org/abs/2602.01801
- Venue: ICML 2026
- Primary tags: `world-model`, `autoregressive-video`, `KV-cache`, `sparse-attention`, `training-free`, `hybrid`
- Components:
  - **TempCache** compresses temporally redundant KV cache;
  - **AnnSA** sparsifies self-attention;
  - **AnnCA** selects relevant prompt tokens for cross-attention.
- Why important: directly addresses the new long-horizon bottleneck where KV memory and attention cost grow during rollout.

### Light Forcing — Accelerating Autoregressive Video Diffusion via Sparse Attention
- Paper: https://arxiv.org/abs/2602.04789
- Code: https://github.com/chengtao-lv/LightForcing
- Venue: ICML 2026
- Primary tags: `autoregressive-video`, `sparse-attention`, `long-video`
- Why important: adapts sparse attention specifically to causal/autoregressive video generation rather than bidirectional video DiTs.

### ARCache — Accelerating Autoregressive Video Diffusion via History-Guided Cache and Residual Correction
- Venue: CVPR 2026
- Primary tags: `cache`, `autoregressive-video`, `history-reuse`, `residual-correction`
- Why important: another sign that autoregressive video/world-model cache is becoming a separate subfield from one-shot T2V caching.

---

## World-model cache

### WorldCache-A — Heterogeneous Token Caching
- Paper: https://arxiv.org/abs/2603.06331
- Code: https://github.com/FofGofx/WorldCache
- Venue: ICML 2026
- Full title: **WorldCache: Accelerating World Models for Free via Heterogeneous Token Caching**
- Primary tags: `world-model`, `token-cache`, `training-free`
- Key issue: world-model tokens have heterogeneous dynamics; uniform caching is poorly matched to hard/chaotic tokens.

### WorldCache-B — Content-Aware Caching
- Code: https://github.com/umair1221/WorldCache
- Venue: ECCV 2026
- Full title: **WorldCache: Content-Aware Caching for Accelerated Video World Models**
- Primary tags: `world-model`, `content-aware-cache`, `training-free`
- Important note: **this is a different paper from WorldCache-A despite sharing the same method name.** Keep full titles/authors distinct in the final survey.

### WorldDynCache
- arXiv: 2608.01845
- Primary tags: `world-model`, `cache`, `latent-dynamics`, `risk-control`
- Why important: recent August 2026 work that frames cache approximation around latent world dynamics and risk/error control.

---

## Sparse / selective video computation

### LoSA — Near-Lossless Sparse Attention for Training-Free Video Diffusion Acceleration
- Paper: https://arxiv.org/abs/2608.12032
- Date: 2026-08
- Primary tags: `video`, `sparse-attention`, `training-free`
- Key idea: retain a fixed fraction of attention mass rather than imposing a fixed sparsity ratio; estimate exact block support at an early dense step and reuse the support across later denoising steps.
- Why important: represents a **quality-constrained / near-lossless** sparse-attention regime rather than maximum sparsity.

### ASTRAEA — GPU-Oriented Token-wise Acceleration Framework for Video Diffusion Transformers
- Project: https://astraea-project.github.io/ASTRAEA/
- Venue: ICLR 2026
- Primary tags: `video`, `token-selection`, `sparse-attention`, `search`, `systems`
- Key idea: lightweight token selection + GPU-parallel sparse attention + evolutionary search for timestep-dependent token budgets.
- Why important: explicitly connects algorithmic token sparsity to GPU execution and multi-GPU scalability.

### Trainable Log-linear Sparse Attention for Efficient Diffusion Transformers
- Venue: CVPR 2026
- Primary tags: `sparse-attention`, `training-based`, `image/DiT`
- Why important: structured trainable sparsity rather than purely plug-and-play masking.

### Attention Surgery
- Venue: CVPR 2026
- Primary tags: `video`, `linear-attention`, `hybrid-attention`
- Why important: explores converting pretrained video diffusion attention toward linear/hybrid efficient forms.

---

## Compression + sparse/cache combinations

### QuantSparse
- Paper: https://arxiv.org/abs/2509.23681
- Venue: ICLR 2026
- Primary tags: `video`, `quantization`, `sparse-attention`, `hybrid`
- Key idea: multi-scale salient attention distillation + second-order sparse attention reparameterization to make low precision and sparsity compatible.
- Why important: strong evidence that approximation errors from different accelerators interact and therefore require joint design.

### DVD-Quant
- Venue: ICLR 2026
- Primary tags: `video`, `data-free`, `W4A4`, `PTQ`
- Why important: aggressive data-free video-DiT quantization.

### Q&C
- Venue: ICLR 2026
- Primary tags: `quantization`, `cache`, `hybrid`
- Why important: joint optimization of quantization and caching/error compensation.

---

## dLLM efficiency

### FlashDLM — Accelerating Diffusion Language Model Inference via Efficient KV Caching and Guided Diffusion
- Venue: ICLR 2026
- Primary tags: `dLLM`, `KV-cache`, `step-reduction`, `hybrid`
- Key issue: diffusion language models repeatedly execute full-sequence bidirectional forward passes, so ordinary autoregressive KV caching is not directly applicable.
- Why important: combines caching with guided reduction of denoising work rather than treating them separately.

### SparseD
- Venue: ICLR 2026
- Primary tags: `dLLM`, `sparse-attention`, `cross-step-pattern-reuse`
- Why important: transfers the cross-denoising-step stability observation from visual diffusion to language diffusion attention.

---

# What these 2026 papers change in the survey

1. **World models deserve their own application section.** Their main bottleneck is not simply video attention; KV/history growth and long-horizon error accumulation matter.
2. **Autoregressive video diffusion deserves explicit treatment.** Cache/sparse strategies differ from bidirectional T2V DiTs.
3. **Sparse computation is becoming systems-aware.** LoSA and ASTRAEA optimize fidelity constraints and GPU execution rather than FLOP counts alone.
4. **Compound acceleration is now a dominant frontier.** TurboDiffusion, QuantSparse, Q&C, FAST-AR and LightX2V combine multiple approximation dimensions.
5. **dLLM efficiency is structurally different but conceptually connected.** The same themes — cross-step stability, selective recomputation, cache and sparsity — reappear under bidirectional token diffusion.
