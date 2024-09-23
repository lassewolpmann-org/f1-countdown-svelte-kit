<script lang="ts">
    class Timer {
        private readonly nextEventSessions: { [key: string]: string };
        private readonly currentSessionIndex: number;

        public timerInterval: any;

        public delta: number;

        public deltaDays: number = 0;
        public deltaHours: number = 0;
        public deltaMinutes: number = 0;
        public deltaSeconds: number = 0;

        public deltaDaysPct: number = 0;
        public deltaHoursPct: number = 0;
        public deltaMinutesPct: number = 0;
        public deltaSecondsPct: number = 0;

        constructor(nextEventSessions: { [key: string]: string }, currentSessionIndex: number) {
            this.nextEventSessions = nextEventSessions;
            this.currentSessionIndex = currentSessionIndex;
            this.delta = this.calculateDelta();
        }

        calculateDelta = ()  => {
            const nextEventSessionDates: string[] = Object.values(this.nextEventSessions);
            const nextSessionTime: string | undefined = nextEventSessionDates.at(this.currentSessionIndex);

            let nextSessionTimestamp: number = 0;
            if (nextSessionTime) nextSessionTimestamp = new Date(nextSessionTime).getTime();

            this.delta = this.calculateDeltaInSeconds(nextSessionTimestamp);

            this.deltaDays = Math.floor(this.delta / 86400);
            this.deltaHours = Math.floor(this.delta % 86400 / 3600);
            this.deltaMinutes = Math.floor(this.delta % 86400 % 3600 / 60);
            this.deltaSeconds = Math.floor(this.delta % 86400 % 3600 % 60);

            this.deltaDaysPct = (this.delta / 86400) / 7;
            this.deltaHoursPct = (this.delta % 86400 / 3600) / 24;
            this.deltaMinutesPct = (this.delta % 86400 % 3600 / 60) / 60;
            this.deltaSecondsPct = (this.delta % 86400 % 3600 % 60) / 60;

            return this.delta
        }

        calculateDeltaInSeconds = (nextSessionTimestamp: number) => {
            let delta: number = Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000);

            if (Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000) <= 0) {
                delta = 0
            }

            return delta
        }
    }

    // Component imports
    import TimerElement from "$lib/components/Timer/TimerElement.svelte";

    // Store imports
    import { currentSessionIndex } from "$lib/stores/currentSessionIndex";

    // Function imports
    import { onDestroy } from "svelte";

    export let nextEventSessions: { [key: string]: string };

    let timer = new Timer(nextEventSessions, $currentSessionIndex);

    timer.timerInterval = setInterval(() => {
        timer.delta = timer.calculateDelta();
    }, 1000)

    // Create a new timer object when either the sessions or session index update
    $: timer = new Timer(nextEventSessions, $currentSessionIndex);

    onDestroy(() => {
        clearInterval(timer.timerInterval);
    })
</script>

<style>
    .timer, .timer-elements {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .timer {
        flex-direction: column;
        margin: 30px 0;
    }

    .timer-elements {
        flex-direction: row;
        gap: 50px;
    }

    @media only screen and (max-width: 768px) {
        .timer-elements {
            gap: 25px;
        }
    }
</style>


<div class="timer">
    <div class="timer-elements" data-nosnippet>
        <TimerElement timeValue={timer.deltaDays} timeValuePct={timer.deltaDaysPct} timeUnit="days" strokeColor="rgb(234, 53, 19)"/>
        <TimerElement timeValue={timer.deltaHours} timeValuePct={timer.deltaHoursPct} timeUnit="hours" strokeColor="rgb(244, 200, 68)"/>
        <TimerElement timeValue={timer.deltaMinutes} timeValuePct={timer.deltaMinutesPct} timeUnit="minutes" strokeColor="rgb(232, 232, 228)"/>
        <TimerElement timeValue={timer.deltaSeconds} timeValuePct={timer.deltaSecondsPct} timeUnit="seconds" strokeColor="rgb(57, 97, 164)"/>
    </div>
</div>
