<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";
    import Border from "$lib/components/Border.svelte";
    import MetaDescription from "$lib/components/MetaDescription.svelte";
    import "../app.css";

    import type { LayoutData } from './$types';

    export let data: LayoutData;

    const { apiData } = data;
</script>

<svelte:head>
    <title>Formula Countdown</title>
    <meta name="apple-itunes-app" content="app-id=6472580786">
</svelte:head>
{#if apiData}
    <MetaDescription {apiData} />
    <slot></slot>
    <Border />
    <Footer />
{/if}