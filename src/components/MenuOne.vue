<template>
  <v-container class="text-center">
    <v-row>
      <v-col cols="12">
        <h1>계약서 생성</h1>
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
              <v-btn color="grey" size="large" variant="text" @click="goHome">
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
          label="근로장소"
          autofocus
          required
          :rules="companyRules"
          clearable
          variant="outlined"
          v-model="company"
        ></v-text-field>

        <v-row>
          <v-col cols="6">
            <v-text-field
              label="고용주 전화번호"
              required
              :rules="payRules"          
              variant="outlined"
              v-model="tele"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="고용주 이름"
              required
              :rules="payRules"          
              variant="outlined"
              v-model="owner"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-text-field
          class="mt-5"
          label="급여"
          required
          :rules="payRules"
          prefix="₩"
          variant="outlined"
          v-model="pay"
          @blur="toLocale"
        ></v-text-field>

        <v-text-field
          label="근로 시작 날짜"
          required
          :rules="payRules"          
          variant="outlined"
          v-model="date"
        ></v-text-field>
              
        <v-row>
          <v-col cols="6">
            <v-select
              variant="outlined"
              label="시작 시간"
              required
              :rules="timeRules"
              :items="startTime"
              v-model="selectedStartTime"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              variant="outlined"
              label="종료 시간"
              required
              :items="endTime"
              v-model="selectedEndTime"
            ></v-select>
          </v-col>
        </v-row>

        <v-textarea
          rows="3"
          auto-grow
          label="업무 내용"
          clearable
          v-model="textArea"
        >
        </v-textarea>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-divider></v-divider>

    <v-btn variant="outlined" block right class="mt-5 mr-5" @click="submit">
      계약서 생성
    </v-btn>
  </v-container>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useContractStore } from "../stores/contract";

export default {
  name: "MenuOne",
  setup() {
    const company = ref("");
    const pay = ref();
    const time = ref("");
    const textArea = ref("");
    const homeDialog = ref(false);
    const selectedStartTime = ref("");
    const selectedEndTime = ref("");
    const date = ref("")
    const tele = ref("")
    const owner = ref("")

    const formContents = ref({
      company: "",
      pay: "",
      time: "",
      textArea: "",
      homeDialog: "",
      selectedStartTime: "",
      selectedEndTime: ""
    })

    const startTime = Array.from({ length: 24 }, (_, i) => `${i}시`);
    const endTime = Array.from({ length: 24 }, (_, i) => `${i}시`);

    const router = useRouter();
    const contractStore = useContractStore();

    const payRules = [
      value => typeof value === "string" || "숫자 입력 바람",
      value => !!value || "필수 입력 사항입니다.",
    ];

    const timeRules = [
      value => !Number(value.slice(0, 2)) < Number(selectedEndTime.value.slice(0, 2)) || '시작시간이 종료시간보다 짧을 수 없습니다.'
    ]

    const companyRules = [(value) => !!value || "필수 입력 사항입니다."];

    watch(pay, () => {});

    function toLocale() {
      if (pay.value.includes(",")) {
        pay.value = pay.value.split(",").join("").toLocaleString();
        return;
      }

      if (pay.value >= 1000) {
        pay.value = Number(pay.value).toLocaleString();
      }
    }

    function goHome() {
      router.push("/bc");
    }

    function submit() {
      if (validate) {
        contractStore.addContract({
          company: company.value,
          pay: pay.value,
          time: time.value,
          textArea: textArea.value,
          start: selectedStartTime.value,
          end: selectedEndTime.value,
          date : date.value,
          tele: tele.value,
          owner: owner.value
        });

        router.push("/bc");
      }
    }

    function validate() {
      return true;
    }

    onMounted(() => {});

    return {
      company,
      pay,
      toLocale,
      time,
      textArea,
      startTime,
      endTime,
      selectedStartTime,
      selectedEndTime,
      date,
      tele,
      owner,

      payRules,
      companyRules,
      timeRules,

      formContents,

      homeDialog,
      goHome,
      submit,
    };
  },
};
</script>
