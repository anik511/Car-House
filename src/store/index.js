import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    inventory:[],
    cart:[],
    closerpicelist: true,
  },
  getters:{
    getInvetory(state){
        return state.inventory
    },
    getCart(state){
        return state.cart
    },
    getcloserpicelist(state){
        return state.closerpicelist;
    }
  },
  mutations:{
    setCards(state, payload){
        state.inventory = payload
    },
    addToCart(state, payload){
        console.log("Payload Id",payload.id);
        state.cart.push(payload);
    },
    currentStock(state, payload){
        console.log("Current Stock");
        var index = state.inventory.findIndex(x => x.id == payload);
        state.inventory[index].stock -= 1;
        console.log(state.inventory[index].stock +' '+ state.inventory[index].title);
    },
    restoreStock(state, payload){ 
        console.log("from remove");
        var index = state.inventory.findIndex(x => x.id == payload);
        state.inventory[index].stock += 1;

    },
    closeCart(state, payload){
        state.closerpicelist = payload;
    },
    removeItem(state, payload){
        state.cart.splice(payload, 1)
    },
    clearList(state){
        state.cart =[]
    },
    soldCars(state, payload){
        console.log("Payload:",payload);
        var item
        for(item of payload){
            console.log("sold items: ",item.id);
            var index = state.inventory.findIndex(x => x.id == item.id);
            if(state.inventory[index].stock == 0){
                state.inventory[index].sold = true;
            }
        }
    },
  },
  actions:{
    addToCart(context, payload){
        context.commit('addToCart', payload)
    },
    closeCart(context, payload){
        context.commit('closeCart', payload)
    },
    currentStock(context, payload){
        context.commit('currentStock', payload)
    },
    restoreStock(context, payload){
        context.commit('restoreStock', payload)
    },
    soldCars(context, payload){
        context.commit('soldCars', payload)
    }
  },
  modules: {
  }
})
