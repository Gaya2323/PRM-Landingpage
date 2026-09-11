

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { ref, computed } from 'vue'
    import type { PnMultiselectOption } from '@postnord/web-components/types'
   

    const router = useRouter()
    
    //refs för filter-alternativer
    const activeMenu = ref<number | null>(null)
    const selectedCategories = ref<string[]>([])
    const selectedIssuers = ref<string[]>([])
    const selectedFromCountries = ref<string[]>([])
    const selectedToCountries = ref<string[]>([])

    function goBack() {
    router.push('/')
    }

    function newProductSpecification(){
            router.push('#')
    }


    const categoryOptions = ref<PnMultiselectOption[]>([
        { label: 'Parcel products', value: 'parcel', checked: false },
        { label: 'Letter products', value: 'letter', checked: false },
        { label: 'Logistics', value: 'logistics', checked: false },
        { label: 'Add-on products', value: 'addon', checked: false },
    ])

    const issuerOptions = ref<PnMultiselectOption[]>([
        { label: 'DL-ZDL', value: 'ZDL', checked: false },
        { label: 'DE-Z10', value: 'Z10', checked: false },
        { label: 'DK-Z11', value: 'Z11', checked: false },
        { label: 'SE-Z12', value: 'Z12', checked: false },
        { label: 'NO-Z13', value: 'Z13', checked: false },
        { label: 'FI-Z14', value: 'Z14', checked: false },
        { label: 'ALL-ZALL', value: 'ZALL', checked: false },
    ])

    const fromOptions = ref<PnMultiselectOption[]>([
        { label: 'SE', value: 'SE' ,checked: false },
        { label: 'FI', value: 'FI' ,checked: false },
        { label: 'DK', value: 'DK' ,checked: false },
        { label: 'NO', value: 'NO' ,checked: false },
        { label: 'AX', value: 'AX' ,checked: false },
        { label: 'AT', value: 'AT' ,checked: false },
        { label: 'BE', value: 'BE' ,checked: false },
        { label: 'BG', value: 'BG' ,checked: false },
        { label: 'CH', value: 'CH',checked: false },
        { label: 'CZ', value: 'CZ' ,checked: false },
        { label: 'DE', value: 'DE',checked: false },
        { label: 'EE', value: 'EE',checked: false },
        { label: 'ES', value: 'ES' ,checked: false },
        { label: 'FR', value: 'FR' ,checked: false },
        { label: 'GB', value: 'GB',checked: false },
        { label: 'GE', value: 'GE' ,checked: false },
        { label: 'GR', value: 'GR' ,checked: false },
        { label: 'HR', value: 'HR',checked: false },
        { label: 'HU', value: 'HU' ,checked: false },
        { label: 'IE', value: 'IE' ,checked: false },
        { label: 'LI', value: 'LI' ,checked: false },
        { label: 'LT', value: 'LT' ,checked: false },
        { label: 'LV', value: 'LV' ,checked: false },
        { label: 'MC', value: 'MC' ,checked: false },
        { label: 'NL', value: 'NL' ,checked: false },
        { label: 'PL', value: 'PL' ,checked: false },
        { label: 'PT', value: 'PT' ,checked: false },
        { label: 'SI', value: 'SI' ,checked: false },
        { label: 'SK', value: 'SK' ,checked: false },
        { label: 'UA', value: 'UA' ,checked: false },

    ]) 

    const toOptions= ref<PnMultiselectOption[]>([
        { label: 'SE', value: 'SE', checked: false },
        { label: 'FI', value: 'FI', checked: false },
        { label: 'DK', value: 'DK', checked: false },
        { label: 'NO', value: 'NO', checked: false },
        { label: 'AX', value: 'AX', checked: false },
        { label: 'AT', value: 'AT', checked: false },
        { label: 'BE', value: 'BE', checked: false },
        { label: 'BG', value: 'BG', checked: false },
        { label: 'CH', value: 'CH', checked: false },
        { label: 'CZ', value: 'CZ', checked: false },
        { label: 'DE', value: 'DE', checked: false },
        { label: 'EE', value: 'EE', checked: false },
        { label: 'ES', value: 'ES', checked: false },
        { label: 'FR', value: 'FR', checked: false },
        { label: 'GB', value: 'GB', checked: false },
        { label: 'GE', value: 'GE', checked: false },
        { label: 'GR', value: 'GR', checked: false },
        { label: 'HR', value: 'HR', checked: false },
        { label: 'HU', value: 'HU', checked: false },
        { label: 'IE', value: 'IE', checked: false },
        { label: 'LI', value: 'LI', checked: false },
        { label: 'LT', value: 'LT', checked: false },
        { label: 'LU', value: 'LU', checked: false },
        { label: 'LV', value: 'LV', checked: false },
        { label: 'MC', value: 'MC', checked: false },
        { label: 'NL', value: 'NL', checked: false },
        { label: 'PL', value: 'PL', checked: false },
        { label: 'PT', value: 'PT', checked: false },
        { label: 'SI', value: 'SI', checked: false },
        { label: 'SK', value: 'SK', checked: false },
        { label: 'UA', value: 'UA', checked: false },
    ]) 
   
    //skapar filtergrupper som filtererar baserat på valen.
    const filteredGroups = computed(() => {

        return productGroups.value
            .map(group => {

            // Filtrera raderna i varje grupp
            const filteredRows = group.rows.filter(row => {
                const categoryMatch = selectedCategories.value.length === 0
                || selectedCategories.value.includes(row.category) 

                const issuerMatch = selectedIssuers.value.length === 0
                || selectedIssuers.value.includes(row.issuer)

                const fromMatch = selectedFromCountries.value.length === 0
                || selectedFromCountries.value.includes(row.from)

                const toMatch = selectedToCountries.value.length === 0
                || selectedToCountries.value.includes(row.to)

                return categoryMatch && issuerMatch && fromMatch && toMatch
            })

            return { ...group, rows: filteredRows }
            })
            // Ta bort grupper som inte har några rader kvar
            .filter(group => group.rows.length > 0)
    })



    //Table Section data
    interface TableRow {
        id: number
        product: string
        issuer: string
        from: string
        to: string
        addons: string
        category: string
    }

    interface ProductGroup {
        id: number
        productName: string
        rows: TableRow[]
    }

    // Mock-data — ersätts senare med API-anrop
    const productGroups = ref<ProductGroup[]>([
    {
        id: 1,
        productName: '19, PN Service Point',
        rows: [
        { id: 1, product: '19, PN Parcel', issuer: 'DL-ZDL', from: 'Nordic Excl: FI, NO, DK', to: 'World Excl:', addons: 'Tobacco, lorem ipsum, lorem ipsum',category: 'parcel'  },
        { id: 2, product: '19, PN Parcel', issuer: 'DE-Z10', from: 'Finland', to: 'World', addons: 'Tobacco' ,category: 'parcel' },
        { id: 3, product: '19, PN Parcel', issuer: 'DK-Z11', from: 'EU Excl: DK', to: 'World Excl: DK', addons: 'Tobacco' ,category: 'parcel' },
        { id: 4, product: '19, PN Parcel', issuer: 'SE-Z12', from: 'Nordic', to: 'EU', addons: 'Tobacco',category: 'parcel'  },
        { id: 5, product: '19, PN Parcel', issuer: 'NO-Z13', from: 'Nordic', to: 'World', addons: 'Tobacco',category: 'parcel'  },
        ]
    },
    {
        id: 2,
        productName: '19, PN Service Point (Internal flow)',
        rows: [
        { id: 1, product: '19, PN Parcel', issuer: 'FI-Z14', from: 'Nordic Excl: FI, NO, DK', to: 'World Excl:', addons: 'Tobacco, lorem ipsum, lorem ipsum' ,category: 'parcel' },
        { id: 2, product: '19, PN Parcel', issuer: 'ALL-ZALL', from: 'Finland', to: 'World', addons: 'Tobacco' ,category: 'parcel' },
        ]
    },
    {
        id: 3,
        productName: '19, PN Parcel locker',
        rows: [
        { id: 1, product: '19, PN Parcel', issuer: 'DK-Z11', from: 'Nordic', to: 'EU', addons: 'Tobacco' ,category: 'parcel' },
        ]
    },
    ])
    

    function toggleMenu(groupId: number, rowId: number){
        const key = groupId * 1000 + rowId
        activeMenu.value = activeMenu.value === key ? null: key
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

                    <!-- Dropdown 1 --->
                    <div class="filter-config-group">
                        <pn-multiselect 
                        id="filter-product-category" 
                        label="Select product category"
                        search="true"
                        :options="categoryOptions">
                        </pn-multiselect>
                    </div>

                    <!-- Dropdown 2 -->
                    <div class="filter-config-group">
                        <pn-multiselect
                        id="issuer-area"
                        label="Issuer"
                        search="true"
                        :options="issuerOptions">
                        </pn-multiselect>
                    </div>
                                            
                    <!-- Dropdown 3 -->
                    <div class="filter-config-group">
                        <pn-multiselect
                        id="origin-country-area"
                        label="Origin country"
                        search="true"
                        :options="fromOptions">
                        </pn-multiselect>
                    </div>
                                
                    <!-- Dropdown 4 -->
                    <div class="filter-config-group">
                        <pn-multiselect
                        id="destination-country-area"
                        label="Destination country"
                        search="true"
                        :options="toOptions">
                        </pn-multiselect>
                    </div>

                </div>

                <!--Filter -Chips helt separerad från multiselect raden-->
                <div class="filter-chips-row" v-if="selectedCategories.length > 0 || selectedIssuers.length > 0 || selectedFromCountries.length > 0 || selectedToCountries.length > 0">
                    
                    <pn-input-chip
                        v-for="val in selectedCategories"
                        :key="'cat-'+val"
                        :label="categoryOptions.find(o => o.value === val)?.label"
                        :value="val"
                        small="true"
                        @click="selectedCategories = selectedCategories.filter(v => v !== val)">
                    </pn-input-chip>

                    <pn-input-chip
                        v-for="val in selectedIssuers"
                        :key="'iss-'+val"
                        :label="issuerOptions.find(o => o.value === val)?.label"
                        :value="val"
                        small="true"
                        @click="selectedIssuers = selectedIssuers.filter(v => v !== val)">
                    </pn-input-chip>

                    <pn-input-chip
                        v-for="val in selectedFromCountries"
                        :key="'from-'+val"
                        :label="val"
                        :value="val"
                        small="true"
                        @click="selectedFromCountries = selectedFromCountries.filter(v => v !== val)">
                    </pn-input-chip>

                    <pn-input-chip
                        v-for="val in selectedToCountries"
                        :key="'to-'+val"
                        :label="val"
                        :value="val"
                        small="true"
                        @click="selectedToCountries = selectedToCountries.filter(v => v !== val)">
                    </pn-input-chip>

                </div>
            </div>

            <!--Table Section 1------------------------>
            <div class="config-table-section" v-for="group in filteredGroups" :key="group.id">
                <h2 class="config-section-title">{{ group.productName }}</h2>
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
                            <tr v-for="row in group.rows" :key="row.id">
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
                                            color="blue700"
                                        ></pn-icon>
                                    </button>
                                    <!--Edit button-->
                                    <button class="config-action-btn" aria-label="Edit">
                                        <pn-icon
                                            icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="#005D92" viewBox="0 0 24 24"&gt;&lt;path fill="currentColor" fill-rule="evenodd" d="M17.793 6.207a1.12 1.12 0 0 0-1.586 0l-.293.293L17.5 8.086l.293-.293a1.12 1.12 0 0 0 0-1.586M16.086 9.5 14.5 7.914 6.464 15.95a5 5 0 0 0-.89 1.21l1.266 1.266c.442-.232.85-.531 1.21-.89zm-1.293-4.707a3.121 3.121 0 1 1 4.414 4.414L9.464 18.95A7 7 0 0 1 4.514 21H4a1 1 0 0 1-1-1v-.515a7 7 0 0 1 2.05-4.95zM11.5 20a1 1 0 0 1 1-1H19a1 1 0 1 1 0 2h-6.5a1 1 0 0 1-1-1" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                            color="blue700"
                                        ></pn-icon>
                                    </button>
                                    <!--More button-->
                                    <div class="config-more-wrapper">
                                        <button class="config-action-btn" aria-label="More" @click="toggleMenu(group.id, row.id)">
                                            <pn-icon
                                                    icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="#005D92" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M12 21a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0-7a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0-7a2 2 0 1 1 0-4 2 2 0 0 1 0 4" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                                    color="blue700"
                                            ></pn-icon>
                                        </button>
                                        <!-- Dropdown menu -->
                                         <div class="config-dropdown-menu" v-if="activeMenu === group.id * 1000 + row.id">
                                            <button class="config-dropdown-item" @click="closeMenu">
                                               <pn-icon
                                                    icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M3.055 11H3.5a1 1 0 1 1 0 2h-.445A9.004 9.004 0 0 0 11 20.945V20.5a1 1 0 1 1 2 0v.445A9.004 9.004 0 0 0 20.945 13H20.5a1 1 0 1 1 0-2h.445A9.004 9.004 0 0 0 13 3.055V3.5a1 1 0 1 1-2 0v-.445A9.004 9.004 0 0 0 3.055 11M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12m11-6a1 1 0 0 1 1 1v4.172a1 1 0 0 0 .293.707l.914.914a1 1 0 0 1-1.414 1.414l-.914-.914A3 3 0 0 1 11 11.172V7a1 1 0 0 1 1-1" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                                    color="blue700"
                                                ></pn-icon>
                                                Version history
                                            </button>
                                            <button class="config-dropdown-item" @click="closeMenu">
                                                <pn-icon
                                                    icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M22.707 8.293a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L19.586 10H12.5a1 1 0 1 1 0-2h7.086l-3.293-3.293a1 1 0 0 1 1.414-1.414zM12.5 15a1 1 0 0 1-1 1H4.414l3.293 3.293a1 1 0 1 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 1.414L4.414 14H11.5a1 1 0 0 1 1 1" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                                    color="blue700"
                                                ></pn-icon>
                                                Compare versions
                                            </button>
                                            <button class="config-dropdown-item" @click="closeMenu">
                                                <pn-icon
                                                    icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M7 3a3 3 0 0 0-3 3v14a1 1 0 0 0 1 1h3v-5a1 1 0 0 1 1-1h5V5c0-.729.195-1.412.535-2zm11-2H7a5 5 0 0 0-5 5v14a3 3 0 0 0 3 3h4a1 1 0 0 0 .707-.293l6-6A1 1 0 0 0 16 16V9h5a1 1 0 0 0 1-1V5a4 4 0 0 0-4-4m0 2a2 2 0 0 0-2 2v2h4V5a2 2 0 0 0-2-2m-5.414 14H10v2.586zM5.5 6a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                                    color="blue700"
                                                ></pn-icon>
                                                Activity log
                                            </button>
                                            <button class="config-dropdown-item config-dropdown-item--danger" @click="closeMenu">
                                                <pn-icon
                                                    icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M10.5 4a1 1 0 0 0-1 1h5a1 1 0 0 0-1-1zm6 1a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3h-2A2.5 2.5 0 0 0 5 9.95V19a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V9.95A2.5 2.5 0 0 0 18.5 5zm.5 5H7v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zM5.5 7a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1zm4.5 5a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                                                    color="blue700"
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

        
        </div>
        

    </div>

    

</template>