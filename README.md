# MICRO CLASS

## 简介

> 扩展 `js/ts` 的 `工具类` 和 `数据结构`

## 安装

```bash
npm i micro-class
# or
yarn i micro-class
# or
pnpm i micro-class
```

## 使用

```ts
import { UnionQuerySet } from "micro-class";

// 初始化并查集，设置默认权重为 0，
const unionQuerySet = new UnionQuerySet<string, number>(
  (prev, curr, pos) => (pos ? prev + curr : prev - curr),
  0
);
// 添加 a 和 b 两个点，默认权重为
unionQuerySet.add("a");
unionQuerySet.add("b");
// 查找 a 所属集合，因为 a 并没有连接其它点，所以指向自己
unionQuerySet.find("a"); // { value: 0, to: "a" }
// 连接 a 点到 b 点(有向)，权重为 2
unionQuerySet.join("a", "b", 2);
// 查找 a 所属集合
unionQuerySet.find("a"); // { value: 2, to: "b" }
```
