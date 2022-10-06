export type NextNode<K extends string | number | symbol, V> = { value?: V, to: K }
export type Reduce<V> = (prevent: V, current: V, position: boolean) => V

export class UnionQuerySet<K extends string | number | symbol = any, V = unknown> {
  private set = {} as { [key in K]: NextNode<K, V> }

  constructor(
    private reduce?: Reduce<V>,
    private defaultValue?: V
  ) { }

  add(key: K) {
    if (this.find(key)) return
    this.set[key] = { value: this.defaultValue, to: key }
  }

  find(from: K): NextNode<K, V> | null {
    if (!this.set[from]) return null
    let value: V | undefined, to: K, current = from, currVal = this.defaultValue
    while (
      { value, to } = this.set[current],
      to !== current
    ) {
      if (this.reduce && currVal != void 0 && value != void 0) {
        currVal = this.reduce(currVal, value, true)
      }
      current = to
    }
    return this.set[from] = { value: currVal, to }
  }

  join(from: K, to: K, value?: V) {
    this.add(to)
    const fromTop = this.find(from), { reduce } = this
    if (!fromTop) {
      this.set[from] = { value, to }
      return
    }
    const toTop = this.find(to)!
    if (toTop.to === fromTop.to) return
    console.log(fromTop.value, toTop.value, value)
    this.set[fromTop.to] = {
      ...(reduce && fromTop.value != void 0 && toTop.value != void 0 && value != void 0
        ? { value: reduce(reduce(toTop.value, value, true), fromTop.value, false) }
        : {}),
      to: toTop.to
    }
    console.log(this.set[fromTop.to])
  }

  // 查找是否同属于一个组
  jointly(x: K, y: K): { value: [v1?: V, v2?: V], top: K } | null {
    const topX = this.find(x), topY = this.find(y)
    return topX && topY && topX.to === topY.to
      ? { value: [topX.value, topY.value], top: topX.to }
      : null
  }
}
