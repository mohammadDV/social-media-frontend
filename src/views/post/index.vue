<script lang="ts" setup>
 
  import {useApi} from '../../utils/api';
  import { onMounted, ref, watch } from "vue";
  import jalaliMoment from 'moment-jalaali';
  import type { Header, Item, HeaderItemClassNameFunction, BodyItemClassNameFunction } from "vue3-easy-data-table";
  import { usePagination, useRowsPerPage } from "use-vue3-easy-data-table";
  import type { UsePaginationReturn, UseRowsPerPageReturn } from "use-vue3-easy-data-table";
  import { useToast } from "vue-toast-notification";
  import { useI18n } from "vue-i18n";
  import { useAuthStore } from '../../stores/auth';

  const authStore = useAuthStore();
  const hasShowPermission = ref(authStore.permissions.includes('post_show'));
  const hasUpdatePermission = ref(authStore.permissions.includes('post_update'));
  const hasDeletePermission = ref(authStore.permissions.includes('post_delete'));

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
  const serverOptions = ref({
    page: 1,
    rowsPerPage: 25,
    sortBy: 'id',
    sortType: 'desc',
    query: '',
  });

  const headerItemClassNameFunction: HeaderItemClassNameFunction = (): string => {
    return 'vt-bg-text';
  };

  const bodyItemClassNameFunction: BodyItemClassNameFunction = (): string => {   
    return 'direction-right';
  };
  
  const loadFromServer = async () => {
    loading.value = true;
    await useApi().get('/api/profile/posts', serverOptions.value)
    .then((response: any) => {
        items.value = response.data.data;
        serverItemsLength.value = response.data.total;
    })
    loading.value = false;
  };

  const $toast = useToast();
  const deletItem = (id: Number) => {
    if(confirm('Are you sure you want to remove this item?')) {
        useApi().deleteRequest(`/api/profile/posts/${id}`)
        .then((response: any) => {
            if (response.data.status) {

                $toast.success(response.data.message);
                loadFromServer();
            }
        })
    }
  };
  
  // initial load
  loadFromServer();
  
  watch(serverOptions, () => { loadFromServer(); }, { deep: true });

  onMounted(() => {
    window.document.title =   `${t('site.Post management')} | ${t('site.Website name')}`;
  })

</script>

<template>
    <div class="col-12 col-md-7 col-lg-9 order-1 order-md-2 mb-4 mb-md-0">
        <div class="card vt-news-card breadcrumb-card mb-3">
            <div class="card-body">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/profile" :title="$t('site.Profile')">
                                {{ $t('site.Profile') }}
                            </router-link>
                        </li>
                        <li class="breadcrumb-item">
                            {{ $t('site.Post management') }}
                        </li>
                    </ol>
                </nav>
                <div v-if="hasShowPermission" class="place-button">
                    <router-link to="/profile/posts/create" :title="$t('site.Create new post')">
                        <button class="btn btn-primary">{{ $t('site.Create new post') }}</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="card p-3">
            <div class="flex gap-3 mb-3">
                <div class="w-full md:w-1/4">
                    <label for="search">{{ $t('site.Search') }}</label>
                    <input name="serach" class="form-control is-vt" type="text" v-model.lazy="serverOptions.query">
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
                border-cell
                alternating
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
                        <router-link v-if="hasUpdatePermission" class="p-1 rounded btn-info m-1 text-white" :to="'/profile/posts/' + item.id">
                            <span class="material-icons size-font-ahalf"> edit </span>
                        </router-link>
                        <span v-if="hasDeletePermission" @click="deletItem(item.id)" class="p-1 rounded btn-danger m-1 text-white material-icons size-font-ahalf cursor-pointer"> delete </span>
                    </div>
                </template>
                <template #item-image="item">
                        <img :src="item.image" alt="image" class="w-[50px]">
                </template>
                <template #item-created_at="item">
                    {{ jalaliMoment(item.created_at).format('jYYYY-jMM-jDD') }}
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
                    }" @click="prevPage" :disabled="isFirstPage">{{ $t('site.Previous page') }}</button>
                <button :class="{
                    'prev-page m-2 bg-vt rounded p-2 text-white': true,
                    'cursor-pointer': !isLastPage,
                    }" @click="nextPage" :disabled="isLastPage">{{ $t('site.Next page') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>