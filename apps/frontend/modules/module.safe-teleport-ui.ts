import { addComponent, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'Vue Safe Teleport UI',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  setup() {
    addComponent({
      name: 'SafeTeleport',
      filePath: 'vue-safe-teleport',
      export: 'SafeTeleport'
    })
    addComponent({
      name: 'TeleportTarget',
      filePath: 'vue-safe-teleport',
      export: 'TeleportTarget'
    })
  }
})
