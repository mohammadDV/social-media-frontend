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
  
    const matchId = ref(0);
    const dataTable = ref();
    const route = useRoute();
    const step = ref({});
    const sportId = ref(0);
    const countryIdHome = ref(0);
    const countryIdAway = ref(0);

    const initialFormState = {
        home_id: '',
        away_id: '',
        hsc: '',
        asc: '',
        date: '',
        hour: '',
        link: '',
        status: '',
        priority: '',
    };

    const clubListHome = ref([]);
    const clubListAway = ref([]);

    const getClubs = (countryId: number, type = 'home') => {

        if (sportId.value == 0 || countryId == 0) {
            return;
        }
        useApi().get(`/api/profile/clubs/all/${sportId.value}/${countryId}`)
        .then((response) => {
            if (type == 'home') {
                clubListHome.value = response.data;
            } else {
                clubListAway.value = response.data;
            }
        })
    }

    const getClub = (clubId: number, type = 'home') => {

        if (clubId == 0) {
            return;
        }

        useApi().get(`/api/profile/clubs/${clubId}`)
        .then((response) => {
            if (type == 'home') {
                countryIdHome.value = response.data?.country_id;
            } else {
                countryIdAway.value = response.data?.country_id;
            }
        })
    }

    const statusList = ref([
    {
        id:0,
        title: t('site.Waiting to start')
    },
    {
        id:1,
        title: t('site.On performing')
    },
    {
        id:2,
        title: t('site.Finish')
    }
  ]);

    const getStep = () => {
        if (route.params.id != undefined) {
            useApi().get(`/api/profile/steps/${route.params.id}`)
                .then((response) => {
                    step.value = response.data;
                    sportId.value = response.data?.league?.sport_id
                    countryIdHome.value = response.data?.league?.country_id
                    countryIdAway.value = response.data?.league?.country_id
                });

            setTimeout(() => { getClubs(countryIdHome.value); getClubs(countryIdHome.value, 'Away') }, 1000);
        }
    }

    // const canSubmit = ref(true);
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
    { text: t('site.Home'), value: "home" },
    { text: t('site.Away'), value: "away" },
    { text: t('site.Hsc'), value: "hsc" },
    { text: t('site.Asc'), value: "asc" },
    { text: t('site.Date'), value: "date" },
    { text: t('site.Hour'), value: "hour" },
    { text: t('site.Priority'), value: "priority" },
    { text: t('site.Link'), value: "link" },
    { text: t('site.Status'), value: "status_name" },
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
    await useApi().get(`/api/profile/steps/${route.params.id}/info`, serverOptions.value)
    .then((response: any) => {

        items.value = response?.data?.matches;
        // items.value = response.data.map(item => ({
        //     title: item.title,
        //     points: item.pivot.points,
        //     games_count: item.pivot.games_count,
        //     club_id: item.id,
        // }));

        serverItemsLength.value = response.data.total;
    })
    loading.value = false;
  };

  const $toast = useToast();

  const editItem = (id: Number) => {
    const temp = items.value.find(item => item.id == id);

    if (temp) {
        loading.value = true
        getClub(temp.home_id);
        getClub(temp.away_id, 'away');
    
        matchId.value = temp.id;
        setTimeout(() => { Object.assign(form, { ...temp }); loading.value = false; }, 1000);
    }
  };

  const deletItem = (matchId: Number) => {
    if(confirm('Are you sure you want to remove this item?')) {
        useApi().deleteRequest(`/api/profile/matches/${matchId}`)
            .then((response) => {
            if (response.data.status) {
                $toast.success(response.data.message);
                resetForm();
                loading.value = true;
                
                setTimeout(() => { loadFromServer(); loading.value = false; }, 1000);
            }
            })
            .catch(error => {
                if (error?.response?.data?.status == 0) {
                    $toast.error(error.response.data.message);
                }
            })
    }
  };

  const resetForm = () => {
    Object.assign(form, { ...initialFormState });
    matchId.value = 0;
  };

  const send = () => {


    let url = `/api/profile/steps/${route.params.id}/matches`;

    if (matchId.value > 0) {
        url = `/api/profile/steps/${route.params.id}/matches/${matchId.value}`;
    }


    useApi().post(url, form)
    .then((response) => {
    if (response.data.status) {
        $toast.success(response.data.message);
        resetForm();
        loading.value = true;
        
        setTimeout(() => { loadFromServer(); loading.value = false; }, 1000);
        // setTimeout(() => { canSubmit.value = false; }, 1500);

        
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
  watch(countryIdHome, () => { getClubs(countryIdHome.value); }, { deep: true });
  watch(countryIdAway, () => { getClubs(countryIdAway.value, 'away'); }, { deep: true });
//   watch(items, () => { canSubmit.value = true }, { deep: true });

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
            <div class="container mx-auto">
                <!-- First Row -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2 items-end mb-3">
                    <div >
                        <VTSelect 
                        class="mt-2"
                        :is-vt="true"
                        :label="$t('site.Country')"
                        v-model="countryIdHome" 
                        :options="countryList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="country_id"/>
                    </div>
                    <div >
                        <VTSelect 
                        class="mt-2"
                        :is-vt="true"
                        :label="$t('site.Home')"
                        v-model="form.home_id" 
                        :options="clubListHome" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="home"/>
                    </div>
                    <div >
                        <VTInput
                        class="mt-2"
                        :is-vt="true"
                        name="hsc"
                        v-model="form.hsc"
                        :label="$t('site.Hsc')"/>
                    </div>
                </div>
                <!-- Second Row -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2 items-end mb-3">
                    <div >
                        <VTSelect 
                        class="mt-2"
                        :is-vt="true"
                        :label="$t('site.Country')"
                        v-model="countryIdAway" 
                        :options="countryList" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="country_id"/>
                    </div>
                    <div >
                        <VTSelect 
                        class="mt-2"
                        :is-vt="true"
                        :label="$t('site.Away')"
                        v-model="form.away_id" 
                        :options="clubListAway" 
                        optionsValueKey="id"
                        optionsDisplayValueKey="title"
                        name="away"/>
                    </div>
                    <div >
                        <VTInput
                        class="mt-2"
                        :is-vt="true"
                        name="asc"
                        v-model="form.asc"
                        :label="$t('site.Asc')"/>
                    </div>
                </div>
                <!-- Third Row -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-2 items-end mb-3">
                    <div >
                        <VTInput
                        class="mt-2"
                        :is-vt="true"
                        name="date"
                        v-model="form.date"
                        :label="$t('site.Date')"/>
                    </div>
                    <div >
                        <VTInput
                        class="mt-2"
                        :is-vt="true"
                        name="hour"
                        v-model="form.hour"
                        :label="$t('site.Hour')"/>
                    </div>
                    <div >
                        <VTInput
                        class="mt-2"
                        :is-vt="true"
                        input-type="number"
                        name="priority"
                        v-model="form.priority"
                        :label="$t('site.Priority')"/>
                    </div>
                    <div >
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
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 items-end mb-3">
                    <div >
                        <VTInput
                        class="mt-2"
                        :is-vt="true"
                        name="link"
                        v-model="form.link"
                        :label="$t('site.Link')"/>
                    </div>
                    <div class="flex gap-2">
                        <VTButton 
                            class="justify-center btn-outline-secondary btn-sm mt-4" 
                            size="medium"
                            color="primary"
                            @click="send"
                            >
                            {{ matchId > 0 ? $t('site.Edit') : $t('site.Save') }}
                        </VTButton> 
                        <VTButton v-if="matchId > 0"
                            class="justify-center btn-outline-secondary btn-sm mt-4" 
                            size="medium"
                            color="default"
                            @click="resetForm"
                            >
                            {{ $t('site.Cancel') }}
                        </VTButton> 
                    </div>
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
                        <span @click="deletItem(item.id)" class="p-1 rounded btn-danger m-1 text-white material-icons size-font-ahalf cursor-pointer"> delete </span>
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