<template>
  <a-layout>
    <!-- <a-flex justify="center" align="center" vertical style="min-height: 100vh"> -->
    <a-row style="min-height: 100vh">
      <a-col :span="3"></a-col>
      <a-col :span="18">
        <a-flex justify="center" align="center" vertical style="min-height: 100vh">
          <a-form
            :model="useLoginStore()"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="onFinish"
          >
            <a-form-item label="ログインID" name="username" :rules="[{ required: true }]">
              <a-input v-model:value="useLoginStore().username" />
            </a-form-item>

            <a-form-item label="パスワード" name="password" :rules="[{ required: true }]">
              <a-input-password v-model:value="useLoginStore().password" autocomplete />
            </a-form-item>

            <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
              <a-checkbox v-model:checked="useLoginStore().remember">Remember me</a-checkbox>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button
                type="primary"
                html-type="submit"
                :disabled="useGlobalState().getProcessing"
                :loading="useGlobalState().getProcessing"
              >
                ログイン
              </a-button>
            </a-form-item>
          </a-form>
        </a-flex>
      </a-col>
      <a-col :span="3"></a-col>
    </a-row>
    <!-- </a-flex> -->
  </a-layout>
</template>
<script lang="ts" setup>
import { useLoginStore } from '@/stores/login';
import { useGlobalState } from '@/stores/global';

//validate success
const onFinish = () => {
  useLoginStore().login();
};
</script>
<style scoped>
#login {
  background: rgba(255, 255, 255, 0.3);
}
</style>
