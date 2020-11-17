<template>
  <div>
    <!-- <video src="rtmp://202.69.69.180:443/webcast/bshdlive-pc"></video> -->
    <video ref="player" width="360" height="203" id="player1" src="rtmp://202.69.69.180:443/webcast/bshdlive-pc" type="video/rtmp" controls="controls"></video>
  </div>
</template>
<script>
export default {
  name: 'test',
  mounted() {
    this.$nextTick(() => {
      // document.getElementById('player1').mediaelementplayer({
      //   flashStreamer:"rtmp://202.69.69.180:443/webcast/bshdlive-pc"
      // });
    })
    
  }
}
</script>