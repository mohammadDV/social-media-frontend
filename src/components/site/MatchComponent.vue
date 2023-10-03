<script setup>

  import { useApi } from '@/utils/api.ts';
  import { onMounted, ref } from 'vue';
  import VTSelect from "@/elements/VTSelect.vue";
  import TabsComponent from '@/components/plugins/tabs/TabsComponent';
  import TabComponent from '@/components/plugins/tabs/TabComponent';

  const title = ref('');
  const tabItem = ref('timing');
  const league = ref('');
  const leagues = ref([]);
  const steps = ref([]);
  const matches = ref([]);
  const clubs = ref([]);

  onMounted(() => {
    useApi().get('api/leagues')
        .then((response) => {
            title.value = response.data[1].title;
            steps.value = response.data[1].steps;
            leagues.value = response.data[1].leagues;
            matches.value = response.data[1].matches;
            clubs.value = response.data[1].clubs;
        })
  });

  const changeLeague = (value) => {

    console.log(league.value);
    console.log(value);
    console.log("ok");
  }

  const changeTab = (tab) => {
    tabItem.value = tab
  }

</script>

<template>
   <div class="card vt-news-card height-md with-select">
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
            <div class="league-wrapper">
                <VTSelect 
                    v-model="league" 
                    :options="leagues" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="league"
                    :label="title"
                    @change="changeLeague"/>
            </div>
            <div class="match-days">
                <VTSelect 
                    v-model="step" 
                    :options="steps" 
                    optionsValueKey="id"
                    optionsDisplayValueKey="title"
                    name="step"
                    label="دور"
                    @change="changeStep"/>
                    <!-- @foreach ($steps['steps'] ?? [] as $step)
                        <option value="{{ $step["id"] }}" @if($steps["current"]["id"] == $step["id"]) selected @endif>{{ $step["title"] }}</option>
                    @endforeach -->
            </div>
            <div class="card-body-inner">
                <div class="tab-content" id="hottiesContent">
                    <div class="tab-pane fade show active" id="timeTable" role="tabpanel" aria-labelledby="timeTable-tab">
                        <div class="scheduling">

                            <div id="match-list-id" class="match-list rows">
                                <div class="row" v-for="(match, index) in matches" :key="index">
                                    <div class="team-home">
                                        <img  :src="match.home_image"  width="32"  height="32"  :alt="match.home"/>
                                        <a target="_blank" >{{ match.home }}</a>
                                    </div>
                                    <div class="result">
                                        <span class="home"> {{ match.hsc }} </span>
                                        <span class="dot">:</span>
                                        <span class="away"> {{ match.asc }} </span>
                                    </div>
                                    <div class="team-away">
                                        <img :src="match.away_image" width="32" height="32" :alt="match.away"/>
                                        <a target="_blank">{{ match.away }}</a>
                                    </div>
                                    <div class="status">
                                        <i class="finished"></i>{{ match.status }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div  class="tab-pane fade"  id="standing"  role="tabpanel"  aria-labelledby="standing-tab">
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
                    <div class="tab-pane fade" id="goals" role="tabpanel" aria-labelledby="goals-tab">
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
