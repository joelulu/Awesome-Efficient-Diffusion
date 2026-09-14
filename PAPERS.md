# Efficient Diffusion — Curated Literature Master List

This is the working paper pool for the survey. The goal is **representative coverage + recent frontier work**, not indiscriminate paper accumulation.

Labels:
- **Foundation**: historically important starting point.
- **Representative**: strong exemplar of a method family.
- **Frontier**: recent work that extends the taxonomy or efficiency frontier.
- **Hybrid**: combines multiple acceleration mechanisms.

---

# 1. Fast Sampling & Step Reduction

| Year | Paper | Status | Notes |
|---|---|---|---|
| 2020 | [Denoising Diffusion Implicit Models (DDIM)](https://arxiv.org/abs/2010.02502) | Foundation | Non-Markovian deterministic sampling; canonical fast-sampling baseline. |
| 2022 | [DPM-Solver](https://arxiv.org/abs/2206.00927) | Foundation | Dedicated high-order solver for diffusion ODEs. |
| 2022 | [DPM-Solver++](https://arxiv.org/abs/2211.01095) | Representative | Improves guided sampling stability and low-step performance. |
| 2023 | [UniPC](https://arxiv.org/abs/2302.04867) | Representative | Unified predictor-corrector framework for fast sampling. |
| 2023 | [DEIS](https://arxiv.org/abs/2204.13902) | Representative | Exponential-integrator perspective on diffusion sampling. |
| 2024 | [Align Your Steps](https://arxiv.org/abs/2404.14507) | Representative | Optimizes timestep schedules without retraining the generator. |

**Reading goal:** understand the progression from fewer discrete denoising steps to continuous-time solver/schedule design, and distinguish solver acceleration from learned few-step generation.

---

# 2. Distillation & Few-Step Generation

| Year | Paper | Status | Notes |
|---|---|---|---|
| 2022 | [Progressive Distillation for Fast Sampling of Diffusion Models](https://arxiv.org/abs/2202.00512) | Foundation | Iteratively halves sampling steps. |
| 2023 | [Consistency Models](https://arxiv.org/abs/2303.01469) | Foundation | One/few-step consistency mapping paradigm. |
| 2023 | [Latent Consistency Models](https://arxiv.org/abs/2310.04378) | Foundation | Brings consistency distillation to latent text-to-image generation. |
| 2023/24 | [One-step Diffusion with Distribution Matching Distillation (DMD)](https://arxiv.org/abs/2311.18828) | Foundation | Distribution-level matching for one-step generation. |
| 2024 | [Improved Distribution Matching Distillation (DMD2)](https://arxiv.org/abs/2405.14867) | Representative | Strengthens DMD; important base for later image/video distillation systems. |
| 2024 | [SDXL-Lightning](https://arxiv.org/abs/2402.13929) | Representative | Progressive adversarial diffusion distillation; practical 1–4 step SDXL. |
| 2024 | [Hyper-SD](https://arxiv.org/abs/2404.13686) | Representative | Trajectory-segmented consistency model for multi-step flexibility. |
| 2025 | [SANA-Sprint](https://openaccess.thecvf.com/content/ICCV2025/html/Chen_SANA-Sprint_One-Step_Diffusion_with_Continuous-Time_Consistency_Distillation_ICCV_2025_paper.html) | Frontier | Continuous-time consistency + adversarial distillation for 1–4 step generation. |
| 2026 | LogCD — Local-to-global Consistency Distillation for Few-step Image Generation | Frontier | Recent consistency-distillation refinement; close-read before final survey citation. |
| 2026 | Phased Distribution Matching Distillation | Frontier | Extends distribution matching to phased/few-step settings and image/video generators. |
| 2026 | Flash-DMD | Frontier | Recent distribution-matching acceleration direction; verify final venue/code during close reading. |

**Reading goal:** build a clear conceptual chain: progressive distillation → consistency → latent consistency → distribution matching → adversarial/hybrid/few-step distillation.

---

# 3. Cache & Computation Reuse

## 3.1 Foundational / representative cache

| Year | Paper | Status | Notes |
|---|---|---|---|
| 2023/24 | [DeepCache](https://arxiv.org/abs/2312.00858) | Foundation | Training-free reuse of high-level U-Net features. |
| 2024 | [Δ-DiT / Delta-DiT](https://arxiv.org/abs/2406.01125) | Representative | Exploits residual similarity across diffusion timesteps for DiTs. |
| 2024 | [Learning-to-Cache](https://arxiv.org/abs/2406.01733) | Representative | Learns layer-level caching schedules for diffusion transformers. |
| 2024 | [FORA](https://arxiv.org/abs/2407.01425) | Representative | Fast-forward attention/MLP cache for DiTs. |
| 2024/25 | [TeaCache](https://arxiv.org/abs/2411.19108) | Representative | Timestep-embedding-aware adaptive feature caching; influential video baseline. |
| 2024/25 | AdaCache | Representative | Adaptive cache scheduling for diffusion transformers; verify exact final metadata during close reading. |
| 2025 | [TaylorSeer](https://arxiv.org/abs/2503.06923) | Frontier | Uses Taylor-style feature prediction rather than simple reuse. |
| 2025 | MagCache | Representative | Magnitude-aware cache for video diffusion; useful video-specific cache line. |
| 2025 | LeMiCa | Frontier | Learning-free multi-step cache scheduling; useful for global schedule viewpoint. |

## 3.2 Hybrid / fine-grained cache

| Year | Paper | Status | Notes |
|---|---|---|---|
| 2025 | [CacheQuant](https://openaccess.thecvf.com/content/CVPR2025/html/Liu_CacheQuant_Comprehensively_Accelerated_Diffusion_Models_CVPR_2025_paper.html) | Hybrid | Joint feature caching + quantization. |
| 2025 | Profiling-Based Feature Reuse for Video Diffusion Models | Frontier | Region/content-aware feature reuse; foreground/background distinction. |

## 3.3 2026 cache frontier

| Year | Paper | Status | Notes |
|---|---|---|---|
| 2026 | [SVD-Cache](https://openaccess.thecvf.com/content/CVPR2026/html/Chen_Forecast_the_Principal_Stabilize_the_Residual_Subspace-Aware_Feature_Caching_for_CVPR_2026_paper.html) | Frontier | Forecast principal subspace and stabilize/reuse residual subspace. |
| 2026 | [DPCache](https://openaccess.thecvf.com/content/CVPR2026/html/Cui_Denoising_as_Path_Planning_Training-Free_Acceleration_of_Diffusion_Models_with_CVPR_2026_paper.html) | Frontier | Treats cache schedule selection as global path planning. |
| 2026 | [D2Cache](https://openaccess.thecvf.com/content/CVPR2026/html/Liu_D2Cache_Second-Order_Delta_Caching_for_Higher_Video_Diffusion_Acceleration_CVPR_2026_paper.html) | Frontier | Second-order delta prediction for aggressive video caching. |
| 2026 | [ARCache](https://openaccess.thecvf.com/content/CVPR2026/html/Nan_Accelerating_Autoregressive_Video_Diffusion_via_History-Guided_Cache_and_Residual_Correction_CVPR_2026_paper.html) | Frontier | History-guided cache + residual correction for autoregressive video diffusion. |
| 2026 | [WorldCache](https://arxiv.org/abs/2603.06331) | Frontier | Heterogeneous token caching for world models. |
| 2026 | ResCa | Frontier | Residual-correction-oriented cache; close-read for exact positioning. |
| 2026 | TC-Padé | Frontier | Trajectory/predictive cache direction; close-read before final taxonomy placement. |

**Reading goal:** trace the shift `reuse → adaptive scheduling → fine-grained reuse → prediction → trajectory/subspace/history-aware cache`.

---

# 4. Efficient Attention & Sparse Computation

## 4.1 Token reduction

| Year | Paper | Status | Notes |
|---|---|---|---|
| 2023 | [Token Merging for Fast Stable Diffusion](https://arxiv.org/abs/2303.17604) | Foundation | Training-free token merging for Stable Diffusion. |
| 2024/25 | [SiTo: Training-Free Diffusion Model Acceleration with Simple Token Pruning](https://ojs.aaai.org/index.php/AAAI/article/view/33071) | Representative | Simple training/calibration-free token pruning; hardware-conscious baseline. |
| 2025 | ToMA | Representative | Hardware-friendly token merging/unmerging; emphasizes real latency rather than FLOPs only. |

## 4.2 Attention acceleration

| Year | Paper | Status | Notes |
|---|---|---|---|
| 2024 | [DiTFastAttn](https://arxiv.org/abs/2406.08552) | Representative | Exploits spatial/temporal/CFG attention redundancy in DiTs. |
| 2025 | Sparse VideoGen | Representative | Dynamic spatial/temporal sparse attention for video diffusion. |
| 2025/26 | Sparse-vDiT | Frontier | Head/pattern-aware sparse attention for video DiTs. |
| 2026 | [Trainable Log-linear Sparse Attention for Efficient Diffusion Transformers](https://openaccess.thecvf.com/content/CVPR2026/html/Zhou_Trainable_Log-linear_Sparse_Attention_for_Efficient_Diffusion_Transformers_CVPR_2026_paper.html) | Frontier | Trainable hierarchical sparse attention. |
| 2026 | SLA — Sparse Linear Attention | Frontier | Sparse + linear attention with efficient implementation for video diffusion. |
| 2026 | [Attention Surgery](https://openaccess.thecvf.com/content/CVPR2026/html/Ghafoorian_Attention_Surgery_An_Efficient_Recipe_to_Linearize_Your_Video_Diffusion_CVPR_2026_paper.html) | Frontier | Converts pretrained video diffusion attention to efficient linear/hybrid forms. |
| 2026 | SparseD | Frontier | Step-stable head-specific sparse patterns for diffusion language models. |

## 4.3 Block/layer conditional computation

| Year | Paper | Status | Notes |
|---|---|---|---|
| 2024 | MD-DiT / Mixture-of-Depths-style efficient DiT | Representative | Step-aware conditional depth / selective block computation. |
| 2025/26 | Chipmunk | Hybrid | Combines sparse attention/MLP computation with cross-step reuse. |

**Reading goal:** separate *cross-step reuse* from *within-step sparsity*, then study their convergence in hybrid methods.

---

# 5. Model Compression

## 5.1 Quantization

| Year | Paper | Status | Notes |
|---|---|---|---|
| 2023 | [Q-Diffusion](https://arxiv.org/abs/2302.04304) | Foundation | PTQ framework designed around diffusion timestep characteristics. |
| 2023 | PTQD | Representative | Post-training quantization tailored to denoising error behavior. |
| 2024 | BitsFusion | Representative | Low-bit quantization for diffusion models. |
| 2025 | ViDiT-Q | Representative | Quantization for diffusion transformers. |
| 2025 | Q-VDiT | Representative | Low-precision quantization for video diffusion transformers. |
| 2025 | [CacheQuant](https://openaccess.thecvf.com/content/CVPR2025/html/Liu_CacheQuant_Comprehensively_Accelerated_Diffusion_Models_CVPR_2025_paper.html) | Hybrid | Joint cache/quantization. |
| 2026 | DVD-Quant | Frontier | Data-free W4A4 PTQ for video DiTs. |
| 2026 | QuantSparse | Hybrid | Quantization + attention sparsification for video generation. |
| 2026 | Q&C | Hybrid | Joint quantization and caching with error compensation. |

## 5.2 Pruning / structural compression

| Year | Paper | Status | Notes |
|---|---|---|---|
| 2023 | [Diff-Pruning](https://arxiv.org/abs/2305.10924) | Foundation | Structural pruning designed for diffusion networks. |
| 2024 | [LD-Pruner](https://arxiv.org/abs/2404.11936) | Representative | Layer pruning for latent diffusion models. |
| 2024/25 | LAPTOP-Diff | Representative | Layer/architecture pruning direction; verify final metadata during close read. |

**Reading goal:** compare theoretical model compression to **real end-to-end speed**, especially when attention kernels or memory bandwidth dominate.

---

# 6. Systems & Parallelism

| Year | Paper / System | Status | Notes |
|---|---|---|---|
| 2023/24 | [StreamDiffusion](https://arxiv.org/abs/2312.12491) | Foundation | Streaming pipeline, residual CFG and IO optimizations for real-time generation. |
| 2024 | [DistriFusion](https://arxiv.org/abs/2402.19481) | Foundation | Distributed patch parallelism using cross-step feature similarity. |
| 2024/25 | [xDiT](https://arxiv.org/abs/2411.01738) | Representative | Unified parallel inference engine: sequence parallelism, PipeFusion, CFG parallelism. |
| 2025 | [FastVideo](https://github.com/hao-ai-lab/FastVideo) | Hybrid Framework | Video generation framework integrating distillation, sparse attention and inference optimization. |
| 2025/26 | SageAttention / SageAttention2/3 | Representative | Low-precision attention kernels heavily used in image/video generation systems. |
| 2025 | SpargeAttn | Representative | Sparse attention acceleration with system-aware kernels. |
| 2026 | [LightX2V](https://github.com/ModelTC/LightX2V) | Hybrid Framework | Distillation, quantization, cache, sparse attention, offload and parallel inference. |

**Reading goal:** distinguish papers that reduce FLOPs from systems that turn those reductions into actual GPU latency/throughput gains.

---

# 7. Application-specific frontier

## 7.1 Video diffusion

Priority themes:
- few-step video distillation;
- spatiotemporal sparse attention;
- feature/trajectory cache;
- video-specific quantization;
- sequence/context parallelism;
- compound acceleration.

Primary reference survey: [Efficient Video Diffusion Models: Advancements and Challenges](https://arxiv.org/abs/2604.15911).

## 7.2 World / action models

Priority papers/themes:
- WorldCache;
- ARCache;
- temporal cache compression;
- sparse attention over rollout history;
- action-conditioned autoregressive video diffusion;
- memory/error accumulation under long-horizon generation.

## 7.3 Diffusion language models

Priority themes:
- step reduction / confidence-based remasking;
- approximate/stable-token KV caching;
- token-selective recomputation;
- sparse attention across denoising steps;
- parallel decoding systems.

Representative recent directions:
- dLLM-Cache;
- d2Cache;
- FlashDLM / FreeCache;
- Sparse-dLLM;
- SparseD;
- Fast-dLLM-style adaptive parallel decoding.

These are tracked separately because bidirectional denoising makes standard autoregressive KV caching invalid or approximate rather than exact.

---

# 8. Survey references

1. [A Survey on Cache Methods in Diffusion Models: Toward Efficient Multi-Modal Generation](https://arxiv.org/abs/2510.19755)
2. [Efficient Diffusion Models: A Comprehensive Survey from Principles to Practices](https://arxiv.org/abs/2410.11795)
3. [Efficient Diffusion Models: A Survey](https://arxiv.org/abs/2502.06805)
4. [Efficient Video Diffusion Models: Advancements and Challenges](https://arxiv.org/abs/2604.15911)

---

# 9. Next expansion targets

The next sweep should systematically validate and add:

- 2025–2026 image/video distillation papers;
- 2026 predictive/cache scheduling papers;
- sparse/linear attention and token-reduction work;
- quantization + pruning papers for DiTs/video DiTs;
- dLLM inference acceleration;
- world-model acceleration;
- systems/framework papers with real wall-clock measurements.

For every added paper, record **problem → idea → training requirement → backbone/application → NFE/FLOPs/latency target → paper/code**.
