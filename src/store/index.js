import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
   soundtracks: [],
   searchValue: '',
   searchValue2: '',
   lovelySoundtracks: [],
   isShow: false,
   isStar: false,
   notification: [],
   soundtrack: [], 
   information: [],
   deleteArr: [],
   soundtrack2: {},
   isDelete: false, //Сделаю еще одну, отдельную переменную 
   isDelete2: false,
   isAuth: false,
   error: false,
   isProcessing: false,
   settings: [
        {
          id: 1,
          text: "Стандартно"   
        },
        {
          id: 2,
          text: "По авторам"
        },
        {
          id: 3,
          text: "По алфавиту"
        },
        {
          id: 4,
          text: "Рандомно"
        },
        {
          id: 5,
          text: "По продолжительности"
        },
        {
          id: 6,
          text: "По рейтингу"
        }
   ], 

   user: {
     isAuthenticated: false,
     uid: null,
     email: null,
     password: null
   },

   mark: 0
  },

  mutations: {
     SET_SOUND_FROM_API(state, sound) {
     	 state.soundtracks = sound
     },

     SET_SEARCH_VALUE(state, value) {
       state.searchValue = value
     },

     SET_SEARCH_VALUE2(state, value2) {
        state.searchValue2 = value2
     },

     PUT_LOVELY_SOUNDTRACKS2(state, sound) {
        state.lovelySoundtracks.unshift(sound) 
     },

     SET_NOTIFICATION(state, notif) {
        state.notification.push(notif) 
     },

     DELETE_LOVELY_SOUNDTRACKS2(state, index) {
        state.lovelySoundtracks.splice(index, 1)
     },

     SET_SOUNDTRACK(state, sound2) {
       state.soundtrack = sound2
     },

     SET_SHOW(state, show2) {
       state.isShow = show2
     },

     SET_MARK(state, mark) {
       state.mark = mark
     },

     SET_STAR(state, star2) {
       state.isStar = star2
     },

     SET_SETTINGS(state, setting) {
       state.settings.push(setting)
     },

     SET_DELETE(state, del) {
       state.isDelete = del
     },

     SET_DELETE2(state, del4) {
       state.isDelete2 = del4
     },

     SET_INFORMATION(state, inform) {
       state.information = inform
     },

     SET_DELETE_ARRAY(state, del2) {
       state.deleteArr.unshift(del2) 
     },

     CHANGE_AUTH(state, auth) {
       state.isAuth = auth 
     },

     SET_PROCESSING(state, payload) {
       state.isProcessing = payload
     }, 

     SET_ERROR(state, err) {
       state.error = err
     },

     SET_USER(state, payload) {
       state.user.isAuthenticated = true
       state.user.uid = payload.uid
       state.user.email = payload.email
       state.user.password = payload.password
     },

     DEL_DELETE_ARRAY(state, idx) {
       state.deleteArr.splice(idx, 1)
     },

     CLEAR_USER(state) {
       state.user = {
          isAuthenticated: false,
          uid: null,
          email: null,
          password: null
       } 
     },

     SET_SOUNDTRACK2(state, inform2){
       state.soundtrack2 = inform2
     }
  },

  actions: {
    GET_SOUND_FROM_API({commit}) {
      Vue.$db.collection('soundtracks')
      .get()
      .then(querySnaphot => {
         let sounds = []

         querySnaphot.forEach(s => {
           let data = s.data()

           let sound = {
              id: data.id,
              ComposerName: data.ComposerName,
              SoundName: data.SoundName,
              MainImg: data.MainImg,
              SoundSource: data.SoundSource,
              SoundCollection: data.SoundCollection,
              Mark: data.Mark,
              BgColor: data.BgColor,
              Shows: data.Shows
           }

           sounds.push(sound)
         })

         commit('SET_SOUND_FROM_API', sounds)
      }) 
      .catch(err => {
        console.log(err)
      })
    },

    GET_SEARCH_VALUE({commit}, value) {
        commit('SET_SEARCH_VALUE', value)
    },

    GET_SEARCH_VALUE2({commit}, value2) {
        commit('SET_SEARCH_VALUE2', value2)  
    },

    PUT_LOVELY_SOUNDTRACKS({commit}, sound) {
        commit('PUT_LOVELY_SOUNDTRACKS2', sound)
    },

    DELETE_LOVELY_SOUNDTRACKS({commit}, index) {
        commit('DELETE_LOVELY_SOUNDTRACKS2', index)
    },

    SET_NOTIFICATION({commit}, notif) {
        commit('SET_NOTIFICATION', notif)
    },

    GET_SOUNDTRACK({commit}, sound2) {
        commit('SET_SOUNDTRACK', sound2)
    },

    SET_SHOW({commit}, show) {
        commit('SET_SHOW', show) 
    },

    SET_MARK({commit}, mark) {
       commit('SET_MARK', mark)
    },

    SET_STAR({commit}, star) {
       commit('SET_STAR', star)
    },

    SET_SETTINGS({commit}, setting) {
       commit('SET_SETTINGS', setting)
    },

    SET_DELETE({commit}, del) {
       commit('SET_DELETE', del)  
    },

    SET_DELETE2({commit}, del4) {
       commit('SET_DELETE2', del4)
    },

    SET_DELETE_ARRAY({commit}, del2) {
       commit('SET_DELETE_ARRAY', del2)
    },

    DEL_DELETE_ARRAY({commit}, del3) {
       commit('DEL_DELETE_ARRAY', del3)
    },

    CHANGE_AUTH({commit}, auth) {
       commit('CHANGE_AUTH', auth)
    },

    SET_INFORMATION({commit}, inform) {
       commit('SET_INFORMATION', inform)
    },

    SET_SOUNDTRACK2({commit}, inform2) {
      commit('SET_SOUNDTRACK2', inform2)
    },

    SIGNUP({commit}, reg) {  
        firebase.auth().createUserWithEmailAndPassword(reg.email, reg.password)
           .then((user) => {
             commit('SET_PROCESSING', true)
           })
           .catch((error) => {
              commit('SET_PROCESSING', false)
              
              console.log(error)
           });
    },

    SIGNIN({commit}, aut) { 
      firebase.auth().signInWithEmailAndPassword(aut.email, aut.password)
          .then((user) => {
             commit('SET_PROCESSING', true)
          })
          .catch((error) => {
             commit('SET_PROCESSING', false)

             console.log(error)
          });
    },

    SIGNOUT() {
      firebase.auth().currentUser.delete()    
    },

    SET_CHANGED({commit}, payload) { 
      commit('SET_USER', {uid: payload.uid, email: payload.email, password: payload.password})
    }
  },

  getters: {
  	SOUNDTRACKS: (state) => state.soundtracks,  

    SEARCHVALUE: (state) => state.searchValue,

    SEARCHVALUE2: (state) => state.searchValue2,

    LOVELYSOUNDTRACKS: (state) => state.lovelySoundtracks,

    ISSHOW: (state) => state.isShow,

    NOTIFICATION: (state) => state.notification,

    SOUNDTRACK: (state) => state.soundtrack,

    MARK: (state) => state.mark,

    SETTINGS: (state) => state.settings,

    INFORMATION: (state) => state.information,

    SOUNDTRACK2: (state) => state.soundtrack2,

    DELETEARR: (state) => state.deleteArr,

    SHOW_DELETE:(state) => state.isDelete,

    IS_AUTH:(state) => state.isAuth,

    IS_AUTH2: (state) => state.user.isAuthenticated,

    SHOW_DELETE2:(state) => state.isDelete2,

    STAR:(state) => state.isStar,

    PROCESSING:(state) => state.isProcessing,

    ERROR:(state) => state.error,

    USER: (state) => state.user
  } 
});
