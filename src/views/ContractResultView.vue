<template>
  <v-sheet height="100vh" class="mx-auto" id="sheet" justify="center">
    <v-card id="contract">
      <v-card-text>
        계약이 완료되었습니다.
      </v-card-text>
      <v-spacer></v-spacer>
      <v-btn 
        @click="router.push('/user')"
        variant="text">
        홈으로 돌아가기
      </v-btn>
    </v-card>
  </v-sheet>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter()

    return { router }
  }
}
</script>

<style>
#contract {
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  display: table;  
}
</style>