<template>
  <Card class="w-[350px] absolute top-0 right-0 m-4 p-4">
    <CardContent>
      <SelectCities />
      <Separator />
      <ClientList />
      <CoordinatesForm />
      <Separator />
      <ToggleDevices />
    </CardContent>
  </Card>
</template>

<script>
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { CitiesApi } from './api/CitiesApi'
import { Separator } from '@/components/ui/separator'
import SelectCities from '@/modules/MapControlPanel/components/SelectCities.vue'
import ClientList from '@/modules/MapControlPanel/components/ClientList.vue'
import CoordinatesForm from './components/CoordinatesForm.vue'
import ToggleDevices from './components/ToggleDevices.vue'

export default {
  name: 'MapControlPanel',
  components: {
    Card,
    CardContent,
    Separator,
    SelectCities,
    ClientList,
    CoordinatesForm,
    ToggleDevices,
  },
  created() {
    this.api = new CitiesApi()
  },
  methods: {
    request() {
      return this.api.getAll()
    },
  },
}
</script>