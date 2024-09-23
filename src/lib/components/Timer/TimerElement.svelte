<script lang="ts">
    class TimerElement {
        windowWidth: number;
        timeValuePct: number;
        diameter: number;
        strokeWidth: number;
        radius: number;
        dashArray: number;
        dashOffset: number;

        constructor(windowWidth: number, timeValuePct: number) {
            this.timeValuePct = timeValuePct - Math.floor(timeValuePct);
            this.windowWidth = windowWidth;

            this.diameter = this.windowWidth < 768 ? 135 : 270;
            this.strokeWidth = this.windowWidth < 768 ? 6 : 12;
            this.radius = this.diameter / 2 - (this.strokeWidth / 2);
            this.dashArray =  2 * Math.PI * this.radius;
            this.dashOffset = this.dashArray - this.dashArray * this.timeValuePct;
        }
    }

    export let timeValue: number, timeValuePct: number, timeUnit: string, strokeColor: string;

    let innerWidth: number = 768;

    let timerElement: TimerElement = new TimerElement(innerWidth, timeValuePct);
    $: timerElement = new TimerElement(innerWidth, timeValuePct);
</script>

<style lang="scss">
    .timer, svg {
        width: 270px;
        height: 270px;
    }

    .timer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .time {
        font-weight: bold;
        font-size: 60px;
    }

    .text {
        color: var(--secondary-text-color);
        font-size: 24px;
    }

    svg {
        position: absolute;

        circle {
            fill: transparent;
        }

        .countdown-circle {
            stroke-linecap: round;
            transform: rotate(270deg);
            transform-origin: center;
            transition: stroke-dashoffset 250ms ease-in-out;
        }

        .fill-circle {
            opacity: 0.2;
        }
    }

    @media only screen and (max-width: 768px) {
        .timer, svg {
            width: 135px;
            height: 135px;
        }

        .time {
            font-size: 36px;
        }

        .text {
            font-size: 16px;
        }
    }
</style>

<svelte:window bind:innerWidth />
<div class="timer" data-nosnippet>
    <svg>
        <circle
                class="countdown-circle"
                cx="50%"
                cy="50%"
                r="{timerElement.radius}px"
                stroke="{strokeColor}"
                stroke-width="{timerElement.strokeWidth}"
                stroke-dasharray="{timerElement.dashArray}"
                stroke-dashoffset="{timerElement.dashOffset}"
        />
        <circle
                class="fill-circle"
                cx="50%"
                cy="50%"
                r="{timerElement.radius}px"
                stroke="{strokeColor}"
                stroke-width="{timerElement.strokeWidth}"
        />
    </svg>
    <span class="time">{timeValue}</span>
    <span class="text">{timeUnit}</span>
</div>