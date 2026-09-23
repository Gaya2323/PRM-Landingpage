
<script setup lang="ts">
    import { computed, ref, watch } from 'vue'
    import { fetchAdditionalServices, type AdditionalServiceSpec } from '../services/prmApi'

    interface TableRow {
        id: number
        productId: string  
        product: string
        issuer: string
        from: string
        to: string
        addons: string
        category: string
    }

    const props = defineProps<{
        row: TableRow | null
    }>()

    const emit = defineEmits<{
        (e: 'close'): void
    }>()

    function close() {
        emit('close')
    }

    const generalAddons = computed(() => {
        if (!props.row?.addons) return []
        return props.row.addons.split(',').map((s: string) => s.trim()).filter(Boolean)
    })

    // Mockdata tills vidare — kommer från API senare
    const forbiddenAddons = [
        'Insurance/Enhanced Liability',
        'Signature Required',
        'Recipient Flex/Leave without Signature'
    ]

    //hämta measurements när drawer öppnas 
    const specs = ref<AdditionalServiceSpec[]>([])

    watch(() => props.row, async (newRow) => {
        if (!newRow?.productId) {
            specs.value = []
            return
        }
        specs.value = await fetchAdditionalServices(newRow.productId)
        console.log('specs:', specs.value)
    })

   // Hjälpfunktion: första raden med ett värde
    function firstWith<K extends keyof AdditionalServiceSpec>(key: K): AdditionalServiceSpec[K] | null {
        return specs.value.find(s => s[key] != null)?.[key] ?? null
    }

    const uniqueWeightSpecs = computed(() => {
        const map = new Map<string, AdditionalServiceSpec>()
        specs.value.forEach(s => {
            if (s.weightTo == null && s.weightFrom == null) return
            const key = s.additionalServiceId  // H1, H9 etc.
            const existing = map.get(key)
            if (!existing) {
                map.set(key, s)
            } else {
                // Behåll raden med det högsta värdet
                const newVal = s.weightTo ?? s.weightFrom ?? 0
                const existingVal = existing.weightTo ?? existing.weightFrom ?? 0
                if (newVal > existingVal) {
                    map.set(key, s)
                }
            }
        })
        return Array.from(map.values())
    })

    //Height & Width; visa högsta värdet
    const maxHeightValue = computed(() => {
        const values = specs.value
            .map(s => s.minHeight)       
            .filter((v): v is number => v != null)
        return values.length ? Math.max(...values) : null
    })

    const maxWidthValue = computed(() => {
        const values = specs.value
            .map(s => s.minDept)
            .filter((v): v is number => v != null)
        return values.length ? Math.max(...values) : null
    })

    //Add-ONS ; hämtas härifrån när drawer öppnas
    const uniqueAddons = computed(() => {
    const seen = new Set<string>()
        return specs.value.filter(s => {
            if (seen.has(s.additionalServiceId)) return false
            seen.add(s.additionalServiceId)
            return true
        })
    })


</script>

