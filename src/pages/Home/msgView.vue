//这里放置页面简单布局及其数据
<template>
  <div id="msgContainer">
    <div id="tableDiv">
      <!-- <b-container class="bv-example-row">
      <b-row>
        <b-col> <h7 class="mb-0" cols="2">学生:</h7></b-col>
        <b-col>
          <b-form-select
            v-model="selected"
            :options="userOptions"
            size="sm"
            class="mt-0"
          ></b-form-select>
        </b-col>
        <b-col> <h7 class="mb-0" cols="2">课程:</h7></b-col>
        <b-col>
          <b-form-select
            v-model="userselected"
            :options="courseOptions"
            size="sm"
            class="mt-0"
          ></b-form-select>
        </b-col>
      </b-row>

      <b-row>
        <b-col> <h7 class="mb-0">概念:</h7></b-col>
        <b-col>
          <b-form-select
            v-model="courseselected"
            :options="conceptOptions"
            size="sm"
            class="mt-0"
          ></b-form-select>
        </b-col>
        <b-col> <h7 class="mb-0">Search:</h7></b-col>
        <b-col>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">
            Search
          </b-button>
        </b-col>
      </b-row>
    </b-container> -->

      <b-table striped hover :items="tableMessage"></b-table>
    </div>
    <div id="page-break">
      <ul>
        <li v-if="currentPage > 1">
          <a v-on:click="prePage()">上一页</a>
        </li>
        <li v-if="currentPage == 1">
          <a class="banclick">上一页</a>
        </li>
        <li>
          <a>
            {{ currentPage }}
          </a>
        </li>
        <li v-if="currentPage != pageNum">
          <a v-on:click="nextPage()">下一页</a>
        </li>
        <li v-if="currentPage == pageNum">
          <a class="banclick">下一页</a>
        </li>
        <li>
          <a
            >共<i>{{ currentPage }}/{{ pageNum }}</i
            >页</a
          >
        </li>
        <div class="jumpbox">
          <input type="number" class="jumppage" />
          <a class="jumpbtn" v-on:click="pageSkip()">跳转</a>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
// import { select } from "d3";
export default {
  data() {
    return {
      clu: 15,
      userselected: "",
      courseselected: "",
      conceptselected: "",
      userOptions: [],
      courseOptions: [],
      conceptOptions: [],
      tableMessage: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
      fieldData: [
        {
          id: 0,
        },
        {
          id: 1,
        },
      ], //接收后端的所有数据

      // 所有页面的数据
      totalPage: [],
      // 每页显示数量
      pageSize: 20,
      // 共几页
      pageNum: "",
      // 当前显示的数据
      dataShow: [],
      // 默认当前显示第一页,显示的页数
      currentPage: 1,
    };
  },
  methods: {
    //计算页数
    btnNum: function () {
      this.$http
        .get("/api/cube/getNum", { params: { name: "12345" } }, {})
        .then((response) => {
          var pageNum = response.body[0];
          this.pageNum = parseInt(pageNum / this.pageSize);

          // // 如果后台数据的条数小于每页显示数量，则只有一页，显示数量就为后台传来的
          // if (this.fieldData.length < this.pageSize) {
          //   this.pageSize = this.fieldData.length;
          // }
        });
    },
    selectCubeMsg(page, pagesize) {
      this.$http
        .get(
          "/api/cube/searchCubeMsg",
          { params: { page: page, pagesize: pagesize } },
          {}
        )
        .then((response) => {
          this.tableMessage = response.body;
        });
    },
    // 上一页和下一页
    // 下一页
    nextPage() {
      var currentPage = this.currentPage;
      var pagesize = this.pageSize;
      console.log(currentPage, pagesize);
      this.dataShow = this.totalPage[++this.currentPage - 1];
      this.selectCubeMsg(this.currentPage, this.pageSize);
    },
    // 上一页
    prePage() {
      this.dataShow = this.totalPage[--this.currentPage - 1];
      this.selectCubeMsg(this.currentPage, this.pageSize);
    },

    //输入数字跳转
    pageSkip() {
      let skipPage = Number(
        document.getElementsByClassName("jumppage")[0].value
      );
      if (!skipPage) {
        alert("请输入跳转页码");
        return;
      } else if (skipPage < 1 || skipPage > this.pageNum) {
        alert("您输入的页码超过页数范围了！");
        return;
      } else {
        this.currentPage = skipPage;
        this.dataShow = this.totalPage[this.currentPage - 1];
        this.selectCubeMsg(this.currentPage, this.pageSize);
      }
    },
  },
  created: function () {
    var _this = this;
    // _this.getdata();
    var u = [];
    for (var i = 0; i < _this.clu; i++) {
      u.push({ value: i.toString(), text: i.toString() });
    }
    _this.userOptions = u;
    _this.courseOptions = u;
    _this.conceptOptions = u;
    _this.btnNum();
    this.selectCubeMsg(this.currentPage, this.pageSize);
    // _this.eachpage();
  },
  mounted() {
    console.log(this);
    this.$el.style.setProperty("--tableheightStyle", this.windowHeight + "px");
  },
};
</script>


<style>
.article-content-ul li {
  display: inline-table;
}
.article-content-ul li img {
  width: 50px;
}
.article-content-ul samp {
  display: block;
}
/* 谷歌 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
/* 火狐 */
input[type="number"] {
  -moz-appearance: textfield;
}
#msgContainer {
  float: left;
  width: 100%;
  height: 100%;
}
#tableDiv {
  float: left;
  width: 100%;
  height: 90%;
  overflow-y: scroll;
}
#pageBtn {
  position: absolute;
  bottom: 0;
}
#page-break {
  float: left;
  height: 10px;
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
}
#page-break ul {
  text-align: left;
}
#page-break li {
  list-style: none;
  font-size: 12px;
}
#page-break a {
  border: 1px solid #ddd;
  text-decoration: none;
  float: left;
  padding: 3px 3px;
  color: #001b33;
  cursor: pointer;
}
#page-break a:hover {
  background-color: #eee;
}
#page-break a .banclick {
  cursor: not-allowed;
}
#page-break .active a {
  color: #fff;
  cursor: default;
  background-color: #ccc;
  border-color: #ccc;
}
#page-break i {
  font-style: normal;
  color: #d44950;
  margin: 0px 0px;
  font-size: 12px;
}
#page-break .jumpbox .jumppage {
  border: 1px solid #ddd;
  margin-left: 5px;
  height: 25px;
  width: 20px;
  font-size: 12px;
  float: left;
}
#page-break .jumpbox .jumpbtn {
  cursor: pointer;
  margin-left: 5px;
  font-size: 12px;
}
#page-break .jumpbox .jumpbtn:active {
  color: #ccc;
}
</style>

