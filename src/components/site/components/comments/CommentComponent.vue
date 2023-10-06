<script setup>

  import {useApi} from '@/utils/api.ts';
  import { onMounted, defineProps } from 'vue';

  defineProps({
    comments: {
        type: Array,
        required: true
    }
  });

  onMounted(() => {
    useApi().get('/api/active-categories')
        .then((response) => {
            response.data;
        })
  });
</script>
<template>

    <div v-if="comments?.length > 0" class="comment-section">
        <div class="comment-section--header">
            <div class="comment-section--title-wrap">
                <span class="font-medium m-2">{{ $t('site.Comments') }}</span>
                <span class="comment-section--number">{{ comments?.length }} {{ $t('site.Comment') }}</span>
            </div>
            <div class="comment-section--divider"></div>
        </div>
        <div class="comment-form">
            <div id="replay-close" class="replay-close hidden">
                {{ $t('site.Reply') }}
                <button class="btn btn-sm btn-warning"><span class="material-icons size-font text-primary"> close </span></button>
            </div>
            <!-- @include('errors.error')
            @auth
            <x-form-creator :form="$form" />
            @else
                <a id="comment-text" href="{{ route('login') }}"><button class="btn btn-primary w-100">{{ $t("site.Login please") }}</button></a>
            @endauth -->

        </div>
        <div class="comment-wrap" v-for="(comment, index) in comments" :key="index">
            <div class="comment">
                <div class="comment--body">
                    <div class="commenter-avatar-wrap">
                        <div class="commenter-avatar">
                            <img v-if="comment?.user?.profile_photo_path?.length > 0" :src="parent.user.profile_photo_path" :alt="comment.user.first_name" />
                            <img v-else src="/assets/site/images/user-icon.png" :alt="comment.user.first_name" />
                            <a href="#" class="stretched-link"></a>
                        </div>
                    </div>
                    <div class="comment-text">
                        <p class="comment-text-pragraph">
                            <a class="comment-user-text-link" href="#">
                                <span class="user-name"> {{ comment?.user?.first_name }} </span>
                            </a>
                            <br>
                            <span class="comment-text-span">{{ comment?.message }}</span>
                        </p>
                    </div>
                </div>
                <div class="comment--footer">
                    <div class="comment--date">{{ comment.created_at }}</div>
                    <div class="comment--reactions">
                        <button :data-id="comment.id" class="reply-btn btn vt-btn-white">
                            <span class="material-icons size-font"> reply </span>
                            <span>{{ $t('site.Reply') }}</span>
                        </button>
<!-- {{--                                        <button class="btn vt-btn-white">--}}
{{--                                            <span class="material-icons size-font">--}}
{{--                                              thumb_up_alt--}}
{{--                                            </span>--}}
{{--                                            <span>10</span>--}}
{{--                                        </button>--}}
{{--                                        <button class="btn vt-btn-white is-danger">--}}
{{--                                            <span class="material-icons size-font">--}}
{{--                                              thumb_down_alt--}}
{{--                                            </span>--}}
{{--                                            <span>2</span>--}}
{{--                                        </button>--}} -->
                    </div>
                </div>
            </div>
            <template v-if="comment?.parents?.length > 0">
                <div v-for="(parent, index) in comment.parents" :key="index" class="comment">
                    <div class="comment--body">
                        <div class="commenter-avatar-wrap">
                            <div class="commenter-avatar">
                                <img v-if="parent?.user?.profile_photo_path?.length > 0" :src="parent.user.profile_photo_path" :alt="parent.user.first_name" />
                                <img v-else src="/assets/site/images/user-icon.png" :alt="parent.user.first_name" />
                                <a href="#" class="stretched-link"></a>
                            </div>
                        </div>
                        <div class="comment-text">
                            <p class="comment-text-pragraph">
                                <a class="comment-user-text-link" href="#">
                                    <span class="user-name"> {{ parent.user.first_name }} </span>
                                </a>
                                <br>
                                <span class="comment-text-span">{{ parent.message }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="comment--footer">
                        <div class="comment--date">{{ parent.created_at }}</div>
                        <div class="comment--reactions">
<!-- {{--                                                <button class="btn vt-btn-white">--}}
{{--                                                    <span class="material-icons size-font">--}}
{{--                                                      thumb_up_alt--}}
{{--                                                    </span>--}}
{{--                                                    <span>10</span>--}}
{{--                                                </button>--}}
{{--                                                <button class="btn vt-btn-white is-danger">--}}
{{--                                                    <span class="material-icons size-font">--}}
{{--                                                      thumb_down_alt--}}
{{--                                                    </span>--}}
{{--                                                    <span>2</span>--}}
{{--                                                </button>--}} -->
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>