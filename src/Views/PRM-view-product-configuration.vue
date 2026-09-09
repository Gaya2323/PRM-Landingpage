

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { onMounted, ref } from 'vue'

    const router = useRouter()
    /*const drawerOpen = ref(false)
    const drawerMounted = ref(false)*/
    const activeMenu = ref<number | null>(null)

    function goBack() {
    router.push('/')
    }

    function newProductSpecification(){
            router.push('#')
    }

    interface MultiselectOption {
    label: string
    value: string
    checked?: boolean
    }

    const categoryOptions: MultiselectOption[] = [
    { label: 'Parcel products', value: 'parcel' },
    { label: 'Letter products', value: 'letter' },
    { label: 'Logistics', value: 'logistics' },
    { label: 'Add-on products', value: 'addon' },
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

    // Sätter options-listan direkt som DOM-property (fungerar inte via Vue-bindning)
    function setMultiselectOptions(id: string, options: MultiselectOption[]) {
    const el = document.querySelector<any>(`#${id}`)
    if (el) {
        el.options = options.map(opt => ({ ...opt, checked: false }))
    }
    }

    function applyAllFilterOptions() {
    setMultiselectOptions('filter-product-category', categoryOptions)
    setMultiselectOptions('issuer-area', issuerOptions)
    setMultiselectOptions('origin-country-area', fromOptions)
    setMultiselectOptions('destination-country-area', toOptions)
    }

    onMounted(() => {
    customElements.whenDefined('pn-multiselect').then(applyAllFilterOptions)

    // Fallback ifall komponenten inte hunnit definieras (särskilt på GitHub Pages)
    setTimeout(applyAllFilterOptions, 800)
    })

    //Table Section data

    interface TableRow {
        id: number
        product:string
        issuer: string
        from: string
        to: string
        addons: string
    }

    const servicePointRows: TableRow[] =[
        { id: 1, product: '19, PN Parcel', issuer: 'PN', from: 'Nordic Excl: FI, NO, DK', to: 'World Excl:', addons: 'Tobacco, lorem ipsum, lorem ipsum' },
        { id: 2, product: '19, PN Parcel', issuer: 'PN', from: 'Finland', to: 'World', addons: 'Tobacco' },
        { id: 3, product: '19, PN Parcel', issuer: 'PN', from: 'EU Excl: DK', to: 'World Excl: DK', addons: 'Tobacco' },
        { id: 4, product: '19, PN Parcel', issuer: 'PN', from: 'Nordic', to: 'EU', addons: 'Tobacco' },
        { id: 5, product: '19, PN Parcel', issuer: 'PN', from: 'Nordic', to: 'World', addons: 'Tobacco' },
    ]

    /*const internalFlowRows: TableRow[] = [
    { id: 1, product: '19, PN Parcel', issuer: 'PN', from: 'Nordic (Finland excluded)', to: 'World', addons: 'Tobacco, lorem ipsum, lorem ipsum' },
    { id: 2, product: '19, PN Parcel', issuer: 'PN', from: 'Finland', to: 'World', addons: 'Tobacco' },
    { id: 3, product: '19, PN Parcel', issuer: 'PN', from: 'EU', to: 'World', addons: 'Tobacco' },
    { id: 4, product: '19, PN Parcel', issuer: 'PN', from: 'Nordic', to: 'EU', addons: 'Tobacco' },
    { id: 5, product: '19, PN Parcel', issuer: 'PN', from: 'Nordic', to: 'World', addons: 'Tobacco' },
    ]

    const parcelLockerRows: TableRow[] = [
    { id: 1, product: '19, PN Parcel', issuer: 'PN', from: 'Nordic (Finland excluded)', to: 'World', addons: 'Tobacco, lorem ipsum, lorem ipsum' },
    { id: 2, product: '19, PN Parcel', issuer: 'PN', from: 'Finland', to: 'World', addons: 'Tobacco' },
    { id: 3, product: '19, PN Parcel', issuer: 'PN', from: 'EU', to: 'World', addons: 'Tobacco' },
    { id: 4, product: '19, PN Parcel', issuer: 'PN', from: 'Nordic', to: 'EU', addons: 'Tobacco' },
    { id: 5, product: '19, PN Parcel', issuer: 'PN', from: 'Nordic', to: 'World', addons: 'Tobacco' },
    ]*/

    function toggleMenu(id: number){
        activeMenu.value = activeMenu.value === id ? null: id
    }
    function closeMenu(){
        activeMenu.value = null
    }

</script>


<template>
    <div class="prm-config-wrapper" data-testid="prm-view-product-configuration">
        <div class="spec-config-header">

            <!--Back-link--->
            <button class="spec-back-btn" @click="goBack" type="button">
                <svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path fill="#000" fill-rule="evenodd" d="M10.707 5.293a1 1 0 0 1 0 1.414L6.414 11H20a1 1 0 1 1 0 2H6.414l4.293 4.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0" clip-rule="evenodd"/>
                </svg>
                Back
            </button>

            <!-- Title + knapp i rad -->
            <div class="prm-config-title-row">
                <div class="prm-header-config-left">
                    <h1 class="prm-header-config-title">Product Configuration</h1>
                    <p class="prm-header-config-subtitle">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                    </p>
                </div>
                <div class="prm-config-button">
                    <div class="config-new-btn" @click="newProductSpecification" style="cursor: pointer;">
                        <pn-button
                            label="New product specification"
                            icon-placement="left"
                            icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M12 2a1 1 0 0 1 1 1v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 1 1-2 0v-8H3a1 1 0 1 1 0-2h8V3a1 1 0 0 1 1-1" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                            color="gray900"
                            slot="buttons">
                        </pn-button>
                    </div>
                </div>
            </div>

        </div>

        <!---MAIN CONTENT------------------------------------------------------------>

        <div class="config-main-content">

            <!--Filter Section-------------------------->
            <div class="filter-config-section">
                <div class="filter-config-row">

                    <!-- Dropdown 1 -->
                    <div class="filter-config-group">
                        <pn-multiselect id="filter-product-category" label="Select product category"></pn-multiselect>
                    </div>

                    <!-- Dropdown 2 -->
                    <div class="filter-config-group">
                        <pn-multiselect id="issuer-area" label="Issuer"></pn-multiselect>
                    </div>
                                
                    <!-- Dropdown 3 -->
                    <div class="filter-config-group">
                        <pn-multiselect id="origin-country-area" label="Origin country"></pn-multiselect>
                    </div>
                                
                    <!-- Dropdown 4 -->
                    <div class="filter-config-group">
                        <pn-multiselect id="destination-country-area" label="Destination country"></pn-multiselect>
                    </div>         

                </div>
            </div>

            <!--Table Section 1------------------------>
            <div class="config-table-section">
                <h2 class="config-section-title">19, PN Service Point</h2>
                <pn-table bordered="true" class="config-product-table-outer">
                    <table class="config-product-table">
                        <thead>
                            <tr>
                                <th class="config-col-product"><div class="column-wrapper">Product<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th class="config-col-issuer"><div class="column-wrapper">Issuer<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th class="config-col-from"><div class="column-wrapper">Origin country<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th class="config-col-to"><div class="column-wrapper">Destination country<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th class="config-col-addons"><div class="column-wrapper">Add-ons<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th><div class="column-wrapper"></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in servicePointRows" :key="row.id">
                                <td class="config-col-product"><div class="column-wrapper">{{ row.product }}</div></td>
                                <td class="config-col-issuer"><div class="column-wrapper">{{ row.issuer }}</div></td>
                                <td class="config-col-from"><div class="column-wrapper">{{ row.from }}</div></td>
                                <td class="config-col-to"><div class="column-wrapper">{{ row.to }}</div></td>
                                <td class="config-col-addons"><div class="column-wrapper">{{ row.addons }}</div></td>

                                <td><div class="config-column-wrapper action-cell">

                                    <!--View button-->
                                    <button class="config-action-btn" aria-label="View">
                                        <pn-icon
                                            icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="#005D92" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M12 7c-5.382 0-7.908 3.33-8.758 4.775a.43.43 0 0 0 0 .45C4.092 13.67 6.618 17 12 17s7.908-3.33 8.758-4.775a.43.43 0 0 0 0-.45C19.908 10.33 17.382 7 12 7M1.518 10.761C2.55 9.005 5.618 5 12 5s9.45 4.005 10.482 5.761a2.43 2.43 0 0 1 0 2.478C21.45 14.995 18.382 19 12 19s-9.45-4.005-10.482-5.761a2.43 2.43 0 0 1 0-2.478M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0m4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" clip-rule="evenodd"/&gt;&lt;/svg&gt;' 
                                        ></pn-icon>
                                    </button>
                                    <!--Edit button-->
                                    <button class="config-action-btn" aria-label="Edit">
                                        <pn-icon
                                            icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="#005D92" viewBox="0 0 24 24"&gt;&lt;path fill="currentColor" fill-rule="evenodd" d="M17.793 6.207a1.12 1.12 0 0 0-1.586 0l-.293.293L17.5 8.086l.293-.293a1.12 1.12 0 0 0 0-1.586M16.086 9.5 14.5 7.914 6.464 15.95a5 5 0 0 0-.89 1.21l1.266 1.266c.442-.232.85-.531 1.21-.89zm-1.293-4.707a3.121 3.121 0 1 1 4.414 4.414L9.464 18.95A7 7 0 0 1 4.514 21H4a1 1 0 0 1-1-1v-.515a7 7 0 0 1 2.05-4.95zM11.5 20a1 1 0 0 1 1-1H19a1 1 0 1 1 0 2h-6.5a1 1 0 0 1-1-1" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                        ></pn-icon>
                                    </button>
                                    <!--More button-->
                                    <div class="config-more-wrapper">
                                        <button class="config-action-btn" aria-label="More" @click="toggleMenu(row.id)">
                                            <pn-icon
                                                    icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="#005D92" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M12 21a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0-7a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0-7a2 2 0 1 1 0-4 2 2 0 0 1 0 4" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                            ></pn-icon>
                                        </button>
                                        <!-- Dropdown menu -->
                                         <div class="config-dropdown-menu" v-if="activeMenu === row.id">
                                            <button class="config-dropdown-item" @click="closeMenu">
                                               <pn-icon
                                                    icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M3.055 11H3.5a1 1 0 1 1 0 2h-.445A9.004 9.004 0 0 0 11 20.945V20.5a1 1 0 1 1 2 0v.445A9.004 9.004 0 0 0 20.945 13H20.5a1 1 0 1 1 0-2h.445A9.004 9.004 0 0 0 13 3.055V3.5a1 1 0 1 1-2 0v-.445A9.004 9.004 0 0 0 3.055 11M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12m11-6a1 1 0 0 1 1 1v4.172a1 1 0 0 0 .293.707l.914.914a1 1 0 0 1-1.414 1.414l-.914-.914A3 3 0 0 1 11 11.172V7a1 1 0 0 1 1-1" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                                    color="gray600"
                                                ></pn-icon>
                                                Version history
                                            </button>
                                            <button class="config-dropdown-item" @click="closeMenu">
                                                <pn-icon
                                                    icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M7 5a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2M3 7a4 4 0 1 1 8 0v10a4 4 0 0 1-8 0zm10 0a4 4 0 0 1 8 0v10a4 4 0 0 1-8 0zm2.004-.12Q15 6.94 15 7v1.532l4 3.333V9.989zm1.107-1.672.003.003L19 7.455V7a2 2 0 0 0-2.89-1.792M19 14.468l-4-3.333v1.92l4 3.6zm-.815 4.144L15 15.745V17a2 2 0 0 0 3.185 1.612" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                                    color="gray900"
                                                ></pn-icon>
                                                Compare versions
                                            </button>
                                            <button class="config-dropdown-item" @click="closeMenu">
                                                <pn-icon
                                                    icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M7 3a3 3 0 0 0-3 3v14a1 1 0 0 0 1 1h3v-5a1 1 0 0 1 1-1h5V5c0-.729.195-1.412.535-2zm11-2H7a5 5 0 0 0-5 5v14a3 3 0 0 0 3 3h4a1 1 0 0 0 .707-.293l6-6A1 1 0 0 0 16 16V9h5a1 1 0 0 0 1-1V5a4 4 0 0 0-4-4m0 2a2 2 0 0 0-2 2v2h4V5a2 2 0 0 0-2-2m-5.414 14H10v2.586zM5.5 6a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                                    color="gray900"
                                                ></pn-icon>
                                                Activity log
                                            </button>
                                            <button class="config-dropdown-item config-dropdown-item--danger" @click="closeMenu">
                                                <pn-icon
                                                    icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M10.5 4a1 1 0 0 0-1 1h5a1 1 0 0 0-1-1zm6 1a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3h-2A2.5 2.5 0 0 0 5 9.95V19a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V9.95A2.5 2.5 0 0 0 18.5 5zm.5 5H7v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zM5.5 7a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1zm4.5 5a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                                    color="gray900"
                                                ></pn-icon>
                                                Delete specification
                                            </button>
                                        </div>
                                    </div>
                                    
                                </div></td>

                            </tr>
                        </tbody>
                    </table>

                </pn-table>
            </div>

            <!--Table Section 2------------------------->
            <div class="config-table-section">
                <h2 class="config-section-title">19, PN Service Point (Internal flow)</h2>
                <pn-table bordered="true" class="config-product-table-outer">
                    <table class="config-product-table">
                        <thead>
                            <tr>
                                <th class="config-col-product"><div class="column-wrapper">Product<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th class="config-col-issuer"><div class="column-wrapper">Issuer<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th class="config-col-from"><div class="column-wrapper">Origin country<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th class="config-col-to"><div class="column-wrapper">Destination country<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th class="config-col-addons"><div class="column-wrapper">Add-ons<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th><div class="column-wrapper"></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in servicePointRows" :key="row.id">
                                <td class="config-col-product"><div class="column-wrapper">{{ row.product }}</div></td>
                                <td class="config-col-issuer"><div class="column-wrapper">{{ row.issuer }}</div></td>
                                <td class="config-col-from"><div class="column-wrapper">{{ row.from }}</div></td>
                                <td class="config-col-to"><div class="column-wrapper">{{ row.to }}</div></td>
                                <td class="config-col-addons"><div class="column-wrapper">{{ row.addons }}</div></td>
                                <td><div class="config-column-wrapper action-cell">
                                    <button class="config-action-btn" aria-label="View">
                                        <pn-icon
                                            icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="#005D92" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M12 7c-5.382 0-7.908 3.33-8.758 4.775a.43.43 0 0 0 0 .45C4.092 13.67 6.618 17 12 17s7.908-3.33 8.758-4.775a.43.43 0 0 0 0-.45C19.908 10.33 17.382 7 12 7M1.518 10.761C2.55 9.005 5.618 5 12 5s9.45 4.005 10.482 5.761a2.43 2.43 0 0 1 0 2.478C21.45 14.995 18.382 19 12 19s-9.45-4.005-10.482-5.761a2.43 2.43 0 0 1 0-2.478M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0m4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                            
                                        ></pn-icon>
                                    </button>
                                    <button class="config-action-btn" aria-label="Edit">
                                        <pn-icon
                                            icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="#005D92" viewBox="0 0 24 24"&gt;&lt;path fill="currentColor" fill-rule="evenodd" d="M17.793 6.207a1.12 1.12 0 0 0-1.586 0l-.293.293L17.5 8.086l.293-.293a1.12 1.12 0 0 0 0-1.586M16.086 9.5 14.5 7.914 6.464 15.95a5 5 0 0 0-.89 1.21l1.266 1.266c.442-.232.85-.531 1.21-.89zm-1.293-4.707a3.121 3.121 0 1 1 4.414 4.414L9.464 18.95A7 7 0 0 1 4.514 21H4a1 1 0 0 1-1-1v-.515a7 7 0 0 1 2.05-4.95zM11.5 20a1 1 0 0 1 1-1H19a1 1 0 1 1 0 2h-6.5a1 1 0 0 1-1-1" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                        ></pn-icon>
                                    </button>
                                    <button class="config-action-btn" aria-label="More">
                                       <pn-icon
                                            icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="#005D92" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M12 21a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0-7a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0-7a2 2 0 1 1 0-4 2 2 0 0 1 0 4" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                            
                                        ></pn-icon>
                                    </button>
                                </div></td>

                            </tr>
                        </tbody>
                    </table>

                </pn-table>
            </div>

            <!--Table Section 3------------------------->
            <div class="config-table-section">
                <h2 class="config-section-title">19, PN Parcel locker</h2>
                <pn-table bordered="true" class="config-product-table-outer">
                    <table class="config-product-table">
                        <thead>
                            <tr>
                                <th class="config-col-product"><div class="column-wrapper">Product<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th class="config-col-issuer"><div class="column-wrapper">Issuer<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th class="config-col-from"><div class="column-wrapper">Origin country<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th class="config-col-to"><div class="column-wrapper">Destination country<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th class="config-col-addons"><div class="column-wrapper">Add-ons<pn-button small="" appearance="light" icon-only="" icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/&gt;&lt;/svg&gt;'></pn-button></div></th>
                                <th><div class="column-wrapper"></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in servicePointRows" :key="row.id">
                                <td class="config-col-product"><div class="column-wrapper">{{ row.product }}</div></td>
                                <td class="config-col-issuer"><div class="column-wrapper">{{ row.issuer }}</div></td>
                                <td class="config-col-from"><div class="column-wrapper">{{ row.from }}</div></td>
                                <td class="config-col-to"><div class="column-wrapper">{{ row.to }}</div></td>
                                <td class="config-col-addons"><div class="column-wrapper">{{ row.addons }}</div></td>
                                <td><div class="config-column-wrapper action-cell">
                                    <button class="config-action-btn" aria-label="View">
                                        <pn-icon
                                            icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="#005D92" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M12 7c-5.382 0-7.908 3.33-8.758 4.775a.43.43 0 0 0 0 .45C4.092 13.67 6.618 17 12 17s7.908-3.33 8.758-4.775a.43.43 0 0 0 0-.45C19.908 10.33 17.382 7 12 7M1.518 10.761C2.55 9.005 5.618 5 12 5s9.45 4.005 10.482 5.761a2.43 2.43 0 0 1 0 2.478C21.45 14.995 18.382 19 12 19s-9.45-4.005-10.482-5.761a2.43 2.43 0 0 1 0-2.478M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0m4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                            
                                        ></pn-icon>
                                    </button>
                                    <button class="config-action-btn" aria-label="Edit">
                                        <pn-icon
                                            icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="#005D92" viewBox="0 0 24 24"&gt;&lt;path fill="currentColor" fill-rule="evenodd" d="M17.793 6.207a1.12 1.12 0 0 0-1.586 0l-.293.293L17.5 8.086l.293-.293a1.12 1.12 0 0 0 0-1.586M16.086 9.5 14.5 7.914 6.464 15.95a5 5 0 0 0-.89 1.21l1.266 1.266c.442-.232.85-.531 1.21-.89zm-1.293-4.707a3.121 3.121 0 1 1 4.414 4.414L9.464 18.95A7 7 0 0 1 4.514 21H4a1 1 0 0 1-1-1v-.515a7 7 0 0 1 2.05-4.95zM11.5 20a1 1 0 0 1 1-1H19a1 1 0 1 1 0 2h-6.5a1 1 0 0 1-1-1" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                        ></pn-icon>
                                    </button>
                                    <button class="config-action-btn" aria-label="More">
                                       <pn-icon
                                            icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="#005D92" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M12 21a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0-7a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0-7a2 2 0 1 1 0-4 2 2 0 0 1 0 4" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                            
                                        ></pn-icon>
                                    </button>
                                </div></td>

                            </tr>
                        </tbody>
                    </table>

                </pn-table>
            </div>
            <!--Table Section 4-------------------------if there is one?--->


        </div>
        

    </div>

    

</template>