<script setup lang="ts">
    import { useRouter } from 'vue-router'
    /*import type { PnMultiselectOption } from '@postnord/web-components/types';*/
    import { onMounted, ref } from 'vue'
   

    const router = useRouter()

    function goBack() {
    router.push('/')
    }

    const currentPage = ref(2)

    interface MultiselectOption {
        label: string
        value: string
    }

    const categoryOptions: MultiselectOption[] = [
        { label: 'Parcel products', value: 'parcel'},
        { label: 'Letter products', value: 'letter'},
        { label: 'Logistics', value: 'logistics'},
        { label: 'Add-on products', value: 'addon'},
        { label: 'AAAA', value: 'aaaa'},

    ];

    const countryOptions: MultiselectOption[] = [
        { label: 'Crossborder', value: 'crossborder'},
        { label: 'Sweden', value: 'sweden'},
        { label: 'Finland', value: 'finland'},
        { label: 'Denmark', value: 'denmark'},
        { label: 'Norway', value: 'norway'},
    ]

    //Refs- to point directly the pn-multiselect-element
    const categorySelect = ref<HTMLElement | null>(null)
    const countrySelect = ref<HTMLElement | null>(null)

    onMounted(() => {
        setTimeout(() => {
            const multis = document.querySelectorAll('pn-multiselect')
            console.log('Hittade pn-multiselect:', multis.length)
            console.log('categoryOptions:', categoryOptions)
            
            if (multis[0]) {
            (multis[0] as any).options = categoryOptions
            console.log('options satta på multis[0]:', (multis[0] as any).options)
            }
            if (multis[1]) {
            (multis[1] as any).options = countryOptions
            }
        }, 500)
    })

    //Table Contents
    interface TableRow {
        id: number
        product: string
        issuer: string
        from: string
        to: string
        addons: string   // <-- ingen bindestreck!
    }

    const tableRows: TableRow[] = [
        { id: 1, product: '19. PN Parcel', issuer: 'PN', from: 'Nordic (Finland excluded)', to: 'World', addons: 'Tobacco, lorem ipsum, lorem ipsum' },
        { id: 2, product: '19. PN Parcel', issuer: 'PN', from: 'Finland',  to: 'World', addons: 'Tobacco' },
        { id: 3, product: '19. PN Parcel', issuer: 'PN', from: 'EU',       to: 'World', addons: 'Tobacco' },
        { id: 4, product: '19. PN Parcel', issuer: 'PN', from: 'Nordic',   to: 'EU',    addons: 'Tobacco' },
        { id: 5, product: '19. PN Parcel', issuer: 'PN', from: 'Nordic',   to: 'World', addons: 'Tobacco' },
        { id: 6, product: 'Body text', issuer: 'Body text', from: 'Body text', to: 'Body text', addons: 'Body text' },
        { id: 7, product: 'Body text', issuer: 'Body text', from: 'Body text', to: 'Body text', addons: 'Body text' },
        { id: 8, product: 'Body text', issuer: 'Body text', from: 'Body text', to: 'Body text', addons: 'Body text' },
        { id: 9, product: 'Body text', issuer: 'Body text', from: 'Body text', to: 'Body text', addons: 'Body text' },
        { id: 10, product: 'Body text', issuer: 'Body text', from: 'Body text', to: 'Body text', addons: 'Body text' },
    ]

</script>

<template>
  <div class="prm-wrapper">

    <!-- Page Header -->
    <div class="spec-header">

      <!-- Back link -->
      <button class="spec-back-btn" @click="goBack" type="button">
        <svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path fill="#000" fill-rule="evenodd" d="M10.707 5.293a1 1 0 0 1 0 1.414L6.414 11H20a1 1 0 1 1 0 2H6.414l4.293 4.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0" clip-rule="evenodd"/>
        </svg>
        Back
      </button>

      <!-- Heading + description -->
      <div class="spec-header-content">
        <h1 class="spec-heading">Product Reference Master</h1>
        <p class="spec-description">
          The Product Reference Master (PRM) is PostNord's central source for official information on all
          products, services, and add-ons — including letters, parcels, logistics, and digital services.
        </p>
      </div>

      <!-- Tab list -->
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

    <!-- Page content -->
    <div class="prm-inner-wrapper">
      
        <!--Filter Section-->
        <div class="filter-section">
            <h2 class="filter-heading">View Product Specifications</h2>

            <div class="filter-row">
                <pn-multiselect
                label="Filter by product category"
                class="filter-multiselect"
                ></pn-multiselect>

                <pn-multiselect
                label="Filter by country/area"
                class="filter-multiselect"
                ></pn-multiselect>

                <!--Search button-->
                <button class="filter-search-btn" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path fill="#fff" fill-rule="evenodd" d="M10 4a6 6 0 1 0 0 12A6 6 0 0 0 10 4M2 10a8 8 0 1 1 14.906 4.092l4.001 4.001a1 1 0 0 1-1.414 1.414l-4.001-4A8 8 0 0 1 2 10" clip-rule="evenodd"/>
                </svg>
                Search
                </button>
            </div>

            <!--More filters button-->
            <div class="filter-more-row">
                <button class="filter-more-btn" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" fill-rule="evenodd" d="M3 5a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m3 7a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1m3 6a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1" clip-rule="evenodd"/>
                </svg>
                More filters
                </button>
            </div>
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
  </div>
</template>