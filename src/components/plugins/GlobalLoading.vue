<script setup>
    
    import { isLoading } from '../../stores/loading';

</script>


<template>
    <div v-if="isLoading" class="loading-overlay">
        <div class="rl-loading-container">
            <div class="rl-loading-thumb rl-loading-thumb-1"></div>
            <div class="rl-loading-thumb rl-loading-thumb-2"></div>
            <div class="rl-loading-thumb rl-loading-thumb-3"></div>
        </div>
    </div>
</template>

<style scoped>
.rl-loading-container{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

.rl-loading-thumb {
    width: 10px;
    height: 40px;
    background-color: #fe9e66;
    margin: 4px;
    box-shadow: 0 0 12px 3px #ff7322;
    animation: rl-loading 1.5s ease-in-out infinite;
}

.rl-loading-thumb-1 {
    animation-delay: 0s;
}

.rl-loading-thumb-2 {
    animation-delay: 0.5s;
}

.rl-loading-thumb-3 {
    animation-delay: 1s;
}

@keyframes rl-loading {
    0% {}
    20% {
        background: white;
        transform: scale(1.5);
    }
    40% {
        background: #ff7322;
        transform: scale(1);
    }
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  z-index: 999999999;
}
</style>