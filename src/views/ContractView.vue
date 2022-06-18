<template>  
  <v-sheet height="100vh" class="mx-auto" id="sheet" justify="center">    
      <v-card rounded="sm" width="320" height="450" id="contract" >                
        <v-list>
          <v-divider></v-divider>
          <v-list-item>                
            <v-row>
              <v-col cols="5">근로장소 :</v-col>
              <v-col cols="5">{{ obj.company }}</v-col>
            </v-row>
          </v-list-item>
          <v-list-item>                
            <v-row>
              <v-col cols="5">근로날짜 :</v-col>
              <v-col cols="5">{{ obj.date }}</v-col>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row>
              <v-col cols="5">근로시간 :</v-col>
              <v-col cols="6">{{ obj.start }} ~ {{ obj.end }}</v-col>
            </v-row> 
          </v-list-item>
          <v-list-item>
            <v-row>
              <v-col cols="5">급여 :</v-col>
              <v-col cols="6">{{ obj.pay }} ₩ </v-col>
            </v-row> 
          </v-list-item>           
          <v-list-item>
            <v-row>
              <v-col cols="5">근로내용 :</v-col>
              <v-col cols="6">{{ obj.textArea }}</v-col>
            </v-row>           
          </v-list-item>         
          <v-list-item>
            <v-row>
              <v-col cols="5">근로자 :</v-col>
              <v-col cols="6">{{ user.name }}</v-col>
            </v-row>           
          </v-list-item>         
          <v-list-item>
            <v-row>
              <v-col cols="5">고용주연락처 :</v-col>
              <v-col cols="6">{{ obj.tele }}</v-col>
            </v-row>           
          </v-list-item>         
          <v-list-item>
            <v-row>
              <v-col cols="5">근로자연락처 :</v-col>
              <v-col cols="6">{{ user.tele }}</v-col>
            </v-row>           
          </v-list-item>         
          <v-divider></v-divider>                   
          <v-card-subtitle class="mt-4">
            상기 내용으로 계약을 진행하시겠습니까?
          </v-card-subtitle>
        </v-list>
        <v-spacer></v-spacer>            
        <v-card-actions class="d-flex justify-center mt-1">
          <v-btn
            color="error"
            size="large"
            variant="plain"
            @click="router.push('/user')"
          > 아니오 </v-btn>
          <v-btn 
            color="grey" 
            size="large" 
            variant="text" 
            @click="applycontract"
          > 예 </v-btn>
        </v-card-actions>
      </v-card>

  </v-sheet>

</template>

<script>
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from 'vue'
import { useContractStore } from '../stores/contract';
export default {
  setup() {
    const obj = ref({})
    const router = useRouter();
    const contractStore = useContractStore()
    const contractList = computed(() => contractStore.contractList)
    // const contractList = computed(() => contractStore.getContracts);
    const localContractList = computed(() => [JSON.parse(window.localStorage.getItem('contract'))])
    const user = computed(() => JSON.parse(window.localStorage.getItem('user')))

    onMounted(() => {                
      obj.value = localContractList.value.find(contract => contract.id == router.currentRoute.value.params.id)      
    })

    async function applycontract () {
      await contractStore.applyContract()
      router.push('/contract/result')
    }

    return { obj, user, applycontract, contractList, router }
  },
}
</script>

<style scoped>

#contract {
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  display: table;  
}

</style>