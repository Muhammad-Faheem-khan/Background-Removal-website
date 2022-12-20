import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    // Function that passes the state and returns the state with only the objects you want to store.
  reducer: state => ({
    apiCallsWaiting : state.arrayForApiCalls,
  })
  });
 
Vue.use(Vuex)

export const store = new Vuex.Store({
    plugins: [vuexLocal.plugin],
    state: {
        returnedImg: '',
        arrayForApiCalls: []
    },
    mutations: {
        removeBg(state, imgUrl){
            state.returnedImg = imgUrl
        }
    },
    actions: {
        
        removeBg(context, imgData) {
            if(window.navigator.onLine){
            fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': '8K4YKq2HEWFmvJ5JU4UrWnwf'
                },
                responseType: 'arrayBuffer',
                body: JSON.stringify({
                    "image_file_b64": imgData,
                }),
            }).then((res) => res.arrayBuffer()
            ).then(data => {
                const imgBase64 = btoa([].reduce.call(new Uint8Array(data),function(p,c){return p+String.fromCharCode(c)},''));
                    var bgRemove = 'data:image/png;base64,' + imgBase64
                    context.commit("removeBg",bgRemove)
                });
        }else{
            this.state.arrayForApiCalls.push(imgData)
            console.log(this.state.arrayForApiCalls)
        }
    }

    }
})