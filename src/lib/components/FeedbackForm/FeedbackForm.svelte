<script lang="ts">
    import { enhance } from '$app/forms';

    let formExpanded: boolean, hasGivenFeedback: boolean;
</script>
<style lang="scss">
    .feedback-form {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 20px;

        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-direction: column-reverse;

        gap: 15px;

        button {
            width: 60px;
            height: 60px;
            font-size: 24px;
        }

        div {
            display: none;
            height: min-content;
            width: min-content;
            background: var(--table-row-primary-color);

            border-radius: 10px;

            overflow-y: scroll;

            padding: 20px;
        }

        div.expanded {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            gap: 10px;
        }
    }
</style>
<div class="feedback-form">
    <button on:click={() => formExpanded = !formExpanded}><i class="fa-solid fa-message-smile"></i></button>
    <div class:expanded={formExpanded}>
        {#if !hasGivenFeedback}
            <button on:click={() => hasGivenFeedback = true} class="plausible-event-name=Good"><i class="fa-solid fa-thumbs-up"></i></button>
            <button on:click={() => hasGivenFeedback = true} class="plausible-event-name=Bad"><i class="fa-solid fa-thumbs-down"></i></button>
        {:else}
            <p>Thanks!</p>
        {/if}
    </div>
</div>