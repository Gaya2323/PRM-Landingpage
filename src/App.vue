<script setup lang="ts">
  import { onMounted } from 'vue';
  import ExploreSection from './components/ExploreSection.vue';
  import NewToPrmTitle from './components/New-to-prm-title.vue';
  import FaqSection from './components/FaqSection.vue';
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

    <!--Hero Section  -->
    <div class="pn-main-view">
      <div class="prm-wrapper">
        <!--Header  -->
        <div class="prm-header-container">
          <pn-header heading="Product Reference Master (PRM)">
                <p class="prm-header__subtitle">
                Use PRM to find trusted product information, navigate product hierarchies, and access historical, current, and planned product specifications.
              </p>

              <!--Heading Button 1-->
              <pn-button label="Learn how PRM works"
                appearance="light"
                variant="outlined" 
                slot="buttons">
              </pn-button>

              <!--Heading Button 2-->
              <pn-button label="View all products"
                icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M19.707 11.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L16.586 13H8a1 1 0 1 1 0-2h8.586l-4.293-4.293a1 1 0 0 1 1.414-1.414zM5.01 13H5a1 1 0 1 1 0-2h.01a1 1 0 1 1 0 2" clip-rule="evenodd"/></svg>'
                slot="buttons">
              </pn-button>
            </pn-header>
        </div>
          
       <!--Inner Wrapper section  -->
        <div class="prm-inner-wrapper">

            <!-- Explore product areas -->
            <ExploreSection />

            <!-- New to PRM? -->
            <NewToPrmTitle />

            <!-- FAQ -->
            <FaqSection />

        </div>

      
        

      </div>

      
      
    </div>
  </div>

</template>




