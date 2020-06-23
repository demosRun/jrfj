var autoScaleInfo = {
  // 设计宽度
  deviseW: 750,
  // 设计高度
  deviseH: 1508,
  // 设计宽度PC
  devisePCW: 1920,
  // 设计高度PC
  devisePCH: 1080,
}

function getScale () {
  document.body.style.opacity = 0
  var scaleBoxList = document.getElementsByClassName('scale-box')
  // 如果比例大于1则进入电脑模式
  autoScaleInfo.innerWidth = window.innerWidth
  autoScaleInfo.innerHeight = window.innerHeight
  for (var index = 0; index < scaleBoxList.length; index++) {
    var scaleBox = scaleBoxList[index];
    if ((autoScaleInfo.innerWidth / autoScaleInfo.innerHeight) < 1) {
      var scale = autoScaleInfo.innerWidth / autoScaleInfo.deviseW
      autoScaleInfo.scale = scale
      scaleBox.style.width = autoScaleInfo.deviseW + 'px'
      scaleBox.style.height = autoScaleInfo.deviseH + 'px'
      autoScaleInfo.hideHeight = (autoScaleInfo.innerHeight - autoScaleInfo.deviseH * scale) / 2 /scale
      scaleBox.style.transform = 'scale(' + scale + ', ' + scale + ') translate(0, ' + autoScaleInfo.hideHeight + 'px)';
      scaleBox.style.transformOrigin = '0px 0px 0px'
      autoScaleInfo.showHeight = autoScaleInfo.innerHeight / autoScaleInfo.scale
      autoScaleInfo.showWidth = autoScaleInfo.innerWidth / autoScaleInfo.scale
    } else {
      document.body.classList.add('pc')
      var scale = (autoScaleInfo.innerHeight / autoScaleInfo.deviseH).toFixed(2)
      scaleBox.style.width = autoScaleInfo.deviseW + 'px'
      scaleBox.style.height = autoScaleInfo.deviseH + 'px'
      scaleBox.style.overflow = 'hidden'
      scaleBox.style.transform = 'scale(' + scale + ', ' + scale + ') translate(' + (autoScaleInfo.innerWidth - autoScaleInfo.deviseW * scale) / 2 / scale + 'px, 0)'
      scaleBox.style.transformOrigin = '0 0 0'
    }
  }
  // 只对宽屏生效
  if ((autoScaleInfo.innerWidth / autoScaleInfo.innerHeight) > 1) {
    // 缩放PC
    var scaleListPC = document.getElementsByClassName('scale-box-pc')
    for (var index = 0; index < scaleListPC.length; index++) {
      var scaleBox = scaleListPC[index];
      console.log(scaleBox)
      var screenScale = window.innerWidth / window.innerHeight
      var deviseScale = autoScaleInfo.devisePCW / autoScaleInfo.devisePCH
      var scale = screenScale < deviseScale ? window.innerWidth / autoScaleInfo.devisePCW : window.innerHeight / autoScaleInfo.devisePCH
      scaleBox.style.width = autoScaleInfo.devisePCW + 'px'
      scaleBox.style.height = autoScaleInfo.devisePCH + 'px'
      // scaleBox.style.transform = 'scale(' + scale.toFixed(2) + ', ' + scale.toFixed(2) + ') translate(0, 0)'
      autoScaleInfo.zoom = scale
      scaleBox.style.zoom = scale.toFixed(2)
      scaleBox.style.transformOrigin = 'center'
      scaleBox.style.position = 'absolute'
      scaleBox.style.left = "-50%"
      scaleBox.style.right = "-50%"
      scaleBox.style.top = "-50%"
      scaleBox.style.bottom = "-50%"
      scaleBox.style.margin = "auto"
    }
  }
  // 只对手机生效
  if ((autoScaleInfo.innerWidth / autoScaleInfo.innerHeight) < 1) {
    var rotateListPC = document.getElementsByClassName('rotate-box-pc')
    for (var index = 0; index < rotateListPC.length; index++) {
      var rotateBox = rotateBox[index];
      rotateBox.style.transform = 'rotate(90deg) translate(0, ' + -autoScaleInfo.innerWidth + 'px)'
      rotateBox.style.height = autoScaleInfo.innerWidth + 'px'
      rotateBox.style.width = autoScaleInfo.innerHeight + 'px'
      rotateBox.style.transformOrigin = '0px 0px 0px'
    }
  }

  setTimeout(function () {
    document.body.style.opacity = 1
  }, 0);
}

getScale()

var timer = null

function refreshGetScale () {
  console.log("重新计算")
  window.clearTimeout(timer)
  timer = setTimeout(function () {
    getScale()
  }, 300)
}

if (window.addEventListener) {
  // 延迟一会再注册事件监听以防止页面初始化的时候刷新两次
  setTimeout(function () {
    window.addEventListener('resize', refreshGetScale)

    // 微信返回自动重新排版布局
    window.addEventListener('pageshow', refreshGetScale)
  }, 100);
}