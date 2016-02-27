<style lang="stylus">
  @import "global.styl"

  .word
    display flex
    flex-direction column
    justify-content flex-start

    &__japanese
      display flex
      flex-direction row
      justify-content center

    &__character
      display flex
      flex-direction column

    &__kanji
      font-size 36px
      font-weight 200px
      padding 0 6px
      margin 1px
      transition all 0.3s linear
      color inherit
      text-align center

      &--test
        background-color rgba(0, 0, 0, 0.05)

      &--hidden
        color transparent

    &__furigana
      text-align center
      font-size 16px

    &__english
      margin 10px auto 0 auto
      font-size 32px
</style>

<template>
  <div class="word">
    <div class="word__japanese">
      <div v-for="kanji in data.japanese"
           class="word__character">
        <span class="word__kanji"
              v-bind:class="{
                'word__kanji--test': this.data.test.indexOf($index) >= 0,
                'word__kanji--hidden': isHidden($index)
              }">
          {{ kanji }}
        </span>
        <span v-if="data.furigana[$index]"
              class="word__furigana">
          {{ data.furigana[$index] }}
        </span>
      </div>
    </div>
    <div class="word__english">
      {{ data.english }}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['data', 'index'],

    computed: {
    },

    methods: {
      isHidden: function(i) {
        const index = this.data.test.indexOf(i);

        return index >= this.index;
      }
    }
  };
</script>
