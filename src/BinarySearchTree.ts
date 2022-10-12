import type { Compare, Trace } from './types'

export type TreeNode<T> = {
  value: T
  count: number
  left: TreeNode<T> | null
  right: TreeNode<T> | null
}

export class BinarySearchTree<T> {
  protected root: TreeNode<T> | null = null
  private flag = false

  constructor(
    private compare: Compare<T>,
    items: T[] = [],
    private enableRepeat = true
  ) {
    items.forEach(val => this.insert(val))
  }

  private _insert(value: T, node = this.root): TreeNode<T> {
    if (!node) {
      this.flag = true
      return { value, count: 1, left: null, right: null }
    }
    const eq = this.compare(value, node.value)
    if (eq < 0) {
      node.left = this._insert(value, node.left)
    } else if (eq > 0) {
      node.right = this._insert(value, node.right)
    } else if (this.enableRepeat) {
      node.left = this._insert(value, node.left)
    }
    if (this.flag) node.count++
    return node
  }
  insert(value: T) {
    this.root = this._insert(value)
    this.flag = false
  }

  private _remove(value: T, node = this.root): TreeNode<T> | null {
    if (!node) return null
    const eq = this.compare(value, node.value)
    if (eq < 0) {
      node.left = this._remove(value, node.left)
    } else if (eq > 0) {
      node.right = this._remove(value, node.right)
    } else {
      this.flag = true
      let { left, right } = node
      if (!left) return right
      if (!right) return left
      node = left
      left.count += right.count
      while (left.right) {
        left = left.right
        left.count += right.count
      }
      left.right = right
      return node
    }
    if (this.flag) node.count--
    return node
  }
  remove(value: T) {
    this.root = this._remove(value)
    const { flag } = this
    this.flag = false
    return flag
  }

  update(oldVal: T, newVal: T) {
    this.remove(oldVal)
    this.insert(newVal)
  }

  private _search(value: T, node = this.root, prevent = 0): number {
    if (!node) return -1
    const eq = this.compare(value, node.value)
    const leftCount = node.left ? node.left.count : 0
    if (eq < 0) {
      return this._search(value, node.left, prevent)
    } else if (eq > 0) {
      return this._search(value, node.right, prevent + leftCount + 1)
    } else {
      return prevent + leftCount
    }
  }
  search(value: T): number {
    return this._search(value)
  }

  private _peek(index: number, node = this.root): T | null {
    if (!node) return null
    const leftCount = node.left ? node.left.count : 0
    if (index < leftCount) {
      return this._peek(index, node.left)
    } else if (index > leftCount) {
      return this._peek(index - leftCount - 1, node.right)
    } else {
      return node.value
    }
  }
  peek(index = 0): T | null {
    const size = this.size
    if (size === 0) return null
    index < 0 && (index = (index + size) % size)
    if (index < 0) return null
    if (index >= size) return null
    return this._peek(index)
  }

  private _traverse(trace: Trace<T>, node = this.root) {
    if (!node) return
    this._traverse(trace, node.left)
    trace(node.value)
    this._traverse(trace, node.right)
  }
  traverse(trace: Trace<T>) {
    this._traverse(trace)
  }

  get size(): number {
    return this.root ? this.root.count : 0
  }

  isEmpty(): boolean {
    return this.size === 0
  }
}
