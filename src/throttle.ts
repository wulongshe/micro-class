export function throttle<T extends (...args: any[]) => void>(func: T, interval: number): T {
  let lastTime = 0

  return ((...args: Parameters<T>) => {
    const currentTime = Date.now()
    if (currentTime - lastTime >= interval) {
      func(...args)
      lastTime = currentTime
    }
  }) as T
}
