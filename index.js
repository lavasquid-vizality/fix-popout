import { Plugin } from '@vizality/entities';
import { patch } from '@vizality/patcher';
import { getModule } from '@vizality/webpack';

const { layer } = getModule(m => m.layer && m.layerContainer);

export default class extends Plugin {
  start () {
    this.patch();
  }

  patch () {
    patch(getModule(m => m.displayName === 'ReferencePositionLayer').prototype, 'render', (args, res, _this) => {
      if (res.props.className !== layer) return res;

      if (_this.elementRef.current) {
        res.props.style = {
          ...res.props.style,
          ..._this.calculateState().style
        };
      }

      return res;
    });
  }
}
