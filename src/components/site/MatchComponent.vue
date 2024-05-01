<script setup>

  import { useApi } from '@/utils/api.ts';
  import { onMounted, ref } from 'vue';
  import VTSelect from "@/elements/VTSelect.vue";
  import TabsComponent from '@/components/plugins/tabs/TabsComponent';
  import TabComponent from '@/components/plugins/tabs/TabComponent';
  import jalaliMoment from 'moment-jalaali';

  const title = ref('');
  const tabItem = ref('timing');
  const leagueId = ref(0);
  const leagues = ref([]);
  const steps = ref([]);
  const stepId = ref(0);
  const matches = ref([]);
  const clubs = ref([]);

  onMounted(() => {
    useApi().get('api/leagues')
        .then((response) => {
            if (response.data[1] != undefined) {
                title.value = response.data[1].title;
                steps.value = response.data[1].steps.steps;
                stepId.value = response.data[1].steps?.current?.id;
                leagues.value = response.data[1].leagues;
                leagueId.value = response.data[1].leagues[0].id;
                matches.value = response.data[1].matches;
                clubs.value = response.data[1].clubs;
            }
        })
  });

  const changeLeague = () => {

    useApi().get(`api/leagues/${leagueId.value}`)
        .then((response) => {
            matches.value = response.data.matches;
            clubs.value = response.data.clubs;
            steps.value = response.data.steps.steps;
            stepId.value = response.data.steps?.current?.id;
        })
  }

  const changeStep = () => {
    useApi().get(`api/step/${stepId.value}`)
        .then((response) => {
            matches.value = response.data.matches;
            clubs.value = response.data.clubs;
        })
  }

  const changeTab = (tab) => {
    tabItem.value = tab
  }

</script>

<template>
   <div class="card vt-news-card height-md with-select">
    <div class="league-wrapper">
                <VTSelect 
                    v-model="leagueId" 
                    :options="leagues" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="league"
                    :label="title"
                    @change="changeLeague"/>
            </div>
            <div class="match-days">
                <VTSelect 
                    v-model="stepId" 
                    :options="steps" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="step"
                    label="دور"
                    @change="changeStep"/>
            </div>
        <div class="card-header">
            <tabs-component class="nav">
                <tab-component class="nav-item cursor-pointer" :is-active="tabItem == 'timing'"
                                @tab-clicked="changeTab('timing')">
                                {{ $t('site.Timing') }}
                </tab-component>
                <tab-component class="nav-item cursor-pointer" :is-active="tabItem == 'ranking'"
                                @tab-clicked="changeTab('ranking')">
                                {{ $t('site.Ranking') }}
                </tab-component>
                <tab-component class="nav-item cursor-pointer" :is-active="tabItem == 'goals'"
                                @tab-clicked="changeTab('goals')">
                                گلزنان
                </tab-component>
            </tabs-component>
        </div>
        <div class="card-body" id="table-match-{{ $id }}">
            
            <div class="card-body-inner">
                <div class="tab-content" id="hottiesContent">
                    <div v-if="tabItem == 'timing'" class="tab-pane fade show active" id="timeTable" role="tabpanel" aria-labelledby="timeTable-tab">
                        <div class="scheduling">
                            <div id="match-list-id" class="match-list rows">
                                <div class="row" v-for="(match, index) in matches" :key="index">
                                    <div class="team-home">
                                        <router-link class="flex flex-row-reverse items-center justify-content-center" :to="`/club/${match.home_id}`" :title="match.home">
                                            <img class="rounded-full w-[32px] h-[32px]" :src="match.home_image" :alt="match.home"/>
                                            {{ match.home }}
                                        </router-link>
                                    </div>
                                    <div class="result">
                                        <span class="home"> {{ match.hsc }} </span>
                                        <span class="dot">:</span>
                                        <span class="away"> {{ match.asc }} </span>
                                    </div>
                                    <div class="team-away">
                                        <router-link class="flex flex-row items-center justify-content-center" :to="`/club/${match.away_id}`" :title="match.away">
                                            <img :src="match.away_image" class="rounded-full w-[32px] h-[32px]" :alt="match.away"/>
                                            {{ match.away }}
                                        </router-link>
                                    </div>
                                    <div v-if="match.status == 1" class="status">
                                        <i class="finished"></i>{{ match.status_name }}
                                    </div>
                                    <div v-else class="status">
                                        <i class="finished"></i><span>{{ jalaliMoment(match.date).format('dddd jD jMMMM - HH:mm') }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="tabItem == 'ranking'" class="tab-pane fade show active" >
                        <div class="standing-list">
                            <div class="standing-section">
                                <div class="standing-section-header">
                                    <div class="standing-section-title" style="background: transparent"></div>
                                    <span class="standing-section-match">بازی</span>
                                    <span class="standing-section-point">امتیاز</span>
                                </div>
                                <div id="club-list-id" class="club-list rows">
                                    <div class="row" v-for="(club, index) in clubs" :key="index">
                                        <span class="rank">{{ club.id }}</span>
                                        <span class="logo">
                                        <img :alt="club.title" :src="club.image" width="32" height="32"/>
                                        </span>
                                        <span class="name">
                                            <a target="_blank">{{ club.title }}</a>
                                        </span>
                                        <span class="match">{{ club.games_count }}</span>
                                        <span class="point">{{ club.points }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="tabItem == 'goals'" class="tab-pane fade show active" id="goals" role="tabpanel" aria-labelledby="goals-tab">
                        <div class="scorer-table">
                            <div class="card-table">
                                <div class="rows">
                                    <div class="header">
                                        <span class="rank">رتبه</span>
                                        <span class="player">بازیکن</span>
                                        <span class="goal">گل</span>
                                    </div>
                                    <div class="row">
                                        <span class="rank">1</span>
                                        <span class="avatar"
                                        ><img
                                                src="https://www.tarafdari.com/sites/default/files/styles/sport_small/public/apps/sport/player/441484.png?itok=_2M7oErD"
                                                width="32"
                                                height="32"
                                                alt="ارلینگ هالند"
                                            /></span>
                                        <span class="player">ارلینگ هالند</span>
                                        <span class="goal">10</span>
                                    </div>
                                    <div class="row">
                                        <span class="rank">2</span>
                                        <span class="avatar"
                                        ><img
                                                src="https://www.tarafdari.com/sites/default/files/styles/sport_small/public/apps/sport/player/377149.png?itok=bAfdh1DQ"
                                                width="32"
                                                height="32"
                                                alt="کیلیان ام باپه"
                                            /></span>
                                        <span class="player">کیلیان ام باپه</span>
                                        <span class="goal">8</span>
                                    </div>
                                    <div class="row">
                                        <span class="rank">3</span>
                                        <span class="avatar"
                                        ><img
                                                src="https://www.tarafdari.com/sites/default/files/styles/sport_small/public/apps/sport/player/102697.png?itok=Q8b7uAKd"
                                                width="32"
                                                height="32"
                                                alt="نیمار"
                                            /></span>
                                        <span class="player">نیمار</span>
                                        <span class="goal">6</span>
                                    </div>
                                    <div class="row">
                                        <span class="rank">4</span>
                                        <span class="avatar"
                                        ><img
                                                src="https://www.tarafdari.com/sites/default/files/styles/sport_small/public/apps/sport/player/103171.png?itok=HFcOmyfI"
                                                width="32"
                                                height="32"
                                                alt="آلوارو موراتا"
                                            /></span>
                                        <span class="player">آلوارو موراتا</span>
                                        <span class="goal">6</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
