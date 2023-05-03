function Message () {
  this.msg = ''
  this.color = 'rgba(0, 0, 0, 0.7)'
  HTMLElement.prototype.css = function (key, value) {
    this.style[key] = value
    return this
  }
}
Message.prototype.info = function () {
  let box = document.createElement('div')
  box.innerHTML = this.msg
  box
    .css('position', 'absolute')
    .css('left', '50%')
    .css('top', '50%')
    .css('transform', 'translate(-50%, -50%)')
    .css('background-color', this.color)
    .css('color', '#fff')
    .css('min-width', '240px')
    .css('text-align', 'center')
    .css('padding', '10px')
    .css('border-radius', '3px')
    .css('opacity', 1)
    .css('z-index', 99999)
  document.body.appendChild(box)
  for (let i = 30; i <= 50; i++) {
    setTimeout(() => {
      box.style.opacity -= 0.05
      if (box.style.opacity == 0 && box) document.body.removeChild(box)
    }, i * 50)
  }
}
Message.prototype.success = function (msg = '默认消息') {
  this.msg = '✔ ' + msg
  this.info()
}
Message.prototype.error = function (msg = '默认消息') {
  this.msg = '✘ ' + msg
  this.info()
}

Message.prototype.confirm = function (
  title = '默认标题',
  msg = '默认提示',
  fn
) {
  let body = document.body
  let mask = document.createElement('div')
  mask
    .css('background-color', '#ccc')
    .css('width', '100%')
    .css('height', '100%')
    .css('position', 'absolute')
    .css('top', 0)
    .css('background-color', 'rgba(0, 0, 0, 0.5)')
    .css('z-index', 99998)
  body.css('overflow-y', 'hidden').appendChild(mask)

  let box = document.createElement('div')
  box.innerHTML = `
    <div class="title">${title}</div>
    <div class="content">${msg}</div>
    <div class="button">
    <button type="button" class="confirm">确认</button>
    <button type="button" class="cancel">取消</button>
    </div>
    `
  let titleEle = box.querySelector('.title')
  let contentEle = box.querySelector('.content')
  let buttonEle = box.querySelectorAll('button')
  let confirm = box.querySelector('.confirm')
  let cancel = box.querySelector('.cancel')
  box
    .css('min-width', '350px')
    .css('position', 'absolute')
    .css('left', '50%')
    .css('top', '50%')
    .css('transform', 'translate(-50%, -50%)')
    .css('border', 'solid 1px #ccc')
    .css('border-radius', '5px')
    .css('background-color', '#fff')
    .css('color', '#212121')
    .css('font-size', '16px')
    .css('z-index', 99999)
  titleEle.css('padding', '10px').css('border-bottom', 'solid 1px #ccc')
  contentEle.css('padding', '20px')
  buttonEle.forEach(item => {
    item
      .css('border', 0)
      .css('outline', 'none')
      .css('padding', '8px')
      .css('min-width', '70px')
      .css('border-radius', '5px')
      .css('float', 'right')
      .css('margin-right', '10px')
      .css('margin-bottom', '10px')
      .css('cursor', 'pointer')
  })
  cancel.css('background-color', '#6c757d').css('color', '#fff')
  confirm.css('background-color', '#0d6efd').css('color', '#fff')
  body.appendChild(box)
  // 事件
  confirm.addEventListener('click', function () {
    typeof fn === 'function' && fn(true)
    body.css('overflow-y', 'auto').removeChild(box)
    body.removeChild(mask)
  })
  cancel.addEventListener('click', function () {
    typeof fn === 'function' && fn(false)
    body.css('overflow-y', 'auto').removeChild(box)
    body.removeChild(mask)
  })
}
window.message = new Message()
