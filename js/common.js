// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})

//加入axios的配置
//配置请求根路径
axios.defaults.baseURL = 'http://ajax-api.itheima.net'
//配置请求头
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  console.dir(error)
  if (error.request.status == 401) {
    location.href = './login.html'
  }
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});
//退出
document.querySelector('#logout')?.addEventListener('click', function () {
  if(!confirm('是否要退出'))return
  localStorage.removeItem('token')
  location.href='./login.html'
 })