<script setup lang="ts">
  import { onMounted } from 'vue';
  import ExploreSection from './components/ExploreSection.vue';
  import NewToPrmTitle from './components/New-to-prm-title.vue';
  import FaqSection from './components/FaqSection.vue';
  import SidebarMock from './components/SidebarMock.vue';
  import HeroSection from './components/HeroSection.vue';


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
      <div class="prm-wrapper">

        <!-- Hero Section -->
        <HeroSection />

        <!-- Inner Wrapper -->
        <div class="prm-inner-wrapper">
          <ExploreSection />
          <NewToPrmTitle />
          <FaqSection />
        </div>

      </div>
    </div>

  </div>
</template>




