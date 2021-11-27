import {Modifier, ModifierArguments} from '../types';
import {
  detectOverflow,
  Options as DetectOverflowOptions,
} from '../utils/detectOverflow';
import {getBasePlacement} from '../utils/getBasePlacement';
import {getVariation} from '../utils/getVariation';

export type Options = DetectOverflowOptions;

export const size = (options: Partial<Options> = {}): Modifier => ({
  name: 'size',
  async fn(modifierArguments: ModifierArguments) {
    const {placement, rects} = modifierArguments;

    const overflow = await detectOverflow(modifierArguments, options);
    const basePlacement = getBasePlacement(placement);
    const isEnd = getVariation(placement) === 'end';

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
        height: rects.popper.height - overflow[heightSide],
        width: rects.popper.width - overflow[widthSide],
      },
    };
  },
});
