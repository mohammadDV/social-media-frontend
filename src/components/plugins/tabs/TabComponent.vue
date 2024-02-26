<template>
    <li role="presentation" :class="{ 'active': isActive }">
        <a :class="{
            'nav-link': true,
            'active': isActive,
            }" @click="$emit('tab-clicked')">
            <slot></slot>
        </a>
    </li>
</template>

<script>
    export default {
        name: 'tab-component',
        props: {
            isActive: {
                type: Boolean,
                default: false,
            }
        },
    }
</script>
