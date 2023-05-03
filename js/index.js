//---------------折线图---------------
function lineChart(data) {
  // console.log(data)
  let myChart = echarts.init(document.querySelector('#line'))
  let option = {
    title: {
      text: '2022全学科薪资走势',
      top: 15,
      left: 10,
      textStyle: {
        fontSize: 16
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.month),
      // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLabel: {
        color: ' '
      },
      axisLine: {
        lineStyle: {
          color: '#ccc',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    //网格设置
    grid: {
      top: '20%'
    },
    series: [
      {
        data: data.map(item => item.salary),
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 6
        },
        symbolSize: 10,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#499fee' // 0% 处的颜色
            },
            {
              offset: 0.8, color: 'rgba(255,255,255,0.2)' // 0% 处的颜色
            },
            {
              offset: 1, color: 'rgba(255,255,255,0)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      }
    ],
    tooltip: {
      trigger: 'axis'
    },
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0, color: '#499fee' // 0% 处的颜色
      }, {
        offset: 1, color: '#5d75f0' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    }

  };
  myChart.setOption(option)//第1个O是大写的
}
// lineChart()//等接口返回数据之后再调用
//---------------饼图（右上角）---------------
function classSalaryChart(salary) {
  // console.log(salary)
  let myChart = echarts.init(document.querySelector('#salary'))
  let option = {
    title: {
      text: '班级薪资分布',
      top: 15,
      left: 10,
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '6%',
      left: 'center',
      // itemWidth :15
    },
    color: ['#FDA224', '#5097FF', '#3ABCFA', '#34D39A'],
    series: [
      {
        name: '班级薪资分布',//鼠标移入提示这个名字
        type: 'pie',
        radius: ['50%', '64%'],//饼的半径
        itemStyle: {
          borderRadius: 10,//每一项的圆角
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,//控制标签不显示

        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: 'bold'
        //   }
        // },
        labelLine: {
          show: false
        },
        data: salary.map(item => {
          return { value: item.g_count + item.b_count, name: item.label }
        })
        // { value: 1048, name: '<1万' },
        // { value: 735, name: '1-1.5万' },
        // { value: 580, name: '1.5-2万' },
        // { value: 484, name: '>2万' },
      }
    ]
  };
  myChart.setOption(option)//第1个O是大写的
}

//---------------柱状图---------------
function groupSalaryChart(salary) {
  console.log(salary)
  let myChart = echarts.init(document.querySelector('#lines'))
  option = {
    xAxis: {
      type: 'category',
      // data: ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '李逵', '张飞', '蒙多'],
      data: salary[1].map(item => item.name),
      axisLine: {
        lineStyle: {
          color: '#999',
          type: 'dashed',
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed' //Y轴分割线：虚线
        }
      }
    },
    color:
      [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0, color: '#34D39A' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(52,211,154,0.2)' // 100% 处的颜色
            }],
          global: false // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#499FEE' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(73,159,238,0.2)' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }

      ],
    series: [
      {
        data: salary[1].map(item => item.hope_salary),
        type: 'bar',
        name: '期望薪资' // 这个数据的名字，可以在鼠标移入的提示上显示
      },
      {
        data: salary[1].map(item => item.salary),
        type: 'bar',
        name: '就业薪资' // 这个数据的名字，可以在鼠标移入的提示上显示
      }
    ],
    grid: {
      left: 70,
      top: 30,
      right: 30,
      bottom: 50,
    },
    tooltip: {}
  };
  myChart.setOption(option)
  //点击切换
  document.querySelector('#btns').addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
      document.querySelector('#btns .btn-blue')?.classList.remove('btn-blue')
      e.target.classList.add('btn-blue')
    }
    //echarts更换图表数据的步骤【1.更换图表中X轴、series数据  2.Mychart.setOption(option)重新创建图表即可】
    //获取组号
    let i = e.target.innerHTML
    //换图表配置项中的数据
    option.xAxis.data = salary[1].map(item => item.name)
    option.series[0].data = salary[i].map(item => item.hope_salary)
    option.series[1].data = salary[i].map(item => item.salary)
    myChart.setOption(option)
  })
}

