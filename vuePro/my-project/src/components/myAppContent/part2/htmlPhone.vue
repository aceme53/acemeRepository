<style>
  .phone { height: 100%; }
  .p_r { position: relative; }
  .p_a { position: absolute; }
  .bg_b { background-color: black; }
  .v_middle { display: flex; justify-content: center; align-items: center; }
  .phone_border { height: 80%; width: 400px; border: 5px #000000 solid; margin: 20px auto; border-radius: 15px; box-shadow: 0 0 25px #0F0F0F }
  .phone_headerBar { float: left; height: 5%; border-top-left-radius: 10px; border-top-right-radius: 8px;
    background-image: linear-gradient(to right bottom, #AA8984 30%, #8E716D 100%); }
  .front_lamp { width: 4px; height: 4px; border-radius: 50%; background-color: #AA8984; left: 20%; top: 40%; }
  .ear_phone { height: 20%; background-color: #484848; width: 20%; top: 40%; left: 40%; border-radius: 4px; display: inline-block;
    box-shadow: 0 0 1px #000000; border: 1px solid #000000;
    background-image: linear-gradient(to right,
    transparent 19%, #646464 20%, transparent 21%,
    transparent 39%, #646464 40%, transparent 41%,
    transparent 59%, #646464 60%, transparent 61%,
    transparent 79%, #646464 80%, transparent 81%) }
  .front_cam { width: 12px; height: 12px; border-radius: 50%; left: 70%; top: 31%; box-shadow: #CACACA 0 0 4px inset;
    background-image: radial-gradient(#646464 0%, transparent 20%); }
  .front_light { width: 8px; height: 8px; border-radius: 50%; left: 80%; top: 36%; }
  .phone_screen { width: 100%; height: 85%; float: left;
    background-image: linear-gradient(to right bottom, #1E1E1E 20%, #191919 40%, #0A0A0A 60%, #000000 100%); }
  .phone_bottomBar { float: left; height: 10%; border-bottom-left-radius: 10px; border-bottom-right-radius: 8px;
    background-image: linear-gradient(to right bottom, #AA8984 30%, #8E716D 60%, #7B5F5C 80%, #583E3D 100%); }
  .logo_text { color: #CACACA; font-weight: bold; text-align: center; height: 100%; }
  .phone_headerBar, .phone_bottomBar { width: 100%; background-color: #AA8984; }
</style>
<template>
  <div class="phone">
    <div class="phone_border">
      <div class="phone_headerBar p_r">
        <div class="front_lamp p_a"></div>
        <div class="ear_phone p_a"></div>
        <div class="front_cam p_a bg_b"></div>
        <div class="front_light p_a bg_b"></div>
      </div>
      <div class="phone_screen bg_b"></div>
      <div class="phone_bottomBar">
        <div class="logo_text v_middle">HUAWEI</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'phone',
    data() {
      return {}
    }
  }
</script>
