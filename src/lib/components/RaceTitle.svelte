<script lang="ts">
    // Type imports
    import type { RaceData } from "$lib/types/RaceData";

    export let nextRace: RaceData, flags: {[key: string]: string};
    $: flag = flags[nextRace.localeKey];
</script>
<span class="text-3xl lg:text-5xl font-medium w-full">{flag} {nextRace.name}</span>