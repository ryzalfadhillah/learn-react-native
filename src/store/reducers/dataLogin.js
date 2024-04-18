const initialState = {
    userProfile: null,
  }; // object state untuk menyimpan redux

const dataLogin = (state = initialState, action) => {
    switch (action.type) {
      case "@APP/LOGIN": // id(type) dari reducer yang kita gunakan
        return {
          ...state, // dipakai untuk meraplace key yang sama dengan value berbeda
          userProfile: action.payload, // mengubah value increment
        };
      case "@APP/LOGOUT": // id(type) dari reducer yang kita gunakan
        return {
          initialState
        };
    }
    return state;
};

export default dataLogin;