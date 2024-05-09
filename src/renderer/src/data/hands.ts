import { reactive } from 'vue'
import type { CardSettings } from '@renderer/App.vue'

export const handStore = reactive({
  player: [] as CardSettings[],
  house: [] as CardSettings[]
})