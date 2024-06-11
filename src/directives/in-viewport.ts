import type { DirectiveBinding, VNode } from 'vue'

export default {
  mounted(el: HTMLElement, bindings: DirectiveBinding, vnode: VNode) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length) {
          const first = entries[0]
          if (first.isIntersecting && vnode.el) {
            vnode.el.dispatchEvent(new CustomEvent('intersects'))
          }
        }
      },
      {
        root: bindings.value,
      },
    )
    observer.observe(el)
  },
}
