// src/store/index.js
import { createStore } from 'vuex'

// user:{
//   username:null,
//   avatar:null,
//   token:null,
//    isAdmin:null
// }

const store = createStore({
  state() {
    return {
      user:JSON.parse(localStorage.getItem('user'))||{}
    }
  },
  mutations: {
    setUser(state,user) {
      state.user=user
      localStorage.setItem('user',JSON.stringify(user))
    },
    removeUser(state){
      state.user=null
      localStorage.removeItem('user')
    }
  },
  getters: {
    getUsername: (state) => state.user.username,
    getToken: (state)=>state.user.token,
    getIsAdmin: (state)=>state.user.admin
  }
})

export default store
