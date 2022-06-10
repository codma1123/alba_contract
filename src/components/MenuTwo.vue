<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>계약서 조회 및 발송</h1>
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
              계약서 발송
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
                    상기 내용으로 계약서를 발송하시겠습니까?
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
                  <v-col cols=12>
                    <v-text-field class="ml-5 mr-5 mt-5"
                      label="발송 전화번호"
                      clearable
                      variant="outlined"
                    >
                    </v-text-field>
                  </v-col>
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
    <v-list lines="two" class="mt-1">
      <v-list-item
        @click="openDialog(i)"
        v-for="(contract, i) in contractList"
        :key="i"
      >
        <v-col cols="3" md="3">
          <span> {{ contract.createDate }} </span>
        </v-col>
        <v-col cols="3" md="3">
          <span> {{ contract.pay }} ₩ </span>
        </v-col>
        <v-col cols="4" md="4">
          <span> {{ contract.start }} ~ {{ contract.end }} </span>
        </v-col>
        <v-col cols="2" md="2">
          <span> {{ contract.company }}</span>
        </v-col>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useContractStore } from "../stores/contract";

export default {
  name: "MenuTwo",
  setup() {
    const contractStore = useContractStore();
    const router = useRouter();
    const currentListItem = ref({});
    const dialog = ref(false);
    const carousel = ref(0)

    const contractList = computed(() => contractStore.getContracts);

    function goHome() {
      router.push("/bc");
    }

    function openDialog(listIndex) {
      carousel.value = 0
      currentListItem.value = contractList.value[listIndex];
      dialog.value = true;
    }

    return {
      contractList,
      router,
      goHome,
      openDialog,
      currentListItem,
      dialog,
      carousel
    };
  },
};
</script>
