# Awesome Efficient Diffusion

面向 **扩散模型 / Flow 模型高效生成与推理加速** 的中文研究地图与论文库。

🌐 **交互网站：** https://joelulu.github.io/Awesome-Efficient-Diffusion/

> 当前重点：**图像生成、视频生成、世界模型、扩散语言模型（dLLM）**。  
> 文献整理更新至：**2026-09-14**。  
> 第一版优先收录 **代表性工作 + 2025–2026 最新前沿工作**，后续持续逐篇精读、补充代码与实验数据。

## 为什么做这个仓库

现有综述各有侧重：

- **纯 Cache：** [A Survey on Cache Methods in Diffusion Models: Toward Efficient Multi-Modal Generation](https://arxiv.org/abs/2510.19755)
- **广义 Efficient Diffusion：** [Efficient Diffusion Models: A Comprehensive Survey from Principles to Practices](https://arxiv.org/abs/2410.11795)
- **视频加速：** [Efficient Video Diffusion Models: Advancements and Challenges](https://arxiv.org/abs/2604.15911)

本仓库不按“训练 / 免训练”做一级划分，而是围绕 **生成成本到底被减少在哪里** 建立统一 taxonomy：

```text
生成成本 ≈ 去噪步数 NFE × 单步计算成本 + 系统运行开销
```

因此主要分为六条路线：

1. **快速采样与步数缩减**：Solver、timestep schedule、trajectory optimization
2. **蒸馏与少步生成**：Progressive / Consistency / Distribution Matching / Adversarial Distillation
3. **缓存与计算复用**：Feature / Block / Token / Predictive / Trajectory Cache
4. **高效注意力与稀疏计算**：Token pruning / merging、Sparse / Linear Attention、Selective Computation
5. **模型压缩与低精度**：Quantization、Pruning、Low-rank、Structured Compression
6. **系统优化与并行**：Sequence / Patch / CFG / Pipeline Parallel、Kernel、Offload、Serving

**Hybrid / Compound Acceleration（复合加速）** 作为横向标签，而不是第七类。2025–2026 年的重要趋势是把蒸馏、Cache、Sparse Attention、量化和系统优化组合起来。

## 两个观察维度

### 方法维度：怎么加速？

`Sampling → Distillation → Cache → Sparse Compute → Compression → Systems`

### 应用维度：瓶颈出现在哪里？

`Image → Video → Autoregressive Video / World Model → Diffusion Language Model`

随着应用从图像走向视频和长时世界模型，主要瓶颈也从 **去噪步数** 逐渐转向 **长时空 Attention、历史 KV / Cache、内存和系统吞吐**。

## 交互网站

网站仿照 [Awesome Parallel Speculative Decoding Atlas](https://joelulu.github.io/Awesome-Parallel-Speculative-Decoding/) 的阅读方式，并针对 Efficient Diffusion 改成更适合多主线研究的布局：

- **六条方法泳道 × 时间轴**：查看各路线的演化
- **代表工作 / 最新工作切换**
- **图像 / 视频 / 世界模型 / dLLM 应用筛选**
- **方法类别筛选与关键词搜索**
- **地图节点 → 论文卡片定位**
- **最新研究前沿区**

## 当前重点工作

### 快速采样

DDIM · PNDM · DPM-Solver · DPM-Solver++ · UniPC · Align Your Steps

### 少步蒸馏

Progressive Distillation · Consistency Models · LCM · DMD · SDXL-Lightning · DMD2 · SANA-Sprint · Flash-DMD · LogCD · Phased DMD

### Cache / 计算复用

DeepCache · Δ-DiT · Learning-to-Cache · FORA · FasterCache · TeaCache · TaylorSeer · CacheQuant · SVD-Cache · DPCache · TC-Padé · ResCa · D²Cache · ARCache · WorldCache

### 稀疏与注意力加速

ToMeSD · AT-EDM · DiTFastAttn · Sparse VideoGen · SiTo · ToMA · ASTRAEA · Trainable Log-linear Sparse Attention · Attention Surgery · Light Forcing · LoSA · SparseD

### 压缩与低精度

Q-Diffusion · Diff-Pruning · LD-Pruner · Q-DiT · DiTAS · DVD-Quant · QuantSparse · Q&C

### 系统与复合加速

ParaDiGMS · StreamDiffusion · DistriFusion · xDiT · FastVideo · TurboDiffusion · FAST-AR · FlashDLM · LightX2V

## 最新趋势

1. **Cache：Reuse → Prediction**  
   从直接复用旧 feature，走向 Taylor / Padé / delta / subspace-aware feature prediction。

2. **单点优化 → 复合加速**  
   CacheQuant、QuantSparse、Q&C、TurboDiffusion、FastVideo、LightX2V 都体现了联合优化趋势。

3. **Video 把 Attention 推到核心瓶颈**  
   当 NFE 已降到 1–8 步以后，长时空 token 的 Attention 成本越来越突出。

4. **World Model 引入长时历史状态问题**  
   ARCache、FAST-AR、WorldCache 等开始处理 rollout 中持续增长的历史上下文、KV 和内容变化。

5. **dLLM 出现新的扩散推理加速问题**  
   双向全序列 denoising 不能直接复用 AR LLM 的标准 KV Cache，因此出现 FlashDLM、SparseD 等新路线。

## 仓库文件

- [`TAXONOMY.md`](TAXONOMY.md)：分类体系与边界
- [`SURVEYS.md`](SURVEYS.md)：相关综述对比与我们的定位
- [`PAPERS.md`](PAPERS.md)：论文主清单
- [`READING_QUEUE.md`](READING_QUEUE.md)：后续逐篇精读顺序
- [`LATEST_2026.md`](LATEST_2026.md)：2026 最新工作追踪
- [`src/data.ts`](src/data.ts)：交互网站统一数据源

## 收录标准

优先收录满足至少一项的工作：

- 奠定一条加速路线的基础工作；
- 成为某类方法的典型代表；
- 明显改变 speed–quality frontier；
- 提出新的效率瓶颈或新的应用场景；
- 2025–2026 年具有较强后续研究价值的最新工作；
- 把多个加速维度真正组合起来并报告端到端收益。

我们更关注 **真实 latency / throughput / memory / NFE**，而不只关注理论 FLOPs。

---

如果发现遗漏的重要论文，欢迎提交 Issue / PR。这个仓库将作为后续 **Efficient Diffusion Models 综述** 的持续文献库与研究地图。
