<script lang="ts">
    // Component imports
    import TimerElement from "$lib/components/Timer/TimerElement.svelte";

    // Function imports
    import type { PrettySession } from "$lib/types/RaceData";

    interface Props {
        session: PrettySession
        timestamp: number
    }

    let { session, timestamp }: Props = $props();

    let delta = $derived.by(() => {
        let sessionTimestamp = Math.floor(session.startDate.getTime() / 1000)
        let delta = sessionTimestamp - timestamp

        return delta >= 0 ? delta : 0
    })

    let days = $derived(Math.floor(delta / 86400))
    let daysPct = $derived(days / 7)
    let hours = $derived(Math.floor(delta % 86400 / 3600))
    let hoursPct = $derived(hours / 24)
    let minutes = $derived(Math.floor(delta % 86400 % 3600 / 60))
    let minutesPct = $derived(minutes / 60)
    let seconds = $derived(Math.floor(delta % 86400 % 3600 % 60))
    let secondsPct = $derived(seconds / 60)
</script>

<div class="flex-col-center gap-2 lg:gap-4 bg-neutral-900 rounded-xl px-4 py-2 max-w-2xl">
    <h1 class="text-base lg:text-2xl font-semibold self-start">{session.longName}</h1>
    <div class="grid grid-cols-4 gap-3">
        <TimerElement timeValue={days} timeValuePct={daysPct} strokeColor="rgb(234, 53, 19)"/>
        <TimerElement timeValue={hours} timeValuePct={hoursPct} strokeColor="rgb(244, 200, 68)"/>
        <TimerElement timeValue={minutes} timeValuePct={minutesPct} strokeColor="rgb(232, 232, 228)"/>
        <TimerElement timeValue={seconds} timeValuePct={secondsPct} strokeColor="rgb(57, 97, 164)"/>
    </div>
    <div class="grid grid-cols-4 gap-3 w-full text-center text-xs lg:text-lg text-neutral-400">
        <span>days</span>
        <span>hours</span>
        <span>minutes</span>
        <span>seconds</span>
    </div>
</div>

