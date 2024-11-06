<script lang="ts">
    export let date: string | undefined, time: string | undefined, endTime: string | undefined, tbc: boolean;
</script>
<div class="flex flex-col w-max">
    <span>{date}</span>
    <span>{time} - {endTime}</span>
</div>