//---------------饼图（左下角）---------------
function sexSalaryChart(salary) {
  // console.log(salary)
  let myChart = echarts.init(document.querySelector('#gender'))
  let option = {
    title: [
      {
        text: '男女生薪资分布',
        top: 15,
        left: 10,
        textStyle: {
          fontSize: 16
        }
      },
      {
        text: '男生',
        top: '45%',
        left: '45%',
        textStyle: {
          fontSize: 12
        }
      },
      {
        text: '女生',
        top: '85%',
        left: '45%',
        textStyle: {
          fontSize: 12
        }
      },
    ],
    tooltip: {
      trigger: 'item'
    },
    color: ['#FDA224', '#5097FF', '#3ABCFA', '#34D39A'],
    series: [
      {
        name: '班级薪资分布',//鼠标移入提示这个名字
        type: 'pie',
        radius: ['20%', '30%'],//饼的半径
        center: ['50%', '30%'],
        data: salary.map(item => {
          return { value: item.b_count, name: item.label }
        })

      },
      {
        name: '班级薪资分布',//鼠标移入提示这个名字
        type: 'pie',
        radius: ['20%', '30%'],//饼的半径
        center: ['50%', '70%'],
        data: salary.map(item => {
          return { value: item.g_count, name: item.label }
        })
      }
    ]
  };
  myChart.setOption(option)
}
//---------------地图---------------
const mapData = [
  { name: '南海诸岛', value: 0 },
  { name: '北京', value: 0 },
  { name: '天津', value: 0 },
  { name: '上海', value: 0 },
  { name: '重庆', value: 0 },
  { name: '河北', value: 0 },
  { name: '河南', value: 0 },
  { name: '云南', value: 0 },
  { name: '辽宁', value: 0 },
  { name: '黑龙江', value: 0 },
  { name: '湖南', value: 0 },
  { name: '安徽', value: 0 },
  { name: '山东', value: 0 },
  { name: '新疆', value: 0 },
  { name: '江苏', value: 0 },
  { name: '浙江', value: 0 },
  { name: '江西', value: 0 },
  { name: '湖北', value: 0 },
  { name: '广西', value: 0 },
  { name: '甘肃', value: 0 },
  { name: '山西', value: 0 },
  { name: '内蒙古', value: 0 },
  { name: '陕西', value: 0 },
  { name: '吉林', value: 0 },
  { name: '福建', value: 0 },
  { name: '贵州', value: 0 },
  { name: '广东', value: 0 },
  { name: '青海', value: 0 },
  { name: '西藏', value: 0 },
  { name: '四川', value: 0 },
  { name: '宁夏', value: 0 },
  { name: '海南', value: 0 },
  { name: '台湾', value: 0 },
  { name: '香港', value: 0 },
  { name: '澳门', value: 0 }
]

function mapChart(people) {

  console.log(people)
  let myChart = echarts.init(document.querySelector('#map'))
  mapData.forEach(item=>{
    let result=people.find(v=>{
      return v.name.includes(item.name)
    })
    if(result){
      item.value=result.value
    }
  })
  let option = {
    //从0开始自己写配置
    series: [
      {
        data: mapData,
        type: 'map',//type表示图表的类型是地图
        map: 'china',
        label: {
          show: true,//显示地区名字
          fontsize: 10//文字大小
        },
        itemStyle: {
          areaColor: '#E0FFFF',//每个省的颜色
          borderColor: 'rgba(0,0,0,0.2)'
        },
        emphasis: {
          itemStyle: {
            areaColor: '#34D39A',
            borderWidth: 0,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
          },
        }
      }
    ],
    //视觉映射组件
    visualMap: {
      type: 'continuous',//表示连续型
      max: 7,
      min: 0,
      text: [7, 0],
      left: 15,
      bottom: 10,
      inRange: {
        color: ['#fff', '#0075f0']
      }
    },
    tooltip: {
      formatter: '{b}: {c}位学员',
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        color: '#fff'
      },
      borderColor: 'rgba(0,0,0,0.5)'
    }
  }
  myChart.setOption(option)
}
//================================================================
//发送请求，获取接口数据，把数据渲染到页面中，把数据用到图表中
axios({
  url: '/dashboard',
}).then(result => {
  console.log(result.data.data)
  let { groupData, overview, provinceData, salaryData, year } = result.data.data
  //1.处理概览区域 数据渲染
  for (let key in overview) {
    document.querySelector(`[name=${key}]`).innerHTML = overview[key]
  }
  //2.处理折线图的数据
  // console.log(year)
  lineChart(year)
  //3.饼图处理
  classSalaryChart(salaryData)
  sexSalaryChart(salaryData)
  //4.柱状图处理
  groupSalaryChart(groupData)
  //5.地图处理
  mapChart(provinceData)
}) 