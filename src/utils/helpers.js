import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'https://nameless-reaches-07730.herokuapp.com/api'

const axiosInstance = axios.create({
    baseURL,
})

axiosInstance.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    err => Promise.reject(err)
)

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
    toast: true,
    width: "394px",
    position: "top-end",
    padding: "24px",
    customClass: {
        title: "toast__title",
        popup: "toast__popup"
    },
    showConfirmButton: false,
    timer: 3000,
})

export const ToastIcon = {
    greenCheckHtml: `<div class="toast__icon">
  <div class="toast__icon__outer">
    <svg width="56" height="56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="27" stroke="#82C43C" stroke-width="2" />
    </svg>
  </div>
  <div class="toast__icon__inner">
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="m5 12 6 6L20 6" stroke="#82C43C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>
</div>`,
    redCrossHtml: `<div class="toast__icon">
  <div class="toast__icon__outer">
    <svg width="56" height="56" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="28" r="27" stroke="#FC5A5A" stroke-width="2"/></svg>
  </div>
  <div class="toast__icon__inner">
   <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.8512 2.4513a.9204.9204 0 1 0-1.3008-1.3024L8 6.6993 2.4512 1.1489a.921.921 0 1 0-1.3024 1.3024L6.6992 8l-5.5504 5.5488a.9201.9201 0 0 0-.2697.6512.9208.9208 0 0 0 1.5721.6512L8 9.3009l5.5504 5.5504a.9207.9207 0 0 0 1.3016-.0008.9207.9207 0 0 0-.0008-1.3016L9.3008 8.0001l5.5504-5.5488Z" fill="#FC5A5A"/></svg>
  </div>
</div>`,
    yellowWarningHtml: `<div class="toast__icon">
  <div class="toast__icon__outer">
    <svg width="56" height="56" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="28" r="27" stroke="#FFC542" stroke-width="2"/></svg>
  </div>
  <div class="toast__icon__inner">
   <svg width="4" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.5 15.8438a1.4999 1.4999 0 1 0 2.9998 0 1.4999 1.4999 0 0 0-2.9998 0Zm.75-3.9376h1.5a.188.188 0 0 0 .1875-.1874V.8438A.188.188 0 0 0 2.75.6563h-1.5a.188.188 0 0 0-.1875.1875v10.875a.188.188 0 0 0 .1875.1874Z" fill="#FFC542"/></svg>
  </div>
</div>`,
    blueInformHtml: `<div class="toast__icon">
  <div class="toast__icon__outer">
    <svg width="56" height="56" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="28" r="27" stroke="#50B5FF" stroke-width="2"/></svg>
  </div>
  <div class="toast__icon__inner">
    <svg width="4" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.5 2.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Zm2.25 3.9375h-1.5a.188.188 0 0 0-.1875.1875V17.25a.188.188 0 0 0 .1875.1875h1.5a.188.188 0 0 0 .1875-.1875V6.375a.188.188 0 0 0-.1875-.1875Z" fill="#50B5FF"/></svg>
  </div>
</div>`
}