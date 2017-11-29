<style>
  .p_r { position: relative; }
  .p_a { position: absolute; }
  .bg_b { background-color: black; }
  .bg_t { background-color: transparent; }
  .circle { border-radius: 50%; }
  .v_middle { display: flex; justify-content: center; align-items: center; }
  /*=============================================================*/
  .phone { height: 100%; }
  .phone_border { height: 80%; width: 350px; border: 5px #000000 solid; margin: 20px auto; border-radius: 15px; box-shadow: 0 0 25px #0F0F0F }
  .phone_headerBar { float: left; height: 5%; border-top-left-radius: 10px; border-top-right-radius: 8px;
    background-image: linear-gradient(to right bottom, #AA8984 30%, #8E716D 100%); }
  .front_lamp { width: 1.2%; height: 15%; left: 20%; top: 40%;
    background-color: transparent; }
  .green_lamp { background-image: url("../../../images/phoneImgs/greenLamp.png") }
  .red_lamp { background-image: url("../../../images/phoneImgs/redLamp.png") }
  .blue_lamp { background-image: url("../../../images/phoneImgs/blueLamp.png") }
  .orange_lamp { background-image: url("../../../images/phoneImgs/orangeLamp.png") }
  .ear_phone { height: 20%; background-color: #484848; width: 20%; top: 40%; left: 40%; display: inline-block;
    box-shadow: 0 0 1px #000000; border: 1px solid #000000; border-radius: 4px;
    background-image: linear-gradient(to right,
    transparent 19%, #646464 20%, transparent 21%,
    transparent 39%, #646464 40%, transparent 41%,
    transparent 59%, #646464 60%, transparent 61%,
    transparent 79%, #646464 80%, transparent 81%) }
  .front_cam { left: 68%; top: 30%; width: 3.8%; height: 42%; background-repeat: no-repeat; background-size: cover;
    background-image: url("../../../images/phoneImgs/frontCam.png") }
  .front_lightSensor { width: 2.2%; height: 30%; left: 80%; top: 36%; background-repeat: no-repeat; background-size: cover;
    background-image: url("../../../images/phoneImgs/lightSensor.png") }
  .phone_screen { width: 100%; height: 85%; float: left;
    background-image: linear-gradient(to right bottom, #282828 20%, #191919 40%, #0A0A0A 60%, #000000 100%); }
  .phone_bottomBar { float: left; height: 10%; border-bottom-left-radius: 10px; border-bottom-right-radius: 8px;
    background-image: linear-gradient(to right bottom, #AA8984 30%, #8E716D 60%, #7B5F5C 80%, #583E3D 100%); }
  .logo_text { color: #CACACA; font-weight: bold; text-align: center; height: 100%; }
  .phone_headerBar, .phone_bottomBar { width: 100%; background-color: #AA8984; }
</style>
<template>
  <div class="phone">
    <div class="phone_border">
      <div class="phone_headerBar p_r">
        <div class="front_lamp p_a circle " v-bind:class="{
          'green_lamp': front_lamp.gLamp,
          'red_lamp': front_lamp.rLamp,
          'blue_lamp':front_lamp.bLamp,
          'orange_lamp':front_lamp.oLamp}"></div>
        <div class="ear_phone p_a"></div>
        <div class="front_cam circle p_a bg_t"></div>
        <div class="front_lightSensor circle p_a bg_t"></div>
      </div>
      <div class="phone_screen bg_b"></div>
      <div class="phone_bottomBar">
        <div class="logo_text v_middle">HUAWEI</div>
      </div>
    </div>
    <div>
      <el-button @mousedown.native="setPhoneStatus('1')" @mouseup.native="setPhoneStatus()" type="success">
        开机
      </el-button>
      <el-button @mousedown.native="setPhoneStatus('0')" @mouseup.native="setPhoneStatus()" type="danger">
        关机
      </el-button>
    </div>
  </div>
</template>
<script>
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {ElButton},
    name: 'phone',
    data() {
      return {
        phoneStatus: 0,//0：关机 ， 1：开机
        front_lamp: {
          gLamp: 0,
          rLamp: 0,
          bLamp: 0,
          oLamp: 0
        }
      }
    },
    methods: {
      setPhoneStatus: function (status) {
        if (status) {
          let self = this;
          window.setPhoneStatus = setTimeout(function () {
            self.phoneStatus = status;
            clearTimeout(window.setPhoneStatus);
          }, 3000);
        } else {
          clearTimeout(window.setPhoneStatus);
        }
      },
      setFrontLamp: function (lamp) {
        this.front_lamp = {};
        this.front_lamp[lamp] = 1;
      }
    },
    mounted: function () {
    }
  }
</script>
