<script lang="ts">
    export let seriesName: string;
</script>
<style>
    footer {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: row;

        padding: 50px;
        gap: 50px;
    }

    .fa-heart {
        color: red;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    h4 {
        font-weight: 600;
    }

    @media only screen and (max-width: 768px) {
        footer {
            flex-direction: column;
            gap: 10px;
        }
    }
</style>

<footer>
    <div>
        <h4>Made with <i class="fa-solid fa-heart"></i><br>by Lasse Wolpmann</h4>
    </div>
    <div>
        <h4>All series</h4>
        <a href="https://f1-countdown.com">
            <i class="fa-solid fa-timer"></i> Formula 1
        </a>
        <a href="https://f2-countdown.com">
            <i class="fa-solid fa-timer"></i> Formula 2
        </a>
        <a href="https://f3-countdown.com">
            <i class="fa-solid fa-timer"></i> Formula 3
        </a>
    </div>
    <div>
        <h4>Project links</h4>
        <a href="https://github.com/lassewolpmann-org/{seriesName}-countdown-svelte-kit" target="_blank">
            <i class="fa-brands fa-github"></i> Code
        </a>
        <a href="https://github.com/lassewolpmann-org/{seriesName}-countdown-svelte-kit/blob/main/LICENSE.md" target="_blank">
            <i class="fa-solid fa-scale-balanced"></i> License
        </a>
        <a href="mailto:lasse@f1-countdown.com">
            <i class="fa-solid fa-envelope"></i> Feedback
        </a>
        <a href="/privacy-policy" target="_blank">
            <i class="fa-solid fa-cookie-bite"></i> Privacy Policy
        </a>
    </div>
    <div>
        <h4>Data sources</h4>
        <a href="https://github.com/sportstimes/f1" target="_blank">
            <i class="fa-brands fa-github"></i> sportstimes
        </a>
        <a href="https://github.com/sportstimes/f1/blob/main/LICENSE" target="_blank">
            <i class="fa-solid fa-scale-balanced"></i> License
        </a>
        <a href="https://openweathermap.org/api" target="_blank">
            <i class="fa-solid fa-cloud"></i> OpenWeatherMap
        </a>
    </div>
</footer>
