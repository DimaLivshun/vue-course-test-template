import { createFetch } from '@vueuse/core'

const useAPI = createFetch({
  baseUrl: 'https://cetrix13.github.io',

  options: {
    onFetchError(ctx) {
      console.error(ctx.error)

      return ctx
    },
  },

  fetchOptions: {
    mode: 'cors',
  },
})

export default useAPI
