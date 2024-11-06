<script lang="ts">
    export let timeValue: number, timeValuePct: number, strokeColor: string;

    let svgWidth: number = 300;

    let strokeWidth = 8;
    $: radius = (svgWidth / 2) - (strokeWidth / 2);
    $: dashArray = 2 * Math.PI * radius;
    $: dashOffset = dashArray - dashArray * (timeValuePct - Math.floor(timeValuePct));
</script>

<div bind:clientWidth={svgWidth} class="w-auto aspect-square relative">
    <span class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-2xl lg:text-4xl">{timeValue}</span>
    <svg class="w-full h-full">
        <circle
                class="fill-transparent -rotate-90 origin-center [stroke-linecap:round] [transition:stroke-dashoffset_250ms_ease-in-out]"
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
                stroke-width="{strokeWidth / 1.5}px"
        />
    </svg>
</div>