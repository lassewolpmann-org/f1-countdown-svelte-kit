<script lang="ts">
    interface Props {
        date: string | undefined;
        time: string | undefined;
        endTime: string | undefined;
    }

    let { date, time, endTime }: Props = $props();
</script>
<div class="flex flex-col w-max">
    <span>{date}</span>
    <span>{time} - {endTime}</span>
</div>