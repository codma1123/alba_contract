<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>계약서 조회 및 전송</h1>
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
        <v-dialog 
          v-model="dialog">
          <v-card rounded="sm">
            <v-card-title>
              계약서 전송
            </v-card-title>
          </v-card>          
          <v-carousel             
            height="auto"
            v-model="carousel"
            hide-delimiters
            hide-delimiter-background	
            :show-arrows="false"
          >            
            <v-carousel-item>              
              <v-card rounded="sm" width="320" height="280">                
                <v-list>
                  <v-divider></v-divider>
                  <v-list-item>                
                    <v-row>
                      <v-col cols="4">근로장소 :</v-col>
                      <v-col cols="4">{{ currentListItem.company }}</v-col>
                    </v-row>
                  </v-list-item>
                  <v-list-item>
                    <v-row>
                      <v-col cols="4">근로시간 :</v-col>
                      <v-col cols="6">{{ currentListItem.start }} ~ {{ currentListItem.end }}</v-col>
                    </v-row> 
                  </v-list-item>
                  <v-list-item>
                    <v-row>
                      <v-col cols="4">급여 :</v-col>
                      <v-col cols="6">{{ currentListItem.pay }} ₩ </v-col>
                    </v-row> 
                  </v-list-item>           
                  <v-list-item>
                    <v-row>
                      <v-col cols="4">근로내용 :</v-col>
                      <v-col cols="6">{{ currentListItem.textArea }}</v-col>
                    </v-row> 
                  </v-list-item>         
                  <v-divider></v-divider>                   
                  <v-card-subtitle class="mt-4">
                    상기 내용으로 계약서를 전송하시겠습니까?
                  </v-card-subtitle>
                </v-list>
                <v-spacer></v-spacer>            
                <v-card-actions class="d-flex justify-center mt-1">
                  <v-btn
                    color="error"
                    size="large"
                    variant="plain"
                    @click="dialog = false"
                  > 아니오 </v-btn>
                  <v-btn 
                    color="grey" 
                    size="large" 
                    variant="text" 
                    @click="carousel = 1"
                  > 예 </v-btn>
                </v-card-actions>
              </v-card>
            </v-carousel-item>
            <v-carousel-item>
              <v-card rounded="sm" width="320" height="280">
                <v-row>
                  <v-col cols="12" class="ml-15">
                    <qrcode-vue 
                      @click="router.push(`/contract/${currentListItem.id}`)"
                      :value="value" :size="200"/>
                  </v-col>                                 
                </v-row>
                <v-row class="d-flex justify-center">
                  <v-btn                     
                    variant="plain"
                    class="mt-2"
                    @click="dialog = false"
                  >
                    확인
                  </v-btn>
                </v-row>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row class="mt-1 mb-1 text-h7">
      <v-col cols="4" md="4"> <span class="ml-5"> 계약서 생성일 </span> </v-col>
      <v-col cols="2" md="2"> <span> 급여 </span> </v-col>
      <v-col cols="3" md="3"> <span> 근로시간 </span> </v-col>
      <v-col cols="3" md="3"> <span> 근로장소 </span> </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-list 
      v-if="listVaild !== 0"
      lines="two" class="mt-1">
      <div
         v-for="(contract, i) in contractList"
        :key="i"        
      >
        <v-list-item @click="openDialog(i)">
          <v-col cols="3" md="3">
            <span> {{ contract.createDate }} </span>
          </v-col>
          <v-col cols="3" md="3">
            <span> {{ contract.pay }} ₩ </span>
          </v-col>
          <v-col cols="4" md="4">
            <span> {{ contract.start }} ~ {{ contract.end }} </span>
          </v-col>
          <v-col cols="3" md="3">
            <span> {{ contract.company }}</span>
          </v-col>     
        </v-list-item>
        <v-btn 
          @click="deleteItem(i)"
          position="absolute" icon elevation="0" size="x-small" right top fab>
          <v-icon size="15">mdi-close</v-icon>
        </v-btn>
      </div>
    </v-list>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useContractStore } from "../stores/contract";
// import QRCode from 'qrcode.js'
import QrcodeVue from 'qrcode.vue'


export default {
  name: "WatchContract",
  components: {
    QrcodeVue
  },
  setup() {
    const contractStore = useContractStore();
    const router = useRouter();
    const currentListItem = ref({});
    const dialog = ref(false);
    const carousel = ref(0)
    const qrURL = ref('')

    const contractList = computed(() => contractStore.contractList);
    const localContractList = computed(() => [JSON.parse(window.localStorage.getItem('contract'))])    

    const listVaild = computed(() => window.localStorage.length)

    function goHome() {
      router.push("/bc");
    }

    function openDialog(listIndex) {
      carousel.value = 0
      currentListItem.value = localContractList.value[listIndex];
      dialog.value = true;
      qrURL.value = `/contract/${currentListItem.value.id}`
    }

    function deleteItem(index) {
      window.localStorage.removeItem('contract')      
      contractStore.deleteContract(index+1)
    }


    onMounted(() => {
      console.log([JSON.parse(window.localStorage.getItem('contract'))])
    })
    
    return {
      contractList,
      localContractList,
      router,
      goHome,
      openDialog,
      currentListItem,
      dialog,
      carousel,
      qrURL,

      deleteItem,
      listVaild

    };
  },
};
</script>
