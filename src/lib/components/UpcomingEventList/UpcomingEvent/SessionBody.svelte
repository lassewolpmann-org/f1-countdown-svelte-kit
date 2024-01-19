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

            .day, .time {
                i {
                    color: var(--secondary-text-color);
                    width: 20px;
                    padding-right: 3px;
                }
            }

            .day {
                font-weight: 500;
            }

            .time {
                font-weight: 300;
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
        <span class="day"><i class="fa-solid fa-calendar-day"></i> {date}</span>
        <span class="time"><i class="fa-solid fa-clock"></i> {time} - {endTime}</span>
    </div>
    {#if tbc}
        <span class="tbc">TBC</span>
    {/if}
</div>