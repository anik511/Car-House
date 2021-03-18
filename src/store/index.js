import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    inventory:[],
    cart:[],
    closerpicelist: true,
    users: [],
    admins: [],
    status: {
        name: null,
        stat: false
    },
  },
  getters:{
    getInvetory(state){
        return state.inventory;
    },
    getCart(state){
        return state.cart;
    },
    getcloserpicelist(state){
        return state.closerpicelist;
    },
    getUsers(state){
        return state.users;
    },
    getAdmins(state){
        return state.admins;
    },
    getStatus(state){
        return state.status;
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
    setUsers(state, payload){
        state.users = payload;
    },
    setAdmins(state, payload){
        state.admins = payload;
    },
    signUp(state, payload){
        console.log('store Signup');
        state.users.push(payload);
    },
    setStatus(state, payload){
        if(payload.name == 'admin' && payload.stat == true){
            localStorage.setItem("adminLogin", true);
            state.status = payload;
            console.log("Amin Logedin ", state.status);
        }
        else if(payload.name == 'user' && payload.stat == true){
            localStorage.setItem("userLogin", true);
            state.status = payload;
            console.log("User Logedin ", state.status);
        }else{
            state.status.stat = payload;
            console.log("logOut: ", state.users);
        }
    }
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
    },
    setUsers(context, payload){
        context.commit("setUsers", payload);
    },
    setAdmins(context, payload){
        context.commit("setAdmins",payload);
    },
    setStatus(context, payload){
        context.commit("setStatus",payload);
    },
    signUp(context, payload){
        context.commit("signUp",payload);
    }
  },
  modules: {
  }
})
