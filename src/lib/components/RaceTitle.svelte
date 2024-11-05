<script lang="ts">
    // Type imports
    import type { RaceData } from "$lib/types/RaceData";

    export let nextRace: RaceData, flags: {[key: string]: string};
    let flag = flags[nextRace.localeKey];
</script>
<span class="text-3xl lg:text-5xl font-medium">{flag} {nextRace.name}</span>