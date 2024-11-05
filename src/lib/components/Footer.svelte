<script lang="ts">
    export let seriesName: string;
</script>
<style lang="scss">
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

<footer class="p-10 flex flex-col gap-6">
    <div class="flex flex-col gap-4">
        <div class="flex flex-col">
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
        <div class="flex flex-col">
            <h4>Data sources</h4>
            <a href="https://github.com/sportstimes/f1" target="_blank">
               sportstimes
            </a>
            <a href="https://github.com/sportstimes/f1/blob/main/LICENSE" target="_blank">
                License
            </a>
        </div>
    </div>
    <span class="text-xs text-neutral-400">Made with️ ❤️ by Lasse Wolpmann</span>
    <div class="text-xs text-neutral-500">
        <section>
            <p>This website is unofficial and is not associated in any way with the Formula 1 companies.</p>
            <p>F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V.</p>
        </section>
    </div>
</footer>
