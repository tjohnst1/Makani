import { TOGGLE_CARD } from '../../constants';
import { toggleCard } from '../../actions/cardActions';

describe('toggleCard', function() {
  it ('returns a object', function() {
    expect(toggleCard()).toEqual({ type: TOGGLE_CARD });
  });
});
