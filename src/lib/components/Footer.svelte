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

                gap: 6px;
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
            <h4>Made with️ ❤️ by Lasse Wolpmann</h4>
        </div>
        <div>
            <h4>Project links</h4>
            <a href="https://github.com/lassewolpmann-org/{seriesName}-countdown-svelte-kit" target="_blank">
                Code
            </a>
            <a href="https://github.com/lassewolpmann-org/{seriesName}-countdown-svelte-kit/blob/main/LICENSE.md" target="_blank">
                License
            </a>
            <a href="mailto:lasse@f1-countdown.com">Contact</a>
            <a href="/privacy-policy" target="_blank">Privacy Policy</a>
        </div>
        <div>
            <h4>Data sources</h4>
            <a href="https://github.com/sportstimes/f1" target="_blank">
               sportstimes
            </a>
            <a href="https://github.com/sportstimes/f1/blob/main/LICENSE" target="_blank">
                License
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
