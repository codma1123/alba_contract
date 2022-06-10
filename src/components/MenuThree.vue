<template>
  <v-container class="text-center">
    <v-row>
      <v-col cols="12">
        <h1>계약 내역 조회</h1>
        <v-btn
          @click="goHome"
          position="fixed"
          right
          top
          icon
          class="mr-5 mt-2"
          elevation="0"
        >
          <v-icon size="30">mdi-keyboard-return</v-icon>
        </v-btn>
      </v-col> 
    </v-row>    
    <v-spacer></v-spacer>
    <v-divider></v-divider>
    <v-card class="ml-5 mr-5 mt-5 d-flex justify-center align-center " elevation="0">
      <v-card-title>        
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="search" label="계약 아이디">

        </v-text-field>
        <v-btn block variant="text" color="grey" @click="searchContract(search)"> 검색 </v-btn>
      </v-card-text>
    </v-card>
    <v-divider></v-divider>
    <div v-if="loaded">       
      <v-card
        class="mr-5 mb-t"
        height="400"
        width="430"
        elevation="0"
      >                  
       {{ resMessage }}
      </v-card>
    </div>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
import { useRouter } from 'vue-router';
import { useContractStore } from "../stores/contract";
import { computed, ref } from 'vue'

export default {
  name: "MenuThree",
  setup() {
    const router = useRouter()
    const contractStore = useContractStore();
    const search = ref("")
    const resMessage = ref("")

    const loaded = computed(() => contractStore.getResLoaded)    

    function goHome () {
      router.push('/bc')
    }

    function searchContract(payload) {      
      resMessage.value = contractStore.findContract(payload)
      
    }

    return { goHome, searchContract, search, resMessage, loaded }
  },
};
</script>
