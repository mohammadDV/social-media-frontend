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
import { reactive } from 'vue';

const tableData = reactive([
      { column1: '1', column2: 'منچستزسیتی', column3: '24' , column4: '64'},
      { column1: '2', column2: 'لیورپول', column3: '24' , column4: '60'},
      { column1: '3', column2: 'اورتون', column3: '24' , column4: '54'}
    ]);


    const addItem = () => {
      tableData.push({
        column1: 'ردیف جدید',
        column2: 'تیم جدید',
        column3: 'بازی جدید',
        column4: 'امتیاز جدید'
      });
    };


</script>

<template>
  <div class="relative w-full h-[250px] bg">
    <div class="bg1 w-[70%] h-[250px]  ">
        <div class=" flex items-center justify-start mr-[240px]">
            <div class="m-[20px] flex gap-[10px] flex-col items-center">
                <img class=" rounded-full w-[150px] h-[150px] " src="../../assets/site/images/user.jpg" alt="">
            </div>
            <div class="flex-col">
                <h1 class="mb-0 m-[20px] text-white">
                Team Name
                </h1>
                <div class="m-[20px] rounded-2 border-solid border-1 border-gray-300 flex items-center ">
                <p class="text-white mb-0 border-l-2 p-2 border-gray-300">۸۰۰ نفر </p>
                <button class="text-white   p-[10px]">
                عضویت در کانون هواداران

                </button>
            </div>
            </div>
            
        </div>
     
    </div>
  </div>
  <div class="container">
    <div class="text-lg my-[20px]">
      <p>بازی های منچسرسیتی</p>
    </div>
    <div class="flex gap-[10px]">
        <div class="shadow-games-box rounded-md w-full bg-white">
            <div class="flex flex-col bg-gray-300 p-[10px] gap-[10px] ">
                <div class="flex gap-[10px]">
                    <img alt="" src="https://match-cdn.varzesh3.com/football-league/2022/03/02/D/u2kqk4qa.png?w=15">
                    <span>جام حذفی انگلیس</span>
                </div>
            </div>
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
                <div class="flex gap-[10px] border-t-2 border-dotted border-[#afb1b9] pt-2 ">
                    <img class="w-[20px]" alt="" src="https://static.varzesh3.com/img/icons/date-icon2.svg">
                    <span>1402/12/08 23:15</span>            
                </div>
            </div>        
        </div>
        <div class="shadow-games-box rounded-md w-full bg-white">
            <div class="flex flex-col bg-gray-300 p-[10px] gap-[10px] ">
                <div class="flex gap-[10px]">
                    <img alt="" src="https://match-cdn.varzesh3.com/football-league/2022/03/02/D/u2kqk4qa.png?w=15">
                    <span>جام حذفی انگلیس</span>
                </div>
            </div>
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
                <div class="flex gap-[10px] border-t-2 border-dotted border-[#afb1b9] pt-2 ">
                    <img class="w-[20px]" alt="" src="https://static.varzesh3.com/img/icons/date-icon2.svg">
                    <span>1402/12/08 23:15</span>            
                </div>
            </div>        
        </div>
<div class="shadow-games-box rounded-md w-full bg-white">
            <div class="flex flex-col bg-gray-300 p-[10px] gap-[10px] ">
                <div class="flex gap-[10px]">
                    <img alt="" src="https://match-cdn.varzesh3.com/football-league/2022/03/02/D/u2kqk4qa.png?w=15">
                    <span>جام حذفی انگلیس</span>
                </div>
            </div>
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
                <div class="flex gap-[10px] border-t-2 border-dotted border-[#afb1b9] pt-2 ">
                    <img class="w-[20px]" alt="" src="https://static.varzesh3.com/img/icons/date-icon2.svg">
                    <span>1402/12/08 23:15</span>            
                </div>
            </div>        
        </div>
<div class="shadow-games-box rounded-md w-full bg-white">
            <div class="flex flex-col bg-gray-300 p-[10px] gap-[10px] ">
                <div class="flex gap-[10px]">
                    <img alt="" src="https://match-cdn.varzesh3.com/football-league/2022/03/02/D/u2kqk4qa.png?w=15">
                    <span>جام حذفی انگلیس</span>
                </div>
            </div>
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
                <div class="flex gap-[10px] border-t-2 border-dotted border-[#afb1b9] pt-2 ">
                    <img class="w-[20px]" alt="" src="https://static.varzesh3.com/img/icons/date-icon2.svg">
                    <span>1402/12/08 23:15</span>            
                </div>
            </div>        
        </div>
