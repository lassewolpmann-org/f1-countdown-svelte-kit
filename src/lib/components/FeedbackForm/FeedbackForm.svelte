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

        form {
            display: none;
            height: min-content;
            width: 600px;
            background: var(--table-row-primary-color);

            border-radius: 10px;

            overflow-y: scroll;

            padding: 20px;

            textarea {
                resize: none;

                width: 100%;
                height: 100px;

                border-radius: 5px;
            }
        }

        form.expanded {
            display: block;
        }
    }
</style>
<div class="feedback-form">
    <button on:click={() => formExpanded = !formExpanded}><i class="fa-solid fa-message-smile"></i></button>
    <form class:expanded={formExpanded} id="feedback" method="POST" use:enhance on:submit={() => hasGivenFeedback = true}>
        {#if !hasGivenFeedback}
            <h4>Would you recommend this website to another person?</h4>
            <label for="yes">Yes</label>
            <input type="radio" id="yes" name="recommend" value="yes" required>

            <label for="no">No</label>
            <input type="radio" id="no" name="recommend" value="no" required>

            <h4>Do you have any feedback? (optional)</h4>
            <textarea form="feedback" placeholder="Your feedback" name="feedback" />

            <input type="submit">
        {:else}
            <p>Thank you for the feedback!</p>
        {/if}
    </form>
</div>