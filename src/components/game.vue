<style lang="stylus">
  @import "global.styl"

  .game
    &__problem
      position absolute
      left 50%
      transform translate3d(50%, 0, 0)
      transition all 0.4s ease-out
      transition-delay 0.3s
      opacity 0

      &--active
        opacity 1
        transform translate3d(-50%, 0, 0)

      &--done
        opacity 0
        transform translate3d(-150%, 0, 0)
</style>

<template>
  <div class="game view">
    <toolbar>
      <toolbar-left>
      <toolbar-button v-link="{path: '/'}" icon="arrow_back"></toolbar-button>
      </toolbar-left>
      <toolbar-center>Learn</toolbar-center>
      <toolbar-right>
        <points v-bind:value="points"></points>
      </toolbar-right>
    </toolbar>

    <content>
      <problem v-for="word in problems"
               class="game__problem"
               v-bind:class="{
                 'game__problem--active': $index === this.index,
                 'game__problem--done': $index < this.index
               }"
               v-bind:word="word">
      </problem>
    </content>
  </div>
</template>

<script>
  import {Toolbar, ToolbarCenter, ToolbarLeft, ToolbarRight, ToolbarButton} from './toolbar';
  import Content from './content.vue';
  import Problem from './problem.vue';
  import Points from './points.vue';

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
        index: 0,
        points: 0
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
      },

      onPoints: function(points) {
        this.points += points;
      }
    },

    events: {
      'points': 'onPoints',
      'problem-done': 'onDone'
    },

    components: {
      'toolbar': Toolbar,
      'toolbar-center': ToolbarCenter,
      'toolbar-left': ToolbarLeft,
      'toolbar-right': ToolbarRight,
      'toolbar-button': ToolbarButton,
      'problem': Problem,
      'content': Content,
      'points': Points
    },
  };
</script>
