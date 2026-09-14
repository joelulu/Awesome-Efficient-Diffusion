# Prioritized Reading Queue

This queue is ordered for building the survey argument, not by publication date alone.

## Tier 0 — Survey baselines

Read first to avoid duplicating existing taxonomy.

1. **A Survey on Cache Methods in Diffusion Models: Toward Efficient Multi-Modal Generation** — https://arxiv.org/abs/2510.19755
   - Extract: cache taxonomy, modalities, covered papers, open problems.
2. **Efficient Diffusion Models: A Comprehensive Survey from Principles to Practices** — https://arxiv.org/abs/2410.11795
   - Extract: lifecycle taxonomy, especially inference/deployment boundaries.
3. **Efficient Diffusion Models: A Survey** — https://arxiv.org/abs/2502.06805
   - Extract: algorithm/system/framework taxonomy and missing 2025–2026 developments.
4. **Efficient Video Diffusion Models: Advancements and Challenges** — https://arxiv.org/abs/2604.15911
   - Extract: step distillation / attention / compression / cache structure; benchmark tables.

---

## Tier 1 — Foundations that define the six method families

### Sampling
- DDIM
- DPM-Solver / DPM-Solver++
- UniPC
- Align Your Steps

### Distillation
- Progressive Distillation
- Consistency Models
- Latent Consistency Models
- DMD
- DMD2
- SDXL-Lightning

### Cache
- DeepCache
- Δ-DiT
- Learning-to-Cache
- FORA
- TeaCache
- TaylorSeer

### Sparse computation / attention
- Token Merging for Stable Diffusion
- DiTFastAttn
- SiTo

### Compression
- Q-Diffusion
- Diff-Pruning
- LD-Pruner
- ViDiT-Q / Q-VDiT

### Systems
- StreamDiffusion
- DistriFusion
- xDiT

---

## Tier 2 — 2025–2026 frontier to define the new survey contribution

### Cache evolution
Priority order:
1. SVD-Cache
2. DPCache
3. D2Cache
4. ARCache
5. WorldCache
6. ResCa
7. TC-Padé
8. LeMiCa

Questions to extract:
- What is cached?
- How is cache error estimated?
- Is reuse zero-order, predictive, subspace-based or residual-corrected?
- Is the schedule local/adaptive or globally planned?
- Does it work for image, video, autoregressive video or world models?

### Efficient attention / sparsity
Priority order:
1. Sparse VideoGen
2. Sparse-vDiT
3. SLA
4. Trainable Log-linear Sparse Attention
5. Attention Surgery
6. SparseD
7. ToMA

Questions:
- Static vs dynamic sparse pattern?
- Token, head, edge, block or layer granularity?
- Training-free, calibrated or trained?
- FLOPs reduction vs actual wall-clock speedup?
- Custom kernel required?

### Compression + hybrid acceleration
Priority order:
1. CacheQuant
2. QuantSparse
3. Q&C
4. DVD-Quant
5. Q-VDiT
6. ViDiT-Q

Questions:
- Why does naive combination fail?
- How is diffusion timestep variation handled?
- Weight/activation/KV precision?
- Does low precision amplify cache/sparse approximation error?

### Few-step / distillation frontier
Priority order:
1. SANA-Sprint
2. Phased Distribution Matching Distillation
3. LogCD
4. Flash-DMD
5. recent video DMD/DMD2 variants

Questions:
- one-step vs few-step tradeoff;
- distribution matching vs consistency vs adversarial objectives;
- image-to-video transfer;
- whether quality degradation becomes the dominant constraint below 4 steps.

### Systems / compound frameworks
Priority order:
1. FastVideo
2. LightX2V
3. xDiT updates
4. SageAttention family
5. SpargeAttn

Questions:
- Which algorithmic components are actually enabled together?
- What is measured: single-GPU latency, multi-GPU scaling, throughput, memory?
- How much speedup comes from NFE vs kernel/parallelism?

---

## Tier 3 — Application-specific expansion

### dLLM
- dLLM-Cache
- d2Cache
- FlashDLM / FreeCache
- Sparse-dLLM
- SparseD
- Fast-dLLM / confidence-aware decoding

Core question: how do caching and sparse attention change under **bidirectional denoising**, where standard AR KV caching is not exact?

### World models
- WorldCache
- ARCache
- temporal KV/cache compression for autoregressive video diffusion
- sparse attention over rollout context

Core question: how does efficiency change from one-shot video generation to **long-horizon repeated rollout**?

### Other modalities
Only add papers that contribute a distinct acceleration mechanism, not merely apply a known image method to a different modality.

---

# Close-reading template

For each paper, record:

1. **Problem / bottleneck**
2. **Core observation**
3. **Method in one sentence**
4. **Primary category + secondary tags**
5. **Training requirement**
6. **Backbone / application**
7. **Baseline(s)**
8. **NFE / FLOPs / latency / throughput / memory results**
9. **Quality metrics**
10. **Hardware / batch / resolution / sequence length**
11. **Official code**
12. **Key limitation**
13. **Relationship to prior / later methods**
14. **One figure/table worth citing in the survey**

This format is intended to feed both the final survey manuscript and a future interactive roadmap in this repository.
