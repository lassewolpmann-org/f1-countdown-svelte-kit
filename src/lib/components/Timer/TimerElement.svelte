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

            this.diameter = this.windowWidth <= 1024 ? 135 : 270;
            this.strokeWidth = this.windowWidth <= 1024 ? 6 : 12;
            this.radius = this.diameter / 2 - (this.strokeWidth / 2);
            this.dashArray =  2 * Math.PI * this.radius;
            this.dashOffset = this.dashArray - this.dashArray * this.timeValuePct;
        }
    }

    export let timeValue: number, timeValuePct: number, strokeColor: string;

    let svgWidth: number = 300;

    let strokeWidth = 6;
    $: radius = (svgWidth / 2) - (strokeWidth / 2);
    $: dashArray = 2 * Math.PI * radius;
    $: dashOffset = dashArray - dashArray * (timeValuePct - Math.floor(timeValuePct));

    $: console.log(radius, dashArray, dashOffset)
</script>

<style lang="scss">
  /*
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

    @media only screen and (max-width: 1024px) {
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

   */
  span {
    transform: translate(-50%, -50%);
  }

  circle {
    stroke-linecap: round;
    transition: stroke-dashoffset 250ms ease-in-out;
  }
</style>

<div bind:clientWidth={svgWidth} class="max-w-32 w-auto aspect-square relative">
    <span class="absolute top-1/2 left-1/2 transform lg:text-2xl">{timeValue}</span>
    <svg class="w-full h-full">
        <circle
                class="fill-transparent -rotate-90 origin-center"
                cx="50%"
                cy="50%"
                r="{radius}px"
                stroke="{strokeColor}"
                stroke-width="{strokeWidth}px"
                stroke-dasharray="{dashArray}px"
                stroke-dashoffset="{dashOffset}px"
        />
        <circle
                class="fill-transparent opacity-50"
                cx="50%"
                cy="50%"
                r="{radius}px"
                stroke="{strokeColor}"
                stroke-width="{strokeWidth}px"
        />
    </svg>
</div>