import { defineStore } from "pinia";

export const useContractStore = defineStore({
  id: "contract",
  state: () => ({
    contracts: [],
    contracted: [],
    id: 0,
    resLoaded: false
  }),
  getters: {
    getContracts() {
      return this.contracts;
    },    
    getResLoaded() {
      return this.resLoaded;
    }
  },
  actions: {
    addContract(payload) {
      this.contracts.push({
        ...payload,
        createDate: getToday(),
        id: this.id++
      });
    },

    initState() {
      this.contracted = Array.from({length: 5}, (_, i) => ({
        id: i,
        text: `계약내용${i}`
      }))
      console.log(this.contracted)
    },

    findContract(payload) {      
      this.resLoaded = true      
      const res = this.contracted.find(contract => contract.id == payload)
      if(res) return res
      else return {
        id: 404,
        text: '계약내용을 찾을 수 없음.'
      }      
    }
  },
});

function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}
