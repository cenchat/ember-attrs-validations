import Ember from 'ember';
import config from 'ember-get-config';

const {
  Mixin,
  assert,
  isNone
} = Ember;

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);

    this._validateAttrs();
  },

  /**
   * Validates attrs.
   *
   * An error will be thrown if an attr is invalid.
   */
  _validateAttrs() {
    let environment = config.environment;

    if (environment === 'test') {
      let attrValidations = this.get('attrValidations');

      for (let attrKey in attrValidations) {
        let object = attrValidations[attrKey];

        if (object.isRequired) {
          this._validateRequiredAttr(attrKey);
        }
      }
    }
  },

  /**
   * Validate a required rules
   *
   * @param {string} attribute Attribute to check
   */
  _validateRequiredAttr(attribute) {
    if (isNone(this.getAttr(attribute))) {
      this._failValidation(`Required attribute ${attribute} is undefined`);
    }
  },

  /**
   * Wrapper for Ember.assert so we could make it unit-testable
   *
   * @param {string} message
   */
  _failValidation: assert
});
