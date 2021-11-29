import {Middleware, MiddlewareArguments} from '../types';
import {
  detectOverflow,
  Options as DetectOverflowOptions,
} from '../detectOverflow';
import {getBasePlacement} from '../utils/getBasePlacement';
import {getAlignment} from '../utils/getAlignment';

export type Options = DetectOverflowOptions;

export const size = (options: Partial<Options> = {}): Middleware => ({
  name: 'size',
  async fn(middlewareArguments: MiddlewareArguments) {
    const {placement, rects} = middlewareArguments;

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

    return {
      data: {
        height: rects.floating.height - overflow[heightSide],
        width: rects.floating.width - overflow[widthSide],
      },
    };
  },
});
