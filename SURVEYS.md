# 相关综述与本文定位

## A. Cache 专项综述

**A Survey on Cache Methods in Diffusion Models: Toward Efficient Multi-Modal Generation**  
https://arxiv.org/abs/2510.19755

优点：Cache taxonomy 完整，覆盖 static reuse、adaptive cache、predictive cache 和多模态应用。  
局限：聚焦 Cache，难以解释蒸馏、稀疏注意力、量化和系统并行之间的关系。

## B. 广义 Efficient Diffusion

**Efficient Diffusion Models: A Comprehensive Survey from Principles to Practices**  
https://arxiv.org/abs/2410.11795

**Efficient Diffusion Models: A Survey**  
https://arxiv.org/abs/2502.06805

优点：覆盖 architecture、training、inference、deployment 等完整生命周期。  
局限：范围非常宽，且 2025–2026 的 Video / World Model / dLLM 新瓶颈仍在快速变化。

## C. Efficient Video Diffusion

**Efficient Video Diffusion Models: Advancements and Challenges**  
https://arxiv.org/abs/2604.15911

其核心分类非常有启发：
- Step Distillation
- Efficient Attention
- Model Compression
- Cache / Trajectory Optimization

但如果扩展到所有 diffusion/flow generation，还应补上：
- Fast Solver / Sampling Schedule
- Systems / Parallelism
- dLLM / World Model 特有的 KV、历史状态和长 rollout 问题

## 本仓库 / 后续综述的定位

我们聚焦 **生成与推理加速**，而不是整个 diffusion 生命周期。

核心结构：

```text
方法维度：
Sampling → Distillation → Cache → Sparse Compute → Compression → Systems

应用维度：
Image → Video → AR Video / World Model → dLLM

属性维度：
Training-based / Post-training / Training-free
```

希望回答三个问题：

1. **到底减少了什么成本？** NFE、单步计算、模型/内存，还是系统开销？
2. **瓶颈如何随应用变化？** 图像、视频、世界模型和 dLLM 的主要开销并不相同。
3. **2025–2026 为什么开始走向复合加速？** 当 NFE 已经很低后，Attention、Memory、Quantization 和 Runtime 必须共同优化。

因此，这不是简单的“更多论文列表”，而是围绕 **效率瓶颈演化** 构建统一视角。
