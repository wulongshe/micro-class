import type { Compare, TreeNode, Interval } from './types'

export class MergeIntervalTree<T> {
  private root: TreeNode<Interval<T>> | null = null
  constructor(private compare: Compare<T>) { }

  private _join(start: T, end: T, node = this.root): TreeNode<Interval<T>> | null {
    const { compare } = this
    if (compare(start, end) === 0) return node
    if (!node) return { value: [start, end], left: null, right: null }
    if (compare(end, node.value[0]) < 0) {
      node.left = this._join(start, end, node.left)
      return node
    } else if (compare(start, node.value[0]) < 0) {
      node.left = this._remove(start, node.value[0], node.left)
      node.value[0] = start
    }
    if (compare(node.value[1], start) < 0) {
      node.right = this._join(start, end, node.right)
      return node
    } else if (compare(node.value[1], end) < 0) {
      node.right = this._remove(node.value[1], end, node.right)
      node.value[1] = end
    }
    return node
  }

  private _remove(start: T, end: T, node = this.root): TreeNode<Interval<T>> | null {
    const { compare } = this
    if (compare(start, end) === 0) return node
    if (!node) return null
    if (compare(end, node.value[0]) < 0) {
      node.left = this._remove(start, end, node.left)
      return node
    } else if (compare(end, node.value[1]) < 0) {
      if (start < node.value[0]) {
        node.left = this._remove(start, node.value[0], node.left)
      } else {
        node.left = this._join(node.value[0], start, node.left)
      }
      node.value[0] = end
      return node
    } else if (compare(start, node.value[0]) <= 0) {
      let { left, right, value } = node
      left = this._remove(start, value[0], left)
      right = this._remove(value[1], end, right)
      if (!left) return right
      const child = left
      while (left.right) {
        left = left.right
      }
      left.right = right
      return child
    } else if (compare(start, node.value[1]) < 0) {
      node.right = this._remove(node.value[1], end, node.right)
      node.value[1] = start
      return node
    } else {
      node.right = this._remove(start, end, node.right)
      return node
    }
  }

  private _traverse(trace: (value: Interval<T>) => void, node = this.root) {
    if (!node) return null
    this._traverse(trace, node?.left)
    trace(node.value)
    this._traverse(trace, node?.right)
  }

  join(start: T, end: T) {
    this.root = this._join(start, end)
  }
  remove(start: T, end: T) {
    this.root = this._remove(start, end)
  }
  traverse(trace: (value: Interval<T>) => void) {
    this._traverse(trace)
  }

  toString(): string {
    const ret: string[] = []
    this.traverse(([start, end]) => ret.push(`[${start},${end})`))
    return `<${ret.join(',')}>`
  }
}
