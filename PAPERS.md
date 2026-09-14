# Efficient Diffusion 论文主清单

> 当前交互网站数据源 [`src/data.ts`](src/data.ts) 已收录 **65 个核心条目**。本页按研究主线给出阅读索引；后续逐篇精读时继续补充实验设置、加速比、硬件、代码状态和局限。

## 1. 快速采样与步数缩减

- **DDIM** — 非马尔可夫少步采样起点
- **PNDM** — 伪数值方法
- **DEIS** — Exponential Integrator
- **DPM-Solver / DPM-Solver++** — diffusion ODE 高阶求解器
- **UniPC** — Predictor-Corrector 统一框架
- **Align Your Steps** — 采样时间步调度优化

## 2. 蒸馏与少步生成

- **Progressive Distillation** — 逐轮减半 NFE
- **Consistency Models** — 一步/少步一致性生成范式
- **InstaFlow** — Rectified Flow 一步生成
- **LCM** — latent consistency distillation
- **DMD / DMD2** — distribution matching distillation
- **SDXL-Lightning** — progressive adversarial distillation
- **TCD** — trajectory consistency
- **SANA-Sprint** — 一步高分辨率生成
- **Flash-DMD** — 高效 DMD + 联合 RL
- **LogCD** — local-to-global consistency distillation，CVPR 2026
- **Phased DMD** — 面向 Qwen-Image / Wan2.2 的分阶段 DMD，CVPR 2026

## 3. Cache 与计算复用

- **DeepCache** — U-Net feature cache 基础工作
- **Δ-DiT** — DiT 训练免费 cache
- **Learning-to-Cache** — 学习 layer cache policy
- **FORA** — fast-forward attention / MLP cache
- **FasterCache** — video feature cache + CFG cache
- **TeaCache** — timestep-embedding-aware adaptive cache
- **TaylorSeer** — 高阶 feature dynamics prediction
- **CacheQuant** — cache + quantization
- **SVD-Cache** — principal subspace 预测 + residual reuse
- **DPCache** — 全局 cache schedule path planning
- **TC-Padé** — Padé trajectory prediction
- **ResCa** — proxy token + residual caching
- **D²Cache** — second-order delta cache for video
- **ARCache** — autoregressive video history-guided cache
- **WorldCache** — heterogeneous token cache for world models
- **WorldCache (Content-Aware)** — 面向 video world model 的内容感知缓存

## 4. 高效注意力与稀疏计算

- **ToMeSD** — token merging
- **AT-EDM** — attention-driven token pruning
- **DiTFastAttn** — DiT attention compression
- **Sparse VideoGen** — spatial-temporal sparse attention
- **SiTo** — training-free token pruning
- **ToMA** — hardware-aware token merging
- **ASTRAEA** — GPU-oriented token-wise acceleration + search
- **Trainable Log-linear Sparse Attention** — CVPR 2026
- **Attention Surgery** — linearize video diffusion attention，CVPR 2026
- **Light Forcing** — autoregressive video sparse attention，ICML 2026
- **LoSA-Video** — near-lossless training-free sparse attention，2026-08
- **SparseD** — dLLM sparse attention，ICLR 2026

## 5. 模型压缩与低精度

- **Q-Diffusion** — diffusion PTQ 基础工作
- **Diff-Pruning** — structural pruning
- **LD-Pruner** — latent diffusion pruning
- **Q-DiT** — DiT PTQ
- **DiTAS** — activation smoothing / data-free PTQ
- **DVD-Quant** — Video DiT W4A4，ICLR 2026
- **QuantSparse** — quantization + sparse attention，ICLR 2026
- **Q&C** — quantization + caching，ICLR 2026

## 6. 系统优化、并行与复合加速

- **ParaDiGMS** — parallel denoising
- **StreamDiffusion** — 实时交互生成 pipeline
- **DistriFusion** — high-resolution patch parallel
- **xDiT** — DiT 大规模并行推理引擎
- **FastVideo** — 视频扩散统一加速框架
- **TurboDiffusion** — distillation + sparse/low-bit attention + W8A8 + system co-design
- **FAST-AR** — temporal KV compression + sparse self/cross attention for AR video/world models
- **FlashDLM** — diffusion LM inference acceleration
- **LightX2V** — image / video / world model 综合推理框架

## 后续逐篇补充字段

每篇论文后续统一记录：

`Problem → Observation → Method → Training Requirement → Backbone → NFE → FLOPs → Latency → Throughput → Memory → Hardware → Code → Limitation → Related Work`

完整链接与分类请直接查看交互网站或 [`src/data.ts`](src/data.ts)。
