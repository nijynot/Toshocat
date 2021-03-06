import { expect } from 'chai';

import * as actionTypes from '../../src/constants/actionTypes';
import * as reducers from '../../src/reducers/series';

const mockSeries = {
  title: 'Dantalian no Shoka'
};

describe('series reducers', () => {
  describe('currentSeries', () => {
    it('should clear current series on request', () => {
      expect(reducers.currentSeries(mockSeries, {
        type: actionTypes.SHOW_SERIES_REQUEST,
        series: {
          title: 'Gosick'
        }
      })).to.eql({});
    });

    it('should return new series', () => {
      expect(reducers.currentSeries({}, {
        type: actionTypes.SHOW_SERIES_SUCCESS,
        series: mockSeries
      })).to.eql(mockSeries);
    });

    it('should return current series', () => {
      expect(reducers.currentSeries(mockSeries, {
        type: 'INVALID_ACTION_TYPE',
        series: {}
      })).to.eql({ title: 'Dantalian no Shoka' });
    });
  });

  describe('seriesLoading', () => {
    it('should not be loading by default', () => {
      expect(reducers.seriesLoading(undefined, {
        type: 'INVALID_ACTION_TYPE'
      })).to.equal(false);
    });

    it('should be loading on request', () => {
      expect(reducers.seriesLoading(false, {
        type: actionTypes.SHOW_SERIES_REQUEST
      })).to.equal(true);
    });

    it('should stop loading on success', () => {
      expect(reducers.seriesLoading(true, {
        type: actionTypes.SHOW_SERIES_SUCCESS
      })).to.equal(false);
    });

    it('should stop loading on failure', () => {
      expect(reducers.seriesLoading(true, {
        type: actionTypes.SHOW_SERIES_FAILURE
      })).to.equal(false);
    });
  });

  describe('currentSeriesEpisodes', () => {
    it('should clear episodes on request', () => {
      expect(reducers.currentSeriesEpisodes([{
        episode_title: 'Random title'
      }], {
        type: actionTypes.LOAD_SERIES_EPISODES_REQUEST
      })).to.eql([]);
    });
    it('should clear episodes on failure', () => {
      expect(reducers.currentSeriesEpisodes([{
        episode_title: 'Random title'
      }], {
        type: actionTypes.LOAD_SERIES_EPISODES_FAILURE
      })).to.eql([]);
    });
    it('should return new episodes on success', () => {
      expect(reducers.currentSeriesEpisodes([], {
        type: actionTypes.LOAD_SERIES_EPISODES_SUCCESS,
        episodes: [{ episode_title: 'new title' }]
      })).to.eql([{ episode_title: 'new title' }]);
    });
    it('should return state by default', () => {
      expect(reducers.currentSeriesEpisodes([], {
        type: 'INVALID_ACTION_TYPE',
        episodes: [{ episode_title: 'no empty' }]
      })).to.eql([]);
    });
  });

  describe('seriesVisible', () => {
    it('should not be visible by default', () => {
      expect(reducers.seriesVisible(undefined, {
        type: 'INVALID_ACTION_TYPE'
      })).to.equal(false);
    });

    it('should return same state on new request', () => {
      expect(reducers.seriesVisible(false, {
        type: actionTypes.SHOW_SERIES_REQUEST
      })).to.equal(false);
    });

    it('should return false on hide', () => {
      expect(reducers.seriesVisible(true, {
        type: actionTypes.HIDE_SERIES
      })).to.equal(false);
    });
  });
});
