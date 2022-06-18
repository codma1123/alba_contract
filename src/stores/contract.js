import { defineStore } from "pinia";
import contract  from '../utils/contract.json'
import { ethers } from 'ethers'

const EMPLOY_ADDRESS = '0xAfcd5f80c87670c81aa574A44Ac7AfAE74470677'
const WORKS_ADDERSS = '0xD6Fde840500CC00C192fDD4AE62179db58E195aa'

export const useContractStore = defineStore({
  id: "contract",
  state: () => ({
    contracts: [],
    contracted: [],
    contractList: [],
    id: 0,
    ethereum: {},
    resLoaded: false,
    initFlag: false,
    tempLocalStorage: [],
    user: {},
    connectedContract: null,
    signer: null,
    provider: null,
    loaded: false
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
    async addContract(payload) {
      const { ethereum } = window      
      const provider = new ethers.providers.Web3Provider(ethereum)

      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(
        EMPLOY_ADDRESS,
        contract,
        signer
      )      

      const {owner, tele, pay, date, textArea, company, start, end } = payload
      this.contracts.push({
        ...payload,
        createDate: getToday(),
        id: ++this.id
      });

      this.contractList.push({
        ...payload,
        createDate: getToday(),
        id: this.id++
      })

      const strPayload = JSON.stringify({
        ...payload,
        createDate: getToday(),
        id: this.id++
      })

      window.localStorage.setItem('contract', strPayload)      

      console.log('whiat')

      const res = await connectedContract.addEmploy(        
        owner, tele, pay, date, `${start} ~ ${end}`, company, textArea 
      )
      

      console.log(res.hash)
    },

    deleteContract(id) {
      this.contractList.find(contract => contract.id === id)      
      console.log(this.contractList.value)
    },

    loadContract() {
      console.log()
    },

    initState() {      
      this.contracted = Array.from({length: 5}, (_, i) => ({
        id: i,
        text: `계약내용${i}`
      }))

      console.log('init')
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

    async addWorker(user) {
      const { ethereum } = window      
      const provider = new ethers.providers.Web3Provider(ethereum)

      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(
        WORKS_ADDERSS,
        contract,
        signer
      )      

      const userString = JSON.stringify(user)
      window.localStorage.setItem('user', userString)
      this.user = user

      console.dir(connectedContract.addWorker)

      try {
        const res = await connectedContract.addWorker(
          user.name, user.tele, user.age          
        )
        console.log(res)
      } catch(e) {
        console.log(e)
      }

    },

    async applyContract() {
      const { ethereum } = window      
      const provider = new ethers.providers.Web3Provider(ethereum)

      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(
        WORKS_ADDERSS,
        contract,
        signer
      )      
      
      try {
        const res = await connectedContract.Employcontract()
        console.log(res)
      } catch(e) {
        console.log(e)
      }
    },

    async searchContract() {
      const { ethereum } = window      
      const provider = new ethers.providers.Web3Provider(ethereum)

      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(
        EMPLOY_ADDRESS,
        contract,
        signer
      )
      
      try {
        const res = await connectedContract.employcontract
        console.log(res)
      } catch(e) {
        console.log(e)
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

