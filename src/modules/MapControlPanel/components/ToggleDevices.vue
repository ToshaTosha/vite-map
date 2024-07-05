<template>
    <Button @click="toggleDevices">
        {{ $store.state.isDevicesView ? 'Скрыть оборудование' : 'Показать оборудование' }}
    </Button>
</template>
      
<script>
import { Button } from '@/components/ui/button'

export default {
  name: 'ToggleDevices',
  components: {
    Button
  },
  methods: {
    toggleDevices() {
        this.$store.commit('updateIsDevicesView')
    }
  },
}
</script>