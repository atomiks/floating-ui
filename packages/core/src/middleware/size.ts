import {Middleware, MiddlewareArguments} from '../types';
import {
  detectOverflow,
  Options as DetectOverflowOptions,
} from '../detectOverflow';
import {getBasePlacement} from '../utils/getBasePlacement';
import {getAlignment} from '../utils/getAlignment';
import {within} from '../utils/within';

export type Options = DetectOverflowOptions;

export const size = (options: Partial<Options> = {}): Middleware => ({
  name: 'size',
  async fn(middlewareArguments: MiddlewareArguments) {
    const {placement, rects, middlewareData} = middlewareArguments;

    const overflow = await detectOverflow(middlewareArguments, options);
    const basePlacement = getBasePlacement(placement);
    const isEnd = getAlignment(placement) === 'end';

    let heightSide: 'top' | 'bottom';
    let widthSide: 'left' | 'right';

    if (basePlacement === 'top' || basePlacement === 'bottom') {
      heightSide = basePlacement;
      widthSide = isEnd ? 'left' : 'right';
    } else {
      widthSide = basePlacement;
      heightSide = isEnd ? 'top' : 'bottom';
    }

    const dimensions = {
      height: rects.floating.height - overflow[heightSide],
      width: rects.floating.width - overflow[widthSide],
    };

    if (middlewareData.size?.skip) {
      return {
        data: dimensions,
      };
    }

    return {
      data: {
        skip: true,
      },
      reset: {
        rects: {
          floating: {
            width: within(0, dimensions.width, rects.floating.width),
            height: within(0, dimensions.height, rects.floating.height),
            x: 0,
            y: 0,
          },
        },
      },
    };
  },
});
