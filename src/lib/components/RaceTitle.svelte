<script lang="ts">
    // Type imports
    import type { RaceData } from "$lib/types/RaceData";

    interface Props {
        nextRace: RaceData;
    }

    let { nextRace }: Props = $props();
</script>
<span class="text-3xl lg:text-5xl font-medium w-full">{nextRace.flag} {nextRace.name}</span>