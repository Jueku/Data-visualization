//-------------------------获取学员列表数据----------------------------------
function renderStudent() {
  axios({
    url: '/students',
  }).then(result => {
    let newArr = result.data.data.map(item => {
      return `
       <tr>
                      <td>${item.name}</td>
                      <td>${item.age}</td>
                      <td>${item.gender ? '女' : '男'}</td>
                      <td>第${item.group}组</td>
                      <td>${item.hope_salary}</td>
                      <td>${item.salary}</td>
                      <td>${item.province}${item.city}${item.area}</td>
                      <td>
                        <a href="javascript:;" class="text-success mr-3"><i class="bi bi-pen" data-id='${item.id}'></i></a>
                        <a href="javascript:;" class="text-danger"><i class="bi bi-trash"  data-id='${item.id}'></i></a>
                      </td>
        </tr> 
      `
    })
    document.querySelector('tbody').innerHTML = newArr.join('')
  })
}
renderStudent()
//---------------------------添加学员信息-----------------------------------

//点击新增按钮
//模态框
let addModal = new bootstrap.Modal(document.querySelector('#modal'))
document.querySelector('#openModal').addEventListener('click', function () {
  document.querySelector('.modal-title').innerHTML = '添加学员'
  addModal.show() //点击新增按钮显示模态框
})

//---------------------------省市县联动--------------------------------------
let sheng = '<option value="">--省份--</option>'
let shi = '<option value="">--城市--</option>'
let xian = '<option value="">--地区--</option>'
let province = document.querySelector('[name=province]')
let city = document.querySelector('[name=city]')
let area = document.querySelector('[name=area]')
//获取省，并渲染
axios({
  url: '/api/province',
}).then(result => {
  province.innerHTML = sheng + result.data.data.map(item => `<option value="${item}">${item}</option>`).join('')
})
//点击省切换市
province.addEventListener('change', function () {
  area.innerHTML = xian//点击省切换县
  axios({
    url: '/api/city',
    params: { pname: province.value }
  }).then(result => {
    document.querySelector('[name=city]').innerHTML = shi + result.data.data.map(item => `<option value="${item}">${item}</option>`).join('')
  })
})
//点击市切换区
city.addEventListener('change', function () {
  axios({
    url: '/api/area',
    params: {
      pname: province.value,
      cname: city.value
    }
  }).then(result => {
    document.querySelector('[name=area]').innerHTML = xian + result.data.data.map(item => `<option value="${item}">${item}</option>`).join('')
  })
})
//---------------------------添加功能------------------------------------------

//点击确认按钮
document.querySelector('#submit').addEventListener('click', function () {
  const form = document.querySelector('form')
  let data = val(form)
  console.log(data)
  data.age = +data.age
  data.group = +data.group
  data.hope_salary = +data.hope_salary
  data.salary = +data.salary
  data.gender = +data.gender
  //点确认的时候，根据弹出层的标题判断一下，是添加操作还是修改操作
  let title = document.querySelector('.modal-title').innerHTML
  if (title === '添加学员') {
    axios({
      url: '/students',
      method: 'POST',
      data
    }).then(result => {
      // console.log(result)
      message.success(result.data.message)
      document.querySelector('#form').reset()
      renderStudent() //重新渲染
      addModal.hide()  //点击确认按钮隐藏模态框
    })
  }
  if (title === '修改学员') {

    let id = document.querySelector('.modal-title').dataset.id
    console.log(id)
    axios({
      url: `/students/${id}`,
      method: 'PUT',
      data
    }).then(result => {
      message.success(result.data.message)
      renderStudent()
      addModal.hide()
    })

  }
})

//找到tbody注册点击事件，里面判断点击的是删除，还是编辑
document.querySelector('tbody').addEventListener('click', async function (e) {
  //编辑功能
  if (e.target.classList.contains('bi-pen')) {
    let id = e.target.dataset.id
    document.querySelector('.modal-title').innerHTML = '修改学员'
    document.querySelector('.modal-title').setAttribute('data-id', id)
    addModal.show() //点击编辑按钮显示模态框
    let result = await axios({ url: `/students/${id}` })
    console.log(result)
    //获取城市和区县，渲染到第2个和第3个下拉框的位置
    let res1 = await axios({
      url: '/api/city',
      params: {
        pname: result.data.data.province
      }
    })
    let res2 = await axios({
      url: '/api/area',
      params: {
        cname: result.data.data.city,
        pname: result.data.data.province
      }
    })
    console.log(res1)
    let newArr1 = res1.data.data.map(item => `<option value='${item}'>${item}</option>`)
    city.innerHTML = shi + newArr1.join('')
    let newArr2 = res2.data.data.map(item => `<option value='${item}'>${item}</option>`)
    area.innerHTML = xian + newArr2.join('')
    //做数据回填
    val(document.querySelector('form'), result.data.data)
  }

     
  //删除功能
  if (e.target.classList.contains('bi-trash')) {
    console.log(e.target)
    let id = e.target.dataset.id
    //发送ajax请求进行删除操作
    if (!confirm('你确定嘛')) {
      return
    }
    axios({
      url: `/students/${id}`,
      method: 'DELETE'
    }).then(result => {
      message.success('删除成功')//提示
      renderStudent()//更新数据
    })
  }
})
