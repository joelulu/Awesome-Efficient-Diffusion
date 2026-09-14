# 2026 最新 Efficient Diffusion 工作追踪

> 更新时间：2026-09-14。这里只放真正值得后续精读、会改变 taxonomy 或效率边界的近期工作。

## 蒸馏 / 少步生成

### LogCD — CVPR 2026
Local-to-global Consistency Distillation。先做局部一致性，再做全局一致性，针对 2–4 步高质量图像生成。

### Phased DMD — CVPR 2026
把 SNR 区间拆成多个 phase，在区间内做 score matching / progressive distribution matching，并验证在 **Qwen-Image-20B、Wan2.2-28B** 等大型图像/视频模型上。

## Cache / Feature Prediction

### SVD-Cache — CVPR 2026
把 feature dynamics 分解为 principal / residual subspace：主子空间预测、残差子空间复用，是 predictive cache 的重要新方向。

### DPCache — CVPR 2026
把 denoising/cache schedule 视为全局 path planning，用动态规划而不是逐步阈值决定哪些 timestep 重算。

### TC-Padé — CVPR 2026
针对 Taylor-style extrapolation 在低步数下的轨迹漂移，用 Padé rational approximation 预测 feature trajectory。

### ResCa — CVPR 2026
按 trajectory 对 token 聚类，只真实计算 proxy token，再用多阶 residual 模拟其他 token 的去噪更新。

### D²Cache — CVPR 2026
用 second-order delta 做视频 feature prediction，针对高 cache ratio 下的一阶预测误差。

### ARCache — CVPR 2026
面向 autoregressive video diffusion 的 history-guided cache + residual correction，开始进入 world-model/streaming generation 场景。

### WorldCache
2026 年出现至少两条同名但不同的路线：
- **Heterogeneous Token Caching**：不同 token 使用不同 cache/update 策略；
- **Content-Aware Caching**：面向 video world model，根据内容变化决定重算区域。

后续引用时需要特别区分。

## Sparse Attention / Token Reduction

### Trainable Log-linear Sparse Attention — CVPR 2026
不再只做 training-free sparse pattern，而是把近 log-linear 的稀疏连接直接训练进 Diffusion Transformer。

### Attention Surgery — CVPR 2026
对预训练 Video DiT 做 attention surgery，把 dense attention 向 linear / hybrid attention 转换。

### Light Forcing — ICML 2026
针对 **autoregressive video diffusion** 的 sparse attention。核心包括 Chunk-Aware Growth 和 Hierarchical Sparse Attention。

### LoSA-Video — 2026-08
Near-Lossless Sparse Attention。不固定稀疏率，而是固定保留约 99% attention mass，在质量约束下最大化可删除计算。

### SparseD — ICLR 2026
面向 dLLM，利用不同 denoising step 间 head-specific sparse pattern 的稳定性。

## Quantization / Hybrid

### DVD-Quant — ICLR 2026
Video DiT 的 data-free W4A4 PTQ。

### QuantSparse — ICLR 2026
Quantization + Sparse Attention，说明低精度和 attention sparsity 正在联合优化。

### Q&C — ICLR 2026
Quantization + Cache，并显式处理两种 approximation error 的叠加问题。

## Video / World Model 系统

### FAST-AR — ICML 2026
**Temporal KV Cache Compression + Sparse Self-Attention + Sparse Cross-Attention**。重点解决 autoregressive video/world-model rollout 越长，KV、显存和 latency 持续增长的问题。

### LightX2V
面向 Image / Video / World Model 的综合推理框架，整合低精度、Cache、Sparse Attention、Offload、Sequence Parallel、Kernel 等能力。

## Diffusion Language Model

### FlashDLM — ICLR 2026
针对 dLLM 双向 full-sequence denoising，研究近似 KV reuse 和减少重复 denoising 工作量。

## 当前最值得关注的趋势

1. **Cache 从 reuse 转向 prediction / planning。**
2. **Video 在低 NFE 后进入 Attention-bound。**
3. **AR Video / World Model 出现新的 history / KV / rollout bottleneck。**
4. **Quantization、Sparse、Cache 越来越多地联合设计。**
5. **端到端系统开始组合 Distillation + Attention + Quantization + Parallelism。**

特别值得持续跟踪：**Phased DMD、SVD-Cache、TC-Padé、ARCache、Light Forcing、LoSA、FAST-AR、QuantSparse、FlashDLM、LightX2V**。
