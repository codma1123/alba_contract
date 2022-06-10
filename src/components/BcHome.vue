<template>
  <v-container class="text-center">
    <v-row>
      <v-col cols="12">
        <h1>메뉴 선택</h1>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12">
        <v-card
          height="380"
          class="d-flex justify-center align-center"
          link
          to="/bc/menu1"
          elevation="0"
          color="grey-lighten-3"
        >
          <span class="text-h5">계약서 생성</span>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          height="250"
          class="d-flex justify-center align-center"
          link
          to="/bc/menu2"
          elevation="0"
          color="grey-lighten-3"
        >
          <span class="text-h5">계약서 조회 및 발송</span>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          height="250"
          class="d-flex justify-center align-center mb-5"
          link
          to="/bc/menu3"
          elevation="0"
          color="grey-lighten-3"
        >
          <span class="text-h5">계약 내역 조회</span>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
import { onMounted, ref } from "vue";
import { useContractStore } from "../stores/contract";

export default {
  name: "BcHome",
  setup() {
    const testVar = ref({
      text: "CODMA",
    });

    const contractStore = useContractStore()

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

    onMounted(() => {
      contractStore.initState()
    })

    return { testVar, menus };
  },
};
</script>
