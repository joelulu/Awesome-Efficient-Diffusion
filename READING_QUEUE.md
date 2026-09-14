# 后续逐篇精读顺序

## 第一阶段：建立共同基线

先读这些，保证后面所有方法都能放进统一框架：

1. DDIM
2. DPM-Solver / DPM-Solver++
3. Progressive Distillation
4. Consistency Models
5. LCM
6. DMD2

重点回答：**NFE 为什么能从几十步降到 1–8 步？继续降步数的质量瓶颈在哪里？**

## 第二阶段：Cache 主线

1. DeepCache
2. Δ-DiT
3. TeaCache
4. FasterCache
5. TaylorSeer
6. SVD-Cache
7. TC-Padé
8. DPCache
9. ResCa
10. D²Cache
11. ARCache
12. WorldCache

重点观察演化：

`直接复用 → 自适应刷新 → feature prediction → 全局 schedule → world-model history cache`

## 第三阶段：Sparse / Token / Attention

1. ToMeSD
2. AT-EDM
3. DiTFastAttn
4. Sparse VideoGen
5. SiTo / ToMA
6. ASTRAEA
7. Light Forcing
8. LoSA-Video
9. Trainable Log-linear Sparse Attention
10. Attention Surgery

重点回答：**为什么 Video DiT 在低 NFE 后越来越受 Attention 主导？理论 FLOPs reduction 怎样转成真实 GPU speedup？**

## 第四阶段：Compression

1. Q-Diffusion
2. Diff-Pruning
3. Q-DiT
4. DiTAS
5. DVD-Quant
6. QuantSparse
7. Q&C

重点回答：量化/剪枝误差为什么会沿 diffusion timestep 累积？如何和 Cache / Sparse 组合？

## 第五阶段：系统与复合加速

1. ParaDiGMS
2. DistriFusion
3. xDiT
4. FastVideo
5. TurboDiffusion
6. FAST-AR
7. LightX2V

重点回答：**论文 FLOPs、kernel latency、端到端 latency、throughput、memory 之间到底是什么关系？**

## 第六阶段：新应用

### World Model / AR Video

ARCache → FAST-AR → Light Forcing → WorldCache

### Diffusion Language Model

FlashDLM → SparseD

## 每篇论文统一记录模板

```text
1. 论文解决什么瓶颈？
2. 关键 Observation 是什么？
3. 核心方法是什么？
4. 是否需要训练 / 校准？
5. 用在哪些 backbone / 应用？
6. NFE / FLOPs 降了多少？
7. 真实 latency / throughput 提升多少？
8. 使用什么 GPU / batch / resolution / frames？
9. 质量损失是多少？
10. 代码是否公开？
11. 主要局限是什么？
12. 与前后工作的关系是什么？
```
