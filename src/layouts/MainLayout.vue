<template>
    <div>
        <main>
            <div class="container-xxl">
            <main class="mb-4">
                <div class="row mb-75">
                    <!-- @foreach ($Advertises[1] ?? [] as $advertise)
                        <div class="col-12 col-lg-6">
                            <div class="row-ads mb-2">
                                <a href="{{ $advertise["link"] }}" title="{{ $advertise["title"] }}">
                                    <img src="{{ $advertise["image"] }}" alt="{{ $advertise["title"] }}" class="img-fluid row-ad"/>
                                </a>
                            </div>
                        </div>
                    @endforeach -->
                </div>
                <div class="row">
                    <div class="col-12 col-lg-7 flex-grow-1">
                        <div class="row mx-0 mb-75">
                            <div id="newsSpilde" class="splide">
                                <div class="splide__track">
                                    <ul class="splide__list">
                                    <!-- @foreach($specialPosts as $key => $post)

                                        @if(!isset($post['image']['indexArray']['medium']))
                                            @php
                                                continue;
                                            @endphp
                                        @endif -->

                                        <div class="splide__slide">
                                            <div class="news-slider-item">
                                                <!-- <a title="{{ $post['title'] }}" href="{{ url('news/' . $post->id .'/' .$post->slug) }}" class="stretched-link"></a> -->
                                                <div class="row">
                                                    <!-- Image Area -->
                                                    <div class="col-12 col-lg-6 image-area">
                                                        <div class="news-slider--image-container">
                                                            <div class="news-slider--image-area">
                                                                <!-- <img
                                                                    width="246"
                                                                    height="150"
                                                                    src="{{ url($post['image']['indexArray']['medium']) }}"
                                                                    alt="طرح&zwnj;های زیبایی که قرار نبود دیده شود ! (عکس)"
                                                                /> -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Text Area -->
                                                    <div class="col-12 col-lg-6 text-area">
                                                        <div class="news-slider--text-container">
                                                            <div class="news-slider--rutitle">
                                                                <!-- {{ $post['pre_title'] }} -->
                                                            </div>
                                                            <h3 class="news-slider--title">
                                                                <!-- {{ $post['title'] }} -->
                                                            </h3>
                                                            <p class="news-slider--subtitle">
                                                                <!-- {{ $post['summary'] }} -->
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <!-- @endforeach -->
                                    </ul>
                                </div>

                                <div class="splide__progress">
                                    <div class="splide__progress__bar"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-lg-6 item-column">
                                <div class="card vt-news-card height-sm">
                                    <div class="card-header">
                                        <div class="card-header-inner">
                                            <span class="material-icons text-primary"> movie </span>
                                            <!-- <span class="card-header-title">{{ __('site.Non-football') }}</span> -->
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="card-body-inner">
                                            <ul class="news-list">
                                                <!-- @foreach($posts[4] ?? [] as $key => $post)
                                                    <li class="news-item">
                                                        <a class="news" target="_blank" href="{{ url('news/' . $post->id .'/' .$post->slug) }}">
                                                            <span class="material-icons size-font text-primary">
                                                            double_arrow
                                                            </span>
                                                            {{ $post->title}}
                                                        </a>
                                                    </li>
                                                @endforeach -->
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card vt-news-card height-sm">
                                    <div class="card-header">
                                        <div class="card-header-inner">
                                            <span class="material-icons text-primary"> movie </span>
                                            <!-- <span class="card-header-title">{{ __('site.Foreign news') }}</span> -->
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="card-body-inner">
                                            <ul class="news-list">
                                                <!-- @foreach($posts[3] ?? [] as $key => $post)
                                                    <li class="news-item">
                                                        <a class="news" target="_blank" href="{{ url('news/' . $post->id .'/' .$post->slug) }}">
                                                            <span class="material-icons size-font text-primary">
                                                            double_arrow
                                                            </span>
                                                            {{ $post->title}}
                                                        </a>
                                                    </li>
                                                @endforeach -->
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6 item-column">
                                <div class="card vt-news-card height-sm">
                                    <div class="card-header">
                                        <div class="card-header-inner">
                                            <span class="material-icons text-primary"> create </span>
                                            <!-- <span class="card-header-title">{{ __('site.Column of writers') }}</span> -->
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="card-body-inner">
                                            <ul class="news-list">
                                            <!-- @foreach($posts[1] ?? [] as $key => $post)
                                                <li class="news-item">
                                                    <a class="news" target="_blank" href="{{ url('news/' . $post->id .'/' .$post->slug) }}">
                                                        <span class="material-icons size-font text-primary">
                                                        double_arrow
                                                        </span>
                                                        {{ $post->title}}
                                                    </a>
                                                </li>
                                            @endforeach -->
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card vt-news-card height-sm">
                                    <div class="card-header">
                                        <div class="card-header-inner">
                                            <span class="material-icons text-primary"> create </span>
                                            <!-- <span class="card-header-title">{{ __('site.Iran news') }}</span> -->
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="card-body-inner">
                                            <ul class="news-list">
                                                <!-- @foreach($posts[2] ?? [] as $key => $post)
                                                    <li class="news-item">
                                                        <a class="news" target="_blank" href="{{ url('news/' . $post->id .'/' .$post->slug) }}">
                                                            <span class="material-icons size-font text-primary">
                                                            double_arrow
                                                            </span>
                                                            {{ $post->title}}
                                                        </a>
                                                    </li>
                                                @endforeach -->
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-3 flex-grow-1 item-column">
                        <div class="splide splide-auto">
                            <div class="splide__track">
                                <ul class="splide__list">
                                    <!-- @foreach($posts[7] ?? [] as $key => $post)
                                        @if(!isset($post['image']['indexArray']['medium']))
                                            @php
                                                continue;
                                            @endphp
                                        @endif

                                        <li class="splide__slide">
                                            <div class="slider-item">
                                                <div class="slider--media ratio-3-4">
                                                    <img width="200" height="144" title="{{ $post->title }}" alt="{{ $post->title }}" src="{{ $post['image']['indexArray']['medium'] }}"/>
                                                </div>
                                                <div class="slider--caption">
                                                    <span class="slider--caption-title">{{ $post->title }}</span>
                                                    <span class="slider--caption-date">{{ $currentDate }}</span>
                                                </div>
                                                <a href="{{ url('news/' . $post->id .'/' .$post->slug) }}" t title="{{ $post->title }}" class="stretched-link"></a>
                                            </div>
                                        </li>

                                    @endforeach -->
                                </ul>
                            </div>

                            <div class="splide__progress">
                                <div class="splide__progress__bar"></div>
                            </div>
                        </div>

                        <div class="card vt-news-card height-fluid">
                            <div class="card-header">
                                <ul class="nav" id="hotties" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link active" id="latest-tab" data-bs-toggle="tab" data-bs-target="#latest" type="button" role="tab" aria-controls="latest" aria-selected="true" >
                                            <!-- {{ __('site.Latest news') }} -->
                                        </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link" id="conv-tab" data-bs-toggle="tab" data-bs-target="#conv" type="button" role="tab" aria-controls="conv" aria-selected="false">
                                          <!-- {{ __('site.Challenged') }} -->
                                        </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a      class="nav-link"      id="hot-tab"      data-bs-toggle="tab"      data-bs-target="#hot"      type="button"      role="tab"      aria-controls="hot"      aria-selected="false"  >
                                            <!-- {{ __('site.Popular') }} -->
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="card-body-inner">
                                    <div class="tab-content" id="hottiesContent">
                                        <div  class="tab-pane fade show active"  id="latest"  role="tabpanel"  aria-labelledby="latest-tab">
                                            <ul class="news-list">
                                                <!-- @foreach($latest as $key => $post)
                                                    <li class="news-item">
                                                        <a class="news" target="_blank" href="{{ url('news/' . $post->id .'/' .$post->slug) }}">
                                                            <span class="material-icons size-font text-primary">
                                                            double_arrow
                                                            </span>
                                                            {{ $post->title}}
                                                        </a>
                                                    </li>
                                                @endforeach -->
                                            </ul>
                                        </div>
                                        <div  class="tab-pane fade"  id="conv"  role="tabpanel"  aria-labelledby="conv-tab">
                                            <ul class="news-list">
                                                <!-- @foreach($challenged as $key => $post)
                                                    <li class="news-item">
                                                        <a class="news" target="_blank" href="{{ url('news/' . $post->id .'/' .$post->slug) }}">
                                                            <span class="material-icons size-font text-primary">
                                                            double_arrow
                                                            </span>
                                                            {{ $post->title}}
                                                        </a>
                                                    </li>
                                                @endforeach -->
                                            </ul>
                                        </div>
                                        <div class="tab-pane fade" id="hot" role="tabpanel" aria-labelledby="hot-tab">
                                            <ul class="news-list">
                                                <!-- @foreach($popular as $key => $post)
                                                    <li class="news-item">
                                                        <a class="news" target="_blank" href="{{ url('news/' . $post->id .'/' .$post->slug) }}">
                                                            <span class="material-icons size-font text-primary">
                                                            double_arrow
                                                            </span>
                                                            {{ $post->title}}
                                                        </a>
                                                    </li>
                                                @endforeach -->
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="splide splide-auto">
                            <div class="splide__track">
                                <ul class="splide__list">

                                    <!-- @foreach($specialVideos as $key => $post)
                                        @if(!isset($post['image']['indexArray']['medium']))
                                            @php
                                                continue;
                                            @endphp
                                        @endif -->
                                        <li class="splide__slide">
                                            <div class="slider-item horizontal">
                                                <div class="slider--media ratio-9-16">
                                                    <div class="video-datetime">
                                                        <span class="material-icons text-body-invert size-font size-font-p1"> schedule </span>
                                                        <!-- <span> {{ $post->created_at->diffforhumans() }}</span> -->
                                                    </div>
                                                    <span class="material-icons text-primary play-icon"> play_circle </span>
                                                    <!-- <img width="240" height="160" src="{{ $post['image']['indexArray']['medium'] }}" alt="{{ $post->title }}" -->
                                                    />
                                                </div>
                                                <div class="slider--caption">
                                                    <!-- <span>{{ $post->title }}</span> -->
                                                </div>
                                                <!-- <a title="{{ $post->title }}" href="{{ url('news/' . $post->id .'/' .$post->slug) }}" class="stretched-link"></a> -->
                                            </div>
                                        </li>

                                    <!-- @endforeach -->
                                </ul>
                            </div>

                            <div class="splide__progress">
                                <div class="splide__progress__bar"></div>
                            </div>
                        </div>
                    </div>
                    <!-- @if(!empty($Advertises[2]))
                        <div class="col-12 col-lg-2 ads-column item-column">
                            @foreach ($Advertises[2] ?? [] as $advertise)
                                <div class="col-ads">
                                    <a href="{{ $advertise["link"] }}" title="{{ $advertise["title"] }}">
                                        <img class="col-ad" src="{{ $advertise["image"] }}" alt="{{ $advertise["title"] }}"/>
                                    </a>
                                </div>
                            @endforeach
                        </div>
                    @endif -->
                    <!-- {{-- <div class="col-12 col-lg-2 ads-column item-column">
                        <div class="col-ads">
                            <img class="col-ad" src="./assets/site/images/ads/cols/00911970.gif" alt="site ad"/>
                        </div>
                        <div class="col-ads">
                            <img class="col-ad" src="./assets/site/images/ads/cols/00911861.gif" alt="site ad"/>
                        </div>
                        <div class="col-ads">
                            <img class="col-ad" src="./assets/site/images/ads/cols/00911969.gif" alt="site ad"/>
                        </div>
                    </div> --}} -->
                </div>
            </main>
        </div>

        <div class="mid-site-ad-wrapper" style="
            /* background-image: linear-gradient(
                to right,
                rgba(21, 26, 48, 0.85),
                rgba(21, 26, 48, 0.85)
              ),
              url(./assets/site/images/53970387-B72B-43A2-9FE0-C0EB33F35404.jpeg); */
          ">
            <div class="container-xxl py-5">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-9">
                        <p>
                            شبکه اجتماعی ورزشی، تحلیل مسابقات مختلف ورزشی، ویدیو های مسابقات
                            حساس، کری خوانی های ورزشی، تحلیل های پیش و پس از بازی
                        </p>
                        <p class="h1 mb-4">
                            ثبت و تحلیل رخدادهای ورزشی های ورزشی، شبکه اجتماعی ورزشی
                        </p>
                        <!-- <a href="{{ route('register') }}" href="{{ __('site.Register') }}">
                            <div class="btn vt-btv-primary px-4">{{ __('site.Please register') }}</div>
                        </a> -->
                    </div>
                    <div class="col-12 col-lg-2">
                        <!-- <img
                            src="./assets/site/images/sport-mid.png"
                            alt="sport"
                            class="img-fluid"
                        /> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="container-xxl mb-75">
            <div class="row gy-3">
                <div class="col-12 col-lg-6">
                    <div class="card vt-news-card height-md">
                        <div class="card-header header-alt">
                            <!-- <p class="h4 text-primary">{{ __('site.The latest football analysis') }}</p> -->
                            <div class="vt-divider"><span></span></div>
                        </div>
                        <div class="card-body">
                            <div class="card-body-inner">
                                <div class="row gy-3 news-item-row">
                                    <!-- @foreach($posts[5] ?? [] as $key => $post)
                                        @if(!isset($post['image']['indexArray']['small']))
                                            @php
                                                continue;
                                            @endphp
                                        @endif

                                        <div class="col-12 col-lg-6">
                                            <div class="news-row-item">
                                                <div class="row gx-2">
                                                    <div class="col-4">
                                                        <div class="news-row-item-thumb ratio ratio-1x1" style="background-image: url({{ str_replace('\\','/',$post['image']['indexArray']['small']) }});"></div>
                                                    </div>
                                                    <div class="col-8">
                                                        <p class="news-row-item-title">{{ $post->title }}</p>
                                                        <a class="news-row-item-link" href="{{ url('news/' . $post->id .'/' .$post->slug) }}">{{ $post->pre_title }}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="card vt-news-card height-md">
                        <div class="card-header header-alt">
                            <!-- <p class="h4 text-primary">{{ __('site.The latest non-football analysis') }}</p> -->
                            <div class="vt-divider"><span></span></div>
                        </div>
                        <div class="card-body">
                            <div class="card-body-inner">
                                <div class="row gy-3 news-item-row">
                                    <!-- @foreach($posts[6] ?? [] as $key => $post)
                                        @if(!isset($post['image']['indexArray']['small']))
                                            @php
                                                continue;
                                            @endphp
                                        @endif

                                        <div class="col-12 col-lg-6">
                                            <div class="news-row-item">
                                                <div class="row gx-2">
                                                    <div class="col-4">
                                                        <div class="news-row-item-thumb ratio ratio-1x1" style="background-image: url({{ str_replace('\\','/',$post['image']['indexArray']['small']) }});"></div>
                                                    </div>
                                                    <div class="col-8">
                                                        <p class="news-row-item-title">{{ $post->title }}</p>
                                                        <a class="news-row-item-link" href="{{ url('news/' . $post->id .'/' .$post->slug) }}">{{ $post->pre_title }}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- @foreach ($Advertises[3] ?? [] as $advertise)
                    <div class="col-12">
                        <div class="row-ads mb-2">
                            <a href="{{ $advertise["link"] }}" title="{{ $advertise["title"] }}">
                                <img src="{{ $advertise["image"] }}" alt="{{ $advertise["title"] }}" class="img-fluid row-ad"/>
                            </a>
                        </div>
                    </div>
                @endforeach -->
                <div class="col-12 col-lg-4">
                    <!-- <x-lives  :lives="$lives" /> -->
                </div>
                <div class="col-12 col-lg-4">
                    <!-- <x-match-table  :sports="$sports" :id="1" /> -->
                </div>
                <div class="col-12 col-lg-4">
                    <!-- <x-match-table  :sports="$sports" :id="2" /> -->
                </div>
            </div>
        </div>
        <router-view></router-view>
      </main>
    </div>
  </template>