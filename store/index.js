// GLOBAL Module
const getDefaultState = () => {
  return {
    users: [],
  };
};

export const state = getDefaultState;

export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export const getters = {
  getUsers: (state) => {
    return state.users;
  },
  getChartData: (state) => {
    const dataCollection = {
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        },
      ],
      labels: [],
    };
    state.users.map((user) => {
      const color = getRandomColor();
      dataCollection.datasets[0].data.push(user.participation);
      dataCollection.datasets[0].backgroundColor.push(color);
      dataCollection.datasets[0].hoverBackgroundColor.push(color);
      dataCollection.labels.push(`${user.name.first}${user.name.last}`);
    });

    return dataCollection;
  },
};

export const actions = {
  setServices({ commit }, users) {
    commit("SET_USERS", users);
  },
  resetState({ commit }) {
    commit("resetState");
  },
};

const getRandomColor = () => "hsla(" + Math.random() * 360 + ", 100%, 50%, 1)";
