
<script setup lang="ts">
    import { useRouter } from 'vue-router'

    const router = useRouter()

</script>



<template>
    <section class="explore-section" data-testid="explore-section">
        <h2 class="explore-title">Explore product areas</h2>

        <div class="explore-cards">
            
            <!--1st CARD -->

            <div @click.prevent="router.push('/product-configuration')">
                <pn-card label="Parcel products" text="Domestic and international parcel services."
                    aspect-ratio="278/170"
                    href="#"
                    href-label="Explore parcel products">

                    <!--Image Woman holding parcel and coffee-->
                    <img src="../assets/images/Woman-drinking-coffee-holding-parcel.jpg" alt="Parcel products" slot="image"/>
                </pn-card>

            </div>
            

            <!--2 nd CARD -->

            <div @click.prevent="router.push('/product-configuration')">
                <pn-card label="Letter products" text="Mail products and related services."
                    aspect-ratio="278/170"
                    href-label="Explore letter products"
                    href="#">

                    <!--Image Woman holding a dog arriving home-->
                    <img src="../assets/images/20230601-postnord-1561_v2x.jpg"
                    alt="Letter products"
                    slot="image"/>
                </pn-card>

            </div>
            

            <!--3rd CARD-->
            <pn-card label="Logistics" text="Transport and logistics solutions."
                aspect-ratio="278/170"
                href="#"
                href-label="Explore logistics">
            
            <!--Image Postnord van driver comes out-->        
            <img
                src="../assets/images/20260601-coworker-deliver-parcel.jpg"
                alt="Logistics"
                slot="image"/>
            </pn-card>

            <!--4 th CARD-->
            <pn-card
                label="Add-on products"
                text="Additional services and product enhancements."
                aspect-ratio="278/170"
                href="#"
                href-label="Explore add-ons">

            <!--Image Man reading from the cellphone-->  
            <img
               src="../assets/images/Man-with-dog-ordering.jpg"
                alt="Add-on products"
                slot="image"/>
            </pn-card>

        </div>

        <div class="explore-divider"></div>
    </section>
</template>