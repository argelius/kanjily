<style lang="stylus">
  .sentence__character
    display inline-block
    text-align center

  .sentence__character__kanji
    display inline-block
    border 1px solid black
    margin 0 2px
    height 24px
    width 24px

  .sentence__character__kanji__inner
    transform scale(1.0)
    transform-origin 50% 50%
    transition all 0.2s ease-in-out

  .sentence__character__kanji__inner--hidden
    transform scale(1.4)
    color transparent

  .sentence__character__furigana
    color initial
    text-align center
</style>

<template>
  <div class="sentence">
    <div
      class="sentence__character"
      v-for="character in characters">
        <ruby>
        <rb class="sentence__character__kanji">
          <span
            class="sentence__character__kanji__inner"
            v-bind:class="{
              'sentence__character__kanji__inner--hidden': isKanji($index) && this.kanjis.indexOf($index) >= index
            }">
            {{ character }}
          </span>
        </rb>
        <rp>(</rp>
        <rt class="sentence__character__furigana">{{ furigana[$index] }}</rt><rp>)</rp>
        </ruby>
      </div>
  </div>
</template>

<script>
  export default {
    props: ['japanese', 'kanjis', 'furigana', 'index'],

    computed: {
      characters: function() {
        return this.japanese.split('');
      }
    },

    methods: {
      isKanji: function(idx) {
        return this.kanjis.indexOf(idx) >= 0;
      }
    }
  }
</script>
