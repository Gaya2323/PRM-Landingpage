<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { onMounted, ref, watch } from 'vue'

  const router = useRouter()
  const totalPages = ref(4)
  const drawerOpen = ref(false)
  const drawerMounted = ref(false)

  function goBack() {
    router.push('/')
  }

  interface MultiselectOption {
    label: string
    value: string
  }

  const categoryOptions: MultiselectOption[] = [
    { label: 'Parcel products', value: 'parcel' },
    { label: 'Letter products', value: 'letter' },
    { label: 'Logistics', value: 'logistics' },
    { label: 'Add-on products', value: 'addon' },
    { label: 'AAAA', value: 'aaaa' },
  ]

  const countryOptions: MultiselectOption[] = [
    { label: 'Crossborder', value: 'crossborder' },
    { label: 'Sweden', value: 'sweden' },
    { label: 'Finland', value: 'finland' },
    { label: 'Denmark', value: 'denmark' },
  ]

  const productOptions: MultiselectOption[] = [
    { label: '18 - PN Parcel', value: 'pn-parcel' },
    { label: '20 - PN Return Pickup', value: 'return-pickup' },
    { label: '21 - PN Letter', value: 'pn-letter' },
    { label: '22 - PN Logistic', value: 'pn-logistics' },
  ]

  const issuerOptions: MultiselectOption[] = [
    { label: 'PN', value: 'pn' },
    { label: 'DHL', value: 'dhl' },
    { label: 'FedEx', value: 'fedex' },
  ]

  const fromOptions: MultiselectOption[] = [
    { label: 'Sweden', value: 'sweden' },
    { label: 'Finland', value: 'finland' },
    { label: 'Denmark', value: 'denmark' },
    { label: 'Norway', value: 'norway' },
    { label: 'Nordic', value: 'nordic' },
    { label: 'EU', value: 'eu' },
  ]

  const toOptions: MultiselectOption[] = [
    { label: 'Spain', value: 'spain' },
    { label: 'World', value: 'world' },
    { label: 'EU', value: 'eu' },
    { label: 'Nordic', value: 'nordic' },
  ]

  const addonOptions: MultiselectOption[] = [
    { label: 'Email notification', value: 'email' },
    { label: 'Home delivery', value: 'home-delivery' },
    { label: 'Tobacco', value: 'tobacco' },
  ]

  function openMoreFilters() {
    drawerMounted.value = true        // ← montera DOM-element först
    setTimeout(() => {
      drawerOpen.value = true         // ← öppna efter 50ms
    }, 50)
  }

  function resetFilters() {
    const entries = [
      { id: '#modal-product', opts: productOptions },
      { id: '#modal-issuer',  opts: issuerOptions  },
      { id: '#modal-from',    opts: fromOptions    },
      { id: '#modal-to',      opts: toOptions      },
      { id: '#modal-addon',   opts: addonOptions   },
    ]

    entries.forEach(({ id, opts }) => {
      const el = document.querySelector(id) as any
      if (!el) return

      // Sätt checked: false på alla options — det är här valet lagras!
        const clearedOpts = opts.map(o => ({ ...o, checked: false }))
        el.options = clearedOpts
    })

    console.log('resetFilters körd')
  }

  function applyFilters() {
    drawerOpen.value = false
  }

  function closeDrawer() {
    drawerOpen.value = false
  }

  function handleNavigation(event: CustomEvent) {
    const { mouse, page } = event.detail
    mouse.preventDefault()
    router.push({ path: '/product-specification', query: { page } })
  }

  interface TableRow {
    id: number
    product: string
    issuer: string
    from: string
    to: string
    addons: string
  }

  const tableRows: TableRow[] = [
    { id: 1, product: '19. PN Parcel', issuer: 'PN', from: 'Nordic (Finland excluded)', to: 'World', addons: 'Tobacco, lorem ipsum, lorem ipsum' },
    { id: 2, product: '19. PN Parcel', issuer: 'PN', from: 'Finland', to: 'World', addons: 'Tobacco' },
    { id: 3, product: '19. PN Parcel', issuer: 'PN', from: 'EU', to: 'World', addons: 'Tobacco' },
    { id: 4, product: '19. PN Parcel', issuer: 'PN', from: 'Nordic', to: 'EU', addons: 'Tobacco' },
    { id: 5, product: '19. PN Parcel', issuer: 'PN', from: 'Nordic', to: 'World', addons: 'Tobacco' },
    { id: 6, product: 'Body text', issuer: 'Body text', from: 'Body text', to: 'Body text', addons: 'Body text' },
    { id: 7, product: 'Body text', issuer: 'Body text', from: 'Body text', to: 'Body text', addons: 'Body text' },
    { id: 8, product: 'Body text', issuer: 'Body text', from: 'Body text', to: 'Body text', addons: 'Body text' },
    { id: 9, product: 'Body text', issuer: 'Body text', from: 'Body text', to: 'Body text', addons: 'Body text' },
    { id: 10, product: 'Body text', issuer: 'Body text', from: 'Body text', to: 'Body text', addons: 'Body text' },
  ]

  // watch — triggas när drawern monteras första gången
  watch(drawerMounted, (val) => {
    if (!val) return
    setTimeout(() => {
      const modalProduct = document.querySelector('#modal-product') as any
      const modalIssuer  = document.querySelector('#modal-issuer')  as any
      const modalFrom    = document.querySelector('#modal-from')    as any
      const modalTo      = document.querySelector('#modal-to')      as any
      const modalAddon   = document.querySelector('#modal-addon')   as any

      if (modalProduct) modalProduct.options = productOptions
      if (modalIssuer)  modalIssuer.options  = issuerOptions
      if (modalFrom)    modalFrom.options    = fromOptions
      if (modalTo)      modalTo.options      = toOptions
      if (modalAddon)   modalAddon.options   = addonOptions

      console.log('modal options assigned')
    }, 800)
  })

  // onMounted — endast filter-raden
  onMounted(async () => {
    await customElements.whenDefined('pn-multiselect')

    const modal = document.querySelector('pn-modal') as any
    if (modal) {
      modal.addEventListener('close', () => {
        drawerOpen.value = false
      })
    }

    const assignOptions = () => {
      const filterProductCat  = document.querySelector('#filter-product-category') as any
      const filterCountryArea = document.querySelector('#filter-country-area') as any

      if (filterProductCat)  filterProductCat.options  = categoryOptions
      if (filterCountryArea) filterCountryArea.options = countryOptions

      console.log('filter options assigned:',
        'product-category:', !!filterProductCat,
        'country-area:', !!filterCountryArea
      )
    }

    assignOptions()
    setTimeout(assignOptions, 800)
    setTimeout(assignOptions, 1500)
  })
