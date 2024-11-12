<script lang="ts">
    import type { PrettySession } from "$lib/types/RaceData";

    interface Props {
        session: PrettySession
    }

    let { session }: Props = $props();
</script>
<div class="flex-col-start w-max">
    <span>{session.startDateLocaleString}</span>
    <span>{session.startTimeLocaleString} - {session.endTimeLocaleString}</span>
</div>