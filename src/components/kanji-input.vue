<style lang="stylus">
  .kanji-input__svg
    border 2px solid black

  .kanji-input__cross
    fill none
    stroke-width 1
    stroke rgba(0, 0, 0, 0.2)
    stroke-dasharray 4,1

  .kanji-input__guide
    stroke-width 2
    stroke gray
    fill none

  .kanji-input__strokes
    stroke-width 3
    stroke black
    fill none

  .kanji-input__strokes__stroke
    transition all 0.2s ease-in-out
    opacity 1.0
    transform-origin 50% 50%
    transform scale(1.0)

  .kanji-input__strokes__stroke--hidden
    opacity 0
    transform scale(1.2)

  .kanji-input__user
    stroke-width 3
    stroke black
    stroke-linecap round
    fill none
</style>

<template>
  <svg
    class="kanji-input__svg"
    xmlns="http://www.w3.org/2000/svg"
    width="109" height="109"
    viewBox="0 0 109 109"
    v-touch:panstart="onPanStart($event)"
    v-touch:panend="onPanEnd($event)"
    v-touch:pan="onPan($event)"
    v-el:svg>
    <g class="kanji-input__cross">
      <path d="M54.5 0 l0 109" />
      <path d="M0 54.5 l109 0" />
    </g>
    <g class="kanji-input__guide" v-if="showGuide">
      <path
        v-for="stroke in strokes"
        :d="stroke">
      </path>
    </g>
    <g class="kanji-input__strokes">
      <path
        v-for="stroke in strokes"
        class="kanji-input__strokes__stroke"
        v-bind:class="{'kanji-input__strokes__stroke--hidden': currentStroke <= $index}"
        :d="stroke">
      </path>
    </g>
    <g class="kanji-input__user">
      <path v-el:user-path></path>
    </g>
  </svg>
</template>

<script>
  import d3 from 'd3';
  import util from '../util';
  import frechet from 'frechet';

  export default {
    data: function () {
      return {
        strokes: [],
        currentStroke: 0
      }
    },

    ready: function() {
      this.svg = d3.select(this.$els.userPath);
      this.line = d3.svg.line().interpolate('basis');

      if (this.kanji) {
        this.onKanjiChange(this.kanji);
      }
    },

    props: ['kanji', 'showGuide'],

    computed: {
      hex: function() {
        return util.charToHex(this.kanji);
      },

      finished: function() {
        return (this.currentStroke === this.strokes.length);
      }
    },

    watch: {
      kanji: function() {
        this.onKanjiChange(this.kanji);
      },

      currentStroke: function() {
        if (this.finished) {
          this.$dispatch('finish');
        }
      }
    },

    methods: {
      onKanjiChange: function(kanji) {
        return util.fetchKanji(kanji)
          .then(util.parseSvg)
          .then(
            (strokes) => {
              this.strokes = strokes;
              this.currentStroke = 0;
              this.coordinates = [];
              this.onCoordinateChange();
            },
            (error) => {
              console.error(error);
            }
          );
      },

      onPanStart: function(e) {
        if (this.finished) {
          return;
        }

        this.position = this.$els.svg.getBoundingClientRect();
        const x = e.center.x - this.position.left;
        const y = e.center.y - this.position.top;
        this.coordinates = [[x, y]];
      },

      onPan: function(e) {
        if (this.finished) {
          return;
        }

        const x = e.center.x - this.position.left;
        const y = e.center.y - this.position.top;
        this.coordinates.push([x, y]);
        this.coordinates = util.simplify(this.coordinates, 0.3);
        this.coordinates = this.coordinates.slice(-100);
        this.onCoordinateChange();
      },

      onPanEnd: function(e) {
        if (this.finished) {
          return;
        }

        const x = e.center.x - this.position.left;
        const y = e.center.y - this.position.top;
        this.coordinates.push([x, y]);

        this.compare();
        this.coordinates = [];
        this.onCoordinateChange();
      },

      onCoordinateChange: function() {
        this.svg
          .data([this.coordinates])
          .attr('d', this.line);
      },

      compare() {
        const l1 = util.samplePath(this.strokes[this.currentStroke], this.coordinates.length);
        const l2 = this.coordinates;

        if (frechet(l1, l2) < 25) {
          this.currentStroke += 1;
          this.$dispatch('success');
        }
        else {
          this.$dispatch('failure');
        }
      }
    }
  }
</script>