</script>

<template>
    <div class="prm-wrapper" data-testid="prm-view-product-specification">

        <!-- Page Header -->
        <div class="spec-header">

        <!-- Back link -->
        <button class="spec-back-btn" @click="goBack" type="button">
            <svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path fill="#000" fill-rule="evenodd" d="M10.707 5.293a1 1 0 0 1 0 1.414L6.414 11H20a1 1 0 1 1 0 2H6.414l4.293 4.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0" clip-rule="evenodd"/>
            </svg>
            Back
        </button>

        <!-- Heading + description Section--------------------------------->
        <div class="spec-header-content">
            <h1 class="spec-heading">Product Reference Master</h1>
            <p class="spec-description">
            The Product Reference Master (PRM) is PostNord's central source for official information on all
            products, services, and add-ons — including letters, parcels, logistics, and digital services.
            </p>
        </div>

        <!-- Nav list under the h1 -->
        <pn-tablist label="Menu" value="home" slot="menu">
            <pn-tab label="Home" value="home"
            icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M8.293 4.293A1 1 0 0 1 9 4h6a1 1 0 0 1 .707.293L17 5.586V5a1 1 0 1 1 2 0v2.586l1.707 1.707A1 1 0 0 1 21 10v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 .293-.707zM9.414 6l-3 3h3.172l3-3zM15 6.414l-4 4V18h2v-2.5a2.5 2.5 0 0 1 5 0V18h1v-7.586zM16 18v-2.5a.5.5 0 0 0-1 0V18zm-7 0v-7H5v7z" clip-rule="evenodd"/></svg>'
            ></pn-tab>
            <pn-tab label="Parcel page (PTM)" value="parcel"
            icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M5.59 3.586A1 1 0 0 1 6.5 3h11a1 1 0 0 1 .91.586l2.142 4.711a5 5 0 0 1 .448 2.07V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-7.634a5 5 0 0 1 .448-2.069zM7.144 5 5.553 8.5H11V5zM13 5v3.5h5.447L16.857 5zm6 5.5H5V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" clip-rule="evenodd"/></svg>'
            ></pn-tab>
            <pn-tab label="Letter page (PTM)" value="letter"
            icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M4.56 3.457A3 3 0 0 1 7.132 2h9.736a3 3 0 0 1 2.572 1.457l1.848 3.078A5 5 0 0 1 22 9.108V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9.108a5 5 0 0 1 .713-2.573zM7.132 4a1 1 0 0 0-.857.486L4.428 7.563A3 3 0 0 0 4 9.108V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.108a3 3 0 0 0-.427-1.544l-1.848-3.078A1 1 0 0 0 16.868 4zM12 5.5a1 1 0 0 1 1 1V8h4.5a1 1 0 1 1 0 2h-11a1 1 0 0 1 0-2H11V6.5a1 1 0 0 1 1-1M6 13a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1" clip-rule="evenodd"/></svg>'
            ></pn-tab>
            <pn-tab label="Logistics page (PTM)" value="logistics"
            icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M1 8a5 5 0 0 1 5-5h7a3 3 0 0 1 3 3v1h2a3 3 0 0 1 2.4 1.2l2.4 3.2a1 1 0 0 1 .2.6v4a3 3 0 0 1-2.128 2.872A3.001 3.001 0 0 1 15.17 19H9.829a3.001 3.001 0 0 1-5.658 0H4a3 3 0 0 1-3-3zm3.17 9a3.001 3.001 0 0 1 5.66 0h5.34a3.001 3.001 0 0 1 5.538-.293c.18-.181.292-.431.292-.707v-3.667L18.8 9.4A1 1 0 0 0 18 9h-2v3a1 1 0 1 1-2 0V6a1 1 0 0 0-1-1H6a3 3 0 0 0-3 3v8a1 1 0 0 0 1 1zM8 18a1 1 0 1 0-2 0 1 1 0 0 0 2 0m10-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2" clip-rule="evenodd"/></svg>'
            ></pn-tab>
            <pn-tab label="Add-on page (PTM)" value="addon"
            icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M12 2a1 1 0 0 1 1 1v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 1 1-2 0v-8H3a1 1 0 1 1 0-2h8V3a1 1 0 0 1 1-1" clip-rule="evenodd"/></svg>'
            ></pn-tab>
        </pn-tablist>

        </div>

        <!-- Page content -------------------------->
        <div class="prm-inner-wrapper">
        
            <!--Filter Section------------------>
            <div class="filter-section">
                <h2 class="filter-heading">View Product Specifications</h2>

                <div class="filter-row">

                    <!-- Dropdown 1 -->
                    <div class="filter-group">
                        <pn-multiselect id="filter-product-category" label="Filter by product category"></pn-multiselect>
                    </div>

                    <!-- Dropdown 2 -->
                    <div class="filter-group">
                        <pn-multiselect id="filter-country-area" label="Filter by country/area"></pn-multiselect>
                    </div>

                <!--Search button-->
                <button class="filter-search-btn" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path fill="#fff" fill-rule="evenodd" d="M10 4a6 6 0 1 0 0 12A6 6 0 0 0 10 4M2 10a8 8 0 1 1 14.906 4.092l4.001 4.001a1 1 0 0 1-1.414 1.414l-4.001-4A8 8 0 0 1 2 10" clip-rule="evenodd"/>
                    </svg>
                Search
                </button>

            </div>

        <!--More filters button + Modal-->
        <div class="filter-more-row">

            <div @click="openMoreFilters">
                <pn-button
                    label="More filters"
                    appearance="outlined"
                    icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="currentColor" fill-rule="evenodd" d="M3 5a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2h-.65l-.763.611a17.7 17.7 0 0 0-4.087 4.663v4.69a2 2 0 0 1-.89 1.665l-1 .667c-1.33.886-3.11-.067-3.11-1.665v-5.357a17.7 17.7 0 0 0-4.087-4.663L4.65 6H4a1 1 0 0 1-1-1m4.765 1a19.7 19.7 0 0 1 3.3 4h1.87c.92-1.474 2.03-2.82 3.3-4zm4.735 6h-1v4.631l1-.666z" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                    ariahaspopup="dialog"
                ></pn-button>
            </div>

            <!-- Backdrop -->
            <div class="modal-backdrop" :class="{ 'drawer-open': drawerOpen }" @click="closeDrawer"></div>
            
            <!--pn-modal styrd via CSS-->
            <pn-modal
                ref="modalRef"
                label="All filters"
                helpertext="Multiple selections allowed"
                :class="{ 'drawer-open': drawerOpen }">

                <!-- Manuell header eftersom pn-modal inte renderar label/helpertext synligt -->
                <div class="drawer-modal-header">
                    <div>
                    <h2 class="drawer-modal-title">All filters</h2>
                    <p class="drawer-modal-subtitle">Multiple selections allowed</p>
                    </div>
                    <button class="drawer-modal-close" type="button" @click="closeDrawer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path fill="#000" fill-rule="evenodd" d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414" clip-rule="evenodd"/>
                    </svg>
                    </button>
                </div>

                <div class="modal-filters-body" v-if="drawerMounted">

                    <div style="width: 20em; margin: 0 auto 20px; display: flex; flex-direction: column;">
                        <pn-multiselect id="modal-product" label="Product"></pn-multiselect>
                    </div>

                    <div style="width: 20em; margin: 0 auto 20px; display: flex; flex-direction: column;">
                        <pn-multiselect id="modal-issuer" label="Issuer"></pn-multiselect>
                    </div>

                    <div style="width: 20em; margin: 0 auto 20px; display: flex; flex-direction: column;">
                        <pn-multiselect id="modal-from" label="From"></pn-multiselect>
                    </div>

                    <div style="width: 20em; margin: 0 auto 20px; display: flex; flex-direction: column;">
                        <pn-multiselect id="modal-to" label="To"></pn-multiselect>
                    </div>

                    <div style="width: 20em; margin: 0 auto 20px; display: flex; flex-direction: column;">
                        <pn-multiselect id="modal-addon"  label="Add-on services"></pn-multiselect>
                    </div>

                </div>

                <!-- Apply  Filters button---->
                <div slot="buttons" class="drawer-footer-row">
                    <div @click="resetFilters">
                        <pn-button label="Reset filters" appearance="light" variant="outlined"></pn-button>
                    </div>
                    <!-- Apply  Filters button---->
                    <div @click="applyFilters" style="cursor: pointer;">    
                        <pn-button 
						 label="Apply filters"
						 icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M19.707 11.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L16.586 13H8a1 1 0 1 1 0-2h8.586l-4.293-4.293a1 1 0 0 1 1.414-1.414zM5.01 13H5a1 1 0 1 1 0-2h.01a1 1 0 1 1 0 2" clip-rule="evenodd"/></svg>'
						 slot="buttons">
						 </pn-button>
                    </div>
                </div>

            </pn-modal>
        </div>
    </div>

    

        <!--Table Section ----->
        <pn-table bordered="true" class="product-table-outer">
            <table class="product-table">
                <thead>
                    <tr>
                        <th class="col-product">
                            <div class="column-wrapper">
                                Product
                                <pn-button small="" appearance="light" icon-only="" 
                                icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                ></pn-button>
                            </div>
                        </th>
                        <th class="col-issuer">
                            <div class="column-wrapper">
                                Issuer
                                <pn-button small="" appearance="light" icon-only="" 
                                icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                ></pn-button>
                            </div>
                        </th>
                        <th class="col-from">
                            <div class="column-wrapper">
                                From
                                <pn-button small="" appearance="light" icon-only="" 
                                icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                ></pn-button>
                            </div>
                        </th>
                        <th class="col-to">
                            <div class="column-wrapper">
                                To
                                <pn-button small="" appearance="light" icon-only="" 
                                icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                ></pn-button>
                            </div>
                        </th>
                        <th class="col-addons">
                            <div class="column-wrapper">
                                Add-ons
                                <pn-button small="" appearance="light" icon-only="" 
                                icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                ></pn-button>
                            </div>
                        </th>

                        <!--Empty column-wrapper Important! -->
                         <th class="">
                            <div class="column-wrapper"></div>
                        </th>

                    </tr>

                </thead>

                <tbody>
                    <tr v-for="row in tableRows" :key="row.id">
                        <td class="col-product"><div class="column-wrapper">{{  row.product }}</div></td>
                        <td class="col-issuer"><div class="column-wrapper">{{  row.issuer }}</div></td>
                        <td class="col-from"><div class="column-wrapper">{{  row.from }}</div></td>
                        <td class="col-to"><div class="column-wrapper">{{  row.to }}</div></td>
                        <td class="col-addons"><div class="column-wrapper">{{  row.addons }}</div></td>

                        <td>
                            <div class="column-wrapper action-cell">
                                <button class="action-btn" aria-label="View">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path fill="currentColor" fill-rule="evenodd" d="M12 5C7.18 5 3.364 8.235 2.051 11.8a1 1 0 0 0 0 .4C3.364 15.765 7.18 19 12 19s8.636-3.235 9.949-6.8a1 1 0 0 0 0-.4C20.636 8.235 16.82 5 12 5M12 7c3.8 0 6.93 2.417 8.12 5C18.93 14.583 15.8 17 12 17s-6.93-2.417-8.12-5C4.07 9.417 7.2 7 12 7m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6" clip-rule="evenodd"/>
                                    </svg>
                                </button>
                                <button class="action-btn" type="button" aria-label="Open">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path fill="currentColor" fill-rule="evenodd" d="M13.293 5.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L17.586 13H4a1 1 0 1 1 0-2h13.586l-4.293-4.293a1 1 0 0 1 0-1.414" clip-rule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pn-table>

        <!--Pagination  section------------>
        <div class="pagination-wrapper">
            <pn-pagination
                :pages="totalPages"
                url-template="?page={page}"
                @pageSelected="handleNavigation">
            </pn-pagination>

        </div>

        <!--FAQ Section-------------------->
        <section class="faq-section">

            <!--ICON FAQ -->
            <div class="faq-icon-row">
                <img src="../assets/images/various-white-background-letterbox-reply-letter-plants-removebg.png"  alt="FAQ Illustration" class="faq-icon"/>
            
            </div>

            <!--Content left+ right FAQ --->
            <div class="faq-content">

                <!--Left Column-->
                <div class="faq-left">
                    <span class="faq-label">FAQ</span>
                    <h2 class="faq-title">Got questions? Find answers</h2>
                </div>

                <!--Right Column: accordion -->
                <div class="faq-accordion">
                    <pn-accordion class="faq-accordion-group">

                        <pn-accordion-row>
                            <span slot="label">How does the specification hirearchy work?</span>
                            <p>Choose products based on selected category and area.</p>
                        </pn-accordion-row>

                        <pn-accordion-row>
                            <span slot="label">How does the specification finder work?</span>
                            <p>Specification finder will get the products based on the selected inputs.</p>
                        </pn-accordion-row>

                        <pn-accordion-row>
                            <span slot="label">Which countries are considered PostNord countries?</span>
                            <p>PostNord primarily serves the Nordic countries (Sweden, Denmark, Norway, Finland) for mail and logistics, delivering to, from, and within this region, but also operates in Germany and globally through partners like DPD.</p>
                        </pn-accordion-row>

                        <pn-accordion-row>
                            <span slot="label">How can I tell which specification applies?</span>
                            <p>Product specification details.</p>
                        </pn-accordion-row>

                        <pn-accordion-row>
                            <span slot="label">What's the process if I can't find a suitable specification?</span>
                            <p>Product specification details.</p>
                        </pn-accordion-row>

                    </pn-accordion>
                </div>

            </div>
        </section>


    </div>

    

    </div>
</template>