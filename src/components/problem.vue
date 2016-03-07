<style lang="stylus">
  @import "global.styl"

  .problem
    display flex
    width 600px
    max-width calc(100% - 16px)
    box-sizing border-box
    flex-direction row
    flex-wrap wrap
    justify-content space-around
    margin 10px auto 0 auto
    material-shadow(1)
    padding 20px

    &__input
    &__word
      margin 8px 0

    &__word
      flex-basis 240px

</style>

<template>
  <div class="problem">
    <kanji-input v-bind:size="240" class="problem__input" v-bind:kanji="kanji" v-bind:show-guide="showGuide"></kanji-input>
    <word class="problem__word" v-bind:data="word" v-bind:index="kanjiIndex"></word>
  </div>
</template>

<script>
  import KanjiInput from './kanji-input.vue';
  import Word from './word.vue';

  export default {
    props: {
      word: Object
    },

    data: function() {
      return {
        kanjiIndex: 0,
        errors: 0,
        showGuide: false
      };
    },

    computed: {
      kanji: function() {
        return this.word.japanese.charAt(this.word.test[this.kanjiIndex]);
      }
    },

    methods: {
      onFinish: function(event) {
        this.kanjiIndex++;
        this.errors = 0;
        this.showGuide = false;

        this.$dispatch('points', event.points);

        if (this.kanjiIndex >= this.word.test.length) {
          this.$dispatch('problem-done', {word: this.word});
        }
      },

      onSuccess: function() {
        this.errors = 0;
      },

      onError: function() {
        this.errors++;

        if (this.errors === 5) {
          this.showGuide = true;
        }
      }
    },

    events: {
      'finish': 'onFinish',
      'error': 'onError',
      'success': 'onSuccess'
    },

    components: {
      'kanji-input': KanjiInput,
      'word': Word
    },
  };
</script>
