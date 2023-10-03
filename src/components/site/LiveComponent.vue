<script setup>

  import { useApi } from '@/utils/api.ts';
  import { onMounted, ref } from 'vue';

  const lives = ref([]);

  onMounted(() => {
    useApi().get('api/lives')
        .then((response) => {
            lives.value = response.data;
        })
  });

</script>

<template>
   <div>
        <div class="card vt-news-card height-md">
            <div class="card-header">
                <div class="card-header-inner">
                    <span class="material-icons text-primary"> live_tv </span>
                    <span class="card-header-title">پخش زنده</span>
                </div>
            </div>
            <div class="card-body">
                <div class="card-body-inner">
                    <div class="date-list">
                            <div class="date" v-for="(live, index) in lives" :key="index">
                                <div class="date-header row text-center">
                                    <div class="col-2 date-header-icon">
                                        <span class="material-icons text-body-invert"> event</span>
                                    </div>
                                    <div class="col-10 date-header-main">{{ live[0]["date"] }}</div>
                                </div>
                            <div class="date-game row" v-for="(item, key) in live" :key="key">
                                <div class="col-2 date-game-icon">
                                    <span class="material-icons text-body-invert">schedule</span>
                                </div>
                                <div class="col-10 date-game-main">
                                    <div class="game-title">{{ item.title }}</div>
                                    <div class="game-teams">{{ item.teams }}</div>
                                    <div class="game-time">
                                        <span class="match-time">{{ item.hour }}</span>
                                        <span>
                                            <a class="game-link" :href="item.link" target="blank">
                                                <span class="material-icons size-font-p1">
                                                    play_circle_filled
                                                </span>
                                            </a>
                                            <a class="game-link" :href="item.info">
                                                <span class="material-icons size-font-p1">
                                                    info
                                                </span>
                                            </a>
                                        </span>
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
