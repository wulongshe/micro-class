export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timer: any

  return ((...args: Parameters<T>): void => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }) as T
}
