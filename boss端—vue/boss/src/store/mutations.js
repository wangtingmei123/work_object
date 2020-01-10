import * as types from './mutation-types'

const mutations = {
  [types.SET_ADDRESS] (state,address) {
    state.address_name = address;
  }
}

export default mutations;
