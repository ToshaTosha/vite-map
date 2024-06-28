<template>
  <ResizablePanelGroup
    direction="horizontal"
    class="h-full max-h-[800px] items-stretch"
  >
    <ResizablePanel :min-size="15" :max-size="20" :collapsed-size="4"
      ><AdminMenuBar :links="links"
    /></ResizablePanel>
    <ResizablePanel><Table /></ResizablePanel>
  </ResizablePanelGroup>
</template>

<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import AdminMenuBar, { LinkProp } from '@/components/AdminMenuBar.vue'
import Table from '@/components/Table.vue'
import { UserApi } from '../api/UaerApi'

const userApi = new UserApi();

userApi.getUsers().then((users) => {
  console.log(users);
});

const links: LinkProp[] = [
  {
    title: 'Клиенты',
    label: '128',
    icon: 'lucide:inbox',
    variant: 'default',
  },
  {
    title: 'Пользователи',
    label: '9',
    icon: 'lucide:file',
    variant: 'ghost',
  },
]
</script>
