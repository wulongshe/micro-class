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

## 案例

```ts
/* 并查集 */
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

```ts
/* 列表 */
import { List } from 'micro-class'

const list = new List([0, 1, 2, 3, 4])

// 切片
list[':-5:-1']  // [4, 3, 2, 1]
```

## 测试用例

> 更多使用方法请参考 [测试用例](https://github.com/Yuki-0505/micro-class/tree/main/tests)

- [UnionQuerySet](https://github.com/Yuki-0505/micro-class/blob/main/tests/UnionQuerySet.spec.ts)
- [List](https://github.com/Yuki-0505/micro-class/blob/main/tests/List.spec.ts)
- [Stack](https://github.com/Yuki-0505/micro-class/blob/main/tests/Stack.spec.ts)
- [MiSet](https://github.com/Yuki-0505/micro-class/blob/main/tests/MiSet.spec.ts)
- [Heap](https://github.com/Yuki-0505/micro-class/blob/main/tests/Heap.spec.ts)
- [MergeIntervalTree](https://github.com/Yuki-0505/micro-class/blob/main/tests/MergeIntervalTree.spec.ts)
- [BinarySearchTree](https://github.com/Yuki-0505/micro-class/blob/main/tests/BinarySearchTree.spec.ts)
- [TreeSet](https://github.com/Yuki-0505/micro-class/blob/main/tests/TreeSet.spec.ts)
- [Vector](https://github.com/Yuki-0505/micro-class/blob/main/tests/Vector.spec.ts)
- [LinkList](https://github.com/Yuki-0505/micro-class/blob/main/tests/LinkList.spec.ts)
