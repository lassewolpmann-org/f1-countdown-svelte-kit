<script lang="ts">
    let formExpanded: boolean, hasGivenFeedback: boolean;
</script>
<style lang="scss">
    .feedback-form {
        position: fixed;
        bottom: 0;
        right: 0;
        margin: 20px;

        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-direction: column-reverse;

        gap: 15px;

        .form {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            background: var(--table-row-primary-color);

            border: var(--border);
            border-radius: 10px;

            padding: 10px;

            text-align: center;
        }

        .form.expanded {
            display: flex;

            .buttons {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                gap: 10px;
                padding-bottom: 10px;

                button:first-child {
                    color: green;
                }

                button:last-child {
                    color: red;
                }
            }
        }
    }
</style>
{#if !hasGivenFeedback}
    <div class="feedback-form">
        <button on:click={() => formExpanded = !formExpanded}><i class="fa-solid fa-message-smile"></i></button>
        <div class:expanded={formExpanded} class="form">
            <h3>Did you find this website helpful?</h3>
            <div class="buttons">
                <button on:click={() => hasGivenFeedback = true} class="plausible-event-name=Good"><i class="fa-solid fa-thumbs-up"></i></button>
                <button on:click={() => hasGivenFeedback = true} class="plausible-event-name=Bad"><i class="fa-solid fa-thumbs-down"></i></button>
            </div>
        </div>
    </div>
{/if}