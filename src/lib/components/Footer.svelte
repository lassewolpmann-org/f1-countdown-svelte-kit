<script lang="ts">
    export let seriesName: string;
</script>
<style lang="scss">
    footer {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .legal {
            font-size: 14px;
            color: var(--secondary-text-color);
        }

        .links, .legal {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: row;

            padding: 50px;
            gap: 50px;

            div {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
            }
        }
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
            align-items: flex-start;

            .links, .legal {
                flex-direction: column;
                gap: 10px;
            }
        }
    }
</style>

<footer>
    <div class="links">
        <div>
            <h4>Made with <i class="fa-solid fa-heart" style="color: red"></i> by Lasse Wolpmann</h4>
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
            <a href="https://testflight.apple.com/join/1m7CChtW" target="_blank">
                <i class="fa-brands fa-apple"></i> App Beta Test
            </a>
            <a href="https://github.com/lassewolpmann-org/{seriesName}-countdown-svelte-kit" target="_blank">
                <i class="fa-brands fa-github"></i> Code
            </a>
            <a href="https://github.com/lassewolpmann-org/{seriesName}-countdown-svelte-kit/blob/main/LICENSE.md" target="_blank">
                <i class="fa-solid fa-scale-balanced"></i> License
            </a>
            <a href="mailto:lasse@f1-countdown.com">
                <i class="fa-solid fa-envelope"></i> Contact
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
        </div>
    </div>
    <div class="legal">
        <section>
            <p>This website is unofficial and is not associated in any way with the Formula 1 companies.</p>
            <p>F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V.</p>
        </section>
    </div>
</footer>
