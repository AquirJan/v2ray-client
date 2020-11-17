<template>
  <div class="profile-wrap">
    <div class="profile-bg" :style="profileStyle"></div>
    <div class="profile" >
      <div class="summary grid-area cntr-shadow title-space">
        <div class="grid-area-content">
          <p class="font-size-rxlg clear-mb">梁啟坚</p>
          <p class="clear-mb">前端工程师</p>
          <p class="clear-mb">{{calcAge-graduationAge}}年工作经验｜大专｜{{calcAge}}岁｜男</p>
          <p class="clear-mb">18603096083（微信wechat）</p>
          <p class="clear-mb">wing.free0@gmail.com</p>
        </div>
        <!-- <div class="cntr-col-3 cntr-flex aligni-center justify-center"> -->
          <div class="portrait-img-wrap cntr-shadow">
            <img :src="`${publicPath}images/portrait.jpg`" class="portrait-img full-width">
          </div>
        <!-- </div> -->
      </div>
      <div class="about grid-area title-space">
        <div class="grid-area-content">
          <span class="section-title cntr-shadow">关于作者</span>
          <div class="section-body article-indent">
            我这人，喜欢新科技，不怕尝试新东西。有空就会锻炼身体，爬爬山，旅旅游。有人邀约打球就更好，毕竟工作了就很少会找到球伴。像很多男孩子一样也喜欢车，喜欢头文字D。喜欢看各类书籍，却偏偏很少看代码的书籍，因为我觉得网上看会更直接更新，我学习代码不喜欢看视频教程，因为我觉得视频教程比较被动。
            虽然我可能不会再写很久的代码，毕竟一线开发是一门青春饭。但我觉得我不会放弃关注前端的发展，未来可能用rust写前端，毕竟js有瓶颈。
          </div>
        </div>
      </div>
      <div class="work-experience grid-area title-space">
        <div class="grid-area-content">
          <p class="section-title cntr-shadow">工作经历</p>
          <div class="section-body">
            <div class="work-section" v-for="(item) in worksData" :key="item.company">
              <div class="cntr-flex aligni-center justify-between">
                <div class="work-title">
                  <h6 class="clear-mb">{{item.company}}／{{item.department}}</h6>
                  <p class="clear-mb">{{item.position}}</p>
                </div>
                <div class="work-time">{{item.dateRange}}</div>
              </div>
              <div class="work-content">
                <p v-for="(c, cindex) in item.content" :key="cindex">{{c}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="education grid-area title-space">
        <div class="grid-area-content">
          <p class="section-title cntr-shadow">教育经历</p>
          <div class="section-body article-indent">
            <h6>湛江现代科技职业学院</h6>
            <p>大专 / 网络工程</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .section-title {
    font-size: 1.2rem;
    transform: rotate(-45deg) translate(-1.5rem, -2rem);
    display: inline-flex;
    padding: 0 .5rem;
    margin: 0;
    border-radius: 4px;
    background-color: #333333;
    color: #efefef;
  }
  .section-body {
    font-size: .9rem;
    line-height: 1.8;
  }
  
  .portrait-img-wrap {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    /* box-shadow: 0 0 10px rgba(0,0,0,.2); */
  }
  .profile {
    padding: 0.8rem;
  }
  .profile-wrap {
    /* position: relative; */
  }
  .profile-bg {
    filter: blur(5px);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .profile {
    position: relative;
    display: grid;
    max-width: 64rem;
    margin: 1.5rem auto;
    grid-gap: 1.5rem;
    /* align-items: center;
    justify-items: center; */
    grid-template-columns: 1fr;
    grid-template-areas:
      "summary"
      "about"
      "work"
      "education";
  }
  .grid-area {
    border-radius: 4px;
    padding: 4px;
    background-color: rgba(255,255,255,.3);
  }
  .grid-area:hover {
    background-color: rgba(0,0,0,.3);
    transition: all 60s ease;
  }
  .grid-area-content:hover,
  .grid-area-content:hover .section-title {
    transition: all 60s ease;
    background-color: #efefef;
    color: #333333;
  }
  .grid-area:hover .portrait-img-wrap {
    transition: all 60s ease;
    border: 4px solid rgba(0,0,0,.5);
  }
  .grid-area.title-space {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  .grid-area-content {
    position: relative;
    border-radius: 4px;
    color: #efefef;
    background: #333333;
    padding: 1rem;
    height: 100%;
  }
  .grid-area.no-shadow {
    box-shadow: none;
  }
  .portrait-img-wrap {
    position: absolute;
    right: -1.5rem;
    top: -1.5rem;
    border: 4px solid rgba(255,255,255,.5);
  }
  .summary {
    grid-area: summary;
    position: relative;
    margin-right: 1.5rem;
  }
  .work-experience {
    grid-area: work;
  }
  .portrait {
    grid-area: portrait;
  }
  .about {
    grid-area: about;
  }
  .education {
    grid-area: education;
  }

  .work-section {
    margin-bottom: 1rem;
    border-top: 1px solid #9f9f9f;
    padding: 1rem 0 0 0;
  }
  .work-content{
    padding-left: 2em;
  }
  .work-time {
    font-size: 1rem;
    min-width: 130px;
    text-align: center;
  }
  .article-indent {
    text-indent: 2em;
  }
  @media (min-width: 1200px) {
    .profile {
      grid-template-columns: 2fr 1fr;
      grid-template-areas:
        "summary summary"
        "work about"
        "work education";
    }
    .grid-area.title-space {
      margin-left: 0;
      margin-right: 0;
    }
  }
  
</style>
<script>
export default {
  name: 'profileSbPage',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      birthDate: '1989-03-19',
      graduationAge: 22,
      worksData: [
        {
          company: '武汉佰钧成技术有限责任公司',
          department: '开发',
          position: '前端工程师',
          dateRange: '2017.05-2020.01',
          content: [
            '派驻美的总部，任开发云项目组前端工程师',
            '接手开发规则引擎前端部分，参与开发可编辑生成表单系统。',
            '后继开发了美的内部用人员选器组件，表格组件，上传组件',
            '后转入AI云项目组开发electron客户端为主'
          ]
        },
        {
          company: '赛意信息科技有限公司',
          department: '开发',
          position: '前端工程师',
          dateRange: '2017.02-2017.05',
          content: [
            '某个微信公众号商城部分前端开发（关于石油订购）',
          ]
        },
        {
          company: '佛山市盛杰软件科技有限公司',
          department: '开发',
          position: '前端工程师',
          dateRange: '2012.06-2017.01',
          content: [
            'web前端開發，App混合開發中的web部份。',
            '公司的項目開發主要面向政府，偶尔会做一点其他类型的小项目。',
            '12-13年开发网页主要使用jquery+html+css，曾使用过titanium来开发android和ios一段时间但不好用，所以半年后就没用了。',
            '14年-15年，因为公司重心转为app+web混合开发，web主要使用angular1开发。',
            '16年，以为react和vue的出现，然后我对比了一下react跟vue，最后我选择了vue作为公司webapp的开发框架。',
            '曾自学nodejs，expressjs，angularjs1，mongodb，phonegap，vue，vuex，react，redux，webpack。',
            '了解PHP，SQL。',
            '熟悉linux系统上常用的命令',
            'github上面的写了一两个小库，都是方便公司的项目开发而写的。因为大部分时间都是我一个人写前端，所以没多少时间写其他有趣的小工具了。',
          ]
        }
      ]
    }
  },
  computed: {
    calcAge() {
      return (new Date().format('yyyy'))-(new Date(this.birthDate).format('yyyy')) - 1
    },
    profileStyle() {
      return {
        'background-image': `url(${this.publicPath}images/bg2.jpg)`
      }
    }
  },
  created(){
    document.title = '个人简历';
  }
}
</script>