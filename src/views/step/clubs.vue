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
  
    const clubId = ref(0);
    const dataTable = ref();
    const route = useRoute();
    const step = ref({});
    const sportId = ref(0);
    const countryId = ref(0);

    const initialFormState = {
        // title: '',
        points: 0,
        games_count: 0,
        club_id: 0,
    };

    const clubList = ref([]);

    const getClubs = () => {

        if (sportId.value == 0 || countryId.value == 0) {
            return;
        }
        useApi().get(`/api/profile/clubs/all/${sportId.value}/${countryId.value}`)
        .then((response) => {
            clubList.value = response.data;
        })
    }

    const getStep = () => {
        if (route.params.id != undefined) {
            useApi().get(`/api/profile/steps/${route.params.id}`)
                .then((response) => {
                    step.value = response.data;
                    sportId.value = response.data?.league?.sport_id
                    countryId.value = response.data?.league?.country_id
                });

            setTimeout(() => { getClubs() }, 1000);
        }
    }

    const canSubmit = ref(true);
    const countryList = ref();

    const getCountries = () => {
        useApi().get(`/api/profile/countries/index`)
        .then((response) => {
            countryList.value = response.data;
        })
    }


 const form = reactive({ ...initialFormState });

  const searchField = ref("title");
  const searchValue = ref("");
  const headers: Header[] = [
    { text: t('site.Title'), value: "title" },
    { text: t('site.Games count'), value: "games_count" },
    { text: t('site.Points'), value: "points" },
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
    await useApi().get(`/api/profile/steps/${route.params.id}/clubs`, serverOptions.value)
    .then((response: any) => {

        items.value = response.data.map(item => ({
            title: item.title,
            points: item.pivot.points,
            games_count: item.pivot.games_count,
            club_id: item.id,
        }));

        serverItemsLength.value = response.data.total;
    })
    loading.value = false;
  };

  const $toast = useToast();
  const addItem = () => {

    if(form?.club_id == 0) {
        return;
    }

    const indexToDelete = items.value.findIndex(item => item.club_id == form.club_id);

    if (indexToDelete !== -1) {
        $toast.error('This club already exists. please choose another one');
        return;
    }

    const clubIndex = clubList.value.find((item) => item.id == form.club_id);
    form.title = clubIndex.title;
    items.value.push({ ...form });
    resetForm();
  };
  
  const deletItem = (clubId: Number) => {
    if(confirm('Are you sure you want to remove this item?')) {
        items.value = items.value.filter(item => item.club_id != clubId);

        serverItemsLength.value = items.value.length;
    }
  };

  const resetForm = () => {
    Object.assign(form, { ...initialFormState });
    clubId.value = 0;
  };

  const send = () => {

    if (!items.value.length || !canSubmit.value) {
        return;
    }

    const formattedData = {};

    items.value.forEach(item => {
        const clubId = parseInt(item.club_id);
        formattedData[clubId] = {
            points: item.points,
            games_count: item.games_count,
        };
    });

    let url = `/api/profile/steps/${route.params.id}/clubs`;

    const $toast = useToast();
    useApi().post(url, formattedData)
    .then((response) => {
    if (response.data.status) {
        $toast.success(response.data.message);
        resetForm();
        loading.value = true;
        
        setTimeout(() => { loadFromServer(); loading.value = false; }, 1000);
        setTimeout(() => { canSubmit.value = false; }, 1500);

        
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

    if (route.params.id) {
        getStep();
        getCountries();
        loadFromServer();
    }

});
  
  watch(serverOptions, () => { loadFromServer(); }, { deep: true });
  watch(countryId, () => { getClubs(); }, { deep: true });
  watch(items, () => { canSubmit.value = true }, { deep: true });

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
                            <router-link :to="`/profile/leagues/${step?.league?.id}/steps`" :title="$t('site.League management')">
                                {{ step?.league?.title }}
                            </router-link>
                        </li>
                        <li class="breadcrumb-item">
                            {{ step?.title }}
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
                    <VTSelect 
                        class="mt-2"
                        :is-vt="true"
                        :label="$t('site.Country')"
                        v-model="countryId" 
                        :options="countryList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="country_id"/>
                </div>
                <div class="w-full md:w-1/4">
                    <VTSelect 
                        class="mt-2"
                        :is-vt="true"
                        :label="$t('site.Club')"
                        v-model="form.club_id" 
                        :options="clubList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="club_id"/>
                </div>
                <div class="w-full md:w-1/4">
                    <VTInput
                        class="mt-2"
                        :is-vt="true"
                        input-type="number"
                        name="games_count"
                        v-model="form.games_count"
                        :label="$t('site.Games count')"/>
                </div>
                <div class="w-full md:w-1/4">
                    <VTInput
                        class="mt-2"
                        :is-vt="true"
                        input-type="number"
                        name="points"
                        v-model="form.points"
                        :label="$t('site.Points')"/>
                </div>
                <div class="w-full md:w-1/4">
                    <VTButton 
                        class="justify-center btn-outline-secondary btn-sm mt-4" 
                        size="medium"
                        color="primary"
                        :disabled="form?.club_id == 0"
                        @click="addItem"
                        >
                        {{ $t('site.Add') }}
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
                <template #item-actions="item">
                    <div class="flex">
                        <span @click="deletItem(item.club_id)" class="p-1 rounded btn-danger m-1 text-white material-icons size-font-ahalf cursor-pointer"> delete </span>
                    </div>
                </template>
                <template #empty-message>
                    <a >{{ $t('site.nothing here') }}</a>
                </template>

            </EasyDataTable>


            <div class="w-full md:w-1/4">
                    <VTButton 
                        class="justify-center btn-outline-secondary btn-sm mt-4" 
                        size="medium"
                        color="primary"
                        @click="send"
                        :disabled="!canSubmit"
                        >
                        {{ $t('site.Save') }}
                    </VTButton> 
                </div>

        </div>
    </div>
</template>