<template>

    <!-- Overlay -->
    <div
        class="spec-drawer-overlay"
        v-if="row"
        @click="close">
    </div>

    <!-- Drawer -->
    <div class="spec-drawer" :class="{ 'spec-drawer--open': row }">
        <div class="spec-drawer-inner" v-if="row">

            <!-- Header -->
            <div class="spec-drawer-header">
                <h2 class="spec-drawer-title">Product specifications</h2>
                <button class="spec-drawer-close-btn" @click="close" aria-label="Close drawer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#000" fill-rule="evenodd" d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>

            <div class="spec-drawer-divider"></div>

            <!-- Scrollable content -->
            <div class="spec-drawer-content">

                <!-- Issuer / Origin / Destination -->
                <p class="spec-meta-row">
                    <strong>Issuer:</strong> {{ row.issuer }}
                    <span class="spec-meta-sep">|</span>
                    <strong>Origin:</strong> {{ row.from }}
                    <span class="spec-meta-sep">|</span>
                    <strong>Destination:</strong> {{ row.to }}
                </p>

                <!-- Country exceptions -->
                <div class="spec-section">
                    <h3 class="spec-section-title">Country exceptions</h3>
                    <div class="spec-exceptions-row">
                        <div class="spec-exceptions-cell">
                            <span class="spec-exceptions-label">Origin:</span>
                        </div>
                        <div class="spec-exceptions-cell">
                            <span class="spec-exceptions-label">Destination:</span>
                        </div>
                    </div>
                </div>

                <div class="spec-drawer-divider"></div>

                <!-- Dimensions -->
                <div class="spec-section">
                    <div class="spec-dimensions-wrapper">
                        <div class="spec-dim-left">
                            <span class="spec-dim-label" v-if="firstWith('maxCircumference')">Parcel girth:<br>up to {{ firstWith('maxCircumference') }} {{ firstWith('dimensionUnit') }}</span>
                            <span class="spec-dim-label" v-else>Parcel girth: –</span>
                        </div>

                        <!-- SVG-bilden "en Låda" i mitten  -->
                        <div class="spec-dim-center">
                            <svg viewBox="0 0 140 100" xmlns="http://www.w3.org/2000/svg" class="spec-box-svg" aria-hidden="true">
                                <polygon points="20,70 70,88 120,70 70,52" fill="#005D92" opacity="0.75"/>
                                <polygon points="20,70 20,35 70,17 70,52" fill="#0077B8"/>
                                <polygon points="70,52 70,17 120,35 120,70" fill="#004A78"/>
                                <line x1="126" y1="35" x2="126" y2="70" stroke="#333" stroke-width="1.2"/>
                                <polygon points="124,37 126,31 128,37" fill="#333"/>
                                <polygon points="124,68 126,74 128,68" fill="#333"/>
                                <line x1="70" y1="10" x2="120" y2="28" stroke="#333" stroke-width="1.2"/>
                                <polygon points="72,8 66,10 72,14" fill="#333"/>
                                <polygon points="118,30 124,28 120,23" fill="#333"/>
                            </svg>

                            <span class="spec-dim-bottom">
                                Length: up to {{ firstWith('maxLength') ?? '–' }} {{ firstWith('dimensionUnit') ?? '' }}
                            </span>
                        </div>
                        <!-- Height -->
                        <span class="spec-dim-label" v-if="maxHeightValue">
                            Height: up to {{ maxHeightValue }} {{ firstWith('dimensionUnit') ?? '' }}
                        </span>
                        <span class="spec-dim-label" v-else>Height: –</span>
                        <!-- Width -->
                        <span class="spec-dim-label" v-if="maxWidthValue">
                            Width: up to {{ maxWidthValue }} {{ firstWith('dimensionUnit') ?? '' }}
                        </span>
                        <span class="spec-dim-label" v-else>Width: –</span>

                    </div>
                </div>

                <div class="spec-drawer-divider"></div>

                <!-- Max weight -->
                <div class="spec-weight-row">
                    <span
                        v-for="spec in uniqueWeightSpecs"
                        :key="spec.additionalServiceEntryId">
                        {{ spec.additionalServiceName }}:
                        <template v-if="spec.weightTo">up to {{ spec.weightTo }} {{ spec.weightUnit }}</template>
                        <template v-if="spec.weightFrom && !spec.weightTo">from {{ spec.weightFrom }} {{ spec.weightUnit }}</template>
                    </span>
                </div>
                <div class="spec-drawer-divider"></div>

                <!-- Available add-ons -->
                <div class="spec-section">
                    <h3 class="spec-section-title">Available add-ons</h3>
                    <pn-accordion single="true">
                        <pn-accordion-row label="General add-ons">
                            <div class="spec-addon-chips">
                                <template v-if="uniqueAddons.length">
                                    <span
                                        class="spec-chip"
                                        v-for="addon in uniqueAddons"
                                        :key="addon.additionalServiceId"
                                    >{{ addon.additionalServiceName }}</span>
                                </template>
                                <span v-else class="spec-chip-empty">–</span>
                            </div>
                        </pn-accordion-row>

                        <!--First mile add-ons-->
                        <pn-accordion-row label="First mile add-ons">
                            <div class="spec-addon-chips">
                                <span class="spec-chip-empty">–</span>
                            </div>
                        </pn-accordion-row>

                        <!--Last mile add-ons-->
                        <pn-accordion-row label="Last mile add-ons">
                            <div class="spec-addon-chips">
                                <span class="spec-chip-empty">–</span>
                            </div>
                        </pn-accordion-row>
                    </pn-accordion>
                </div>

                <div class="spec-drawer-divider"></div>

            </div>

            <!-- Footer -->
            <div class="spec-drawer-footer">
                <div @click="close">
                    <pn-button
                        label="Close"
                        appearance="light"
                        variant="outlined"
                    ></pn-button>
                </div>
                <pn-button
                    label="Print"
                    appearance="light"
                    variant="outlined"
                    icon-placement="left"
                    icon='&lt;svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"&gt;&lt;path fill="#000" fill-rule="evenodd" d="M7 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h1a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-1v3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h1zm2 0v3h6V3zm-3 5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1v-2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zm2 9v3h6v-3z" clip-rule="evenodd"/&gt;&lt;/svg&gt;'
                ></pn-button>
            </div>

        </div>
    </div>

</template>
