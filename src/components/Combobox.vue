<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[100%] justify-between"
      >
        {{ value
          ? cityOptions?.find((cityOptions) => cityOptions.value === value)?.label
          : "Выберите регион" }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[100%] p-0" style="z-index: 5000">
      <Command>
        <CommandInput class="h-9" placeholder="Search cityOptions..." />
        <CommandEmpty>No cityOptions found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="cityOptions in cityOptions"
              :key="cityOptions.value"
              :value="cityOptions.value"
              @select="(ev) => {
                if (typeof ev.detail.value === 'string') {
                  value = ev.detail.value
                  this.$emit('selected', ev.detail.value)
                }
                open = false
              }"
            >
              {{ cityOptions.label }}
              <Check
                :class="cn(
                  'ml-auto h-4 w-4',
                  value === cityOptions.value ? 'opacity-100' : 'opacity-0',
                )"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'


import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { defineProps } from 'vue';

interface Marker {
  value: string;
  label: string;
}

const props = defineProps({
  cityOptions: {
    type: Array as () => Marker[],
  }
});
const open = ref(false)
const value = ref('')
</script>