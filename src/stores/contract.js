import { defineStore } from "pinia";
import axios from 'axios'
const HEADER = {
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }
}

export const useContractStore = defineStore({
  id: "contract",
  state: () => ({
    contracts: [],
    contracted: [],
    id: 0,
    resLoaded: false,
    initFlag: false,
    tempLocalStorage: [],
    user: {}
  }),
  getters: {
    getContracts() {
      return this.contracts;
    },    
    getResLoaded() {
      return this.resLoaded;
    },
    getLocalContracts() {
      return Object.values(window.localStorage)
    }
  },
  actions: {
    addContract(payload) {
      this.contracts.push({
        ...payload,
        createDate: getToday(),
        id: this.id++
      });

      const strPayload = JSON.stringify({
        ...payload,
        createDate: getToday(),
        id: this.id++
      })

      window.localStorage.setItem('contract', strPayload)      
    },

    loadContract() {
      console.log()
    },

    initState() {      
      this.contracted = Array.from({length: 5}, (_, i) => ({
        id: i,
        text: `계약내용${i}`
      }))
      
    },
    
    findContract(payload) {      
      this.resLoaded = true      
      const res = this.contracted.find(contract => contract.id == payload)
      if(res) return res
      else return {
        id: 404,
        text: '계약내용을 찾을 수 없음.'
      }      
    },
    

    async homeContract() {
      const res = await axios.get('/api', HEADER)
      console.log('res', res.data)
    },

    async createContract(payload) {
      console.log(payload)
      // const res = await axios.post('/api', )
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
