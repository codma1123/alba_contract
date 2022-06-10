<template>
  <v-container class="text-center">
    <v-card>
      <v-card-title></v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import { onMounted } from 'vue-demi'
export default {
  setup() {

    const x = 0
    onMounted(() => {
      console.log('mounted')
    })

    return { x }
  },
}
</script>
