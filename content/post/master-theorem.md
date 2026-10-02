---
title: 主定理速成
date: 2025-09-20T09:10:53+08:00
draft: false
aliases:
  - "/master-theorem/"
---

<https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)>

<!--more-->

对于时间复杂度形如

$$
T(n)=aT(n/b)+f(n)
$$

的递归过程，有

1. $f(n)=O(n^c),c<\log_ba$，则 $T(n)=\Theta(n^{\log_b a})$，此时递归树的调用复杂度更大；
2. $f(n)=\Theta(n^{\log_ba}\log^kn),k\ge 0$，则 $T(n)=\Theta(n^{\log_ba}\log^{k+1}n)$；更一般地，对于所有 $k$，
	- 若 $k>-1$，则 $T(n)=\Theta(n^{\log_ba}\log^{k+1}n)$；
	- 若 $k=-1$，则 $T(n)=\Theta(n^{\log_ba}\log\log n)$；
	- 若 $k<-1$，则 $T(n)=\Theta(n^{\log_ba})$；
3. $f(n)=\Omega(n^c),c>\log_ba$，且存在 $k<1$ 使得对于足够大的 $n$，$af(n/b)\le kf(n)$，则 $T(n)=\Theta(f(n))$，此时 $f$ 的调用复杂度更大。

简单的记忆方式：

若

$$
T(n)=aT(n/b)+f(n)=aT(n/b)+O(n^c\log^kn)
$$

则

$$
T(n)=
\begin{cases}
O(n^{\log_ba}\log^{k+1}n)&c=\log_ba\\
O(\max\{n^{\log_ba},f(n)\})&\textrm{otherwise}
\end{cases}
$$

注意，上式牺牲了一定严谨性。