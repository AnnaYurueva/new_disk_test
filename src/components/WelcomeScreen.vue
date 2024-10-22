<template>
    <main class="intro">
        <div class="intro-desc">
            <h1>Мои <br> заметки</h1>
            <h3>Не забывай о важном, <br> храни его в облаке.</h3>
        </div>
        <div>
            <img class="intro-img" src="@/assets/images/intro.png" alt="">
        </div>
    </main>
</template>

<style scoped lang="scss">
.intro {
    display: flex;
    align-items: center;

    &-img {
        width: 100%;
    }

    &-desc {
        display: flex;
        flex-direction: column;
    }

    @include desktop {
        gap: 60px;
        margin: 0 160px;
    }

    @include laptop {
        margin: 0 80px;
    }

    @media (min-width: ($bp-laptop - 1px)) {
        flex-direction: row;

        &-desc {
            text-align: left;
            gap: 40px;
        }
    }

    @media (max-width: ($bp-laptop - 1px)) {
        flex-direction: column;

        &-desc {
            text-align: center;
            gap: 20px;
        }
    }

    @include tablet {
        margin: 0 40px;
    }

    @include mobile {
        margin: 0 20px;
    }
}
</style>