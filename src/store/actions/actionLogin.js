// ini akan dipakai untuk set data pada redux
export function setLogin(data) {
    return {
      type: "@APP/LOGIN", // id(type) harus sama dengan yang di pakai reducers
      payload: data, // payload yang digunakan untuk merubah value
    };
}

export function setLogout() {
  return {
    type: "@APP/LOGOUT", // id(type) harus sama dengan yang di pakai reducers
    // payload: null,
  };
}