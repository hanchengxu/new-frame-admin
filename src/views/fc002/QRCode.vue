<template>
  <a-card>
    <div style="max-width: 600px">
      <a-divider orientation="left" style="height: 2px; border-color: #1677ff">QRステータス</a-divider>
      <a-space wrap align="center" size="middle">
        <a-qrcode value="http://www.antdv.com" status="loading" />
        <a-qrcode value="http://www.antdv.com" status="expired" @refresh="() => console.log('refresh')" />
        <a-qrcode value="http://www.antdv.com" status="scanned" />
      </a-space>
      <br />
      <br />
      <a-divider orientation="left" style="height: 2px; border-color: #1677ff">URLよりQRコード作成</a-divider>
      <a-space wrap align="center" size="middle">
        <a-watermark content="Ant Design Vue">
          <a-qrcode :value="text" />
        </a-watermark>
        <a-input v-model:value="text" placeholder="-" :maxlength="60" />
      </a-space>
      <br />
      <br />
      <a-divider orientation="left" style="height: 2px; border-color: #1677ff">QRコードダウンロード</a-divider>
      <a-space wrap align="center" size="middle">
        <a-qrcode ref="qrcodeCanvasRef" value="http://www.antdv.com" />

        <br />
        <a-button type="primary" @click="dowloadChange">Downlaod</a-button>
      </a-space>
      <br />
      <br />
      <a-divider orientation="left" style="height: 2px; border-color: #1677ff">QRコードダウンロード</a-divider>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const text = ref('https://www.antdv.com/');
const qrcodeCanvasRef = ref();
const dowloadChange = async () => {
  const url = await qrcodeCanvasRef.value.toDataURL();
  const a = document.createElement('a');
  a.download = 'QRCode.png';
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
</script>
<style scoped></style>
