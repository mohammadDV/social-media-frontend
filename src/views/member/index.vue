<script setup>

//   import {useApi} from '@/utils/api.ts';
  import { onMounted, defineProps, ref } from 'vue';
  import StatusWallComponent from "@/components/profile/components/status/StatusWallComponent.vue";
  import PostsWallComponent from "@/components/profile/components/post/PostsWallComponent.vue";
  import TabsComponent from '@/components/plugins/tabs/TabsComponent';
  import TabComponent from '@/components/plugins/tabs/TabComponent';

  import { useI18n } from "vue-i18n";
  const { t } = useI18n();

  defineProps({
    user: {
      type: Object,
      required: true
    }
  });

  const tabItem = ref(2);

  const changeTab = (tab) => {
    tabItem.value = tab
  }

  onMounted(() => {
    window.document.title =   `${t('site.Profile')} | ${t('site.Website name')}`;
  });

</script>

<template>

    <div class="col-12 col-lg-8 col-xl-8">
        <tabs-component v-if="route?.params?.id == undefined" class="nav nav-pills feedType">
            <tab-component class="nav-item text-center cursor-pointer" :is-active="tabItem == 1"
                            @tab-clicked="changeTab(1)">
                            {{ $t('site.Statuses') }}
            </tab-component>
            <tab-component class="nav-item cursor-pointer  text-center" :is-active="tabItem == 2"
                            @tab-clicked="changeTab(2)">
                            {{ $t('site.Posts') }}
            </tab-component>
        </tabs-component>
        <div class="tab-content" id="feedTypeContent">
            <div v-if="tabItem == 2" class="tab-pane fade show active">
                <PostsWallComponent :user="user" :tab="tabItem"/>
            </div>
            <div v-else class="tab-pane fade show active">
                <StatusWallComponent :user="user" :tab="tabItem"/>
            </div>
        </div>
    </div>
</template>