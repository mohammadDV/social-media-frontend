<script lang="ts" setup>
 
  import {useApi} from '../../utils/api';
 import { useRoute } from 'vue-router';
  import { ref, watch, reactive, onMounted } from "vue";
  import type { Header, Item, HeaderItemClassNameFunction, BodyItemClassNameFunction } from "vue3-easy-data-table";

  import VTInput from '../../elements/VTInput.vue'; 
  import VTButton from '../../elements/VTButton.vue'; 
  import VTSelect from '../../elements/VTSelect.vue'; 
  import { useToast } from "vue-toast-notification";
  import { useI18n } from "vue-i18n";

    const { t } = useI18n();
  
    const dataTable = ref();
    const route = useRoute();
    const league = ref({});
    const stepId = ref(0);

    const initialFormState = {
        title: '',
        priority: 0,
        current: 0,
        status: 0,
    };


    const getLeague = () => {
        if (route.params.id != undefined) {
            useApi().get(`/api/profile/leagues/${route.params.id}`)
                .then((response) => {
                    league.value = response?.data;
                });

        }
    }

    const currentList = ref([
        {
            id:0,
            title: t('site.Inactive')
        },
        {
            id:1,
            title: t('site.Active')
        }
    ]);

    const statusList = ref([
        {
            id:0,
            title: t('site.Inactive')
        },
        {
            id:1,
            title: t('site.Active')
        }
    ]);

 const form = reactive({ ...initialFormState });

  const searchField = ref("title");
  const searchValue = ref("");
  const headers: Header[] = [
    { text: t('site.Title'), value: "title" },
    { text: t('site.Priority'), value: "priority" },
    { text: t('site.Current step'), value: "current" },
    { text: t('site.Status'), value: "status", sortable: true },
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
    await useApi().get(`/api/profile/leagues/${route.params.id}/steps`, serverOptions.value)
    .then((response: any) => {
        items.value = response.data;
    })
    loading.value = false;
  };

  const $toast = useToast();
  
  const editItem = (id: Number) => {
    const temp = items.value.find(item => item.id == id);
    if (temp) {
        const { id, title, priority, current, status } = temp;
        form.title = title;
        form.priority = priority;
        form.current = current;
        form.status = status;
        stepId.value = id
    }
  };

  const resetForm = () => {
    Object.assign(form, { ...initialFormState });
    stepId.value = 0;
  };

  const send = () => {
    
    let url = `/api/profile/leagues/${route.params.id}/steps`;

    if (stepId.value > 0) {
        url = `/api/profile/leagues/${route.params.id}/steps/${stepId.value}`;
    }

    useApi().post(url, form)
    .then((response) => {
        if (response.data.status) {
            $toast.success(response.data.message);
            resetForm();
            loading.value = true;
            stepId.value = 0;
            setTimeout(() => { loadFromServer(); loading.value = false; }, 1000);
        }
    })
    .catch(error => {
        if (error?.response?.data?.status == 0) {
            $toast.error(error.response.data.message);
        }
    })
  };

  
  // initial load
  onMounted(() => {


    window.document.title =   `${t('site.League management')} | ${t('site.Website name')}`;
    if (route.params.id) {
        getLeague();
        loadFromServer();
    }

});
  
  watch(serverOptions, () => { loadFromServer(); }, { deep: true });

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
                            <router-link to="/profile/leagues" :title="$t('site.League management')">
                                {{ $t('site.League management') }}
                            </router-link>
                        </li>
                        <li class="breadcrumb-item">
                            {{ league?.title }}
                        </li>
                    </ol>
                </nav>
                <div class="place-button">
                    <router-link to="/profile/leagues" :title="$t('site.Create new league')">
                        <button class="btn btn-primary">{{ $t('site.League management') }}</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="card p-3">
            <div class="flex items-end md:flex-nowrap gap-3 mb-3">
                <div class="w-full md:w-1/4">
                    <VTInput
                        class="mt-2"
                        :is-vt="true"
                        name="title"
                        v-model="form.title"
                        :label="$t('site.Title')"/>
                </div>
                <div class="w-full md:w-1/4">
                    <VTInput
                        class="mt-2"
                        input-type="number"
                        :is-vt="true"
                        name="priority"
                        v-model="form.priority"
                        :label="$t('site.Priority')"/>
                </div>
                <div class="w-full md:w-1/4">
                    <VTSelect 
                        class="mt-2"
                        :is-vt="true"
                        :label="$t('site.Current step')"
                        v-model="form.current" 
                        :options="currentList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="current"/>
                </div>
                <div class="w-full md:w-1/4">
                    <VTSelect 
                        class="mt-2"
                        :is-vt="true"
                        :label="$t('site.Status')"
                        v-model="form.status" 
                        :options="statusList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="status"/>
                </div>
                <div class="flex gap-2 w-full md:w-1/4">
                    <VTButton 
                        class="justify-center btn-outline-secondary btn-sm mt-4" 
                        size="medium"
                        color="primary"
                        @click="send"
                        >
                        {{ stepId > 0 ? $t('site.Edit') : $t('site.Add') }}
                    </VTButton> 
                    <VTButton v-if="stepId > 0"
                        class="justify-center btn-outline-secondary btn-sm mt-4" 
                        size="medium"
                        color="default"
                        @click="resetForm"
                        >
                        {{ $t('site.Cancel') }}
                    </VTButton> 
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
                <template #item-actions="item">
                    <div class="flex">
                        <router-link v-if="league?.type == 2" class="p-1 rounded btn-warning m-1 text-white" :to="'/profile/steps/' + item.id + '/clubs'">
                            <span class="material-icons size-font-ahalf"> add </span>
                        </router-link>
                        <router-link class="px-2 py-1 rounded btn-warning m-1 text-white text-decoration-none" :to="'/profile/steps/' + item.id + '/matches'">
                            <span > {{ $t('site.Match management') }} </span>
                        </router-link>
                        <span @click="editItem(item.id)" class="p-1 rounded btn-info m-1 text-white material-icons size-font-ahalf cursor-pointer"> edit </span>
                    </div>
                </template>
                <template #empty-message>
                    <a >{{ $t('site.nothing here') }}</a>
                </template>
            </EasyDataTable>
        </div>
    </div>
</template>