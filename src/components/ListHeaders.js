import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

const ListHeaders = (props) => {
  return (
    <div className="list-headers">
      {
        [{
          name: 'Title',
          property: 'title'
        }, {
          name: 'Progress',
          property: 'item.item_progress'
        }, {
          name: 'Rating',
          property: 'item.item_rating'
        }, {
          name: 'Type',
          property: 'type'
        }].map((header) => {
          return (
            <div
              key={`list-header-${header.name}`}
              className={cx({
                'list-header': true,
                active: props.listSortBy === header.property
              })}
              onClick={props.sortListBy.bind(null, header.property)}
            >
              <div className="list-header-title">
                {header.name}
              </div>
              <div
                className={cx({
                  'list-header-icon': true,
                  'icon-chevron-small-down': true,
                  asc: props.listSortOrder === 'asc',
                  hidden: props.listSortBy !== header.property
                })}
              />
            </div>
          );
        })
      }
    </div>
  );
};

ListHeaders.propTypes = {
  listSortBy: PropTypes.string.isRequired,
  listSortOrder: PropTypes.string.isRequired,
  sortListBy: PropTypes.func.isRequired
};

export default ListHeaders;
