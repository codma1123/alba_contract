<template>
  <v-container class="text-center">
    <v-row class="mb-5">
      <v-col cols="12">        
        <v-card color="grey-darken-2" elevation="0" outlined>
          <h1>고용주 메뉴 선택</h1>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12">
        <v-card
          height="500"
          link
          class="menu mt-15"
          to="/bc/menu1"
          elevation="0"
          color="blue-lighten-3"
        >
          <v-row class="d-flex justify-center align-center">
            <v-col class="text-h3 font-weight-bold">계약서 생성</v-col>                    
          </v-row>
          <v-icon :size="iconSize.create" class="">mdi-clipboard-edit-outline</v-icon>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          height="300"
          link
          to="/bc/menu2"
          elevation="0"
          color="red-lighten-3"
        >
          <v-row class="d-flex justify-center align-center">
            <v-col class="text-h4 font-weight-bold">계약서 조회</v-col>                    
          </v-row>
          <v-icon :size="iconSize.search">mdi-clipboard-search-outline</v-icon>          
          
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          height="300"
          link
          to="/bc/menu3"
          elevation="0"
          color="green-lighten-3"
        >
          <v-row class="d-flex justify-center align-center">
            <v-col class="text-h4 font-weight-bold">계약 내역 조회</v-col>                    
          </v-row>
          <v-icon :size="iconSize.search">mdi-clipboard-text-search</v-icon>                    
          
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
import { ref } from "vue";

export default {
  name: "BcHome",
  setup() {
    const testVar = ref({
      text: "CODMA",
    });

    const iconSize = {
      create: 380,
      search: 220
    }


    const menus = [
      {
        title: "MENU1",
        link: "/bc/menu1",
      },
      {
        title: "MENU2",
        link: "/bc/menu2",
      },
      {
        title: "MENU3",
        link: "/bc/menu3",
      },
    ];


    return { testVar, menus, iconSize };
  },
};
</script>

<style scoped>

</style>
