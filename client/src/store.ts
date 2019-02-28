import Vue from "vue";
import Vuex, { MutationTree, ActionTree } from "vuex";

import { APIConfig } from "./utils/api.utils";
import axios, { AxiosResponse } from "axios";

import { iUser } from "@/models/user.interface";
import { iItem, iCartItem } from './models';

Vue.use(Vuex);

interface iRootState {
  userToken: string | null;
  user: iUser | null;
  cartItems: iCartItem[];
}

interface iLoginPayload {
  token: string;
  userid: number;
}

const state: iRootState = {
  userToken: null,
  user: null,
  cartItems: [],
};

const mutations: MutationTree<iRootState> = {
  setUser(state, payload) {
    state.user = payload.user;
  },
  login(state, payload) {
    const { token, user } = payload;
    state.userToken = token;
    state.user = user;
  },
  logout(state) {
    state.userToken = null;
    state.user = null;
  },
  addItem(state, payload) {
    let index = -1;
    state.cartItems.forEach(cartItem => {
      if (cartItem.item.id == payload.id) {
        index = state.cartItems.indexOf(cartItem)
      }
    });
    if (index > -1) {
      state.cartItems[index].quantity++;
    } else {
      state.cartItems.push({
        item: payload,
        quantity: 1
      })
    }
  },
  removeItem(state, payload) {
    const index = state.cartItems.indexOf(payload)
    if (index > -1) {
      state.cartItems.splice(index, 1)
    }
  },
  changeItemQuantity(state, payload) {
    let index = -1;
    state.cartItems.forEach(cartItem => {
      if (cartItem.item.id == payload.item.id) {
        index = state.cartItems.indexOf(cartItem)
      }
    })
    if (index > -1) {
      state.cartItems[index].quantity = payload.quantity
    }
  }
};

const actions: ActionTree<iRootState, iRootState> = {
  fetchUser({ commit }, payload) {
    const { userid } = payload;
    return axios
      .get(APIConfig.buildUrl(`/users/${userid}`))
      .then((res: AxiosResponse<{ user: iUser }>) => {
        commit("setUser", { user: res.data.user });
        return res.data.user;
      });
  },
  login({ commit, dispatch }, payload) {
    const { userid, token } = payload;
    dispatch("fetchUser", { userid }).then(user => {
      commit("login", { user, token });
    });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
