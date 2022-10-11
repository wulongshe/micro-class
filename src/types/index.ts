export type Compare<T> = (a: T, b: T) => number

export type Trace<T> = (value: T) => void

export type Interval<T> = [start: T, end: T]

export type TreeNode<T> = {
  value: T
  left: TreeNode<T> | null
  right: TreeNode<T> | null
}
