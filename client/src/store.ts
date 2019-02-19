import Vue from "vue";
import Vuex, { MutationTree, ActionTree } from "vuex";

import { APIConfig } from "./utils/api.utils";
import axios, { AxiosResponse } from "axios";

import { iUser } from "@/models/user.interface";
import { iAnnouncement } from "./models";

Vue.use(Vuex);

interface iRootState {
  userToken: string | null;
  user: iUser | null;
  announcements: iAnnouncement[] | null;
}

interface iLoginPayload {
  token: string;
  userid: number;
}

const state: iRootState = {
  userToken: null,
  user: null,
  announcements: null
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
  setAnnouncements(state, payload) {
    var { announcements } = payload;
    announcements = announcements.sort(decreasingOrder);
    state.announcements = announcements;
  },
  addAnnouncement(state, payload) {
    const { announcement } = payload;
    if (state.announcements) {
      state.announcements.push(announcement);
      state.announcements = state.announcements.sort(decreasingOrder);
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
  },
  fetchAnnouncements({ commit }) {
    return axios
      .get(APIConfig.buildUrl("/announcements"))
      .then((res: AxiosResponse<iAnnouncement[]>) => {
        commit("setAnnouncements", { announcements: res.data });
        return res.data;
      });
  },
  addAnnouncement({ commit }, payload) {
    const { title, content } = payload;
    axios
      .post(APIConfig.buildUrl("/announcements"), {
        newTitle: title,
        newContent: content
      })
      .then((response: AxiosResponse<iAnnouncement>) => {
        commit("addAnnouncement", { announcement: response.data });
        return response.data;
      })
      .catch(res => {
        this.error = res.response && res.response.data.error;
      });
  },
  deleteAnnouncement({ dispatch }, payload) {
    const { id } = payload;
    axios.delete(APIConfig.buildUrl(`/announcements/${id}`)).then(response => {
      if (response.status === 200) {
        dispatch("fetchAnnouncements");
      }
    });
  }
};

function decreasingOrder(a: iAnnouncement, b: iAnnouncement) {
  return b.id - a.id;
}

export default new Vuex.Store({
  state,
  mutations,
  actions
});
