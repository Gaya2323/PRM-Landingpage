<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>

  <!-- Hamburger-button — visible only when ≤1024px -->
  <button
    class="hamburger-btn"
    @click="isOpen = !isOpen"
    :aria-expanded="isOpen"
    aria-label="Öppna navigering"
    type="button">
    <span class="hamburger-icon" :class="{ 'is-open': isOpen }">
      <span></span>
      <span></span>
      <span></span>
    </span>
  </button>

  <!-- Overlay -->
  <div
    class="drawer-overlay"
    :class="{ 'is-visible': isOpen }"
    @click="isOpen = false">
  </div>

  <!-- Drawer — mobile/tablet -->
  <div class="drawer" :class="{ 'is-open': isOpen }">
    <ul class="pn-sb-icon">

      <li class="sb-nav-item sb-nav-item--active">
        <button class="sb-item" type="button" title="Home">
          <pn-icon icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M8.293 4.293A1 1 0 0 1 9 4h6a1 1 0 0 1 .707.293L17 5.586V5a1 1 0 1 1 2 0v2.586l1.707 1.707A1 1 0 0 1 21 10v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 .293-.707zM9.414 6l-3 3h3.172l3-3zM15 6.414l-4 4V18h2v-2.5a2.5 2.5 0 0 1 5 0V18h1v-7.586zM16 18v-2.5a.5.5 0 0 0-1 0V18zm-7 0v-7H5v7z" clip-rule="evenodd"/&gt;&lt;/svg&gt;' color="#1A1A1A"></pn-icon>
          <span class="sb-label">Home</span>
        </button>
      </li>

      <li class="sb-nav-item">
        <button class="sb-item" type="button" title="Bookmark">
          <pn-icon icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14.138a1.5 1.5 0 0 1-2.244 1.303L12 17.15l-5.756 3.29A1.5 1.5 0 0 1 4 19.138zm14 0H6v13.277l5.008-2.862a2 2 0 0 1 1.984 0L18 18.277z" clip-rule="evenodd"/&gt;&lt;/svg&gt;' color="gray900"></pn-icon>
          <span class="sb-label">Bookmark</span>
        </button>
      </li>

      <li class="sb-nav-item">
        <button class="sb-item" type="button" title="Box">
          <pn-icon
            icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M5.59 3.586A1 1 0 0 1 6.5 3h11a1 1 0 0 1 .91.586l2.142 4.711a5 5 0 0 1 .448 2.07V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-7.634a5 5 0 0 1 .448-2.069zM7.144 5 5.553 8.5H11V5zM13 5v3.5h5.447L16.857 5zm6 5.5H5V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
            color="gray900"
          ></pn-icon>
          <span class="sb-label">Box</span>
        </button>
      </li>

      <li class="sb-nav-item">
        <button class="sb-item" type="button" title="Transport">
          <pn-icon icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M1 8a5 5 0 0 1 5-5h7a3 3 0 0 1 3 3v1h2a3 3 0 0 1 2.4 1.2l2.4 3.2a1 1 0 0 1 .2.6v4a3 3 0 0 1-2.128 2.872A3.001 3.001 0 0 1 15.17 19H9.829a3.001 3.001 0 0 1-5.658 0H4a3 3 0 0 1-3-3zm3.17 9a3.001 3.001 0 0 1 5.66 0h5.34a3.001 3.001 0 0 1 5.538-.293c.18-.181.292-.431.292-.707v-3.667L18.8 9.4A1 1 0 0 0 18 9h-2v3a1 1 0 1 1-2 0V6a1 1 0 0 0-1-1H6a3 3 0 0 0-3 3v8a1 1 0 0 0 1 1zM8 18a1 1 0 1 0-2 0 1 1 0 0 0 2 0m10-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2" clip-rule="evenodd"/&gt;&lt;/svg&gt;' color="gray900"></pn-icon>
          <span class="sb-label">Transport</span>
        </button>
      </li>

      <li class="sb-nav-item">
        <button class="sb-item" type="button" title="Notiser">
          <pn-icon icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.511 4.173c.29.092.512.28.66.5.289.43.44 1.032.534 1.532.102.544.167 1.15.21 1.702.03.394.05.771.062 1.093H19a3 3 0 1 1 0 6h-.023c-.012.322-.032.699-.062 1.093a16 16 0 0 1-.21 1.702c-.094.5-.245 1.101-.534 1.532a1.25 1.25 0 0 1-.66.5 1.26 1.26 0 0 1-.752 0 1.54 1.54 0 0 1-.834-.66A6.74 6.74 0 0 0 10.28 16l.237.95a2.455 2.455 0 0 1-4.764 1.19L5.2 15.92A4.001 3.001 0 0 1 6 8h4.212a6.74 6.74 0 0 0 5.713-3.166c.165-.265.446-.54.834-.66.206-.064.47-.09.752-.001M6 14h3v-4H6a2 2 0 1 0 0 4m5-4.036v4.072a8.74 8.74 0 0 1 5.808 2.97c.048-.338.085-.704.113-1.066A28 28 0 0 0 17 14.037V9.963l-.001-.115-.009-.427c-.01-.36-.03-.847-.07-1.36a17 17 0 0 0-.113-1.068A8.74 8.74 0 0 1 11 9.964M19 11v2a1 1 0 1 0 0-2M8.22 16h-.94l.415 1.655a.455.455 0 0 0 .883-.22z" clip-rule="evenodd"/&gt;&lt;/svg&gt;' color="gray900"></pn-icon>
          <span class="sb-label">Notiser</span>
        </button>
      </li>

      <li class="sb-nav-item">
        <button class="sb-item" type="button" title="Statistik">
          <pn-icon icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M19 5a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1m-3 1a3 3 0 1 1 6 0v12a3 3 0 1 1-6 0zm-4 2a1 1 0 0 0-1 1v9a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1M9 9a3 3 0 1 1 6 0v9a3 3 0 1 1-6 0zm-4 3a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1m-3 1a3 3 0 1 1 6 0v5a3 3 0 1 1-6 0z" clip-rule="evenodd"/&gt;&lt;/svg&gt;' color="gray900"></pn-icon>
          <span class="sb-label">Statistik</span>
        </button>
      </li>

      <li class="sb-nav-item">
        <button class="sb-item" type="button" title="Profil">
          <pn-icon icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M7.5 7.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0M12 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.928 20.372a1 1 0 0 1-1.856-.743l.883.353a82 82 0 0 1-.883-.354v-.002l.001-.002.003-.007.008-.018a4 4 0 0 1 .114-.25c.078-.161.193-.383.35-.645.315-.523.8-1.217 1.495-1.911C6.444 15.39 8.688 14 12 14s5.556 1.391 6.957 2.793a10 10 0 0 1 1.494 1.911 8 8 0 0 1 .44.837q.016.036.025.058l.008.018.003.007.001.004-.883.354.883-.353a1 1 0 0 1-1.856.744v.001l.001.001v-.002a2 2 0 0 0-.07-.15 6 6 0 0 0-.267-.49 8 8 0 0 0-1.193-1.526C16.444 17.11 14.688 16 12 16s-4.444 1.109-5.543 2.207a8 8 0 0 0-1.193 1.526 6 6 0 0 0-.336.64m0 0-.001.003zm14.144.001" clip-rule="evenodd"/&gt;&lt;/svg&gt;' color="gray400"></pn-icon>
          <span class="sb-label">Profil</span>
        </button>
      </li>

    </ul>
  </div>

  <!-- DESKTOP sidebar — hides when ≤1024px via CSS -->
  <div class="pn-menu-div">
    <ul class="pn-sb-icon">

      <li class="sb-nav-item sb-nav-item--active">
        <button class="sb-item" type="button" title="Home">
          <pn-icon icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M8.293 4.293A1 1 0 0 1 9 4h6a1 1 0 0 1 .707.293L17 5.586V5a1 1 0 1 1 2 0v2.586l1.707 1.707A1 1 0 0 1 21 10v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 .293-.707zM9.414 6l-3 3h3.172l3-3zM15 6.414l-4 4V18h2v-2.5a2.5 2.5 0 0 1 5 0V18h1v-7.586zM16 18v-2.5a.5.5 0 0 0-1 0V18zm-7 0v-7H5v7z" clip-rule="evenodd"/&gt;&lt;/svg&gt;' color="#1A1A1A"></pn-icon>
        </button>
      </li>

      <li class="sb-divider"></li>

      <li class="sb-nav-item">
        <button class="sb-item" type="button" title="Bookmark">
          <pn-icon icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14.138a1.5 1.5 0 0 1-2.244 1.303L12 17.15l-5.756 3.29A1.5 1.5 0 0 1 4 19.138zm14 0H6v13.277l5.008-2.862a2 2 0 0 1 1.984 0L18 18.277z" clip-rule="evenodd"/&gt;&lt;/svg&gt;' color="gray900"></pn-icon>
        </button>
      </li>

      <li class="sb-nav-item">
        <button class="sb-item" type="button" title="Box">
          <pn-icon
            icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M5.59 3.586A1 1 0 0 1 6.5 3h11a1 1 0 0 1 .91.586l2.142 4.711a5 5 0 0 1 .448 2.07V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-7.634a5 5 0 0 1 .448-2.069zM7.144 5 5.553 8.5H11V5zM13 5v3.5h5.447L16.857 5zm6 5.5H5V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
            color="gray900"
          ></pn-icon>
        </button>
      </li>

      <li class="sb-nav-item">
        <button class="sb-item" type="button" title="Transport">
          <pn-icon icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M1 8a5 5 0 0 1 5-5h7a3 3 0 0 1 3 3v1h2a3 3 0 0 1 2.4 1.2l2.4 3.2a1 1 0 0 1 .2.6v4a3 3 0 0 1-2.128 2.872A3.001 3.001 0 0 1 15.17 19H9.829a3.001 3.001 0 0 1-5.658 0H4a3 3 0 0 1-3-3zm3.17 9a3.001 3.001 0 0 1 5.66 0h5.34a3.001 3.001 0 0 1 5.538-.293c.18-.181.292-.431.292-.707v-3.667L18.8 9.4A1 1 0 0 0 18 9h-2v3a1 1 0 1 1-2 0V6a1 1 0 0 0-1-1H6a3 3 0 0 0-3 3v8a1 1 0 0 0 1 1zM8 18a1 1 0 1 0-2 0 1 1 0 0 0 2 0m10-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2" clip-rule="evenodd"/&gt;&lt;/svg&gt;' color="gray900"></pn-icon>
        </button>
      </li>

      <li class="sb-nav-item">
        <button class="sb-item" type="button" title="Notiser">
          <pn-icon icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.511 4.173c.29.092.512.28.66.5.289.43.44 1.032.534 1.532.102.544.167 1.15.21 1.702.03.394.05.771.062 1.093H19a3 3 0 1 1 0 6h-.023c-.012.322-.032.699-.062 1.093a16 16 0 0 1-.21 1.702c-.094.5-.245 1.101-.534 1.532a1.25 1.25 0 0 1-.66.5 1.26 1.26 0 0 1-.752 0 1.54 1.54 0 0 1-.834-.66A6.74 6.74 0 0 0 10.28 16l.237.95a2.455 2.455 0 0 1-4.764 1.19L5.2 15.92A4.001 3.001 0 0 1 6 8h4.212a6.74 6.74 0 0 0 5.713-3.166c.165-.265.446-.54.834-.66.206-.064.47-.09.752-.001M6 14h3v-4H6a2 2 0 1 0 0 4m5-4.036v4.072a8.74 8.74 0 0 1 5.808 2.97c.048-.338.085-.704.113-1.066A28 28 0 0 0 17 14.037V9.963l-.001-.115-.009-.427c-.01-.36-.03-.847-.07-1.36a17 17 0 0 0-.113-1.068A8.74 8.74 0 0 1 11 9.964M19 11v2a1 1 0 1 0 0-2M8.22 16h-.94l.415 1.655a.455.455 0 0 0 .883-.22z" clip-rule="evenodd"/&gt;&lt;/svg&gt;' color="gray900"></pn-icon>
        </button>
      </li>

      <li class="sb-nav-item">
        <button class="sb-item" type="button" title="Statistik">
          <pn-icon icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M19 5a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1m-3 1a3 3 0 1 1 6 0v12a3 3 0 1 1-6 0zm-4 2a1 1 0 0 0-1 1v9a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1M9 9a3 3 0 1 1 6 0v9a3 3 0 1 1-6 0zm-4 3a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1m-3 1a3 3 0 1 1 6 0v5a3 3 0 1 1-6 0z" clip-rule="evenodd"/&gt;&lt;/svg&gt;' color="gray900"></pn-icon>
        </button>
      </li>

      <li class="sb-nav-item">
        <button class="sb-item" type="button" title="Profil">
          <pn-icon icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M7.5 7.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0M12 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.928 20.372a1 1 0 0 1-1.856-.743l.883.353a82 82 0 0 1-.883-.354v-.002l.001-.002.003-.007.008-.018a4 4 0 0 1 .114-.25c.078-.161.193-.383.35-.645.315-.523.8-1.217 1.495-1.911C6.444 15.39 8.688 14 12 14s5.556 1.391 6.957 2.793a10 10 0 0 1 1.494 1.911 8 8 0 0 1 .44.837q.016.036.025.058l.008.018.003.007.001.004-.883.354.883-.353a1 1 0 0 1-1.856.744v.001l.001.001v-.002a2 2 0 0 0-.07-.15 6 6 0 0 0-.267-.49 8 8 0 0 0-1.193-1.526C16.444 17.11 14.688 16 12 16s-4.444 1.109-5.543 2.207a8 8 0 0 0-1.193 1.526 6 6 0 0 0-.336.64m0 0-.001.003zm14.144.001" clip-rule="evenodd"/&gt;&lt;/svg&gt;' color="gray400"></pn-icon>
        </button>
      </li>

    </ul>
  </div>

</template>