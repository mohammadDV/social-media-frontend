<script lang="ts" setup>
 
//   import {useApi} from '../../utils/api';
//   import { ref, watch } from "vue";
//   import jalaliMoment from 'moment-jalaali';
//   import type { Header, Item, HeaderItemClassNameFunction, BodyItemClassNameFunction } from "vue3-easy-data-table";
//   import { usePagination, useRowsPerPage } from "use-vue3-easy-data-table";
//   import type { UsePaginationReturn, UseRowsPerPageReturn } from "use-vue3-easy-data-table";
//   import { useToast } from "vue-toast-notification";
//   import { useI18n } from "vue-i18n";  
//   import { useAuthStore } from '../../stores/auth';
</script>

<template>
  <div class="relative w-full h-[250px] bg">
    <div class="flex gap-[10px] items-center justify-start bg1 w-[1200px] h-[250px] absolate ">
      <div class="m-[20px] flex gap-[10px] flex-col items-center">
        <img class=" rounded-full w-[100px] h-[100px] " src="../../assets/site/images/user.jpg" alt="">
        <p class="mb-0 text-white">
          Team Name
        </p>
      </div>
      <div class="m-[20px] rounded-[5px] border-solid border-1 border-gray-300 flex items-center ">
        <p class="text-white mb-0 border-l-2 p-[5px] border-gray-300">۸۰۰ نفر </p>
        <button class="text-white   p-[10px]">
          <!-- <span class="material-icons "> heart </span> -->
          عضویت در کانون هواداران

        </button>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="text-lg my-[20px]">
      <p>بازی های منچسرسیتی</p>
    </div>
    <div class="flex gap-[10px]">
      <div class="shadow-games-box rounded-md w-full bg-gray-200">
        <div class="flex flex-col gap-[10px] p-[10px]">
            <div class="flex justify-between">
                <div class="flex gap-[10px]" >
                    <img alt=""  src="https://static.farakav.com/files/pictures/01167877.png?w=20">
                    <span>بلکبرن</span>
                </div>
                <div class="">1</div>
            </div>
            <div class="flex justify-between">
                <div class="flex gap-[10px]">
                    <img alt="" src="https://match-cdn.varzesh3.com/football-team/2022/07/12/C/pykn41gz.png?w=20">
                    <span>نیوکسل</span>
                </div>
                <div class="">2</div>
            </div>
        </div>

        <div class="flex flex-col bg-gray-300 p-[10px] gap-[10px] rounded-b-lg">
            <div class="flex gap-[10px]">
                <img alt="" src="https://match-cdn.varzesh3.com/football-league/2022/03/02/D/u2kqk4qa.png?w=15">
                <span>جام حذفی انگلیس</span>
                
            </div>
            <div class="flex gap-[10px]">
                <img class="w-[20px]" alt="" src="https://static.varzesh3.com/img/icons/date-icon2.svg">
                <span>1402/12/08 23:15</span>            
            </div>
        </div>
    </div>
    <div class="shadow-games-box rounded-md w-full bg-gray-200">
        <div class="flex flex-col gap-[10px] p-[10px]">
            <div class="flex justify-between">
                <div class="flex gap-[10px]" >
                    <img alt=""  src="https://static.farakav.com/files/pictures/01167877.png?w=20">
                    <span>بلکبرن</span>
                </div>
                <div class="">1</div>
            </div>
            <div class="flex justify-between">
                <div class="flex gap-[10px]">
                    <img alt="" src="https://match-cdn.varzesh3.com/football-team/2022/07/12/C/pykn41gz.png?w=20">
                    <span>نیوکسل</span>
                </div>
                <div class="">2</div>
            </div>
        </div>

        <div class="flex flex-col bg-gray-300 p-[10px] gap-[10px] rounded-b-lg">
            <div class="flex gap-[10px]">
                <img alt="" src="https://match-cdn.varzesh3.com/football-league/2022/03/02/D/u2kqk4qa.png?w=15">
                <span>جام حذفی انگلیس</span>
                
            </div>
            <div class="flex gap-[10px]">
                <img class="w-[20px]" alt="" src="https://static.varzesh3.com/img/icons/date-icon2.svg">
                <span>1402/12/08 23:15</span>            
            </div>
        </div>
    </div>
    <div class="shadow-games-box rounded-md w-full bg-gray-200">
        <div class="flex flex-col gap-[10px] p-[10px]">
            <div class="flex justify-between">
                <div class="flex gap-[10px]" >
                    <img alt=""  src="https://static.farakav.com/files/pictures/01167877.png?w=20">
                    <span>بلکبرن</span>
                </div>
                <div class="">1</div>
            </div>
            <div class="flex justify-between">
                <div class="flex gap-[10px]">
                    <img alt="" src="https://match-cdn.varzesh3.com/football-team/2022/07/12/C/pykn41gz.png?w=20">
                    <span>نیوکسل</span>
                </div>
                <div class="">2</div>
            </div>
        </div>

        <div class="flex flex-col bg-gray-300 p-[10px] gap-[10px] rounded-b-lg">
            <div class="flex gap-[10px]">
                <img alt="" src="https://match-cdn.varzesh3.com/football-league/2022/03/02/D/u2kqk4qa.png?w=15">
                <span>جام حذفی انگلیس</span>
                
            </div>
            <div class="flex gap-[10px]">
                <img class="w-[20px]" alt="" src="https://static.varzesh3.com/img/icons/date-icon2.svg">
                <span>1402/12/08 23:15</span>            
            </div>
        </div>
    </div>
    <div class="shadow-games-box rounded-md w-full bg-gray-200">
        <div class="flex flex-col gap-[10px] p-[10px]">
            <div class="flex justify-between">
                <div class="flex gap-[10px]" >
                    <img alt=""  src="https://static.farakav.com/files/pictures/01167877.png?w=20">
                    <span>بلکبرن</span>
                </div>
                <div class="">1</div>
            </div>
            <div class="flex justify-between">
                <div class="flex gap-[10px]">
                    <img alt="" src="https://match-cdn.varzesh3.com/football-team/2022/07/12/C/pykn41gz.png?w=20">
                    <span>نیوکسل</span>
                </div>
                <div class="">2</div>
            </div>
        </div>

        <div class="flex flex-col bg-gray-300 p-[10px] gap-[10px] rounded-b-lg">
            <div class="flex gap-[10px]">
                <img alt="" src="https://match-cdn.varzesh3.com/football-league/2022/03/02/D/u2kqk4qa.png?w=15">
                <span>جام حذفی انگلیس</span>
                
            </div>
            <div class="flex gap-[10px]">
                <img class="w-[20px]" alt="" src="https://static.varzesh3.com/img/icons/date-icon2.svg">
                <span>1402/12/08 23:15</span>            
            </div>
        </div>
    </div>
    <div class="shadow-games-box rounded-md w-full bg-gray-200">
        <div class="flex flex-col gap-[10px] p-[10px]">
            <div class="flex justify-between">
                <div class="flex gap-[10px]" >
                    <img alt=""  src="https://static.farakav.com/files/pictures/01167877.png?w=20">
                    <span>بلکبرن</span>
                </div>
                <div class="">1</div>
            </div>
            <div class="flex justify-between">
                <div class="flex gap-[10px]">
                    <img alt="" src="https://match-cdn.varzesh3.com/football-team/2022/07/12/C/pykn41gz.png?w=20">
                    <span>نیوکسل</span>
                </div>
                <div class="">2</div>
            </div>
        </div>

        <div class="flex flex-col bg-gray-300 p-[10px] gap-[10px] rounded-b-lg">
            <div class="flex gap-[10px]">
                <img alt="" src="https://match-cdn.varzesh3.com/football-league/2022/03/02/D/u2kqk4qa.png?w=15">
                <span>جام حذفی انگلیس</span>
                
            </div>
            <div class="flex gap-[10px]">
                <img class="w-[20px]" alt="" src="https://static.varzesh3.com/img/icons/date-icon2.svg">
                <span>1402/12/08 23:15</span>            
            </div>
        </div>
    </div>
    <div class="shadow-games-box rounded-md w-full bg-gray-200">
        <div class="flex flex-col gap-[10px] p-[10px]">
            <div class="flex justify-between">
                <div class="flex gap-[10px]" >
                    <img alt=""  src="https://static.farakav.com/files/pictures/01167877.png?w=20">
                    <span>بلکبرن</span>
                </div>
                <div class="">1</div>
            </div>
            <div class="flex justify-between">
                <div class="flex gap-[10px]">
                    <img alt="" src="https://match-cdn.varzesh3.com/football-team/2022/07/12/C/pykn41gz.png?w=20">
                    <span>نیوکسل</span>
                </div>
                <div class="">2</div>
            </div>
        </div>

        <div class="flex flex-col bg-gray-300 p-[10px] gap-[10px] rounded-b-lg">
            <div class="flex gap-[10px]">
                <img alt="" src="https://match-cdn.varzesh3.com/football-league/2022/03/02/D/u2kqk4qa.png?w=15">
                <span>جام حذفی انگلیس</span>
                
            </div>
            <div class="flex gap-[10px]">
                <img class="w-[20px]" alt="" src="https://static.varzesh3.com/img/icons/date-icon2.svg">
                <span>1402/12/08 23:15</span>            
            </div>
        </div>
    </div>
  

    </div>
    <div class="flex">
      <div class="flex-auto w-[70%] bg-gray-300">

        <div class="flex gap-[10px]">
          <div class="thumb">
              <a href=""><img src="../../assets/site/images/poosstt.jpg" alt="img"></a>
          </div>
          <div class="content">
              <h3><a href="">حکم سنگین برای هوادار چلسی: ۳ سال محرومیت!</a></h3>
              <p class="excerpt-entry">جیمی جامپ بازی چلسی-نیوکسل که پس از گل آبی‌ها به سمت مارتین دوبراوکا رفت، سه سال از حضور در ورزشگاه‌های فوتبال محروم شد.
              </p>
              <div class="flex gap-[10px]">
                  <div class="time">time</div>
                  <div class="view">view</div>
                  <div class="comment">comment</div>
              </div>
          </div>
        </div>

      </div>
      <div class="flex-auto w-[30%] bg-gray-100">
        slkdfksdkfksdflkfa-spindskfjhdskjfhkjdsflkjdslkjdsjflks'\
        lkdsjfksjd/dslkdsjflkjdslkfjlksjflslfk;l\'l'ls\'lf;ksf;lksdjljsdlkfskdfjlsjdflsjfa-lijsdhfshdfjdhsfkjshfs'
      </div>
    </div>
  </div>
</template>


<style>

.bg {
  background-image: url('../../assets/site/images/CITY-LASTEST-BANNER-1.png');
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0px 0px 15px 2px #05050573;
}
.bg1{
  background: #000428;  
  background: -webkit-linear-gradient(to left, #004e92, #000428);  
  background: linear-gradient(to right, #004e9200, #317dbf);
  padding: 20px;
  z-index: 22;
  border-radius: 280px 0px 0px 0px;
}

.shadow-games-box {
    box-shadow: 0px -3px 0px 0px #babcbf;
}

</style>