<script setup>

//   import {useApi} from '@/utils/api.ts';
  import { onMounted, defineProps } from 'vue';
  import StatusWallComponent from "@/components/profile/components/status/StatusWallComponent.vue";

  import { useI18n } from "vue-i18n";
  const { t } = useI18n();

  defineProps({
    user: {
      type: Object,
      required: true
    }
  });

  onMounted(() => {
    window.document.title =   `${t('site.Profile')} | ${t('site.Website name')}`;
  });

</script>

<template>
    <div class="col-12 col-lg-8 col-xl-8">
        <!-- <StatusWallFormComponent /> -->
        <div class="tab-content" id="feedTypeContent">
            <div class="tab-pane fade show active" id="tweet-pane" role="tabpanel" aria-labelledby="tweet-tab">
                <StatusWallComponent :user="user" />
            </div>
            <div class="tab-pane fade show active" id="news-pane" role="tabpanel" aria-labelledby="news-pane">
            </div>
        </div>
    </div>
</template>