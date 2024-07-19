<template>
  <div>
    <a-row>
      <a-col span="24">
        <!--検索欄-->
        <a-collapse v-model:activeKey="activeKey">
          <a-collapse-panel :show-arrow="false" key="search">
            <template #header><div class="collapse-header">検索条件</div></template>
            <a-form>
              <a-space wrap align="center" size="middle">
                <a-form-item label="氏名" class="form-item">
                  <a-input placeholder="氏名" v-model:value="searchParams.name" />
                </a-form-item>
                <a-form-item label="年齢" class="form-item">
                  <a-input-number :min="1" :max="120" v-model:value="searchParams.age" />
                </a-form-item>
                <a-form-item label="性別" class="form-item">
                  <a-select placeholder="性別" v-model:value="searchParams.gender">
                    <a-select-option value="male">男</a-select-option>
                    <a-select-option value="female">女</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="住所" class="form-item">
                  <a-input placeholder="住所" v-model:value="searchParams.address" />
                </a-form-item>
                <a-form-item label="Tag" class="form-item">
                  <a-select mode="multiple" :options="tagList" v-model:value="searchParams.tags"></a-select>
                </a-form-item>
                <a-form-item class="form-item">
                  <a-checkbox>イベント対象</a-checkbox>
                </a-form-item>
                <a-form-item label="イベント開始" class="form-item">
                  <a-switch :checked="eventCheck" @click="eventClick" size="small" />
                </a-form-item>
                <a-form-item class="form-item" label="日付">
                  <a-range-picker v-model:value="value1" />
                </a-form-item>
                <a-form-item class="form-item" label="時間"
                  ><a-time-picker v-model:value="timePickerValue"
                /></a-form-item>
              </a-space>
              <a-row>
                <a-col span="24">
                  <a-flex justify="center" align="center" gap="middle">
                    <BaseButton @click="clear" type="default">クリア</BaseButton>
                    <StatefulButton @click="search">検索する</StatefulButton>
                  </a-flex>
                </a-col>
              </a-row>
            </a-form>
          </a-collapse-panel>
        </a-collapse>
      </a-col>
    </a-row>
    <a-row style="margin-top: 10px">
      <a-col span="24">
        <a-card>
          <a-table :dataSource="result" :columns="columns" size="small" :loading="useGlobalStore().getProcessing">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <RouterLink :to="{ name: 'targetEdit', params: { id: record.userId } }">
                  {{ record.name }}
                </RouterLink>
              </template>
              <template v-else-if="column.key === 'tags'">
                <a-tag v-for="tag in record.tags" :key="tag" color="volcano">{{ tag }}</a-tag>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useFc001Store } from '@/stores/fc001';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/global';

const searchStore = useFc001Store();
const { searchParams, tagList, result } = storeToRefs(searchStore);

const clear = () => {
  useFc001Store().resetSearch();
};

const search = () => {
  searchStore.search();
};

onMounted(() => {
  //tag選択肢の取得
  searchStore.getTags();
});

const timePickerValue = ref<Dayjs>(dayjs('08:00:00', 'HH:mm:ss'));

type RangeValue = [Dayjs, Dayjs];
const value1 = ref<RangeValue>();

const eventCheck = ref<boolean>(true);
const eventClick = () => {
  eventCheck.value = !eventCheck.value;
};

const activeKey = ref(['search']);

const columns = [
  {
    title: '氏名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '性別',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住所',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
];
</script>
<style scoped>
.collapse-header {
  font-weight: bold;
}
.form-item {
  /* padding: 0px 8px; */
}
.ant-select-show-search,
.ant-select-show-arrow {
  min-width: 60px;
}
</style>
