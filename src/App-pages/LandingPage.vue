
<script setup lang="ts">
  
  import ExploreSection from '../components/ExploreSection.vue';
  import NewToPrmTitle from '../components/New-to-prm-title.vue';
  import FaqSection from '../components/FaqSection.vue';
  import HeroSection from '../components/HeroSection.vue';

</script>


<template>

  <div class="pn-page-container">

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




