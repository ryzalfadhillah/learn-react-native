import axios from 'axios'
import { BASE_URL, API_KEY} from '@env'

const satellite = axios.create({
    baseURL: BASE_URL,
    timeout: 5000, // in millisecond 
    headers: {
        'Content-Type': 'application/json',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
        'api-key': API_KEY
    },
});

// Menambahkan interceptor ketika mengirim request
axios.interceptors.request.use(function (config) {
    // Lakukan Sesuatu sebelum request dikirimkan
    console.log("RESPONSE DIKIRIM");
    return config;
}, function (error) {
    // Lakukan Sesuatu ketika terjadi error
    console.log("RESPONSE DIKIRIM ERROR");
    return Promise.reject(error);
});

// Menambahkan interceptor ketika menerima response
axios.interceptors.response.use(function (response) {
    // Semua status kode dengan rentan 2xx -an
    // akan dipanggil di sini
    console.log("RESPONSE DITERIMA");
    // Lakukan Sesuatu ketika menerima response data
    return response;
}, function (error) {
    // Semua status kode dengan rentan selain 2xx 
    // akan dipanggil di sini
    console.log("RESPONSE DITERIMA ERROR");
    // Lakukan Sesuatu ketika menerima response error
    return Promise.reject(error);
});

export default satellite