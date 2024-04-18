// ini akan dipakai untuk set data pada redux
export function setCount(data) {
    return {
      type: "@APP/COUNT", // id(type) harus sama dengan yang di pakai reducers
      payload: data, // payload yang digunakan untuk merubah value
    };
}