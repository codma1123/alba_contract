<template>
  <v-container class="text-center">
    <v-row class="mb-5">
      <v-col cols="12">
        <v-card color="grey-darken-2" elevation="0" outlined>
          <h1>근로자 메뉴 선택</h1>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>    
    <v-row>
      <v-col cols="12">
        <v-card 
          elevation="1"
          outlined          
          height="40vh"
          width="95%"          
          link
          :to="'/bc/menu3'"
          color="green-lighten-3"
        >                  
          <v-row class="d-flex justify-center align-center">
            <v-col class="text-h3 font-weight-bold">계약서 내역 조회</v-col>                    
          </v-row>
          <v-icon :size="iconSize" class="">mdi-clipboard-edit-outline</v-icon>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card 
          class="mt-5"
          elevation="1"
          outlined          
          height="40vh"
          width="95%"
          link
          :to="'/user/info'"
          color="blue-lighten-3"
        >        
          <v-row class="d-flex justify-center align-center">
            <v-col class="text-h3 font-weight-bold">근로자 정보 입력</v-col>                    
          </v-row>
          <v-icon :size="iconSize" class="">mdi-account-edit</v-icon>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-container>
</template>

<script>

const ICON_SIZE = 380

export default {
  setup() {
    const message = 'user'

    const iconSize = ICON_SIZE


    return { message, iconSize }
  }
}
</script>

<style>

</style>