<style lang="stylus">
  @import "global.styl"

  .swipeable-content
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    display flex

    > *
      width 100%
      flex-shrink 0

  .toolbar + .swipeable-content
    top $toolbar-height

  .toolbar + .tabs + .swipeable-content
    top $toolbar-height + $tabs-height

  .tabs + .swipeable-content
    top $tabs-height
</style>

<template>
  <div
    class="swipeable-content"
    v-bind:style="{
      transform: `translate3d(${translation}px, 0, 0)`
    }"
    v-touch:panstart="onPanStart()"
    v-touch:panend="onPanEnd()"
    v-touch:pancancel="onPanEnd()"
    v-touch:pan="onPan($event)"
    v-touch:swipe="onSwipe($event)"
    v-touch-options:swipe="{threshold: 100}"
    >
    <slot></slot>
  </div>
</template>

<script>
  import raf from 'raf';

  const DIRECTION_LEFT = 2;
  const DIRECTION_RIGHT = 4;

  export default {
    data: function() {
      return {
        translation: 0
      };
    },

    props: {
      index: {
        type: Number,
        default: 0
      }
    },

    ready: function() {
      this.itemWidth = this.calculateItemWidth();
      this.translation = -this.itemWidth * this.index;

      window.addEventListener('resize', this.onResize);
    },

    beforeDestroy: function() {
      window.removeEventListener('resize', this.onResize);
    },

    watch: {
      index: function(index) {
        this.setIndex(index);
      },

      translation: function() {
        this.$dispatch('translation', {
          translation: -this.translation,
          itemWidth: this.itemWidth,
          nbrOfItems: this.nbrOfItems
        });
      }
    },

    computed: {
      nbrOfItems: function() {
        return this.$el.children.length;
      }
    },

    methods: {
      calculateItemWidth: function() {
        return this.$el.children[0].offsetWidth;
      },

      onPanStart: function() {
        this.cancelAnimation();
        this.originalTranslation = this.translation;
      },

      setIndex: function(index) {
        const target = -this.itemWidth * index;

        this.animateTo(target);
      },

      animateTo: function(target) {
        this.cancelAnimation();

        const step = (target - this.translation) / 10;

        (function bounce() {
          if (step > 0) {
            this.translation = Math.min(target, this.translation + step);
          }
          else {
            this.translation = Math.max(target, this.translation + step);
          }

          if (target === this.translation) {
            return;
          }

          this.animationHandle = raf(bounce.bind(this));
        }.bind(this))();
      },

      cancelAnimation: function() {
        raf.cancel(this.animationHandle);
      },

      normalize: function(target) {
        // Bounce back if swiped outside.
        target = Math.min(0, target);
        target = Math.max(target, (1 - this.nbrOfItems) * this.itemWidth);

        return target;
      },

      getClosestBorder: function() {
        let target = this.itemWidth * Math.round(this.translation / this.itemWidth);
        return this.normalize(target);
      },

      getPreviousBorder: function() {
        let target = this.itemWidth * Math.floor(this.translation / this.itemWidth);
        return this.normalize(target);

      },

      getNextBorder: function() {
        let target = this.itemWidth * Math.ceil(this.translation / this.itemWidth);
        return this.normalize(target);
      },

      onResize: function() {
        this.cancelAnimation();
        const newItemWidth = this.calculateItemWidth();
        this.translation = newItemWidth * Math.round(this.translation / this.itemWidth);
        this.itemWidth = newItemWidth;
      },

      onPanEnd: function() {
        let target = this.getClosestBorder();

        this.animateTo(target);
      },

      onPan: function(e) {
        let deltaX = e.deltaX;

        // Fixes bug where "panstart" is not triggered sometimes in Chrome.
        if (this.prevPanEvent && e.deltaTime > this.prevPanEvent.deltaTime) {
          deltaX = e.deltaX - this.prevPanEvent.deltaX;
        }

        this.prevPanEvent = e;

        this.translation = this.translation + deltaX;
      },

      onSwipe: function(e) {
        let target;

        if (e.direction === DIRECTION_LEFT) {
          target = this.getPreviousBorder();
        }
        else if (e.direction === DIRECTION_RIGHT) {
          target = this.getNextBorder();
        }
        else {
          return;
        }

        this.animateTo(target);
      }
    }
  };
</script>
