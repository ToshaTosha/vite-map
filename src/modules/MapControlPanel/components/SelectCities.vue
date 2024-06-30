<template>
    <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[100%] justify-between"
      >
        {{ file_name
          ? cityOptions.find((cityOptions) => cityOptions.file_name === file_name)?.city
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
              v-for="cityOption, key in cityOptions"
              :key="key"
              :value="cityOption.file_name"
              @select="(ev) => {
                if (typeof ev.detail.value === 'string') {
                  value = ev.detail.value
                  file_name = value
                  this.$emit('selected', cityOption)
                  $store.commit('updateCurrentCity', cityOption)
                }
                open = false
              }"
            >
              {{ cityOption.city, file_name }}
              <Check
                :class="cn(
                  'ml-auto h-4 w-4',
                  file_name === cityOption.file_name ? 'opacity-100' : 'opacity-0',
                )"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
  
<script>
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { CitiesApi } from '@/modules/MapControlPanel/api/CitiesApi'

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
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
  export default {
    name: 'SelectCities',
    components: {
      Button,
      Command,
      CommandEmpty,
      CommandGroup,
      CommandInput,
      CommandItem,
      CommandList,
      Popover,
      PopoverContent,
      PopoverTrigger,
      Check,
      ChevronsUpDown,
    },
    data() {
      return { 
        open: false,
        file_name: '',
        cityOptions: [],
      }
    },
    created() {
      this.fetchOptions()
    },
    methods: {
      async fetchOptions () {
        try {
          const api = new CitiesApi()
          const response = await api.getAll()
          this.cityOptions = response.data
        } catch (error) {
          console.error(error);
        }
      },
      cn(...inputs) {
        return twMerge(clsx(inputs));
      }
    },
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
