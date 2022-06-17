<template>
  <v-container class="text-center">
    <v-row>
      <v-col cols="12">
        <h1>근로자 정보 입력</h1>
        <v-btn
          @click="homeDialog = true"
          position="fixed"
          right
          top
          icon
          class="mr-5 mt-2"
          elevation="0"
        >
          <v-icon size="30">mdi-keyboard-return</v-icon>
        </v-btn>
        <v-dialog v-model="homeDialog">
          <v-card width="auto" class="">
            <v-card-title class="font-weight-bold">
              정말 나가시겠습니까?
            </v-card-title>
            <v-card-subtitle>
              *작성하던 내용은 모두 사라집니다.*
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-spacer></v-spacer>
            <v-card-actions class="d-flex justify-center mt-1">
              <v-btn
                color="error"
                size="large"
                variant="plain"
                @click="homeDialog = false"
              >
                아니오</v-btn
              >
              <v-btn color="grey" size="large" variant="text" @click="router.push('/user')">
                예</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12">
        <v-text-field
          class="mt-5"
          label="근로자 이름"
          autofocus
          clearable
          v-model="user.name"
          variant="outlined"
        ></v-text-field>
        <v-text-field          
          label="연락처"
          clearable
          v-model="user.tele"
          variant="outlined"
        ></v-text-field>
        <v-text-field          
          label="나이"
          clearable
          v-model="user.age"
          variant="outlined"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-btn block class="mr-3 mt-3" variant="outlined" @click="submit">
      작성완료
    </v-btn>
  </v-container>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContractStore } from '../stores/contract'

export default {
  setup() {
    const homeDialog = ref(false)
    const router = useRouter()
    const user = ref({
      name: '',
      tele: '',
      age: ''
    })
    const contractStore = useContractStore()

    function submit() {
      const userInfoTemp = {
        name: user.value.name,
        tele: user.value.tele,
        age: user.value.age
      }

      const userString = JSON.stringify(userInfoTemp)
      window.localStorage.setItem('user', userString)
      contractStore.user = userInfoTemp
      router.push('/user')
    }

    onMounted(() => {
      user.value = contractStore.user
    })

    return { homeDialog, router, user, submit }
  }
}
</script>