<div class="shadow-games-box rounded-md w-full bg-white">
            <div class="flex flex-col bg-gray-300 p-[10px] gap-[10px] ">
                <div class="flex gap-[10px]">
                    <img alt="" src="https://match-cdn.varzesh3.com/football-league/2022/03/02/D/u2kqk4qa.png?w=15">
                    <span>جام حذفی انگلیس</span>
                </div>
            </div>
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
                <div class="flex gap-[10px] border-t-2 border-dotted border-[#afb1b9] pt-2 ">
                    <img class="w-[20px]" alt="" src="https://static.varzesh3.com/img/icons/date-icon2.svg">
                    <span>1402/12/08 23:15</span>            
                </div>
            </div>        
        </div>
<div class="shadow-games-box rounded-md w-full bg-white">
            <div class="flex flex-col bg-gray-300 p-[10px] gap-[10px] ">
                <div class="flex gap-[10px]">
                    <img alt="" src="https://match-cdn.varzesh3.com/football-league/2022/03/02/D/u2kqk4qa.png?w=15">
                    <span>جام حذفی انگلیس</span>
                </div>
            </div>
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
                <div class="flex gap-[10px] border-t-2 border-dotted border-[#afb1b9] pt-2 ">
                    <img class="w-[20px]" alt="" src="https://static.varzesh3.com/img/icons/date-icon2.svg">
                    <span>1402/12/08 23:15</span>            
                </div>
            </div>        
        </div>

       
    </div>


    <div class="flex mt-2">
        <div class="flex-auto w-[70%]">
            <div class="flex-auto flex-wrap ml-2 mb-3 mt-2 border-b-2 border-dotted border-[#afb1b9] pb-2">
                <div class="flex justify-between bg-white rounded-md mb-2">
                    <h3 class="p-4 m-0 text-lg">اخبار باشگاه منچستر سیتی</h3>
                    <button class="p-4 m-0 text-lg text-blue-400 hover:text-blue-600">نمایش همه</button>
                </div>
                <div class="grid w-full py-2 ">

                    <div class="flex gap-3 p-[10px] items-center rounded-md bg-white  hover:bg-gray-100">
                        <div class="flex flex-[20%]">
                            <a href=""><img class="rounded-md w-full h-[150px]" src="../../assets/site/images/poosstt.jpg" alt="img"></a>
                        </div>
                        <div class="flex flex-col flex-[50%]">
                            <h3><a class="no-underline text-base"  href="">حکم سنگین برای هوادار چلسی: ۳ سال محرومیت!</a></h3>
                            <p class="text-sm">جیمی جامپ بازی چلسی-نیوکسل که پس از گل آبی‌ها به سمت مارتین دوبراوکا رفت، سه سال از حضور در ورزشگاه‌های فوتبال محروم شد.
                            </p>
                            <div class="flex gap-6">
                                <div class="time text-gray-400 text-xs">۱۷ ساعت پیش</div>
                                <div class="view text-gray-400 text-xs">۱۲۲نفر</div>
                                <div class="comment text-gray-400 text-xs">نظرات</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-3 p-[10px] items-center rounded-md bg-white  hover:bg-gray-100">
                        <div class="flex flex-[20%]">
                            <a href=""><img class=" rounded-md w-full h-[150px]" src="../../assets/site/images/poosstt.jpg" alt="img"></a>
                        </div>
                        <div class="flex flex-col flex-[50%]">
                            <h3><a class="no-underline text-base"  href="">حکم سنگین برای هوادار چلسی: ۳ سال محرومیت!</a></h3>
                            <p class="text-sm">جیمی جامپ بازی چلسی-نیوکسل که پس از گل آبی‌ها به سمت مارتین دوبراوکا رفت، سه سال از حضور در ورزشگاه‌های فوتبال محروم شد.
                            </p>
                            <div class="flex gap-[10px]">
                                <div class="time text-gray-400 text-xs">۱۷ ساعت پیش</div>
                                <div class="view text-gray-400 text-xs">۱۲۲نفر</div>
                                <div class="comment text-gray-400 text-xs">نظرات</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-3 p-[10px] items-center rounded-md bg-white  hover:bg-gray-100">
                        <div class="flex flex-[20%]">
                            <a href=""><img class=" rounded-md w-full h-[150px]" src="../../assets/site/images/poosstt.jpg" alt="img"></a>
                        </div>
                        <div class="flex flex-col flex-[50%]">
                            <h3><a class="no-underline text-base"  href="">حکم سنگین برای هوادار چلسی: ۳ سال محرومیت!</a></h3>
                            <p class="text-sm">جیمی جامپ بازی چلسی-نیوکسل که پس از گل آبی‌ها به سمت مارتین دوبراوکا رفت، سه سال از حضور در ورزشگاه‌های فوتبال محروم شد.
                            </p>
                            <div class="flex gap-6">
                                <div class="time text-gray-400 text-xs">۱۷ ساعت پیش</div>
                                <div class="view text-gray-400 text-xs">۱۲۲نفر</div>
                                <div class="comment text-gray-400 text-xs">نظرات</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="flex-auto flex-wrap ml-2 mb-3 mt-2 border-b-2 border-dotted border-[#afb1b9] pb-2">
                <div class="flex justify-between bg-white rounded-md mb-2">
                    <h3 class="p-4 m-0 text-lg">ویدیوهای باشگاه منچستر سیتی</h3>
                    <button class="p-4 m-0 text-lg text-blue-400 hover:text-blue-600">نمایش همه</button>
                </div>
                <div class="grid1 w-full py-2 ">

                    <div class="flex-col gap-3 p-[10px] items-center rounded-md bg-white  hover:bg-gray-100">
                        <div class="">
                            <a href=""><img class="rounded-md w-full h-[150px]" src="../../assets/site/images/poosstt.jpg" alt="img"></a>
                        </div>
                        <div class="flex flex-col my-3">
                            <h3><a class="no-underline text-base"  href="">حکم سنگین برای هوادار چلسی: ۳ سال محرومیت!</a></h3>
                      
                            <div class="flex gap-6">
                                <div class="time text-gray-400 text-xs">۱۷ ساعت پیش</div>
                                <div class="view text-gray-400 text-xs">۱۲۲نفر</div>
                                <div class="comment text-gray-400 text-xs">نظرات</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex-col gap-3 p-[10px] items-center rounded-md bg-white  hover:bg-gray-100">
                        <div class="">
                            <a href=""><img class=" rounded-md w-full h-[150px]" src="../../assets/site/images/poosstt.jpg" alt="img"></a>
                        </div>
                        <div class="flex flex-col my-3 ">
                            <h3><a class="no-underline text-base"  href="">حکم سنگین برای هوادار چلسی: ۳ سال محرومیت!</a></h3>
                         
                            <div class="flex gap-6">
                                <div class="time text-gray-400 text-xs">۱۷ ساعت پیش</div>
                                <div class="view text-gray-400 text-xs">۱۲۲نفر</div>
                                <div class="comment text-gray-400 text-xs">نظرات</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex-col gap-3 p-[10px] items-center rounded-md bg-white  hover:bg-gray-100">
                        <div class="">
                            <a href=""><img class=" rounded-md w-full h-[150px]" src="../../assets/site/images/poosstt.jpg" alt="img"></a>
                        </div>
                        <div class="flex flex-col my-3 ">
                            <h3><a class="no-underline text-base"  href="">حکم سنگین برای هوادار چلسی: ۳ سال محرومیت!</a></h3>
                          
                            <div class="flex gap-6">
                                <div class="time text-gray-400 text-xs">۱۷ ساعت پیش</div>
                                <div class="view text-gray-400 text-xs">۱۲۲نفر</div>
                                <div class="comment text-gray-400 text-xs">نظرات</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

     
     

      

      <div class="flex-auto w-[20%] ">
        <div class="bg-white rounded-md mr-2 mb-3 mt-2">
            <h3 class="p-3 m-0 mr-[3px] pr-[3px] text-lg bg-[#013577] text-white rounded-t-md ">جدول رده بندی</h3>
            <div class="m-2 p-2">
                <table class="w-full">
                    <thead class="w-full">
                        <tr class=" gap-[10px]">
                            <th class="w-[15%] pb-3">ردیف</th>
                            <th class="w-[55%] pb-3">تیم</th>
                            <th class="w-[15%] pb-3">بازی</th>
                            <th class="w-[15%] pb-3">امتیاز</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <tr class="bg-[#d1d5db]"  v-for="(item, index) in tableData" :key="index">
                            <td class="p-2 text-sm ">{{ item.column1 }}</td>
                            <td class="p-2 flex">
                                <img alt="لیورپول" width="30" src="https://match-cdn.varzesh3.com/football-team/2022/07/12/C/sl1c4w3f.png?w=30">
                                <a class="no-underline text-base text-black" href="">{{ item.column2 }}</a>
                            </td>
                            <td class="p-2 text-sm ">{{ item.column3 }}</td>
                            <td class="p-2 text-sm ">{{ item.column4 }}</td>
                        </tr> -->
                        <tr class="bg-[#d1d5db]">
                            <td class="p-2 text-sm ">1</td>
                            <td class="p-2 flex">
                                <img alt="منچسرسیتی" width="30" src="https://match-cdn.varzesh3.com/football-team/2022/07/12/C/sl1c4w3f.png?w=30">
                                <a class="no-underline text-base text-black" href="">منچسرسیتی</a>
                            </td>
                            <td class="p-2 text-sm ">50</td>
                            <td class="p-2 text-sm ">90</td>
                        </tr>
                        <tr class="">
                            <td class="p-2 text-sm ">1</td>
                            <td class="p-2 flex">
                                <img alt="لیورپول" width="30" src="https://match-cdn.varzesh3.com/football-team/2022/07/12/C/sl1c4w3f.png?w=30">
                                <a class="no-underline text-base text-black" href="">لیورپول</a>
                            </td>
                            <td class="p-2 text-sm ">50</td>
                            <td class="p-2 text-sm ">90</td>
                        </tr>
                        <tr class="">
                            <td class="p-2 text-sm ">1</td>
                            <td class="p-2 flex">
                                <img alt="اورتون" width="30" src="https://match-cdn.varzesh3.com/football-team/2022/07/12/C/sl1c4w3f.png?w=30">
                                <a class="no-underline text-base text-black" href="">اورتون</a>
                            </td>
                            <td class="p-2 text-sm ">50</td>
                            <td class="p-2 text-sm ">90</td>
                        </tr>
                        <tr class="">
                            <td class="p-2 text-sm ">1</td>
                            <td class="p-2 flex">
                                <img alt="ارسنال" width="30" src="https://match-cdn.varzesh3.com/football-team/2022/07/12/C/sl1c4w3f.png?w=30">
                                <a class="no-underline text-base text-black" href="">ارسنال</a>
                            </td>
                            <td class="p-2 text-sm ">50</td>
                            <td class="p-2 text-sm ">90</td>
                        </tr>

                    </tbody>
                </table>
                <div class="text-left p-2 text-blue-400 hover:text-blue-600">
                    <button class="items-center" @click="addItem">جدول کامل</button>

                </div>

            </div>

        </div>
        <div class="bg-white rounded-md mr-2 mb-2 mt-2 pb-1">
            <h3 class="p-3 m-0 mr-[3px] pr-[3px] text-lg bg-[#013577] text-white rounded-t-md ">مورد علاقه ها </h3>
            <div class="m-2 p-2  bg-[#f0f8ff] rounded-md">
                <div class="flex gap-6">
                    <div>
                        <a href="">
                            <img class="shadow-follow-box rounded-full w-[70px] h-[70px] " src="../../assets/site/images/user.jpg" alt="">
                        </a>
                    </div>
                    <div class="flex-col flex-[50%] gap-9">
                        <div class="flex justify-content-between align-items-center mb-2">
                            <a class="no-underline text-base text-black" href="">نام کاربر</a>
                            
                            <button class="border-1 border-solid bg-[#405de6] text-white px-2 py-1 rounded-md hover:bg-[#4e87c3e6]">دنبال کنید</button>
                        </div>
                        <div class="flex justify-start gap-1">
                            <a class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-[#013577] rounded-md"  href="">
                                <span class="material-symbols-outlined text-[#06b4f9]">#</span>
                                اینتر
                            </a>
                            <a class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-[#013577] rounded-md" href="">
                                <span class="material-symbols-outlined text-[#06b4f9]">#</span>

                                
                                لاتزیو</a>
                            <a class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-[#013577] rounded-md" href="">
                                <span class="material-symbols-outlined text-[#06b4f9]">#</span>
                                
                                بایرن</a>
                           
                        </div>
                     
                    </div>

                </div>
            </div>
            <div class="m-2 p-2 bg-[#f0f8ff] rounded-md">
                <div class="flex gap-6">
                    <div>
                        <a href="">
                            <img class="shadow-follow-box rounded-full w-[70px] h-[70px] " src="../../assets/site/images/user.jpg" alt="">
                        </a>
                    </div>
                    <div class="flex-col flex-[50%] gap-9">
                        <div class="flex justify-content-between align-items-center mb-2">
                            <a class="no-underline text-base text-black" href="">نام کاربر</a>
                            
                            <button class="border-1 border-solid bg-[#405de6] text-white px-2 py-1 rounded-md hover:bg-[#4e87c3e6]">دنبال کنید</button>
                        </div>
                        <div class="flex justify-start gap-1">
                            <a class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-[#013577] rounded-md"  href="">
                                <span class="material-symbols-outlined text-[#06b4f9]">#</span>
                                اینتر
                            </a>
                            <a class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-[#013577] rounded-md" href="">
                                <span class="material-symbols-outlined text-[#06b4f9]">#</span>

                                
                                لاتزیو</a>
                            <a class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-[#013577] rounded-md" href="">
                                <span class="material-symbols-outlined text-[#06b4f9]">#</span>
                                
                                بایرن</a>
                           
                        </div>
                     
                    </div>

                </div>
            </div>
            <div class="m-2 p-2 bg-[#f0f8ff] rounded-md">
                <div class="flex gap-6">
                    <div>
                        <a href="">
                            <img class="shadow-follow-box rounded-full w-[70px] h-[70px] " src="../../assets/site/images/user.jpg" alt="">
                        </a>
                    </div>
                    <div class="flex-col flex-[50%] gap-9">
                        <div class="flex justify-content-between align-items-center mb-2">
                            <a class="no-underline text-base text-black" href="">نام کاربر</a>
                            
                            <button class="border-1 border-solid bg-[#405de6] text-white px-2 py-1 rounded-md hover:bg-[#4e87c3e6]">دنبال کنید</button>
                        </div>
                        <div class="flex justify-start gap-1">
                            <a class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-[#013577] rounded-md"  href="">
                                <span class="material-symbols-outlined text-[#06b4f9]">#</span>
                                اینتر
                            </a>
                            <a class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-[#013577] rounded-md" href="">
                                <span class="material-symbols-outlined text-[#06b4f9]">#</span>

                                
                                لاتزیو</a>
                            <a class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-[#013577] rounded-md" href="">
                                <span class="material-symbols-outlined text-[#06b4f9]">#</span>
                                
                                بایرن</a>
                           
                        </div>
                     
                    </div>

                </div>
            </div>
            <div class="m-2 p-2 bg-[#f0f8ff] rounded-md">
                <div class="flex gap-6">
                    <div>
                        <a href="">
                            <img class="shadow-follow-box rounded-full w-[70px] h-[70px] " src="../../assets/site/images/user.jpg" alt="">
                        </a>
                    </div>
                    <div class="flex-col flex-[50%] gap-9">
                        <div class="flex justify-content-between align-items-center mb-2">
                            <a class="no-underline text-base text-black" href="">نام کاربر</a>
                            
                            <button class="border-1 border-solid bg-[#405de6] text-white px-2 py-1 rounded-md hover:bg-[#4e87c3e6]">دنبال کنید</button>
                        </div>
                        <div class="flex justify-start gap-1">
                            <a class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-[#013577] rounded-md"  href="">
                                <span class="material-symbols-outlined text-[#06b4f9]">#</span>
                                اینتر
                            </a>
                            <a class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-[#013577] rounded-md" href="">
                                <span class="material-symbols-outlined text-[#06b4f9]">#</span>

                                
                                لاتزیو</a>
                            <a class="no-underline text-white text-sm border-1 borde-solid px-2 py-1 bg-[#013577] rounded-md" href="">
                                <span class="material-symbols-outlined text-[#06b4f9]">#</span>
                                
                                بایرن</a>
                           
                        </div>
                     
                    </div>

                </div>
            </div>
        </div>



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
.shadow-follow-box {
    box-shadow: 0px 0px 4px 0px #000000e0;
}
.grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
}
.grid1{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
}
</style>