<template>  
  <v-container class="d-flex justify-center align-center">
    <div>
      <v-card rounded="sm" width="320" height="350">                
        <v-list>
          <v-divider></v-divider>
          <v-list-item>                
            <v-row>
              <v-col cols="4">근로장소 :</v-col>
              <v-col cols="4">{{ obj.company }}</v-col>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row>
              <v-col cols="4">근로시간 :</v-col>
              <v-col cols="6">{{ obj.start }} ~ {{ obj.end }}</v-col>
            </v-row> 
          </v-list-item>
          <v-list-item>
            <v-row>
              <v-col cols="4">급여 :</v-col>
              <v-col cols="6">{{ obj.pay }} ₩ </v-col>
            </v-row> 
          </v-list-item>           
          <v-list-item>
            <v-row>
              <v-col cols="4">근로내용 :</v-col>
              <v-col cols="6">{{ obj.textArea }}</v-col>
            </v-row>           
          </v-list-item>         
          <v-list-item>
            <v-row>
              <v-col cols="4">근로자 :</v-col>
              <v-col cols="6">{{ user.name }}</v-col>
            </v-row>           
          </v-list-item>         
          <v-list-item>
            <v-row>
              <v-col cols="4">연락처 :</v-col>
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
          > 아니오 </v-btn>
          <v-btn 
            color="grey" 
            size="large" 
            variant="text" 
          > 예 </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>

</template>

<script>
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from 'vue'
// import { useContractStore } from '../stores/contract';
export default {
  setup() {
    const obj = ref({})
    const router = useRouter();
    // const contractStore = useContractStore()
    // const contractList = computed(() => contractStore.getContracts);
    const localContractList = computed(() => [JSON.parse(window.localStorage.getItem('contract'))])
    const user = computed(() => JSON.parse(window.localStorage.getItem('user')))

    onMounted(() => {                
      obj.value = localContractList.value.find(contract => contract.id == router.currentRoute.value.params.id)      
    })

    return { obj, user }
  },
}
</script>