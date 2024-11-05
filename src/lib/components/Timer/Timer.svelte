<script lang="ts">
    class Timer {
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

        constructor(sessionDate: string | undefined) {
            this.delta = this.calculateDelta(sessionDate);
        }

        calculateDelta = (sessionDate: string | undefined)  => {
            if (!sessionDate) return 0

            let nextSessionTimestamp: number = new Date(sessionDate).getTime();

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

    // Function imports
    import { onDestroy } from "svelte";

    export let sessionName: string, sessionDate: string | undefined;

    let timer = new Timer(sessionDate);

    timer.timerInterval = setInterval(() => {
        timer.delta = timer.calculateDelta(sessionDate);
    }, 1000)

    onDestroy(() => {
        clearInterval(timer.timerInterval);
    })
</script>

<div class="flex flex-col items-start justify-center m-3 gap-1 bg-neutral-900 rounded-xl p-2">
    <h1 class="text-lg font-medium">{sessionName.toUpperCase()}</h1>
    <div class="grid grid-cols-4 gap-3">
        <TimerElement timeValue={timer.deltaDays} timeValuePct={timer.deltaDaysPct} strokeColor="rgb(234, 53, 19)"/>
        <TimerElement timeValue={timer.deltaHours} timeValuePct={timer.deltaHoursPct} strokeColor="rgb(244, 200, 68)"/>
        <TimerElement timeValue={timer.deltaMinutes} timeValuePct={timer.deltaMinutesPct} strokeColor="rgb(232, 232, 228)"/>
        <TimerElement timeValue={timer.deltaSeconds} timeValuePct={timer.deltaSecondsPct} strokeColor="rgb(57, 97, 164)"/>
    </div>
    <div class="grid grid-cols-4 gap-3 w-full text-center text-xs lg:text-lg text-neutral-400">
        <span>days</span>
        <span>hours</span>
        <span>minutes</span>
        <span>seconds</span>
    </div>
</div>

