# Efficient Diffusion 分类体系

## 总体原则

本仓库围绕生成阶段的实际成本组织方法：

```text
生成成本 ≈ 去噪步数 NFE × 单步计算成本 + 系统运行开销
```

“训练 / 免训练 / 后训练”不是一级分类，而是每篇方法的属性。

## 1. 快速采样与步数缩减

目标：直接减少 NFE，但不重新训练一个全新的少步 student。

包括：
- ODE / SDE Solver
- Predictor–Corrector
- Timestep Schedule Optimization
- Trajectory Optimization
- Sampling Step Skipping

代表：DDIM、PNDM、DPM-Solver、DPM-Solver++、UniPC、Align Your Steps。

## 2. 蒸馏与少步生成

目标：通过训练得到 1–8 步即可完成生成的新模型。

包括：
- Progressive Distillation
- Consistency Distillation
- Distribution Matching Distillation
- Adversarial Diffusion Distillation
- Rectified Flow / Few-step Flow Distillation

代表：Progressive Distillation、Consistency Models、LCM、DMD/DMD2、SDXL-Lightning、TCD、Phased DMD。

## 3. 缓存与计算复用

目标：保留采样步数，但减少相邻 timestep、layer、token 或历史片段的重复计算。

子类：
- Feature / Block Cache
- Layer Cache
- Token / Region Cache
- Adaptive Cache
- Predictive Cache
- Trajectory / Subspace Cache
- Autoregressive / World-model History Cache

演化主线：

```text
直接复用旧特征
→ 自适应决定何时刷新
→ 预测未来特征
→ 全局规划 Cache Schedule
→ 面向 AR Video / World Model 的历史感知 Cache
```

代表：DeepCache、Δ-DiT、TeaCache、TaylorSeer、SVD-Cache、DPCache、TC-Padé、ARCache、WorldCache。

## 4. 高效注意力与稀疏计算

目标：减少当前 forward 真正执行的 token / attention / head / block。

包括：
- Token Pruning
- Token Merging / Clustering
- Sparse Attention
- Linear / Hybrid Attention
- Head / Block Skipping
- Dynamic / Selective Computation

边界规则：
- “上一 timestep 算过，现在复用” → **Cache**
- “当前 timestep 只计算一部分 token / edge / block” → **Sparse Compute**

代表：ToMeSD、AT-EDM、DiTFastAttn、Sparse VideoGen、SiTo、ASTRAEA、Light Forcing、LoSA、SparseD。

## 5. 模型压缩与低精度

目标：降低单次模型前向的参数、内存、带宽和算术成本。

包括：
- PTQ / QAT
- Weight / Activation Quantization
- Structured / Unstructured Pruning
- Low-rank Compression
- Mixed Precision

代表：Q-Diffusion、Diff-Pruning、LD-Pruner、Q-DiT、DiTAS、DVD-Quant。

## 6. 系统优化与并行

目标：把算法层面的 FLOPs / NFE 改进转化为真实 latency / throughput 改进。

包括：
- Patch / Sequence Parallel
- CFG Parallel
- Pipeline / PipeFusion
- Kernel Fusion
- Offloading
- Memory Management
- Serving / Runtime Optimization

代表：ParaDiGMS、StreamDiffusion、DistriFusion、xDiT、FastVideo、LightX2V。

## 横向标签：复合加速

当一个方法同时组合多个一级类别时，标记为 **Hybrid / Compound**，但仍按其主要贡献归入一个主类。

代表：
- CacheQuant：Cache + Quantization
- QuantSparse：Quantization + Sparse Attention
- Q&C：Quantization + Cache
- TurboDiffusion：Distillation + Sparse/Low-bit Attention + W8A8 + Systems
- FAST-AR：Temporal Cache + Sparse Self/Cross Attention
- FastVideo / LightX2V：多技术统一推理框架

## 应用维度

每篇论文还会标记应用场景：

- 图像生成 / 编辑
- 视频生成
- Autoregressive Video / 世界模型
- Diffusion Language Model（dLLM）
- 其他：Audio、3D、Science、Robotics / Policy Diffusion

这一维度用于分析“同一种加速方法在不同扩散应用中为什么会面对不同瓶颈”。
