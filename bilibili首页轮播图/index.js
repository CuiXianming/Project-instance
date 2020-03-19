var banner = {
  el: null,
  bannerList: [],
  curIndex: 0,
  bannerWidth: 0,
  timer: null,
  init: function () {
    this.initData();
    this.startMove();
    this.handle();
  },
  initData: function () {
    this.el = document.getElementById('app');  // 获取父元素
    this.oBannerList = this.el.getElementsByClassName('banner-list')[0]; // 获取轮播图列表元素
    this.bannerLength = this.oBannerList.children.length; // 获取轮播图的长度
    this.bannerWidth = this.oBannerList.children[0].offsetWidth;  // 获取每一张轮播图的宽度
    this.oIndexList = this.el.getElementsByClassName('index');  // 获取index元素
    this.oActiveIndex = this.el.getElementsByClassName('index active')[0];  // 获取点击态的active元素
  },
  startMove () {
    // 开始运动
    this.timer = setTimeout(this.autoMove.bind(this), 1500)
  },
  autoMove: function () {
    // 运动
    var oBannerList = this.oBannerList;
    var bannerWidth = this.bannerWidth;

    // 索引值 加1 滑到下一张图片
    this.curIndex ++;
    oBannerList.style.left = -bannerWidth * this.curIndex + 'px';
    this.changeIndex(); // 更改index的显示
  },
  changeIndex: function () {
    var oIndexList = this.oIndexList;
    var oActiveIndex = this.oActiveIndex;
    var bannerLength = this.bannerLength;
    var curIndex = this.curIndex % (bannerLength - 1);
    oIndexList[curIndex].classList.add('active');
    oActiveIndex.classList.remove('active');
    this.oActiveIndex = oIndexList[curIndex];
  },
  handle: function () {
    this.handleBannerTranistion(); 
    this.handleIndexClick();
  },
  handleBannerTranistion () {
    // 过渡完成时执行的函数
    var self = this;
    var oBannerList = this.oBannerList;
    var bannerLength = this.bannerLength;
    // 过渡完毕后会触发该事件
    oBannerList.addEventListener("transitionend", function () {
      if(self.curIndex === bannerLength - 1) {
        // 如果当前显示的是最后一张图片
        oBannerList.style.left = 0;  // 立刻让轮播图列表的left为0
        oBannerList.style.transition = 'none';  // 清除过渡效果
        self.curIndex = 0;  // 当前索引重置为0
      }

      // 如果当前位置为0，那么设置过渡样式
      if(oBannerList.offsetLeft === 0) {
        oBannerList.style.transition = 'left .2s';
      }
      self.startMove(); // 开始运动
    });
  },
  handleIndexClick: function () {
    // 点击小圆点时执行的事件
    var self= this;
    var oIndexList = this.oIndexList;
    var indexLength = oIndexList.length;
    var oBannerList = this.oBannerList;
    var bannerWidth = this.bannerWidth;

    for(var i = 0; i < indexLength; i ++) {
      (function (i) {
        var oIndex = oIndexList[i]

        oIndex.onclick = function () {
          var isActive = oIndex.classList.contains('active'); // 判断当前点击的原点是不是active
          if( isActive ) { return } // 如果是active，则什么都不做
          clearTimeout(self.timer); // 清除定时器
          self.curIndex = i;  // 设置当前索引值，为点击的index元素的索引
          self.changeIndex(); // 更改index元素的显示
          oBannerList.style.left = -i * bannerWidth + 'px'; // 轮播图滚动
        }
      })(i)
    }
  },

}