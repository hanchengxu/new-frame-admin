<template>
  <a-card>
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      :disabled="componentDisabled"
      style="max-width: 600px"
    >
      <a-divider orientation="left" style="height: 2px; border-color: #1677ff"
        >基本情報<span>{{ route.params.id }}</span></a-divider
      >
      <RouterLink :to="{ name: 'targetPreview', params: { id: 1 } }"> preview </RouterLink>
      <a-form-item label="Checkbox">
        <a-checkbox>checkbox</a-checkbox>
      </a-form-item>
      <a-form-item label="Radio">
        <a-radio-group v-model:value="radioValue">
          <a-radio value="apple">Apple</a-radio>
          <a-radio value="pear">Pear</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Input">
        <a-input />
      </a-form-item>
      <a-form-item label="Select">
        <a-select>
          <a-select-option value="demo">Demo</a-select-option>
        </a-select>
      </a-form-item>
      <a-divider orientation="left" style="height: 2px; border-color: #1677ff">追加情報</a-divider>
      <a-form-item label="TreeSelect">
        <!-- <a-tree-select :tree-data="treeData" /> -->
      </a-form-item>
      <a-form-item label="Cascader">
        <!-- <a-cascader :options="options" /> -->
      </a-form-item>
      <a-form-item label="DatePicker">
        <a-date-picker />
      </a-form-item>
      <a-form-item label="RangePicker">
        <a-range-picker />
      </a-form-item>
      <a-form-item label="InputNumber">
        <a-input-number />
      </a-form-item>
      <a-form-item label="TextArea">
        <a-textarea :rows="4" />
      </a-form-item>
      <a-divider orientation="left" style="height: 2px; border-color: #1677ff">ファイル管理</a-divider>
      <a-form-item label="Switch">
        <a-switch v-model:checked="checked" />
      </a-form-item>
      <a-form-item label="Upload">
        <a-upload action="/upload.do" list-type="picture-card">
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
    <a-row>
      <a-col span="3"></a-col>
      <a-col>
        <a-affix :offset-bottom="10">
          <a-button type="primary" @click="() => (componentDisabled = !componentDisabled)">
            {{ componentDisabled ? '編集' : '保存' }}
          </a-button>
        </a-affix>
      </a-col>
    </a-row>
  </a-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const componentDisabled = ref(true);
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
const radioValue = ref('apple');
// const treeData = reactive<TreeSelectProps['treeData']>([
//   { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
// ]);
// const options = reactive<CascaderProps['options']>([
//   {
//     value: 'zhejiang',
//     label: 'Zhejiang',
//     children: [
//       {
//         value: 'hangzhou',
//         label: 'Hangzhou',
//       },
//     ],
//   },
// ]);
const checked = ref(false);
</script>
