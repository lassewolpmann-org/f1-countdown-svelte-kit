<script lang="ts">
    // Type imports
    import type { RaceData } from "$lib/types/RaceData";

    interface Props {
        nextRace: RaceData;
        flags: {[key: string]: string};
    }

    let { nextRace, flags }: Props = $props();
    let flag = $derived(flags[nextRace.localeKey]);
</script>
<span class="text-3xl lg:text-5xl font-medium w-full">{flag} {nextRace.name}</span>