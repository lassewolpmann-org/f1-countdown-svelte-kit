<script>
    import { page } from '$app/stores';
</script>

<div class="flex-col-items-start p-12">
    <h1>Whoops, something has gone wrong!</h1>
    {#if $page.error}
        <h2><span class="text-red-600">Error message: </span>{$page.error.message}</h2>
    {/if}
    <h3>Until we resolve the issue, just sit back and relax.</h3>
</div>