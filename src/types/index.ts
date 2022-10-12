export type Compare<T> = (a: T, b: T) => number

export type Trace<T> = (value: T) => void

export type Interval<T> = [start: T, end: T]

export type TreeNode<T> = {
  value: T
  left: TreeNode<T> | null
  right: TreeNode<T> | null
}

export type ReplaceReturn<T extends (...args: any[]) => any, R = unknown> = T extends (...args: infer P) => any ? (...args: P) => R : never

export type ReplaceArguments<T extends (...args: any[]) => any, P extends any[] = unknown[]> = T extends (...args: P) => infer R ? (...args: P) => R : never
