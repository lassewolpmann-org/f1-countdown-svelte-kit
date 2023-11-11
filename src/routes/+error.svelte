<script>
    import { page } from '$app/stores';
</script>

<style lang="scss">
    .error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding: 50px;

        h2 {
            span {
                color: red;
            }
        }
    }
</style>

<div class="error">
    <h1>Whoops, something has gone wrong!</h1>
    {#if $page.error}
        <h2><span>Error message: </span>{$page.error.message}</h2>
    {/if}
    <h3>Until we resolve the issue, just sit back and relax.</h3>
</div>