<template>
  <Combobox @selected="onItemSelected" :city-options="cityOptions" />
</template>

<script>
import { Button } from '@/components/ui/button'
import Combobox from '@/components/Combobox.vue'
export default {
  name: 'Selector',
  components: {
    Button,
    Combobox,
  },
  data() {
    return { 
      cityOptions: [
        { value: 'irkutsk', label: 'Иркутск' },
        { value: 'kultuk', label: 'Култук' },
        { value: 'meget', label: 'Мегет' },
        { value: 'irkutsk', label: 'Иркутск' },
        { value: 'kultuk', label: 'Култук' },
        { value: 'meget', label: 'Мегет' },
        { value: 'irkutsk', label: 'Иркутск' },
        { value: 'kultuk', label: 'Култук' },
        { value: 'meget', label: 'Мегет' },
        { value: 'irkutsk', label: 'Иркутск' },
        { value: 'kultuk', label: 'Култук' },
        { value: 'meget', label: 'Мегет' },
        { value: 'irkutsk', label: 'Иркутск' },
        { value: 'kultuk', label: 'Култук' },
        { value: 'meget', label: 'Мегет' },
      ]
    }
  },
  methods: {
    sendSelectedValue(event) {
      const selectedValue = event.target.value;
      this.$emit('selected', selectedValue);
    },
    filterOptions() {
      this.filteredOptions = this.options.filter(option => {
        return option.label.toLowerCase().includes(this.searchText.toLowerCase());
      });
    },
    toggleOptions() {
      this.isOpen = !this.isOpen;
    },
    onItemSelected(selectedValue) {
      // Здесь вы получите данные, отправленные из дочернего компонента
      console.log('Selected value:', selectedValue);
    }
  }
}
</script>

<style scoped>
.custom-select {
  position: relative;
  display: inline-block;
}

input[type="text"] {
  border: 1px solid #ccc;
  padding: 5px;
}

select {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  border: 1px solid #ccc;
}
</style>
