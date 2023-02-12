import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({

  // 组件中通过 this.$store.state.username 调用
  state: {
    poolInstance: {},
    poolInstance2: {},

    delegateInstance: {},
    delegateInstance2: {},

    larktokenInstance: {},
    larktokenInstance2: {},
		ercAbi: [],
		
		wyoyoInstance: {},
		wyoyoInstance2: {},


    artInstance: {},
    artInstance2: {},
		
		ArtistAbi: [],
		
		photoInstance: {},
		photoInstance2: {},

    created: [],
		photoCreated: []



  },
  mutations: {
    // 组件中通过 this.$store.commit('saveToken',参数)  调用,只能带一个参数，有多个参数以对象的形式传入
    savePoolInstance: function (state, instance){
      state.poolInstance = instance
    },
    savePoolInstance2: function (state, instance2){
      state.poolInstance2 = instance2
    },

    saveDelegateInstance: function (state, instance){
      state.delegateInstance = instance
    },
    saveDelegateInstance2: function (state, instance2){
      state.delegateInstance2 = instance2
    },

    savelarktokenInstance: function (state, instance){
      state.larktokenInstance = instance
    },
    savelarktokenInstance2: function (state, instance2){
      state.larktokenInstance2 = instance2
    },
		saveERCAbi: function (state, abi){
		  state.ercAbi = abi
		}, 
		
		saveArtistAbi: function (state, abi){
		  state.ArtistAbi = abi
		}, 
		
		//wyoyoInstance
		saveWyoyoInstance: function (state, instance){
		  state.wyoyoInstance = instance
		},
		saveWyoyoInstance2: function (state, instance2){
		  state.wyoyoInstance2 = instance2
		},

    saveArtInstance: function (state, instance){
      state.artInstance = instance
    },
    saveArtInstance2: function (state, instance2){
      state.artInstance2 = instance2
    },
		
		savePhotoInstance: function (state, instance){
		  state.photoInstance = instance
		},
		savePhotoInstance2: function (state, instance2){
		  state.photoInstance2 = instance2
		},

    saveCreated: function (state, instance){
      state.created = instance
    },
		savePhotoCreated: function (state, instance){
		  state.photoCreated = instance
		},
		

  }
})

