<style lang="stylus">
  @import "global.styl"

  .game
    &__problem
      position absolute
      left 50%
      transform translate3d(100%, 0, 0)
      transition all 0.2s linear
      transition-delay 0.3s
      opacity 0

      &--active
        opacity 1
        transform translate3d(-50%, 0, 0)

      &--done
        opacity 0
        transform translate3d(-200%, 0, 0)
</style>

<template>
  <div class="game">
    <problem v-for="word in problems"
             class="game__problem"
             v-bind:class="{
               'game__problem--active': $index === this.index,
               'game__problem--done': $index < this.index
             }"
             v-bind:word="word">
    </problem>
  </div>
</template>

<script>
  import Problem from './problem.vue';

  export default {
    data: function() {
      return {
        problems: [
        {
          japanese: '木',
          english: 'Tree',
          test: [0],
          furigana: {
            0: 'き'
          }
        },
        {
          japanese: '桜ん坊',
          english: 'Cherry',
          test: [0, 2],
          furigana: {
            0: 'さくら',
            2: 'ぼう'
          }
        },
        {
          japanese: '東京',
          english: 'Tokyo',
          test: [0, 1],
          furigana: {
            0: 'とう',
            1: 'きょう'
          }
        }],
        index: 0
      };
    },

    computed: {
      word: function() {
        return this.problems[this.index];
      },
      kanji: function() {
        return this.word.japanese.charAt(this.word.test[this.kanjiIndex]);
      }
    },

    methods: {
      onDone: function() {
        this.index++;
      }
    },

    events: {
      'problem-done': 'onDone'
    },

    components: {
      'problem': Problem
    },
  };
</script>
