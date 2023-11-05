<script lang="ts" setup>
 
  import {useApi} from '../../utils/api';
  import { ref, watch } from "vue";
  import type { Header, Item, ServerOptions, HeaderItemClassNameFunction, BodyItemClassNameFunction } from "vue3-easy-data-table";
  import { usePagination, useRowsPerPage } from "use-vue3-easy-data-table";
  import type { UsePaginationReturn, UseRowsPerPageReturn } from "use-vue3-easy-data-table";

  import { useI18n } from "vue-i18n";
    const { t } = useI18n();
  
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


  const searchField = ref("title");
  const searchValue = ref("");
  const headers: Header[] = [
    { text: t("site.Id"), value: "id", sortable: true},
    { text: t('site.Title'), value: "title" },
    // { text: t('site.User'), value: "user_id" },
    { text: t('site.Image'), value: "image", sortable: true },
    { text: t('site.Type'), value: "type", sortable: true },
    { text: t('site.Status'), value: "status", sortable: true },
    { text: t('site.Comments'), value: "comments_count" },
    { text: t('site.Views count'), value: "view" },
    { text: t('site.Special'), value: "special" },
    { text: t('site.Date'), value: "created_at" },
    { text: t('site.Manage'), value: "actions" },
  ];
  
  const items = ref<Item[]>([]);
  
  const loading = ref(false);
  const serverItemsLength = ref(0);
  const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: 10,
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
    })
    loading.value = false;
  };
  
  // initial load
  loadFromServer();
  
  watch(serverOptions, () => { loadFromServer(); }, { deep: true });

</script>

<template>
    <div class="col-12 col-md-7 col-lg-9 order-1 order-md-2 mb-4 mb-md-0">
        <div class="card vt-news-card breadcrumb-card mb-3">
            <div class="card-body">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">{{ $t('site.Profile') }}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">
                            {{ $t('site.Post management') }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <a href="/"><button class="btn btn-primary">{{ $t('site.Create new post') }}</button></a>
                </div>
            </div>
        </div>
        <div class="card p-3">
            <div class="flex gap-3 mb-3">
                <div class="w-1/2 md:w-1/4">
                    <label for="">{{ $t('site.Choose type of search') }}</label>
                    <select name="serach_type" class="form-control-select" v-model="searchField">
                        <option value="id">{{ $t('site.Id') }}</option>
                        <option value="title">{{ $t('site.Title') }}</option>
                    </select>
                </div>
                <div class="w-1/2 md:w-1/4">
                    <label for="search">{{ $t('site.Search') }}</label>
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
                :header-item-class-name="headerItemClassNameFunction"
                :body-item-class-name="bodyItemClassNameFunction"
                hide-footer
                >

                <template #item-status="item">
                        <span v-if="item.status == 1" class="p-1 rounded btn-success m-1" >{{ $t('site.Active') }}</span>
                        <span v-else class="p-1 rounded btn-danger m-1" >{{ $t('site.Inactive') }}</span>
                </template>
                <template #item-type="item">
                        <span v-if="item.type == 1" class="p-1 rounded btn-success m-1" >{{ $t('site.Video') }}</span>
                        <span v-else class="p-1 rounded btn-warning m-1" >{{ $t('site.Common') }}</span>
                </template>
                <template #item-special="item">
                        <span v-if="item.special == 1" class="p-1 rounded btn-success m-1" >{{ $t('site.Special') }}</span>
                        <span v-else class="p-1 rounded btn-warning m-1" >{{ $t('site.Common') }}</span>
                </template>
                <template #item-actions="item">
                    <div class="flex">
                        <a class="p-1 rounded btn-success m-1" :href="'/profile/posts/edit/' + item.id" ><span class="material-icons size-font-ahalf"> edit </span></a>
                        <a class="p-1 rounded btn-danger m-1" :href="'/profile/posts/edit/' + item.id" ><span class="material-icons size-font-ahalf"> delete </span></a>
                    </div>
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
                    }" @click="prevPage" :disabled="isFirstPage">{{ $t('site.Next page') }}</button>
                <button :class="{
                    'prev-page m-2 bg-vt rounded p-2 text-white': true,
                    'cursor-pointer': !isLastPage,
                    }" @click="nextPage" :disabled="isLastPage">{{ $t('site.Previous page') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>