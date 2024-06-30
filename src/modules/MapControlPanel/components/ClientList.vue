<template>
    <Accordion type="single" class="w-full" collapsible :default-value="0">
      <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
        <AccordionTrigger>
          <div
          :class="cn('w-4 h-4 mr-4 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold', badgeColor(item.status))"
          ></div>
          {{ item.title }}
        </AccordionTrigger>
        <AccordionContent>
            <ScrollArea class="h-72 w-100 rounded-md border">
                <div class="p-4">
                  <div v-for="tag in item.items" :key="tag">
                      <div class="text-sm">
                      {{ tag.uid }}
                      </div>
                      <Separator class="my-2" />
                  </div>
                </div>
            </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </template>
<script>

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ClientsApi } from '@/modules/MapControlPanel/api/ClientsApi'
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

  export default {
    name: 'ClientList',
    components: {
        Accordion,
        AccordionContent,
        AccordionItem,
        AccordionTrigger,
        ScrollArea,
        Separator
    },
    created() {
        this.fetchOptions()
    },
    data() {
      return {
        clientsOptions: [],
      }
    },
    watch: {
        '$store.getters.getCurrentCity': {
            handler: 'fetchOptions',
        }
    },
    methods: {
        async fetchOptions () {
            try {
                const api = new ClientsApi()
                const response = await api.getClientsByCity(this.$store.getters.getCurrentCity.group_id)
                this.clientsOptions = response.data
                this.$store.commit('updateCurrentClients', this.clientsOptions)
            } catch (error) {
                console.error(error);
            }
        },
        badgeColor(status) {
            switch(status) {
                case 'active': {
                    return 'bg-green-500'
                }
                case 'unactive': {
                    return 'bg-yellow-500'
                }
                case 'blocked': {
                    return 'bg-red-500'
                }
                default: {
                    return 'bg-blue-500'
                }
            }
        },
        cn(...inputs) {
            return twMerge(clsx(inputs));
        }
    },
    computed: {
        accordionItems() {
            return [
                { value: '0', title: 'Активные сессии', status: 'active', items: this.clientsOptions.filter(obj => obj.status === 'active') },
                { value: '1', title: 'Неактивные сессии', status: 'unactive', items: this.clientsOptions.filter(obj => obj.status === 'unactive') },
                { value: '2', title: 'Заблокированные клиенты', status: 'blocked', items: this.clientsOptions.filter(obj => obj.status === 'blocked') }
            ]
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
