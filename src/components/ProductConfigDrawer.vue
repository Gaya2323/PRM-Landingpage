
<script setup lang="ts">
    import { computed } from 'vue'

    interface TableRow {
        id: number
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
</script>

<template>

    <!-- Overlay -->
    <div
        class="spec-drawer-overlay"
        v-if="row"
        @click="close"
    ></div>

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
                            <span class="spec-dim-label">Parcel girth:<br>up to 3 m</span>
                        </div>
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
                            <span class="spec-dim-bottom">Lenght: 5 cm - 2 m</span>
                        </div>
                        <div class="spec-dim-right">
                            <span class="spec-dim-label">Height:<br>5 cm - 2 m</span>
                            <span class="spec-dim-label">Width: 5 cm - 2 m</span>
                        </div>
                    </div>
                </div>

                <div class="spec-drawer-divider"></div>

                <!-- Max weight -->
                <div class="spec-section">
                    <h3 class="spec-section-title">Max weight</h3>
                    <div class="spec-weight-row">
                        <span>Nordics: up to 35 kg</span>
                        <span>Outside Nordics: up to 31,5 kg</span>
                    </div>
                </div>

                <div class="spec-drawer-divider"></div>

                <!-- Available add-ons -->
                <div class="spec-section">
                    <h3 class="spec-section-title">Available add-ons</h3>
                    <pn-accordion single="true">
                        <pn-accordion-row label="General add-ons">
                            <div class="spec-addon-chips">
                                <template v-if="generalAddons.length">
                                    <span
                                        class="spec-chip"
                                        v-for="addon in generalAddons"
                                        :key="addon"
                                    >{{ addon }}</span>
                                </template>
                                <span v-else class="spec-chip-empty">–</span>
                            </div>
                        </pn-accordion-row>
                        <pn-accordion-row label="First mile add-ons">
                            <div class="spec-addon-chips">
                                <span class="spec-chip-empty">–</span>
                            </div>
                        </pn-accordion-row>
                        <pn-accordion-row label="Last mile add-ons">
                            <div class="spec-addon-chips">
                                <span class="spec-chip-empty">–</span>
                            </div>
                        </pn-accordion-row>
                    </pn-accordion>
                </div>

                <div class="spec-drawer-divider"></div>

                <!-- Forbidden add-ons -->
                <div class="spec-section spec-section--last">
                    <h3 class="spec-section-title">Forbidden add-ons</h3>
                    <div class="spec-addon-chips">
                        <span
                            class="spec-chip spec-chip--forbidden"
                            v-for="addon in forbiddenAddons"
                            :key="addon"
                        >{{ addon }}</span>
                    </div>
                </div>

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
