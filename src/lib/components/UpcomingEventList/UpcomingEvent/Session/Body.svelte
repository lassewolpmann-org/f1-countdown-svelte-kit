<script lang="ts">
    export let date: string | undefined, time: string | undefined;
</script>
<style lang="scss">
    .body {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .weather {
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
        }

        .date {
            flex: 2;

            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            .day {
                font-weight: 500;
            }

            .time {
                font-weight: 300;
            }
        }
    }
</style>
<div class="body">
    <div class="date">
        <span class="day"><i class="fa-solid fa-calendar-day"></i> {date}</span>
        <span class="time"><i class="fa-solid fa-clock"></i> {time}</span>
    </div>
</div>