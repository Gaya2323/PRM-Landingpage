
<!--Header with h1, and buttons----->

<template>
  <div class="prm-header-container">

    <!--left: Heading and description-->
    <div class="prm-header-left">
      <h1 class="prm-header-title">Product Reference Master (PRM)</h1>
      <p class="prm-header__subtitle">
        Use PRM to find trusted product information, navigate product hierarchies, and access historical, current, and planned product specifications.
      </p>
    </div>
    
    <div class="prm-header-buttons">
      <!-- Heading Button 1 -->
      <pn-button
        label="Learn how PRM works"
        appearance="light"
        variant="outlined"
        slot="buttons">
      </pn-button>

      <!-- Heading Button 2 -->
      <pn-button
        label="View all products"
        icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M19.707 11.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L16.586 13H8a1 1 0 1 1 0-2h8.586l-4.293-4.293a1 1 0 0 1 1.414-1.414zM5.01 13H5a1 1 0 1 1 0-2h.01a1 1 0 1 1 0 2" clip-rule="evenodd"/></svg>'
        slot="buttons">
      </pn-button>
    </div>
  </div>
</template>