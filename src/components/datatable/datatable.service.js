import Vue from "vue";
import $ from "jquery";
import _ from 'lodash';

const datatable = {
  /**
   * Pure
   */
  mergeFunction(obj, option, propertyFunc) {
    const cloneObj = _.clone(obj);
    let cb = propertyFunc;

    if (cloneObj[option]) {
      cb = (...args) => {
        cloneObj[option](...args);
        cb(...args);
      };
    }

    cloneObj[option] = cb;

    return cloneObj;
  },

  addCreatedCell(columns, createdCellCallback) {
    return _.clone(columns).map((col) =>
      this.mergeFunction(col, "createdCell", createdCellCallback(col))
    );
  },

  addPreDraw(settings, preDrawCallback) {
    return this.mergeFunction(settings, "preDrawCallback", preDrawCallback);
  },
};

export default datatable;