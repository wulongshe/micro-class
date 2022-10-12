import { BinarySearchTree } from './BinarySearchTree'
import { MiSet } from './MiSet'
import { Stack } from './Stack'
import type { Compare, ReplaceReturn } from './types'
import type { TreeNode } from './BinarySearchTree'


const { equals, union, difference, intersect, xor } = MiSet.prototype

export class TreeSet<T> extends BinarySearchTree<T> implements MiSet<T>, IterableIterator<T> {
  [Symbol.toStringTag] = 'TreeSet'
  private stack = new Stack<TreeNode<T>>()
  private iterableIterator = TreeSet.createIterableIterator(this.root, ({ value }) => value, this.stack)

  constructor(compare: Compare<T>, items: T[] = []) {
    super(compare, items, false)
  }

  get [Symbol.iterator]() {
    return this.iterableIterator[Symbol.iterator]
  }
  get next() {
    return this.iterableIterator.next
  }

  equals(that: Set<T>): boolean {
    return MiSet.prototype.equals.call(this, that)
  }
  static equals<T, S extends Set<T>>(first: S, second: S): boolean {
    return MiSet.equals(first, second)
  }
  // union = union as ReplaceReturn<typeof union, TreeSet<T>>
  union<S extends Set<T>>(that: S): TreeSet<T> {
    MiSet.prototype.union.call(this, that)
    return this
  }
  static union<T, S extends Set<T>>(compare: Compare<T>, first: Set<T>, ...that: S[]): TreeSet<T> {
    return that.reduce((prev, curr) => prev.union(curr), new TreeSet<T>(compare, [...first]))
  }
  difference<S extends Set<T>>(that: S): TreeSet<T> {
    MiSet.prototype.difference.call(this, that)
    return this
  }
  static difference<T, S extends Set<T>>(compare: Compare<T>, first: Set<T>, ...that: S[]): TreeSet<T> {
    return that.reduce((prev, curr) => prev.difference(curr), new TreeSet<T>(compare, [...first]))
  }
  intersect<S extends Set<T>>(that: S): TreeSet<T> {
    MiSet.prototype.intersect.call(this, that)
    return this
  }
  static intersect<T, S extends Set<T>>(compare: Compare<T>, first: Set<T>, ...that: S[]): TreeSet<T> {
    return that.reduce((prev, curr) => prev.intersect(curr), new TreeSet<T>(compare, [...first]))
  }
  xor<S extends Set<T>>(that: S): TreeSet<T> {
    MiSet.prototype.xor.call(this, that)
    return this
  }
  static xor<T, S extends Set<T>>(compare: Compare<T>, first: Set<T>, ...that: S[]): TreeSet<T> {
    return that.reduce((prev, curr) => prev.xor(curr), new TreeSet<T>(compare, [...first]))
  }

  add(value: T): this {
    this.insert(value)
    return this
  }
  clear(): void {
    this.root = null
    this.stack.clear()
  }
  delete(value: T): boolean {
    return this.remove(value)
  }
  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    const cb = callbackfn.bind(thisArg)
    this.traverse(val => cb(val, val, this))
  }
  has(value: T): boolean {
    return this.search(value) >= 0
  }

  private static recursive<T>(stack: Stack<TreeNode<T>>, node: TreeNode<T> | null) {
    while (node) {
      stack.push(node)
      node = node.left
    }
  }
  private static createIterableIterator<T, R>(
    root: TreeNode<T> | null,
    get: (value: TreeNode<T>) => R,
    stack = new Stack<TreeNode<T>>()
  ): IterableIterator<R> {
    const iterableIterator: IterableIterator<R> = {
      [Symbol.iterator]: () => {
        stack.clear()
        TreeSet.recursive(stack, root)
        return iterableIterator
      },
      next: (): IteratorResult<R> => {
        const node = stack.pop()
        if (!node) return { value: void 0, done: true }
        TreeSet.recursive(stack, node.right)
        return { value: get(node), done: false }
      }
    }
    return iterableIterator
  }

  values(): IterableIterator<T> {
    return TreeSet.createIterableIterator(this.root, ({ value }) => value)
  }
  entries(): IterableIterator<[T, T]> {
    return TreeSet.createIterableIterator(this.root, ({ value }) => [value, value])
  }
  keys(): IterableIterator<T> {
    return TreeSet.createIterableIterator(this.root, ({ value }) => value)
  }

  toString() {
    const arr: T[] = []
    for (const val of this) {
      arr.push(val)
    }
    return `{${arr.join(',')}}`
  }
}
