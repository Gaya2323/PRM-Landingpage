<script setup lang="ts">
  import { onMounted } from 'vue';
  import SidebarMock from './components/SidebarMock.vue';
  
  onMounted(() => {

    //TopBar
    const topbarscript = document.createElement('script')
    topbarscript.src = 'https://atportal.postnord.com/pntopbar/nediprm'
    document.getElementById('pn-topbar')?.appendChild(topbarscript)
  })

</script>


<template>
  <pn-topbar id="pn-topbar" app-name="Production Reference Master"></pn-topbar>

  <div class="pn-page-container">

    <!-- Sidebar mock -->
    <SidebarMock />

    <div class="pn-main-view">
      
      <router-view />
    </div>

  </div>
</template>




