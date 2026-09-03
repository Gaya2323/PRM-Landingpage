<script setup lang="ts">


</script>


<template>
    <section class="faq-section" data-testid="faq-section">

        <!--ICON FAQ -->
        <div class="faq-icon-row">
            <img src="../assets/images/various-white-background-letterbox-reply-letter-plants-removebg.png"  alt="FAQ Illustration" class="faq-icon"/>
        
        </div>

        <!--Content left+ right FAQ --->
        <div class="faq-content">

            <!--Left Column-->
            <div class="faq-left">
                <span class="faq-label">FAQ</span>
                <h2 class="faq-title">Need help getting started with PRM?</h2>
            </div>

            <!--Right Column: accordion -->
            <div class="faq-accordion">
                <pn-accordion class="faq-accordion-group">
                <pn-accordion-row label="What is PRM and when should I use it?"></pn-accordion-row>
                <pn-accordion-row label="How do I find the correct specification?"></pn-accordion-row>
                <pn-accordion-row label="Which countries are covered in PRM?"></pn-accordion-row>
                <pn-accordion-row label="How do I know which specification applies to my customer?"></pn-accordion-row>
                <pn-accordion-row label="I can't find what I'm looking for. What should I do?"></pn-accordion-row>
                </pn-accordion>
            </div>

        </div>


    </section>
</template>