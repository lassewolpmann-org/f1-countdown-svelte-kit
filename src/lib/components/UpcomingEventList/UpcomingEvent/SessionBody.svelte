<script lang="ts">
    export let date: string | undefined, time: string | undefined, endTime: string | undefined, tbc: boolean;
</script>
<style lang="scss">
    .body {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .date {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            .day {
                color: #ff4444;
                font-weight: 600;
            }
        }

        .tbc {
            color: var(--main-text-color);
            font-size: 14px;
            font-weight: 600;
            background: #666;
            padding: 4px 8px;
            border-radius: 5px;
        }
    }

    @media only screen and (max-width: 768px) {
        .body {
            .tbc {
                font-size: 12px;
            }
        }
    }
</style>
<div class="body">
    <div class="date">
        <span class="day">{date}</span>
        <span class="time">{time} - {endTime}</span>
    </div>
    {#if tbc}
        <span class="tbc">TBC</span>
    {/if}
</div>