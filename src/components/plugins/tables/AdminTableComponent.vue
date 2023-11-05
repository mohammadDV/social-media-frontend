<template>

    <div class="flex gap-3 mb-3">
      <div class="w-1/2 md:w-1/4">
        <label for="">ستون جستجو</label>
        <select name="serach_type" class="form-control-select" v-model="searchField">
            <option value="id">شناسه</option>
            <option value="title">عنوان</option>
        </select>
      </div>
      <div class="w-1/2 md:w-1/4">
        <label for="search">عبارت جستجو</label>
        <input name="serach" class="form-control is-vt" type="text" v-model="searchValue">
      </div>
    </div>

    <EasyDataTable
        ref="dataTable"
      v-model:server-options="serverOptions"
      :server-items-length="serverItemsLength"
      :loading="loading"
      :headers="headers"
      :items="items"
      show-index
      :search-field="searchField"
      :search-value="searchValue"
      v-model:items-selected="itemsSelected"
      :header-item-class-name="headerItemClassNameFunction"
      :body-item-class-name="bodyItemClassNameFunction"
      :rows-per-page="10"
      hide-footer
    >


    <slot></slot>

    <template #item-actions="item">
      <a class="p-1 rounded btn-success m-1" :href="'/profile/posts/edit/' + item.id" ><span class="material-icons size-font-ahalf"> edit </span></a>
      <a class="p-1 rounded btn-danger m-1" :href="'/profile/posts/edit/' + item.id" ><span class="material-icons size-font-ahalf"> delete </span></a>
    </template>
    <template #header-title="header">
      <div class="customize-header">
        {{ header.text }}
      </div>
    </template>
    <template #item-image="item">
        <img :src="item.image" alt="image" class="w-[50px]">
    </template>

    <template #empty-message>
        <a >{{ $t('site.nothing here') }}</a>
    </template>

</EasyDataTable>

<div class="customize-footer flex flex-row-reverse">
    <div class="customize-rows-per-page m-2">
      <select
        class="select-items btn bg-primary text-white"
        @change="updateRowsPerPageSelect"
      >
        <option
          v-for="item in rowsPerPageOptions"
          :key="item"
          :selected="item === rowsPerPageActiveOption"
          :value="item"
        >
          {{ item }}
        </option>
      </select>
    </div>

    <div class="customize-index m-2 p-2">
      نمایش سطرهای: {{currentPageFirstIndex}} ~ {{currentPageLastIndex}} از {{clientItemsLength}}
    </div>
  
    <div class="customize-buttons mt-2 p-1 border flex rounded">
      <template v-for="(paginationNumber, key) in maxPaginationNumber" :key="key">
        <div
          v-if="
          currentPaginationNumber != undefined &&
          !(paginationNumber > currentPaginationNumber + 2) &&
          !(paginationNumber < currentPaginationNumber - 2)"
          class="customize-button m-1 py-1 px-2 rounded cursor-pointer"
          :class="{'active': paginationNumber === currentPaginationNumber}"
          @click="updatePage(paginationNumber)"
        >
            {{paginationNumber}}
          </div>
      </template>
    </div>
  
    <div class="customize-pagination flex-grow">
      <button :class="{
        'prev-page m-2 bg-vt rounded p-2 text-white': true,
        'cursor-pointer': !isFirstPage,
        }" @click="prevPage" :disabled="isFirstPage">صفحه قبلی</button>
      <button :class="{
        'prev-page m-2 bg-vt rounded p-2 text-white': true,
        'cursor-pointer': !isLastPage,
        }" @click="nextPage" :disabled="isLastPage">صفحه بعدی</button>
    </div>
  </div>
  </template>
  
  <script lang="ts" setup>

  import {useApi} from '../../../utils/api';
  import { ref, watch } from "vue";
  import type { Header, Item, ServerOptions, HeaderItemClassNameFunction, BodyItemClassNameFunction } from "vue3-easy-data-table";
  import { usePagination, useRowsPerPage } from "use-vue3-easy-data-table";
  import type { UsePaginationReturn, UseRowsPerPageReturn } from "use-vue3-easy-data-table";
  
    // $ref dataTable
    const dataTable = ref();

    const {
  currentPageFirstIndex,
  currentPageLastIndex,
  clientItemsLength,
  maxPaginationNumber,
  currentPaginationNumber,
  isFirstPage,
  isLastPage,
  nextPage,
  prevPage,
  updatePage,
}: UsePaginationReturn = usePagination(dataTable);

const {
  rowsPerPageOptions,
  rowsPerPageActiveOption,
  updateRowsPerPageActiveOption,
}: UseRowsPerPageReturn = useRowsPerPage(dataTable);

const updateRowsPerPageSelect = (e: Event) => {
  updateRowsPerPageActiveOption(Number((e.target as HTMLInputElement).value));
};


  const itemsSelected = ref<Item[]>([]);
  const searchField = ref("title");
  const searchValue = ref("");
  const headers: Header[] = [
    { text: "شناسه", value: "id", sortable: true},
    { text: "عنوان", value: "title" },
    { text: "کاربر", value: "user_id" },
    { text: "تصویر", value: "image", sortable: true },
    { text: "نوع", value: "type", sortable: true },
    { text: "وضعیت", value: "status", sortable: true },
    { text: "تعداد کامنت", value: "favouriteSport" },
    { text: "بازدید", value: "views" },
    { text: "تاریخ", value: "created_at" },
    { text: "مدیریت", value: "actions" },
  ];
  
  const items = ref<Item[]>([]);
  
  const loading = ref(false);
  const serverItemsLength = ref(0);
  const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: 2,
    sortBy: 'id',
    sortType: 'desc',
  });


  const headerItemClassNameFunction: HeaderItemClassNameFunction = (): string => {
    return 'vt-bg-text';
  };

  const bodyItemClassNameFunction: BodyItemClassNameFunction = (): string => {   
    return 'direction-right';
  };


  
  const loadFromServer = async () => {
    loading.value = true;
    await useApi().get('/api/profile/posts' ,serverOptions.value)
    .then((response: any) => {
        items.value = response.data.data;
        serverItemsLength.value = response.data.total;
        serverItemsLength.value = 20;
    })
    loading.value = false;
  };
  
  // initial load
  loadFromServer();
  
  watch(serverOptions, () => { loadFromServer(); }, { deep: true });
  </script>
