<template>
  <v-container class="text-center">
    <v-row>
      <v-col cols="12">
        <h1>근로자 메뉴 선택</h1>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12">        
      </v-col>  
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card 
          elevation="1"
          outlined          
          height="40vh"
          width="95%"
          class="d-flex align-center justify-center"
          link
          :to="'/bc/menu3'"
        >        
          <span class="text-h5">계약 내역 조회</span>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card 
          elevation="1"
          outlined          
          height="40vh"
          width="95%"
          class="d-flex align-center justify-center"
          link
          :to="'/user/info'"
        >        
          <span class="text-h5">근로자 정보 입력</span>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
export default {
  setup() {
    const message = 'user'

    return { message }
  }
}
</script>

<style>

</style>