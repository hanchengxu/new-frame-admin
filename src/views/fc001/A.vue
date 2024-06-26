<template>
  <div>AAAA</div>
  <br />
  <div>Project name: xxx</div>
  <br />
  <div>
    {{ fc001Store.count }}<span style="padding-left: 10px"><button @click="addCount">Add</button></span>
    <span style="padding-left: 5px"><button @click="minusCount">Minus</button></span>
  </div>

  <br /><br /><br />
  <Button @click="goToOtherPage('/')">Go to Top</Button>
  <button class="button" style="margin-left: 10px" @click="goToOtherPage('/B')">Go to B</button>
</template>
<script setup lang="ts">
import { goToOtherPage } from '@/router/index';
import { useFc001Store } from '@/stores/fc001';
import { Button } from 'ant-design-vue';

const fc001Store = useFc001Store();

// console.log(test);

console.log(123);

const addCount = () => {
  fc001Store.increment();
  fc001Store.testAction(['f', 'x']);
};

const minusCount = () => {
  fc001Store.minus();
};
</script>
