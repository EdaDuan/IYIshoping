<template>
  <div class="bottom">
    <!-- 最外面的大盒子 -->
    <div class="top">
      <div class="top-firstbox">
        <div class="top-img"></div>
      </div>
      <div class="top-secondbox">
        <div class="top-img"></div>
      </div>
      <div class="top-threebox">
        <div class="top-img"></div>
      </div>
      <div class="top-fourbox">
        <div class="top-img"></div>
      </div>
      <div class="top-fivebox">
        <div class="top-img"></div>
      </div>
      <div class="top-sixbox">
        <div class="top-img"></div>
      </div>
      <div class="top-sevenbox">
        <div class="top-img"></div>
      </div>
      <div class="top-eightbox">
        <div class="top-img"></div>
      </div>
    </div>
    <div class="middle">
      <div class="middle-firstbox">
        <p>服务保障</p>
        <ul>
          <li>正品保证</li>
          <li>7天无理由放心退</li>
          <li>7x15小时客户服务</li>
          <li>7天无理由随心换</li>
        </ul>
      </div>
      <div class="middle-secondbox">
        <p>购物指南</p>
        <ul>
          <li>导购演示</li>
          <li>订单操作</li>
          <li>会员注册</li>
          <li>账户管理</li>
        </ul>
      </div>
      <div class="middle-threebox">
        <p>支付方式</p>
        <ul>
          <li>23家主流银行支付</li>
          <li>支付宝、银联等支付</li>
          <li>信用卡支付</li>
          <li>零钱支付</li>
        </ul>
      </div>
      <div class="middle-fourbox">
        <p>配送方式</p>
        <ul>
          <li>配送范围</li>
          <li>配送运费</li>
          <li>商品验货</li>
          <li>商品签收</li>
        </ul>
      </div>
      <div class="middle-fivebox">
        <p>售后服务</p>
        <ul>
          <li>退货政策</li>
          <li>退货流程</li>
          <li>退款方式和时效</li>
          <li>换货服务</li>
        </ul>
      </div>
      <div class="middle-sixbox"></div>
    </div>
    <div class="footer">
      <div class="footer-firstbox">Copyright © 1998 - 2020 IYI. All Rights Reserved.</div>
      <div class="footer-secondbox">IYI公司 版权所有 IYI网络电商经营许可证</div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  .bottom {
    height: 300px;
    width: 100%;
    margin: 50px auto;
    background-color: white;
    border-top: 1px solid white;
  }

  .top {
    height: 100px;
    width: 80%;
    margin: 0 auto;
    display: flex;
    padding-top: 20px;
    justify-content: space-around;
  }

  .top-img {
    width: 80px;
    height: 80px;
    background: url("../../assets/img/bottom.png") no-repeat;
  }

  .top-secondbox .top-img {
    background-position-x: -125px;
  }

  .top-threebox .top-img {
    background-position-x: -247px;
  }

  .top-fourbox .top-img {
    background-position-x: -370px;
  }

  .top-fivebox .top-img {
    background-position-x: -491px;
  }

  .top-sixbox .top-img {
    background-position-x: -613px;
  }

  .top-sevenbox .top-img {
    background-position-x: -737px;
  }

  .top-eightbox .top-img {
    background-position-x: -860px;
  }

  .middle {
    height: 130px;
    width: 80%;
    height: auto;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }

  .middle div {
    width: 15%;
    margin: 0 26px;
  }

  .middle li {
    font-size: 14px;
    color: grey;
    cursor: pointer;
    margin-top: 6px;
  }

  .middle li:hover {
    transform: translateX(3px);
    color: #B9BABE;
  }

  .middle-sixbox {
    background: url("../../assets/img/erweima.png") no-repeat;
    background-position-x: center;
  }

  .footer {
    font-size: 12px;
    color: grey;
    width: 80%;
    height: auto;
    margin: 10px auto;
    text-align: center;
  }

  .footer-firstbox {
    margin-bottom: 10px;
  }
</style>